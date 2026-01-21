# 4. Function Calling

# Function Calling Basics

## What is Function Calling?

Function calling allows LLMs to:

- Convert natural language into structured function calls
- Select appropriate functions based on user intent
- Format parameters according to function specifications

## Basic Flow

### 1. Define Available Functions

```tsx
const functions = [
  {
    name: 'get_weather',
    description: 'Get current weather for a city',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City name'
        }
      },
      required: ['location']
    }
  },
  {
    name: 'get_stock_price',
    description: 'Get current stock price',
    parameters: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'Stock ticker symbol'
        }
      },
      required: ['symbol']
    }
  }
];

```

### 2. Message Flow

```tsx
// 1. User Message
{
  role: 'user',
  content: 'What's the weather like in London?'
}

// 2. LLM Response with Function Call
{
  role: 'assistant',
  content: null,
  tool_calls: [{
    id: 'call_abc123',
    type: 'function',
    function: {
      name: 'get_weather',
      arguments: '{"location":"London"}'
    }
  }]
}

// 3. Function Execution Result
{
  role: 'tool',
  content: '{"temperature": 18, "condition": "cloudy"}',
  tool_call_id: 'call_abc123'
}

// 4. Final LLM Response
{
  role: 'assistant',
  content: 'The weather in London is currently cloudy with a temperature of 18°C.'
}

```

## How LLMs Choose Functions

### Function Selection Process

1. **Intent Recognition**
- LLM analyzes user message for action intent
- Matches intent against function descriptions
- Evaluates parameter availability
2. **Function Matching**
- Clear matches: "What's the weather?" → get_weather
- Ambiguous matches: LLM chooses based on context
- No matches: Regular response without function call

### Examples of Clear vs Ambiguous Matches

```tsx
// Clear Match
User: "What's the stock price of Apple?"
LLM: Calls get_stock_price with {"symbol": "AAPL"}

// Ambiguous Match
User: "How's AAPL doing today?"
LLM: Could call get_stock_price or might give general info

// No Match
User: "Tell me about TypeScript"
LLM: Regular response, no function call

```

## Common Function Types

### 1. Data Retrieval

```tsx
{
  name: 'search_products',
  description: 'Search product database',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      category: { type: 'string', optional: true }
    }
  }
}

```

### 2. Actions

```tsx
{
  name: 'create_reminder',
  description: 'Set a reminder',
  parameters: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      time: { type: 'string', description: 'ISO format' }
    }
  }
}

```

### 3. Calculations

```tsx
{
  name: 'calculate_mortgage',
  description: 'Calculate monthly mortgage payment',
  parameters: {
    type: 'object',
    properties: {
      principal: { type: 'number' },
      rate: { type: 'number' },
      years: { type: 'number' }
    }
  }
}

```

## Best Practices

### Function Definition

1. Clear, specific names
2. Detailed descriptions
3. Precise parameter specifications
4. Example usage in description

### Parameter Design

```tsx
// Good
{
  name: 'send_email',
  description: 'Send email to specified address. Example: send_email("user@example.com", "Hello")',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'Email address of recipient'
      },
      subject: {
        type: 'string',
        description: 'Email subject line'
      }
    }
  }
}

// Bad - Unclear Description
{
  name: 'email',
  description: 'Emails',
  parameters: {
    type: 'object',
    properties: {
      to: { type: 'string' },
      subj: { type: 'string' }
    }
  }
}

```

## Common Use Cases

### 1. External API Calls

- Weather data
- Stock prices
- Exchange rates
- Flight information

### 2. Database Operations

- User lookups
- Product searches
- Order status checks

### 3. System Actions

- Setting reminders
- Creating calendar events
- Sending notifications