import type OpenAI from 'openai';

export interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp?: number;
  toolCalls?: ToolCall[];
  toolCallId?: string;
  name?: string;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface Database {
  conversations: {
    section2: Message[];
    section3: Message[];
    section4: Message[];
  };
  settings: {
    defaultModel: string;
  };
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required: string[];
    };
  };
}

export interface AgentStep {
  type: 'thinking' | 'tool_call' | 'tool_result' | 'response';
  content: string;
  timestamp: number;
  toolName?: string;
  toolArgs?: any;
  toolResult?: any;
}

export type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;
