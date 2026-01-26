import { useState } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataRow } from '@/types/data';
import { generateDataInsights, getDataSummary, getNumericColumns } from '@/utils/dataAnalysis';
import EnhancedErrorBoundary from '@/components/EnhancedErrorBoundary';

interface ChatInterfaceProps {
  data: DataRow[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatInterfaceInner = ({ data }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

// Function to strip markdown formatting for clean, professional output
const stripMarkdown = (text: string): string => {
  return text
    // Remove bold markers (**text** or __text__)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    // Remove italic markers (*text* or _text_)
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove headers (# Header, ## Header, etc.)
    .replace(/^#{1,6}\s+(.*)$/gm, '$1')
    // Remove code blocks (
          // Remove inline code (`code`)
          .replace(/`([^`]+)`/g, '$1')
          // Remove links [text](url) -> text
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          // Remove strikethrough (~~text~~)
          .replace(/~~(.*?)~~/g, '$1')
          // Clean up extra whitespace
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      };
    
      // Smart AI response generation based on data context
      const generateAIResponse = (userMessage: string, dataContext: DataRow[]): string => {
        try {
          const lowerMessage = userMessage.toLowerCase();
          const summary = getDataSummary(dataContext);
          const insights = generateDataInsights(dataContext);
          const numericColumns = getNumericColumns(dataContext);
    
        let response = '';
    
        // Pattern matching for different types of questions
        if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
          response = `Based on your dataset, here's what I can tell you:
    
    Dataset Overview:
    - ${summary.totalRows.toLocaleString()} total rows
    - ${summary.totalColumns} columns (${summary.numericColumns} numeric, ${summary.textColumns} text)
    - Key numeric columns: ${numericColumns.slice(0, 3).join(', ')}
    
    Top Insights:
    ${insights.slice(0, 3).map(insight => `• ${insight.title}: ${insight.description}`).join('\n')}
    
    Would you like me to dive deeper into any specific aspect of your data?`;
        } else if (lowerMessage.includes('chart') || lowerMessage.includes('visualize')) {
          const suggestions = [];
          if (numericColumns.length >= 2) {
            suggestions.push(`Scatter Plot: Compare ${numericColumns[0]} vs ${numericColumns[1]} to find correlations`);
          }
          if (numericColumns.length >= 1) {
            suggestions.push(`Bar Chart: Show distribution of ${numericColumns[0]} values`);
            suggestions.push(`Line Chart: Track trends in ${numericColumns[0]} over time`);
          }
          
          response = `Great question! Based on your data structure, here are some visualization recommendations:
    
    ${suggestions.join('\n')}
    
    The Charts tab already shows some of these visualizations. Would you like me to explain how to interpret any specific chart type?`;
        } else if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
          const trendInsights = insights.filter(i => i.type === 'trend' || i.type === 'correlation');
          if (trendInsights.length > 0) {
            response = `I've identified these patterns in your data:
    
    ${trendInsights.map(insight => `${insight.title}: ${insight.description}`).join('\n\n')}
    
    These patterns can help you understand the underlying relationships in your dataset. Would you like me to elaborate on any of these findings?`;
          } else {
            response = `To identify trends, I'd need to analyze your data over time or look for correlations between variables. 
    
    Your dataset has ${numericColumns.length} numeric columns that I can analyze for patterns. Some questions that might reveal trends:
    - How do values change over time?
    - Are there seasonal patterns?
    - Do certain variables move together?
    
    Can you tell me more about what kind of trends you're looking for?`;
          }
        } else if (lowerMessage.includes('outlier') || lowerMessage.includes('unusual')) {
          const outlierInsights = insights.filter(i => i.type === 'outlier');
          if (outlierInsights.length > 0) {
            response = `I've detected some outliers in your data:
    
    ${outlierInsights.map(insight => `${insight.title}: ${insight.description}`).join('\n\n')}
    
    Outliers can represent:
    - Data entry errors that need correction
    - Exceptional cases worth investigating
    - Natural variation in your dataset
    
    Would you like me to help you decide how to handle these outliers?`;
          } else {
            response = `Good news! I haven't detected any obvious outliers in your numeric columns. This suggests your data is relatively consistent.
    
    However, outliers can be context-dependent. If you suspect there might be unusual values, you could:
    - Check the Data tab for values that seem out of place
    - Look at the charts for data points that stand apart
    - Tell me about specific ranges you'd expect for certain columns
    
    Is there a particular column where you suspect outliers might exist?`;
          }
        } else if (lowerMessage.includes('missing') || lowerMessage.includes('incomplete')) {
          const missingData = Object.entries(summary.missingValues).filter(([_, count]) => count > 0);
          if (missingData.length > 0) {
            response = `I found missing data in your dataset:
    
    ${missingData.map(([column, count]) => {
              const percentage = (count / summary.totalRows * 100).toFixed(1);
              return `${column}: ${count} missing values (${percentage}%)`;
            }).join('\n')}
    
    Recommendations:
    - For small amounts of missing data (<5%), you might remove those rows
    - For larger gaps, consider filling with averages or median values
    - Sometimes missing data is meaningful and should be treated as a separate category
    
    Would you like specific advice for handling missing data in any of these columns?`;
          } else {
            response = `Excellent! Your dataset appears to be complete with no missing values detected across all ${summary.totalColumns} columns.
    
    This is great for analysis because:
    ✅ No need for data cleaning or imputation
    ✅ All statistical calculations will be accurate
    ✅ Charts and visualizations will show complete picture
    
    Your data quality looks solid for conducting thorough analysis!`;
          }
        } else if (lowerMessage.includes('column') || lowerMessage.includes('field')) {
          const columns = Object.keys(dataContext[0] || {});
          response = `Your dataset contains ${columns.length} columns:
    
    Numeric columns (${summary.numericColumns}): ${numericColumns.join(', ')}
    Text columns (${summary.textColumns}): ${columns.filter(col => summary.columnTypes[col] === 'text').join(', ')}
    
    Each column type offers different analysis opportunities:
    - Numeric columns: Statistical analysis, correlations, trends
    - Text columns: Categorization, frequency analysis, grouping
    
    Which columns are you most interested in analyzing?`;
        } else {
          // Default response with helpful suggestions
          response = `I'm here to help you understand your data! Based on your dataset with ${summary.totalRows.toLocaleString()} rows and ${summary.totalColumns} columns, I can help you with:
    
    Data Analysis Questions:
    - "Give me a summary of this data"
    - "What patterns do you see?"
    - "Are there any outliers?"
    - "What charts should I create?"
    
    Specific Insights:
    - Statistical summaries of numeric columns
    - Missing data analysis
    - Correlation suggestions
    - Data quality assessment
    
    Quick Insights:
    ${insights.slice(0, 2).map(insight => `• ${insight.title}`).join('\n')}
    
    What would you like to explore first?`;
        }
    
        // Strip markdown formatting for clean output
          return stripMarkdown(response);
        } catch (err) {
          console.error('[ChatInterface] AI response generation failed:', err);
          return `Sorry, I couldn't process that request. There was an error analyzing your data. Please try rephrasing or check that your data is valid. (${err instanceof Error ? err.message : 'Unknown error'})`;
        }
      };
    
      const handleSendMessage = async (messageText?: string) => {
        const messageToSend = messageText || input.trim();
        if (!messageToSend) return;
    
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: messageToSend,
          timestamp: new Date()
        };
    
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
    
        // Simulate realistic AI response time
        setTimeout(() => {
          try {
            const aiResponse = generateAIResponse(messageToSend, data);

            const aiMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              type: 'ai',
              content: aiResponse,
              timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
          } catch (err) {
            console.error('[ChatInterface] Failed to add AI message:', err);
            const errorMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              type: 'ai',
              content: 'Sorry, something went wrong while processing your message. Please try again.',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
          } finally {
            setIsLoading(false);
          }
        }, 1000 + Math.random() * 1000); // 1-2 second delay for realism
      };
    
      const handleSampleQuestionClick = (question: string) => {
        handleSendMessage(question);
      };
    
      return (
        <Card className="max-h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Data Analysis Assistant
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Ask questions about your data, request insights, or get help understanding patterns
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0 pr-2">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Ready to analyze your data!</p>
                  <p className="text-sm mt-2">Try asking:</p>
                  <div className="mt-4 space-y-2 text-left max-w-md mx-auto">
                    <button
                      onClick={() => handleSampleQuestionClick("Give me a summary of this dataset")}
                      className="w-full bg-muted/50 hover:bg-muted/70 active:bg-muted p-3 rounded-md text-xs text-left transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      "Give me a summary of this dataset"
                    </button>
                    <button
                      onClick={() => handleSampleQuestionClick("What patterns do you see in the data?")}
                      className="w-full bg-muted/50 hover:bg-muted/70 active:bg-muted p-3 rounded-md text-xs text-left transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      "What patterns do you see in the data?"
                    </button>
                    <button
                      onClick={() => handleSampleQuestionClick("Are there any outliers I should know about?")}
                      className="w-full bg-muted/50 hover:bg-muted/70 active:bg-muted p-3 rounded-md text-xs text-left transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                    >
                      "Are there any outliers I should know about?"
                    </button>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm">Analyzing your data...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
    
            <div className="flex-shrink-0 flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your data... (e.g., 'What insights can you find?' or 'Explain the trends')"
                className="flex-1 min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={() => handleSendMessage()} 
                disabled={!input.trim() || isLoading}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-shrink-0 text-xs text-muted-foreground mt-2 text-center">
              💡 Press <kbd className="bg-muted px-1 rounded">Enter</kbd> to send • <kbd className="bg-muted px-1 rounded">Shift+Enter</kbd> for new line
            </div>
          </CardContent>
        </Card>
      );
    };

const ChatInterface = (props: ChatInterfaceProps) => (
  <EnhancedErrorBoundary context="Chat">
    <ChatInterfaceInner {...props} />
  </EnhancedErrorBoundary>
);

export default ChatInterface;