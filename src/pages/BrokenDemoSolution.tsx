import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

export default function BrokenDemoSolution() {
  const [showChart, setShowChart] = useState(false);
  const [useEmptyData, setUseEmptyData] = useState(false);

  // BUG #2 FIXED: chartData was undefined (runtime error)
  // BUG #3 FIXED: chartData had swapped name/value (logic error)
  const [chartData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 }
  ]);

  // BUG #1 FIXED: Button text logic was reversed (visual/logic error)
  // Toggle chart visibility
  const handleShowChart = () => {
    setShowChart(s => !s);
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Quality Detective Challenge - SOLUTION
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>All 5 bugs have been fixed!</strong> Compare this with the broken version to see what changed.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Bugs That Were Fixed:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Bug #1 (Visual/Logic):</strong> Button text logic was reversed - now says "Hide Chart" when showing</li>
              <li><strong>Bug #2 (Runtime):</strong> chartData was undefined - now properly initialized</li>
              <li><strong>Bug #3 (Logic):</strong> Chart data had swapped name/value - now correct structure</li>
              <li><strong>Bug #4 (Edge Case):</strong> Chart crashed or showed nothing with empty data - now shows helpful message and does not crash</li>
              <li><strong>Bug #5 (UI/UX):</strong> "Use Sample Data"/"Use Empty Data" button was available even when chart was hidden - now only appears when chart is showing</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            {/* BUG #1 FIXED: Button text logic reversed */}
            <Button onClick={handleShowChart}>
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </Button>
            {/* BUG #5 FIXED: Data button only appears when chart is showing */}
            {showChart && (
              <Button 
                variant="outline" 
                onClick={() => setUseEmptyData(u => !u)}
              >
                {useEmptyData ? 'Use Sample Data' : 'Use Empty Data'}
              </Button>
            )}
          </div>

          {/* DEMO: Show what bug #5 looked like before it was fixed */}
          <div className="mt-4 p-2 border rounded bg-yellow-50">
            <strong>Bug #5 (UI/UX) - Before Fix:</strong> The button below was always visible, even when the chart was hidden.
            <div className="flex gap-2 mt-2">
              <Button variant="outline" disabled>
                {useEmptyData ? 'Use Sample Data' : 'Use Empty Data'}
              </Button>
              <span className="text-xs text-muted-foreground">(Should only appear when chart is showing)</span>
            </div>
          </div>

          {/* BUG #4 FIXED: Chart crashed or showed nothing with empty data - now shows helpful message and does not crash */}
          {showChart && (
            <div className="mt-4">
              {(useEmptyData ? [] : chartData).length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={useEmptyData ? [] : chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Alert>
                  <AlertDescription>
                    No data available to display. Click "Use Sample Data" to see the chart.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Takeaways:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Always initialize variables before using them</li>
              <li>Test UI text in all states (showing/hidden)</li>
              <li>Validate data structure matches what components expect</li>
              <li>Handle edge cases like empty data arrays</li>
              <li>Use browser console to catch runtime errors early</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
