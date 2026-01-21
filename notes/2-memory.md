# 2. Memory

# Memory in Chat Applications

## What is Chat Memory?

- Collection of previous messages in the conversation
- Enables context retention across interactions
- Allows for coherent back-and-forth dialogue
- Critical for multi-step tasks and references

## Message Types in Memory

```tsx
// System message - Sets behavior
{
  role: 'system',
  content: 'You are a helpful assistant...'
}

// User messages - Human inputs
{
  role: 'user',
  content: 'What's the weather like?'
}

// Assistant messages - LLM responses
{
  role: 'assistant',
  content: 'Let me check the weather for you',
  tool_calls: [...]
}

// Tool messages - Function results
{
  role: 'tool',
  content: '{"temp": 72, "conditions": "sunny"}',
  tool_call_id: 'call_123'
}

```

## Why Memory Matters

### Context Awareness

- Understand references to previous messages
- Remember user preferences
- Track progress on tasks
- Maintain conversation coherence

### Examples of Context

```
User: "What's the weather like?"
Assistant: "It's 72° and sunny"
User: "What about tomorrow?"
// Needs memory to know we're talking about weather

```

### Task Continuity

- Remember steps completed
- Track information gathered
- Maintain state between function calls
- Handle multi-turn interactions

## Memory Limitations

### Token Limits

- LLMs have fixed context windows
- Older messages may need removal
- Important context can be lost
- Balancing detail vs. length

### Important Considerations

- Most recent messages often most relevant
- System message always needed
- Tool responses provide key information
- Some conversations need more history than others

## Message Management Strategies

### What to Keep

- System instructions
- Recent messages
- Critical information
- Current task context

### What to Remove

- Old, resolved queries
- Redundant information
- Irrelevant chat
- Completed task steps

### Priority Order

1. System message (always)
2. Current task messages
3. Recent context
4. Reference information