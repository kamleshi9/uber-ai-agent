import React, { useState, useEffect } from 'react';
import { openai } from '../../lib/openai';
import { localStore, clearConversation } from '../../lib/localStore';
import { getRedditPost } from '../../lib/tools/reddit';
import { getWeather } from '../../lib/tools/weather';
import MessageBubble from '../shared/MessageBubble';
import type { Message, ChatMessage, ToolDefinition } from '../../types';
import type OpenAI from 'openai';

const tools: ToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'get_reddit_post',
      description: 'Fetch a random post from a specified subreddit',
      parameters: {
        type: 'object',
        properties: {
          subreddit: {
            type: 'string',
            description: 'The subreddit name (without r/)',
          },
        },
        required: ['subreddit'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get current weather information for a city',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'The city name',
          },
        },
        required: ['city'],
      },
    },
  },
];

export default function Section3Tools() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    setMessages(localStore.data.conversations.section3);
  };

  const saveMessages = (newMessages: Message[]) => {
    localStore.updateData((data) => {
      data.conversations.section3 = newMessages;
    });
  };

  const executeTool = async (toolName: string, args: any) => {
    switch (toolName) {
      case 'get_reddit_post':
        return await getRedditPost(args.subreddit);
      case 'get_weather':
        return await getWeather(args.city);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    let currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setLoading(true);

    try {
      // First API call with tools
      const chatMessages: ChatMessage[] = currentMessages.map((msg) => {
        if (msg.role === 'assistant' && msg.toolCalls) {
          return {
            role: 'assistant',
            content: msg.content || null,
            tool_calls: msg.toolCalls.map((tc) => ({
              id: tc.id,
              type: 'function' as const,
              function: {
                name: tc.function.name,
                arguments: tc.function.arguments,
              },
            })),
          };
        }
        if (msg.role === 'tool') {
          return {
            role: 'tool',
            content: msg.content,
            tool_call_id: msg.toolCallId!,
          };
        }
        return {
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        };
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: chatMessages,
        tools,
      });

      const assistant = response.choices[0]?.message;
      const toolCalls = assistant?.tool_calls ?? [];
      const functionToolCalls = toolCalls.filter(
        (tc): tc is OpenAI.Chat.Completions.ChatCompletionMessageFunctionToolCall => tc.type === 'function',
      );

      // Check if AI wants to call tools
      if (functionToolCalls.length > 0) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: assistant?.content || '',
          timestamp: Date.now(),
          toolCalls: functionToolCalls.map((tc) => ({
            id: tc.id,
            type: 'function',
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments,
            },
          })),
        };

        currentMessages = [...currentMessages, assistantMessage];
        setMessages(currentMessages);

        // Execute each tool call
        for (const toolCall of functionToolCalls) {
          const args = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) : {};
          const result = await executeTool(toolCall.function.name, args);

          const toolMessage: Message = {
            role: 'tool',
            content: JSON.stringify(result),
            timestamp: Date.now(),
            toolCallId: toolCall.id,
            name: toolCall.function.name,
          };

          currentMessages = [...currentMessages, toolMessage];
          setMessages(currentMessages);
        }

        // Make final call with tool results
        const finalChatMessages: ChatMessage[] = currentMessages.map((msg) => {
          if (msg.role === 'assistant' && msg.toolCalls) {
            return {
              role: 'assistant',
              content: msg.content || null,
              tool_calls: msg.toolCalls.map((tc) => ({
                id: tc.id,
                type: 'function' as const,
                function: {
                  name: tc.function.name,
                  arguments: tc.function.arguments,
                },
              })),
            };
          }
          if (msg.role === 'tool') {
            return {
              role: 'tool',
              content: msg.content,
              tool_call_id: msg.toolCallId!,
            };
          }
          return {
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
          };
        });

        const finalResponse = await openai.chat.completions.create({
          model: 'gpt-5-mini',
          messages: finalChatMessages,
          tools,
        });

        const finalMessage: Message = {
          role: 'assistant',
          content: finalResponse.choices[0]?.message?.content || '',
          timestamp: Date.now(),
        };

        currentMessages = [...currentMessages, finalMessage];
      } else {
        // No tool calls, just add response
        const assistantMessage: Message = {
          role: 'assistant',
          content: assistant?.content || '',
          timestamp: Date.now(),
        };
        currentMessages = [...currentMessages, assistantMessage];
      }

      setMessages(currentMessages);
      saveMessages(currentMessages);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now(),
      };
      currentMessages = [...currentMessages, errorMessage];
      setMessages(currentMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearConversation('section3');
    setMessages([]);
  };

  return (
    <div className="section section-3">
      <div className="section-header">
        <h2>Section 3: Function Calling & Tools</h2>
        <p className="section-description">
          LLMs can use external tools to access real-time data and perform actions. This section
          demonstrates how to define tools and handle tool calls.
        </p>
      </div>

      <div className="section-content">
        <div className="tools-panel">
          <h3>🔧 Available Tools</h3>
          {tools.map((tool, idx) => (
            <div key={idx} className="tool-definition">
              <h4>{tool.function.name}</h4>
              <p>{tool.function.description}</p>
              <details>
                <summary>View Schema</summary>
                <pre>{JSON.stringify(tool, null, 2)}</pre>
              </details>
            </div>
          ))}
          <div className="info-box">
            <h4>Try asking:</h4>
            <ul>
              <li>"What's the weather in London?"</li>
              <li>"Show me a post from r/technology"</li>
              <li>"Get weather for Paris and a post from r/news"</li>
            </ul>
          </div>
        </div>

        <div className="conversation-panel">
          <div className="conversation-stats">
            <span>Messages: {messages.length}</span>
            <button onClick={handleClear} className="btn-danger">
              Clear
            </button>
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <p>Ask me to fetch weather or Reddit posts!</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                if (msg.role === 'tool') {
                  return (
                    <div key={idx} className="tool-result-message">
                      <strong>🔧 Tool Result ({msg.name}):</strong>
                      <pre>{msg.content}</pre>
                    </div>
                  );
                }
                return <MessageBubble key={idx} message={msg} showTimestamp />;
              })
            )}
            {loading && (
              <div className="loading-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="message-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about weather or Reddit posts..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
