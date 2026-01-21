import React, { useState, useEffect } from 'react';
import { openai } from '../../lib/openai';
import { localStore, clearConversation } from '../../lib/localStore';
import MessageBubble from '../shared/MessageBubble';
import type { Message } from '../../types';
import type OpenAI from 'openai';

export default function Section2Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    setMessages(localStore.data.conversations.section2);
  };

  const saveMessages = (newMessages: Message[]) => {
    localStore.updateData((data) => {
      data.conversations.section2 = newMessages;
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Convert to OpenAI Responses API message input format
      const responseInput: OpenAI.Responses.EasyInputMessage[] = newMessages.map((msg) => {
        const role: OpenAI.Responses.EasyInputMessage['role'] =
          msg.role === 'tool' ? 'assistant' : msg.role;

        return {
          role,
          content: msg.content,
        };
      });

      const completion = await openai.responses.create({
        model: 'gpt-5-mini',
        input: responseInput,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: completion.output_text || '',
        timestamp: Date.now(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);

      if (completion.usage) {
        setTotalTokens((prev) => prev + completion.usage!.input_tokens + completion.usage!.output_tokens);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now(),
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearConversation('section2');
    setMessages([]);
    setTotalTokens(0);
  };

  return (
    <div className="section section-2">
      <div className="section-header">
        <h2>Section 2: Conversational AI with Memory</h2>
        <p className="section-description">
          LLMs are stateless - they don't remember previous messages. We must send the entire
          conversation history with each request. This section demonstrates context management and
          persistence.
        </p>
      </div>

      <div className="section-content">
        <div className="conversation-panel">
          <div className="conversation-stats">
            <span>Messages: {messages.length}</span>
            <span>Total Tokens: {totalTokens}</span>
            <button onClick={handleClear} className="btn-danger">
              Clear Conversation
            </button>
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <p>Start a conversation! Each message will be saved to the database.</p>
                <p className="hint">
                  💡 Try asking follow-up questions to see how context is maintained
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => <MessageBubble key={idx} message={msg} showTimestamp />)
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
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>

        <div className="context-panel">
          <h3>📚 Context Being Sent</h3>
          <p className="hint">
            Every request includes ALL previous messages. This is how the AI "remembers" the
            conversation.
          </p>
          <div className="context-preview">
            <pre>{JSON.stringify(messages, null, 2)}</pre>
          </div>
          <div className="info-box">
            <h4>Key Concepts:</h4>
            <ul>
              <li>LLMs are stateless - no memory between requests</li>
              <li>We send the full conversation history each time</li>
              <li>Context window limits (tokens) constrain conversation length</li>
              <li>Longer conversations = higher API costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
