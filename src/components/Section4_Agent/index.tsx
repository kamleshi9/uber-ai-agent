import { useState } from 'react';
import { openai } from '../../lib/openai';
import { getRedditJoke } from '../../lib/tools/reddit';
import { generateImage } from '../../lib/tools/dalle';
import AgentStepView from '../shared/AgentStepView';
import type { AgentStep, ToolDefinition, ChatMessage } from '../../types';
import type OpenAI from 'openai';

const tools: ToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'get_reddit_joke',
      description: 'Fetch a programming joke from r/ProgrammerHumor',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_meme_image',
      description: 'Generate a meme image using DALL-E based on a joke',
      parameters: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            description: 'Detailed prompt for generating a meme image that visualizes the joke',
          },
        },
        required: ['prompt'],
      },
    },
  },
];

export default function Section4Agent() {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [finalResult, setFinalResult] = useState<{ joke: string; imageUrl: string } | null>(null);

  const executeTool = async (toolName: string, args: unknown): Promise<{ setup: string; punchline: string } | { imageUrl: string }> => {
    switch (toolName) {
      case 'get_reddit_joke':
        return await getRedditJoke();
      case 'generate_meme_image':
        if (typeof args === 'object' && args !== null && 'prompt' in args) {
          return { imageUrl: await generateImage((args as { prompt: string }).prompt) };
        }
        throw new Error('Invalid arguments for generate_meme_image');
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  };

  const addStep = (step: Omit<AgentStep, 'timestamp'>) => {
    setSteps((prev) => [...prev, { ...step, timestamp: Date.now() }]);
  };

  const runAgent = async () => {
    setLoading(true);
    setSteps([]);
    setFinalResult(null);

    const systemMessage: ChatMessage = {
      role: 'system',
      content:
        'You are a helpful assistant that creates programming memes. First fetch a joke, then generate a creative meme image for it.',
    };

    const userMessage: ChatMessage = {
      role: 'user',
      content: 'Create a programming meme for me! Fetch a joke and generate a funny meme image.',
    };

    const conversationMessages: ChatMessage[] = [systemMessage, userMessage];

    addStep({
      type: 'thinking',
      content: 'Starting agent workflow: Fetch joke → Generate meme image',
    });

    let joke = '';
    let imageUrl = '';
    let iterations = 0;
    const maxIterations = 5;

    try {
      while (iterations < maxIterations) {
        iterations++;

        addStep({
          type: 'thinking',
          content: `Iteration ${iterations}: Calling OpenAI API...`,
        });

        const response = await openai.chat.completions.create({
          model: 'gpt-5-mini',
          messages: conversationMessages,
          tools,
        });

        const assistant = response.choices[0]?.message;
        const toolCalls = assistant?.tool_calls ?? [];
        const functionToolCalls = toolCalls.filter(
          (tc): tc is OpenAI.Chat.Completions.ChatCompletionMessageFunctionToolCall => tc.type === 'function',
        );

        // Check if done
        if (functionToolCalls.length === 0 && assistant?.content) {
          addStep({
            type: 'response',
            content: assistant.content || 'Task completed!',
          });
          break;
        }

        // Handle tool calls
        if (functionToolCalls.length > 0) {
          // Add assistant message with tool calls
          conversationMessages.push({
            role: 'assistant',
            content: assistant?.content || null,
            tool_calls: functionToolCalls,
          });

          // Execute each tool
          for (const toolCall of functionToolCalls) {
            const toolName = toolCall.function.name;
            const toolArgs = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) : {};

            addStep({
              type: 'tool_call',
              content: `Calling ${toolName}`,
              toolName,
              toolArgs,
            });

            const result = await executeTool(toolName, toolArgs);

            addStep({
              type: 'tool_result',
              content: `Received result from ${toolName}`,
              toolName,
              toolResult: result,
            });

            // Store results
            if (toolName === 'get_reddit_joke' && 'setup' in result) {
              joke = `${result.setup}\n\n${result.punchline}`;
            }
            if (toolName === 'generate_meme_image' && 'imageUrl' in result) {
              imageUrl = result.imageUrl;
            }

            // Add tool result to conversation
            conversationMessages.push({
              role: 'tool',
              content: JSON.stringify(result),
              tool_call_id: toolCall.id,
            });
          }
        } else {
          // No tool calls, add response
          conversationMessages.push({
            role: 'assistant',
            content: assistant?.content || '',
          });
        }
      }

      if (joke && imageUrl) {
        setFinalResult({ joke, imageUrl });
        addStep({
          type: 'response',
          content: 'Successfully created programming meme!',
        });
      }
    } catch (error) {
      addStep({
        type: 'response',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section section-4">
      <div className="section-header">
        <h2>Section 4: AI Agent - Multi-Step Workflow</h2>
        <p className="section-description">
          An AI agent can execute complex tasks by orchestrating multiple tool calls. This
          demonstrates an agentic loop: fetch joke → analyze → generate image prompt → create meme.
        </p>
      </div>

      <div className="section-content">
        <div className="agent-control-panel">
          <h3>🤖 Agent Task</h3>
          <div className="task-description">
            <p>
              <strong>Task:</strong> Create a programming meme
            </p>
            <p>
              <strong>Steps:</strong>
            </p>
            <ol>
              <li>Fetch a programming joke from Reddit</li>
              <li>Analyze the joke for visual elements</li>
              <li>Generate a creative DALL-E prompt</li>
              <li>Create the meme image</li>
            </ol>
          </div>

          <button onClick={runAgent} disabled={loading} className="btn-primary btn-large">
            {loading ? 'Agent Running...' : 'Start Agent'}
          </button>

          <div className="tools-list">
            <h4>Available Tools:</h4>
            {tools.map((tool, idx) => (
              <div key={idx} className="tool-item">
                <strong>{tool.function.name}</strong>
                <p>{tool.function.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="agent-output-panel">
          {steps.length > 0 && <AgentStepView steps={steps} />}

          {finalResult && (
            <div className="final-result">
              <h3>🎉 Final Result</h3>
              <div className="meme-result">
                <div className="joke-text">
                  <h4>The Joke:</h4>
                  <p>{finalResult.joke}</p>
                </div>
                <div className="meme-image">
                  <h4>Generated Meme:</h4>
                  <img src={finalResult.imageUrl} alt="Generated meme" />
                </div>
              </div>
            </div>
          )}

          {!loading && steps.length === 0 && (
            <div className="empty-state">
              <p>Click "Start Agent" to watch the AI agent work through the task step-by-step</p>
              <div className="info-box">
                <h4>What You'll See:</h4>
                <ul>
                  <li>Agent thinking and planning</li>
                  <li>Tool calls being made</li>
                  <li>Results from each tool</li>
                  <li>Final meme generation</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
