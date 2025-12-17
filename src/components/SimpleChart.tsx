import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Type for chart data
interface ChartDataPoint {
  name: string;
  value: number;
}

// Type for analysis data from DataAnalyzer
interface AnalysisData {
  sum?: number;
  average?: number;
  maximum?: number;
  minimum?: number;
  range?: number;
  median?: number;
  count?: number;
}

// Available chart types
type ChartType = 'bar' | 'line' | 'pie';

// Props interface - accepts data from DataAnalyzer
interface SimpleChartProps {
  analysisData?: AnalysisData | null;
  rawData?: number[];
}

const SimpleChart = ({ analysisData, rawData }: SimpleChartProps) => {
  // State management
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [dataView, setDataView] = useState<'statistics' | 'raw'>('statistics');

  // Sample datasets (fallback if no props passed)
  const sampleData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 85 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 95 },
    { name: 'May', value: 110 },
    { name: 'Jun', value: 125 }
  ];

  // Colors for charts
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  // Transform analysis statistics into chart data
  const getStatisticsChartData = (): ChartDataPoint[] => {
    if (!analysisData) return [];

    return [
      { name: 'Sum', value: analysisData.sum || 0 },
      { name: 'Average', value: analysisData.average || 0 },
      { name: 'Maximum', value: analysisData.maximum || 0 },
      { name: 'Minimum', value: analysisData.minimum || 0 },
      { name: 'Median', value: analysisData.median || 0 },
      { name: 'Range', value: analysisData.range || 0 }
    ];
  };

  // Transform raw data array into chart data
  const getRawDataChartData = (): ChartDataPoint[] => {
    if (!rawData || rawData.length === 0) return [];

    return rawData.map((value, index) => ({
      name: `Point ${index + 1}`,
      value: value
    }));
  };

  // Get current data based on view selection
  const getCurrentData = (): ChartDataPoint[] => {
    if (dataView === 'statistics' && analysisData) {
      return getStatisticsChartData();
    } else if (dataView === 'raw' && rawData) {
      return getRawDataChartData();
    }
    return sampleData; // Fallback to sample data
  };

  const currentData = getCurrentData();

  // Validate data
  const isValidData = currentData && currentData.length > 0;

  // Custom tooltip for better UX
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold text-gray-700">{payload[0].payload.name}</p>
          <p className="text-blue-600">
            Value: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Render the selected chart type
  const renderChart = () => {
    if (!isValidData) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>No valid data available to display</span>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl">Data Visualization Chart</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Data View Selection - only show if we have analysis data */}
          {(analysisData || rawData) && (
            <div>
              <label className="block text-sm font-medium mb-2">Data View:</label>
              <div className="flex gap-2">
                <Button
                  onClick={() => setDataView('statistics')}
                  variant={dataView === 'statistics' ? 'default' : 'outline'}
                  disabled={!analysisData}
                >
                  Statistics
                </Button>
                <Button
                  onClick={() => setDataView('raw')}
                  variant={dataView === 'raw' ? 'default' : 'outline'}
                  disabled={!rawData}
                >
                  Raw Data
                </Button>
              </div>
            </div>
          )}

          {/* Chart Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Chart Type:</label>
            <div className="flex gap-2">
              <Button
                onClick={() => setChartType('bar')}
                variant={chartType === 'bar' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Bar Chart
              </Button>
              <Button
                onClick={() => setChartType('line')}
                variant={chartType === 'line' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <LineChartIcon className="w-4 h-4" />
                Line Chart
              </Button>
              <Button
                onClick={() => setChartType('pie')}
                variant={chartType === 'pie' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <PieChartIcon className="w-4 h-4" />
                Pie Chart
              </Button>
            </div>
          </div>

          {/* Chart Display */}
          <div className="border rounded-lg p-4 bg-gray-50">
            {renderChart()}
          </div>

          {/* Data Info */}
          <div className="p-3 bg-blue-50 rounded text-sm">
            <strong>Current View:</strong>{' '}
            {dataView === 'statistics' && analysisData
              ? 'Showing calculated statistics from DataAnalyzer'
              : dataView === 'raw' && rawData
              ? `Showing raw dataset (${rawData.length} data points)`
              : 'Showing sample data (no data connected)'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleChart;