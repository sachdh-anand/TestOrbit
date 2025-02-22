import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PerformanceDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/reports/results.json")
      .then((response) => response.json())
      .then((json) => setData(json.metrics))
      .catch((error) => console.error("Error fetching results.json:", error));
  }, []);

  if (!data) {
    return <p className="text-center text-gray-600">Loading performance data...</p>;
  }

  const loadTestData = [
    { name: "p90 Response", value: (data.http_req_duration["p(90)"] / 1000).toFixed(2) },
    { name: "p95 Response", value: (data.http_req_duration["p(95)"] / 1000).toFixed(2) },
    { name: "Failed Requests", value: (data.http_req_failed.value * 100).toFixed(2) },
  ];

  const stressTestData = [
    { name: "Max Load Before Failure", value: data.vus_max.value },
    { name: "Failure Threshold (p95)", value: (data.http_req_duration["p(95)"] / 1000).toFixed(2) },
  ];

  const soakTestData = [
    { name: "Sustained Requests", value: data.http_reqs.rate.toFixed(2) },
    { name: "Avg Response Time", value: (data.http_req_duration.avg / 1000).toFixed(2) },
  ];

  const spikeTestData = [
    { name: "Max Requests Per Second", value: data.http_reqs.rate.toFixed(2) },
    { name: "p95 Response", value: (data.http_req_duration["p(95)"] / 1000).toFixed(2) },
  ];

  return (
    <div className="space-y-6">
      {/* Load Test Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>🚀 Load Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadTestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4ade80" name="Load Test Metrics" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stress Test Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>🔥 Stress Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stressTestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f87171" name="Stress Test Metrics" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Soak Test Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>🌊 Soak Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soakTestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#60a5fa" name="Soak Test Metrics" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Spike Test Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>⚡ Spike Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spikeTestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ffcc00" name="Spike Test Metrics" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
