import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import '../taskpane.css';
import { processNaturalLanguage } from '../../services/aiService';
import { executeExcelAction } from '../../services/excelService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Process the natural language input
      const aiResponse = await processNaturalLanguage(input);
      
      // Execute the Excel action
      const result = await executeExcelAction(aiResponse);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  const quickActions = [
    "Format selected cells as currency",
    "Create a sum formula for column A",
    "Generate a bar chart from selection",
    "Remove duplicates from selected data"
  ];

  return (
    <div className="app-container">
      <div className="header">
        <h1>🤖 Nano Agent</h1>
        <p>Your AI-powered Excel assistant</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to Nano Agent!</h2>
              <p>I can help you automate Excel tasks using natural language.</p>
              <ul className="examples-list">
                <li>Format cells and ranges</li>
                <li>Create complex formulas</li>
                <li>Generate charts and visualizations</li>
                <li>Clean and organize data</li>
              </ul>
              <p style={{ marginTop: '16px', fontSize: '13px' }}>
                Try one of the quick actions below or type your own request!
              </p>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className={`message ${message.role}`}>
                <div className="message-label">
                  {message.role === 'user' ? 'You' : 'Nano Agent'}
                </div>
                <div className="message-bubble">
                  {message.content}
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
              <span>Processing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 0 && (
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-button"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your request... (e.g., 'Bold the selected cells')"
              disabled={isLoading}
              rows={1}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
