import React, { useState } from 'react';
import { openai } from '../../lib/openai';
import JsonViewer from '../shared/JsonViewer';
import type OpenAI from 'openai';

type ApiRequest = OpenAI.Responses.ResponseCreateParamsNonStreaming;

type ResponseData =
  | {
      id: string;
      model: string;
      output_text: string;
      created: string;
      usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      };
    }
  | {
      error: string;
    };

type ConversationMessage = {
  userText: string;
  llmText: string | null;
};

export default function Section1Intro() {
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [includeSystemPrompt, setIncludeSystemPrompt] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [model, setModel] = useState('gpt-5-mini');
  const [maxTokens, setMaxTokens] = useState(500);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<ApiRequest | null>(null);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRequest(null);
    setResponse(null);

    // Add user message to history immediately
    const currentUserMessage = userMessage;
    setConversationHistory(prev => [...prev, { userText: currentUserMessage, llmText: null }]);

    try {
      const input: ApiRequest['input'] = includeSystemPrompt && systemPrompt.trim()
        ? ([
            { role: 'system', content: systemPrompt } as const,
            { role: 'user', content: currentUserMessage } as const,
          ] satisfies OpenAI.Responses.EasyInputMessage[])
        : currentUserMessage;

      const apiRequest: ApiRequest = {
        model,
        input,
        max_output_tokens: maxTokens,
      };

      setRequest(apiRequest);

      const completion = await openai.responses.create(apiRequest);

      const responseData = {
        id: completion.id,
        model: completion.model,
        output_text: completion.output_text,
        created: new Date(completion.created_at * 1000).toISOString(),
        usage: completion.usage ? {
          prompt_tokens: completion.usage.input_tokens,
          completion_tokens: completion.usage.output_tokens,
          total_tokens: completion.usage.input_tokens + completion.usage.output_tokens,
        } : undefined,
      };

      setResponse(responseData);

      // Update the last message in history with LLM response
      setConversationHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], llmText: completion.output_text };
        return updated;
      });
    } catch (error) {
      const errorResponse = { error: error instanceof Error ? error.message : 'Unknown error occurred' };
      setResponse(errorResponse);

      // Update with error message
      setConversationHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          llmText: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
        };
        return updated;
      });
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="section section-1">
      <div className="section-header">
        <h2>Section 1: Introduction to LLM APIs</h2>
        <p className="section-description">
          Learn the basics of making API calls to OpenAI. This section demonstrates a single
          request-response interaction with configurable parameters.
        </p>
      </div>

      <div className="section-content">
        <div className="input-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeSystemPrompt}
                  onChange={(e) => setIncludeSystemPrompt(e.target.checked)}
                />
                Include System Prompt
              </label>
            </div>

            {includeSystemPrompt && (
              <div className="form-group">
                <label>System Prompt</label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={3}
                  placeholder="Set the AI's behavior and context..."
                />
                <small>The system message helps set the behavior of the assistant</small>
              </div>
            )}

            <div className="form-group">
              <label>Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="gpt-5-mini">GPT-5 Mini</option>
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Max Tokens</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                min="50"
                max="4000"
              />
              <small>Maximum number of tokens to generate</small>
            </div>

            <div className="form-group">
              <label>User Message</label>
              <textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                rows={4}
                placeholder="Enter your message..."
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </form>

          {conversationHistory.length > 0 && (
            <div className="conversation-history">
              <h3>Conversation History</h3>
              <div className="conversation-history-container">
                {conversationHistory.map((msg, index) => (
                  <div key={index} className="conversation-pair">
                    <div className="conversation-user-message">
                      <strong>User:</strong> {msg.userText}
                    </div>
                    <div className="conversation-llm-message">
                      <strong>LLM:</strong> {msg.llmText === null ? (
                        <span className="conversation-thinking">thinking...</span>
                      ) : msg.llmText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="output-panel">
          <div className="split-view">
            {request && <JsonViewer title="Request" data={request} />}
            {response && (
              <div>
                <JsonViewer title="Response" data={response} />
                {'usage' in response && response.usage && (
                  <div className="usage-info">
                    <h4>Token Usage</h4>
                    <p>Prompt tokens: {response.usage.prompt_tokens}</p>
                    <p>Completion tokens: {response.usage.completion_tokens}</p>
                    <p>Total tokens: {response.usage.total_tokens}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {!request && !response && (
            <div className="placeholder">
              <p>Configure your parameters and send a message to see the API request and response</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
