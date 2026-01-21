# 5. Agent Loop

# Concepts and Examples

## Why We Need Loops

### Multi-Step Tasks

When a task requires multiple operations:

1. Getting information
2. Processing results
3. Making decisions
4. Taking further actions

Example: "Book me a trip to NYC"

- Search flights
- Check hotel availability
- Compare prices
- Make bookings
- Send confirmations

### Dependent Actions

When next steps depend on previous results:

- Get weather → Recommend activities
- Check inventory → Place order
- Verify funds → Make payment

### Interactive Problem Solving

When the agent needs to:

- Ask clarifying questions
- Validate intermediate results
- Handle errors and retry
- Explore alternatives

## Basic Message Flow Example

```tsx
// 1. Initial User Request
{
  role: 'user',
  content: 'Find cheap flights to NYC and book me a hotel nearby'
}

// 2. Assistant decides to search flights first
{
  role: 'assistant',
  content: null,
  tool_calls: [{
    id: 'call_123',
    type: 'function',
    function: {
      name: 'search_flights',
      arguments: '{"to": "NYC", "dates": "2024-12-01"}'
    }
  }]
}

// 3. Function returns results
{
  role: 'tool',
  content: '{"flights": [...], "cheapest": "$299"}',
  tool_call_id: 'call_123'
}

// 4. Assistant processes results and calls next function
{
  role: 'assistant',
  content: null,
  tool_calls: [{
    id: 'call_456',
    type: 'function',
    function: {
      name: 'search_hotels',
      arguments: '{"location": "JFK airport", "dates": "2024-12-01"}'
    }
  }]
}

// 5. Function returns hotel results
{
  role: 'tool',
  content: '{"hotels": [...], "cheapest": "$199"}',
  tool_call_id: 'call_456'
}

// 6. Assistant gives final response
{
  role: 'assistant',
  content: 'I found a flight for $299 and a hotel near JFK for $199. Would you like me to proceed with booking?'
}

```

## Loop Structure

```tsx
while (!taskComplete) {
  // 1. Get LLM response
  const response = await llm.chat(messages)

  // 2. If LLM wants to call a function
  if (response.tool_calls) {
    const result = await executeFunction(response.tool_calls)
    messages.push(toolResponse(result))
    continue
  }

  // 3. If LLM gives final answer
  if (isTaskComplete(response)) {
    taskComplete = true
  }
}

```

## Real-World Use Cases

### 1. Customer Service

- Understanding issue
- Looking up customer info
- Checking order status
- Attempting resolution
- Escalating if needed

### 2. Personal Assistant

- Calendar management
- Email triage
- Task scheduling
- Follow-up reminders

### 3. Data Analysis

- Data collection
- Processing
- Analysis
- Report generation
- Insight delivery

## When Does The Loop Stop?

### Success Cases

- Task completed successfully
- Final answer provided
- User confirms completion

### Safety Limits

```tsx
shouldStop = (
  taskIsComplete ||     // LLM indicates task is done
  maxTurnsReached ||    // Prevent infinite loops
  errorOccurred ||      // Something went wrong
  userCancelled         // User stopped the process
)

```

## Common Challenges

### 1. Context Management

- Keeping track of previous steps
- Remembering important information
- Staying focused on the goal

### 2. Error Handling

- Function call failures
- Invalid results
- Need for retries
- Graceful degradation

### 3. User Experience

- Progress updates
- Intermediate feedback
- Ability to interrupt
- Clear communication

## Best Practices

### 1. Clear Goals

- Define success criteria
- Set explicit boundaries
- Know when to stop

### 2. Error Recovery

- Handle failures gracefully
- Provide clear error messages
- Have backup strategies

### 3. Resource Management

- Monitor token usage
- Track API calls
- Respect time limits