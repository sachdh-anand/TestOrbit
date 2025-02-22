// utils/reportGenerator.js
import fs from "fs/promises";
import path from "path";

// Define paths for input & output
const resultsPath = path.join(process.cwd(), "reports", "results.json");
const reportPath = path.join(process.cwd(), "reports", "performanceReport.html");

// Function to get status icons based on thresholds
const getStatusIcon = (value, threshold, reverse = false) => {
    const success = reverse ? value < threshold : value >= threshold;
    const warning = reverse ? value < threshold * 1.2 : value >= threshold * 0.8;

    if (success) return `<span style="color: green;">✅ Pass</span>`;
    if (warning) return `<span style="color: orange;">⚠️ Warning</span>`;
    return `<span style="color: red;">❌ Fail</span>`;
};

// Function to generate the report
const generateReport = async () => {
    try {
        // Check if results.json exists
        const fileExists = await fs.access(resultsPath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new Error(`Results file not found: ${resultsPath}`);
        }

        // Read and parse results file
        const resultsFile = await fs.readFile(resultsPath, "utf8");
        const results = JSON.parse(resultsFile);

        // Extract key metrics
        const metrics = results.metrics || {};
        const httpDuration = metrics.http_req_duration || {};
        const httpFailed = metrics.http_req_failed || {};
        const vusMax = metrics.vus_max?.value || "N/A";

        // Load Test Breakdown
        const loadTestResults = {
            p90: (httpDuration["p(90)"] / 1000).toFixed(2) || "N/A",
            p95: (httpDuration["p(95)"] / 1000).toFixed(2) || "N/A",
            failedRate: (httpFailed.value * 100).toFixed(2) || "N/A",
            peakRPS: metrics.http_reqs?.rate.toFixed(2) || "N/A",
        };

        // Stress Test Breakdown
        const stressTestResults = {
            maxLoadBeforeFailure: vusMax,
            failureThresholdCrossedAt: loadTestResults.p95, // Assuming failure threshold is when p95 exceeds
            httpReqDurationP95: loadTestResults.p95,
            httpRequestsFailed: loadTestResults.failedRate,
        };

        // Soak Test Breakdown (Checking long-term degradation)
        const soakTestResults = {
            sustainedRPS: metrics.http_reqs?.rate.toFixed(2) || "N/A",
            avgDuration: (httpDuration["avg"] / 1000).toFixed(2) || "N/A",
            memoryLeakObserved: "Not Measured", // Requires memory profiling tool
        };

        // Spike Test Breakdown (Handling sudden traffic surge)
        const spikeTestResults = {
            maxRPS: metrics.http_reqs?.rate.toFixed(2) || "N/A",
            spikeResponseTimeP95: (httpDuration["p(95)"] / 1000).toFixed(2) || "N/A",
            failureRate: (httpFailed.value * 100).toFixed(2) || "N/A",
        };

        // Generate HTML report
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>K6 Performance Test Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f4f4f4; }
                .container { max-width: 1000px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                h1 { text-align: center; color: #4CAF50; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background: #4CAF50; color: white; }
                .pass { color: green; }
                .fail { color: red; }
                .warn { color: orange; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 K6 Performance Test Report</h1>

                <!-- Load Test Results -->
                <h2>🚀 Load Test Results</h2>
                <table>
                    <tr><th>Metric</th><th>Value (s)</th><th>Status</th></tr>
                    <tr>
                        <td>HTTP Request Duration (p90)</td>
                        <td>${loadTestResults.p90}s</td>
                        <td>${getStatusIcon(loadTestResults.p90, 0.5, true)}</td>
                    </tr>
                    <tr>
                        <td>HTTP Request Duration (p95)</td>
                        <td>${loadTestResults.p95}s</td>
                        <td>${getStatusIcon(loadTestResults.p95, 0.8, true)}</td>
                    </tr>
                    <tr>
                        <td>HTTP Requests Failed</td>
                        <td>${loadTestResults.failedRate}%</td>
                        <td>${getStatusIcon(loadTestResults.failedRate, 1, false)}</td>
                    </tr>
                </table>

                <!-- Stress Test Results -->
                <h2>🔥 Stress Test Results</h2>
                <table>
                    <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
                    <tr>
                        <td>Max Load Before Failure</td>
                        <td>${stressTestResults.maxLoadBeforeFailure} VUs</td>
                        <td>📈 Observed</td>
                    </tr>
                    <tr>
                        <td>Failure Threshold Crossed At</td>
                        <td>${stressTestResults.failureThresholdCrossedAt}s</td>
                        <td>${getStatusIcon(stressTestResults.failureThresholdCrossedAt, 1, false)}</td>
                    </tr>
                </table>

                <!-- Soak Test Results -->
                <h2>🌊 Soak Test Results</h2>
                <table>
                    <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
                    <tr>
                        <td>Sustained Requests Per Second</td>
                        <td>${soakTestResults.sustainedRPS}</td>
                        <td>📊 Observed</td>
                    </tr>
                    <tr>
                        <td>Average Response Time</td>
                        <td>${soakTestResults.avgDuration}s</td>
                        <td>${getStatusIcon(soakTestResults.avgDuration, 0.5, true)}</td>
                    </tr>
                    <tr>
                        <td>Memory Leak Observed</td>
                        <td>${soakTestResults.memoryLeakObserved}</td>
                        <td>🧐 Requires Monitoring</td>
                    </tr>
                </table>

                <!-- Spike Test Results -->
                <h2>⚡ Spike Test Results</h2>
                <table>
                    <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
                    <tr>
                        <td>Max Requests Per Second</td>
                        <td>${spikeTestResults.maxRPS}</td>
                        <td>📊 Observed</td>
                    </tr>
                    <tr>
                        <td>Response Time (p95)</td>
                        <td>${spikeTestResults.spikeResponseTimeP95}s</td>
                        <td>${getStatusIcon(spikeTestResults.spikeResponseTimeP95, 1.5, true)}</td>
                    </tr>
                </table>
            </div>
        </body>
        </html>`;

        // Write HTML report to file
        await fs.writeFile(reportPath, html);
        console.log("✅ Report generated:", reportPath);

    } catch (error) {
        console.error("❌ Error generating report:", error.message);
        process.exit(1);
    }
};

// Run report generation
generateReport();
