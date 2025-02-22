#!/bin/bash

echo "🚀 Setting up Python environment for Streamlit dashboard..."

# Navigate to the K6PerformanceTesting directory
cd "$(dirname "$0")"

# Create a new directory for Python scripts if not exists
if [ ! -d "python_reports" ]; then
    echo "📁 Creating 'python_reports' directory..."
    mkdir python_reports
fi

cd python_reports

# Set up a Python virtual environment
if [ ! -d "venv" ]; then
    echo "🐍 Creating a virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install required Python packages
echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install streamlit pandas matplotlib

# Create a Streamlit dashboard file if it doesn't exist
if [ ! -f "performance_dashboard.py" ]; then
    echo "📜 Creating 'performance_dashboard.py'..."
    cat <<EOF > performance_dashboard.py
import streamlit as st
import pandas as pd
import json

# Load test results
st.title("📊 K6 Performance Test Report")

# Load JSON results (Assumes 'results.json' is available in '../reports/')
try:
    with open("../reports/results.json", "r") as file:
        data = json.load(file)
    metrics = data.get("metrics", {})
    st.success("✅ Data Loaded Successfully!")

    # Display HTTP request duration
    st.subheader("⏱ Response Time Percentiles")
    p90 = metrics.get("http_req_duration", {}).get("p(90)", "N/A")
    p95 = metrics.get("http_req_duration", {}).get("p(95)", "N/A")
    p99 = metrics.get("http_req_duration", {}).get("p(99)", "N/A")

    st.write(f"**p90:** {p90/1000:.2f}s")
    st.write(f"**p95:** {p95/1000:.2f}s")
    st.write(f"**p99:** {p99/1000:.2f}s")

    # Display HTTP request failures
    st.subheader("❌ Failed Requests")
    failure_rate = metrics.get("http_req_failed", {}).get("value", 0) * 100
    st.metric(label="Failure Rate (%)", value=f"{failure_rate:.2f}%")

except Exception as e:
    st.error(f"Error loading data: {e}")

EOF
fi

# Create a requirements.txt file
echo "📜 Creating 'requirements.txt'..."
cat <<EOF > requirements.txt
streamlit
pandas
matplotlib
EOF

echo "✅ Setup Complete!"
echo "👉 To run the dashboard, use: source python_reports/venv/bin/activate && streamlit run python_reports/performance_dashboard.py"
