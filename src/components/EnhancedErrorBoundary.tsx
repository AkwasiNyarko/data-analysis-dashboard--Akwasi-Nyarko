import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional label (e.g. "Charts") for clearer error messages */
  context?: string; 
  /** Callback for logging to services like Sentry */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Array of values that, if changed, reset the boundary (e.g. [userId]) */
  resetKeys?: Array<string | number>;
  /** Visual importance of the error */
  level?: 'app' | 'page' | 'component';
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const contextMsg = this.props.context ? `[Context: ${this.props.context}]` : '';
    console.error(`Error caught by boundary ${contextMsg}:`, error, errorInfo);
    
    // Call external logger
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Auto-reset when resetKeys change (e.g., route changes or ID changes)
    if (this.state.hasError && this.props.resetKeys) {
      const prevKeys = prevProps.resetKeys || [];
      const currentKeys = this.props.resetKeys;
      
      if (prevKeys.length !== currentKeys.length ||
          prevKeys.some((key, index) => key !== currentKeys[index])) {
        this.handleReset();
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'component', context } = this.props;
      const errorMessage = this.state.error?.message || 'An unexpected error occurred.';
      const contextLabel = context ? ` in ${context}` : '';

      // --- LEVEL: APP (Full Screen) ---
      if (level === 'app') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="max-w-md w-full shadow-lg border-destructive/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Application Error</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We encountered a critical error{contextLabel}. We've logged this issue.
                </p>
                {import.meta.env.DEV && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 text-xs font-mono text-red-800 break-words">
                    {errorMessage}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()} className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reload Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }

      // --- LEVEL: PAGE (Section Card) ---
      if (level === 'page') {
        return (
          <div className="p-6 h-full flex items-center justify-center">
             <Card className="max-w-xl w-full border-destructive/50">
              <CardHeader>
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <CardTitle>Unable to load content</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  There was a problem loading this section{contextLabel}.
                </p>
                <Button onClick={this.handleReset} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      }

      // --- LEVEL: COMPONENT (Inline Alert - Default) ---
      return (
        <Alert variant="destructive" className="my-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error{contextLabel}</AlertTitle>
          <AlertDescription className="flex flex-col gap-2 mt-2">
            <span className="text-xs opacity-90">
              {import.meta.env.DEV ? errorMessage : 'This component failed to render.'}
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={this.handleReset}
              className="w-fit bg-transparent border-destructive/40 hover:bg-destructive/10 text-destructive-foreground"
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;