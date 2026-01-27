
// ==========================================
// 📊 WEEK 4+: Dashboard.tsx - Main Data Visualization Component
// ==========================================
// This is the main dashboard that displays after data is uploaded
// Students will enhance this component throughout weeks 4-10

import { useState, useMemo, useEffect } from 'react';
import { RefreshCw, Download, BarChart3, PieChart, LineChart, Table, MessageCircle, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataRow } from '@/types/data';
import DataTable from './DataTable';
import ChartSection from './ChartSection';
import InsightsPanel from './InsightsPanel';
import ChatInterface from './ChatInterface';
import { generateDataInsights, getDataSummary } from '@/utils/dataAnalysis';
import {
  ChartSectionSkeleton,
  DataTableSkeleton,
  InsightsPanelSkeleton,
  ChatSectionSkeleton,
} from './skeletons/DashboardSkeletons';

// 🔧 WEEK 6: Import custom chart components here
// Example: import CustomChartBuilder from './CustomChartBuilder';

// 🔧 WEEK 8: Import personal data analysis components here  
// Example: import PersonalAnalytics from './PersonalAnalytics';

// 🔧 WEEK 9: Import AI components here
// Example: import AIInsightGenerator from './AIInsightGenerator';

interface DashboardProps {
  data: DataRow[];
  fileName: string;
  onReset: () => void;
}

const Dashboard = ({ data, fileName, onReset }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const tid = setTimeout(() => setIsInitializing(false), 280);
    return () => clearTimeout(tid);
  }, []);

  // 🔧 WEEK 4: Add data processing state here
  // Example: const [filteredData, setFilteredData] = useState(data);
  
  // 🔧 WEEK 5: Add file handling state here
  // Example: const [exportFormat, setExportFormat] = useState('csv');
  
  // 🔧 WEEK 6: Add chart customization state here
  // Example: const [chartConfig, setChartConfig] = useState({});
  
  // 🔧 WEEK 7: Add API integration state here
  // Example: const [externalData, setExternalData] = useState([]);
  
  // 🔧 WEEK 8: Add personal analytics state here
  // Example: const [personalInsights, setPersonalInsights] = useState([]);
  
  // 🔧 WEEK 9: Add AI insights state here
  // Example: const [aiGeneratedInsights, setAiGeneratedInsights] = useState([]);

  // 📊 Computed values - these recalculate when data changes
  const summary = useMemo(() => getDataSummary(data), [data]);
  const insights = useMemo(() => generateDataInsights(data), [data]);

  // Enhanced export functionality
  const handleExportCSV = () => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportInsights = () => {
    const reportContent = `Data Analysis Report
Generated: ${new Date().toLocaleDateString()}
Dataset: ${fileName}

DATASET SUMMARY
================
Total Rows: ${summary.totalRows.toLocaleString()}
Total Columns: ${summary.totalColumns}
Numeric Columns: ${summary.numericColumns}
Text Columns: ${summary.textColumns}

KEY INSIGHTS
=============
${insights.map((insight, index) => 
  `${index + 1}. ${insight.title}
   ${insight.description}
   Confidence: ${insight.confidence}
   ${insight.column ? `Column: ${insight.column}` : ''}
`).join('\n')}

MISSING DATA
=============
${Object.entries(summary.missingValues)
  .filter(([_, count]) => count > 0)
  .map(([column, count]) => `${column}: ${count} missing values (${(count/summary.totalRows*100).toFixed(1)}%)`)
  .join('\n') || 'No missing data detected'}

COLUMN TYPES
=============
${Object.entries(summary.columnTypes)
  .map(([column, type]) => `${column}: ${type}`)
  .join('\n')}
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insights_${fileName.replace('.csv', '')}_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Data Analysis Dashboard</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">{fileName}</span>
            </span>
            <span>{data.length.toLocaleString()} rows</span>
            <span>{Object.keys(data[0] || {}).length} columns</span>
            <span>{summary.numericColumns} numeric</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleExportCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleExportInsights} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            New Dataset
          </Button>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/80 dark:to-blue-900/80 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Records</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-800 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{summary.totalRows.toLocaleString()}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">rows of data</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/80 dark:to-green-900/80 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-400">Data Columns</CardTitle>
            <Table className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{summary.totalColumns}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">total fields</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/80 dark:to-purple-900/80 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-400">Numeric Fields</CardTitle>
            <LineChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{summary.numericColumns}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">for analysis</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-950/80 dark:to-orange-900/80 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-400">Data Quality</CardTitle>
            <PieChart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {Object.values(summary.missingValues).every(count => count === 0) ? '100%' : 
               `${(100 - (Object.values(summary.missingValues).reduce((a, b) => a + b, 0) / (summary.totalRows * summary.totalColumns) * 100)).toFixed(1)}%`}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">complete data</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Charts</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              {isInitializing ? <ChartSectionSkeleton /> : <ChartSection data={data} />}
            </div>
            <div className="xl:col-span-1">
              {isInitializing ? <InsightsPanelSkeleton /> : <InsightsPanel data={data} insights={insights.slice(0, 6)} />}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="charts">
          {isInitializing ? <ChartSectionSkeleton /> : <ChartSection data={data} showAll />}
        </TabsContent>

        <TabsContent value="insights">
          {isInitializing ? <InsightsPanelSkeleton /> : <InsightsPanel data={data} insights={insights} showAll />}
        </TabsContent>

        <TabsContent value="chat">
          {isInitializing ? <ChatSectionSkeleton /> : <ChatInterface data={data} />}
        </TabsContent>

        <TabsContent value="data">
          {isInitializing ? <DataTableSkeleton /> : <DataTable data={data} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
