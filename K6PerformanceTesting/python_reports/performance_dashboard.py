import streamlit as st
import pandas as pd
import json
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime

# Page config with dark theme
st.set_page_config(page_title="K6 Performance Test Report", layout="wide", initial_sidebar_state="collapsed")

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        background-color: #0e1117;
        color: white;
    }
    .stMetric {
        background-color: #1f2937;
        padding: 15px;
        border-radius: 10px;
    }
    </style>
""", unsafe_allow_html=True)

# Load test results
st.title("📊 K6 Performance Test Report")

# Add this near the top of your code, after the page_config
st.markdown("""
    <style>
    #print-button {
        background-color: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin: 10px 0;
    }
    </style>
    <script>
        function printReport() {
            window.print();
        }
    </script>
    <button id="print-button" onclick="printReport()">
        📄 Print / Save as PDF
    </button>
    """, unsafe_allow_html=True)

# Hide the button during printing
st.markdown("""
    <style>
    @media print {
        #print-button { display: none !important; }
        .stDeployButton { display: none !important; }
        .stToolbar { display: none !important; }
        .stSidebar { display: none !important; }
        @page { margin: 1in; }
    }
    </style>
""", unsafe_allow_html=True)

try:
    with open("reports/results.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    metrics = data.get("metrics", {})
    test_info = data.get("metadata", {})
    st.success("✅ Data Loaded Successfully!")



    # Test Overview Section with Speedometer Charts
    st.header("🎯 Test Overview")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        fig = go.Figure(go.Indicator(
            mode = "gauge+number",
            value = metrics.get('http_reqs', {}).get('rate', 0),
            title = {'text': "Requests per Second"},
            gauge = {'axis': {'range': [None, 500]},
                    'bar': {'color': "#00ff00"},
                    'steps': [
                        {'range': [0, 200], 'color': "#ff0000"},
                        {'range': [200, 350], 'color': "#ffff00"},
                        {'range': [350, 500], 'color': "#00ff00"}]}))
        st.plotly_chart(fig)

    with col2:
        # Response Time Gauge
        avg_response = metrics.get('http_req_duration', {}).get('avg', 0)/1000
        fig = go.Figure(go.Indicator(
            mode = "gauge+number",
            value = avg_response,
            title = {'text': "Avg Response Time (s)"},
            gauge = {'axis': {'range': [0, 2]},
                    'bar': {'color': "#00ff00" if avg_response < 1 else "#ff0000"},
                    'steps': [
                        {'range': [0, 0.5], 'color': "#00ff00"},
                        {'range': [0.5, 1], 'color': "#ffff00"},
                        {'range': [1, 2], 'color': "#ff0000"}]}))
        st.plotly_chart(fig)

    with col3:
        # Success Rate Gauge
        success_rate = 100 - (metrics.get("http_req_failed", {}).get("value", 0) * 100)
        fig = go.Figure(go.Indicator(
            mode = "gauge+number",
            value = success_rate,
            title = {'text': "Success Rate (%)"},
            gauge = {'axis': {'range': [0, 100]},
                    'bar': {'color': "#00ff00" if success_rate > 95 else "#ff0000"},
                    'steps': [
                        {'range': [0, 90], 'color': "#ff0000"},
                        {'range': [90, 95], 'color': "#ffff00"},
                        {'range': [95, 100], 'color': "#00ff00"}]}))
        st.plotly_chart(fig)

    # Response Time Analysis with Area Chart
    st.header("⏱ Response Time Analysis")
    response_times = {
        'Percentile': ['p50', 'p90', 'p95', 'p99'],
        'Time (s)': [
            metrics.get('http_req_duration', {}).get('med', 0)/1000,
            metrics.get('http_req_duration', {}).get('p(90)', 0)/1000,
            metrics.get('http_req_duration', {}).get('p(95)', 0)/1000,
            metrics.get('http_req_duration', {}).get('p(99)', 0)/1000
        ]
    }
    fig = px.area(response_times, x='Percentile', y='Time (s)', 
                  title='Response Time Distribution',
                  color_discrete_sequence=['#00ff00'])
    st.plotly_chart(fig)

    # Health Metrics with Pie Chart
    st.header("🏥 Health Metrics")
    failure_rate = metrics.get("http_req_failed", {}).get("value", 0) * 100
    success_rate = 100 - failure_rate
    
    fig = go.Figure(data=[go.Pie(
        labels=['Success', 'Failure'],
        values=[success_rate, failure_rate],
        hole=.3,
        marker_colors=['#00ff00', '#ff0000']
    )])
    fig.update_layout(title_text="Request Success vs Failure")
    st.plotly_chart(fig)

    # Data Transfer Metrics with Bar Chart
    data_metrics = {
        'Metric': ['Data Received', 'Data Sent'],
        'Size (MB)': [
            metrics.get('data_received', {}).get('count', 0)/1024/1024,
            metrics.get('data_sent', {}).get('count', 0)/1024/1024
        ]
    }
    fig = px.bar(data_metrics, x='Metric', y='Size (MB)',
                 title='Data Transfer Overview',
                 color_discrete_sequence=['#00ff00'])
    st.plotly_chart(fig)

    # Performance Thresholds Analysis
    st.header("🎯 Performance Analysis")
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
            ### Response Time Performance
            - 🟢 **Excellent** < 0.5s
            - 🟡 **Good** 0.5s - 1s
            - 🟠 **Monitor** 1s - 2s
            - 🔴 **Improve** > 2s
        """)
    
    with col2:
        st.markdown("""
            ### Current Status
            {}
        """.format(
            "🟢 **Excellent Performance**" if avg_response < 0.5 else
            "🟡 **Good Performance**" if avg_response < 1 else
            "🟠 **Needs Monitoring**" if avg_response < 2 else
            "🔴 **Needs Improvement**"
        ))

    # Executive Summary
    st.header("📋 Executive Summary")
    st.markdown(f"""
        ### Key Findings
        - System is handling **{metrics.get('http_reqs', {}).get('rate', 0):.1f}** requests per second
        - Average response time is **{avg_response:.2f}s**
        - Success rate is **{success_rate:.1f}%**
        
        ### Recommendations
        {
        "✅ System is performing optimally" if success_rate > 95 and avg_response < 1 else
        "⚠️ System needs attention - High failure rate detected" if success_rate < 95 else
        "⚠️ System needs optimization - Response times are high" if avg_response > 1 else
        "⚠️ System needs review - Multiple issues detected"
        }
    """)

except Exception as e:
    st.error(f"Error loading data: {e}")
    st.write("Please check your data file and permissions")