# 1. Hello Chat

## One-Off vs Chat-Based LLM Interactions

## 1. One-Off LLM Calls

### Characteristics

- Single request-response pattern
- No context maintenance
- Simpler implementation
- Lower token usage
- Better for standalone tasks

### Best Use Cases

- Text completion
- Single question answering
- Format conversion
- Simple analysis tasks
- Code generation
- Translation

## 2. Chat-Based Interactions

### Characteristics

- Maintains conversation history
- Understands context from previous messages
- Supports different message roles (system, user, assistant)
- Higher token usage
- More complex state management

## 3. Key Differences

### Context Management

- **One-Off**
    - No context between calls
    - Each request starts fresh
    - Lower complexity
- **Chat-Based**
    - Maintains conversation history
    - Builds context over time
    - Requires memory management

### Token Usage

- **One-Off**
    - Fixed token usage per request
    - Predictable costs
    - No context overhead
- **Chat-Based**
    - Increasing token usage over conversation
    - Requires context window management
    - Higher costs for long conversations

### Implementation Complexity

- **One-Off**
    - Simple request-response
    - No state management
    - Minimal error handling
- **Chat-Based**
    - Complex state management
    - Context window handling
    - Memory management
    - Error recovery

### User Experience

- **One-Off**
    - Task-focused
    - Independent interactions
    - Better for automation
- **Chat-Based**
    - Conversational
    - Context-aware responses
    - More natural interaction
    - Better for exploration

## 4. Common Patterns

### One-Off Pattern

```tsx
// Simple completion
const generateDescription = async (topic: string) => {
  return await openai.responses.create({
    model: 'gpt-5-mini',
    input: `Write a description about ${topic}`,
  })
};
```

### Chat Pattern

```tsx
// Maintaining state with context
const chatHandler = async (
  message: string,
  context: ChatMessage[]
): Promise<ChatMessage[]> => {
  const response = await llm.chat({
    model: 'gpt-5-mini',
    input: [...context, {
      role: 'user',
      content: message
    }]
  });

  return [...context,
    { role: 'user', content: message },
    { role: 'assistant', content: response }
  ];
};

```

## 5. Best Practices

### One-Off LLM

1. Clear, specific prompts
2. Include all necessary context in prompt
3. Set appropriate temperature for task
4. Implement retry logic for failures

### Chat LLM

1. Start with good system prompt
2. Implement context window management
3. Handle conversation pruning
4. Store important information separately
5. Implement conversation recovery