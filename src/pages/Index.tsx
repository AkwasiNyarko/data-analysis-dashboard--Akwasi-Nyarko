// ==========================================
// 🏠 WEEK 1: Index.tsx - Homepage Component
// ==========================================
// This is your main homepage! You will customize this in Week 1
// and add interactive components starting in Week 2.

// 📦 React imports - the core tools for building components
import { useState, useEffect } from 'react';

// 🎨 Icon imports - beautiful icons for your UI
import { Upload, BarChart3, PieChart, TrendingUp, Database } from 'lucide-react';

// 🧩 UI Component imports - pre-built components for your interface
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 📊 Data-related imports - components that handle your data
import DataUpload from '@/components/DataUpload';
import Dashboard from '@/components/Dashboard';
import EnhancedErrorBoundary from '@/components/EnhancedErrorBoundary';
import { DataRow } from '@/types/data';
import Footer from '@/components/Footer';
import { saveDataset, loadDataset, clearDataset } from '@/lib/datasetStorage';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const stored = loadDataset();
    if (stored) {
      setData(stored.data);
      setFileName(stored.fileName);
    }
    setIsRestoring(false);
  }, []);

  const handleDataLoad = (loadedData: DataRow[], name: string) => {
    setData(loadedData);
    setFileName(name);
    saveDataset(loadedData, name);
    console.log('Data loaded:', loadedData.length, 'rows');
  };

  const handleReset = () => {
    setData([]);
    setFileName('');
    clearDataset();
  };

  if (isRestoring) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:from-background dark:via-muted/10 dark:to-muted/20">
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="text-center mb-12">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-96 max-w-full mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto mb-2" />
            <Skeleton className="h-5 w-80 max-w-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-lg bg-card/80">
                <CardHeader className="text-center">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
          <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-card/80">
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4 p-8">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-10 w-40 mx-auto" />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:from-background dark:via-muted/10 dark:to-muted/20">
      {/* 🎨 Hero Section - The top part of your homepage */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-12">
          {/* 🎯 Logo and Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full">
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* 📝 WEEK 1: Students customize this title with their name */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Plug-N-Learn: Akwasi's Data Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Data Insight Engine</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your dataset and instantly discover insights, visualize trends, and explore your data with interactive charts and analytics.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by Akwasi Nyarko - Future AI Engineer
          </p>
          {/* 🆕 WEEK 3: Live Event Handling Demo (removed NameInput from homepage) */}
          {/* <div className="mt-8 mb-8 flex justify-center">
            <NameInput />
          </div> */}
        </div>

        {/* 🔧 WEEK 2: ADD YOUR PROGRESS COMPONENT HERE! */}
        {/* This is where students will add their UploadProgressSimulator component */}
        {/* Example: */}
        {/* <div className="mb-8">
          <UploadProgressSimulator />
        </div> */}

        {data.length === 0 ? (
          <>
            {/* 🎨 Features Grid - Shows what your app can do */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 📤 Upload Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Easy Data Upload</CardTitle>
                  <CardDescription>
                    Simply drag and drop your CSV files or click to browse. Support for various data formats.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 📊 Charts Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Interactive Charts</CardTitle>
                  <CardDescription>
                    Automatically generate bar charts, line graphs, pie charts, and more from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 🧠 Insights Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Insights</CardTitle>
                  <CardDescription>
                    Discover patterns, trends, and statistical insights automatically generated from your dataset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 📤 Upload Section - Where users upload their data */}
            <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Upload your CSV file to begin exploring your data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataUpload onDataLoad={handleDataLoad} />
              </CardContent>
            </Card>
          </>
        ) : (
          <EnhancedErrorBoundary context="Dashboard" level="page">
            <Dashboard data={data} fileName={fileName} onReset={handleReset} />
          </EnhancedErrorBoundary>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
