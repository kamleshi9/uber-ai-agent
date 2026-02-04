# Evals
Evals (evaluations) are structured tests used to measure how well an AI model or agent behaves.

You can think of evals as the testing framework for AI systems:

* Unit tests → Validate small, isolated behaviors

Example: Did the model choose the correct tool for a given prompt?

* Integration tests → Validate end-to-end behavior

Example: Did the agent complete the task correctly across multiple steps and tool calls?

## Why We Need Evals

Evals (evaluations) are critical for AI agent development because:

1. **Agents are non-deterministic** - The same input can produce different outputs, making traditional testing insufficient
2. **Quality regression** - Model updates, prompt changes, or tool modifications can silently degrade performance
3. **Confidence in deployment** - You need quantifiable metrics before shipping changes
4. **Debugging** - When something goes wrong, you need to understand *why* the agent made certain decisions

Without evals, you're flying blind. You might think your agent is working great based on a few manual tests, but in production it could be failing in ways you never anticipated.

## Offline vs Online Evals

### Offline Evals
- Run against a **fixed dataset** before deployment
- Test specific scenarios you've curated
- Fast feedback loop during development
- Great for **regression testing** - ensure changes don't break existing behavior
- **This is what we're building today**

### Online Evals
- Run in **production** against real user traffic
- Catch issues that your test cases didn't anticipate
- Use sampling to evaluate a percentage of requests
- Often use LLM-as-judge for quality scoring
- More expensive but catches real-world edge cases

## Where You Get Data for Evals

1. **Synthetic data** - Write examples yourself based on expected use cases (what we're doing)
2. **Production logs** - Sample real user interactions (best for online evals)
3. **Edge case mining** - Find failure cases in production and add to test suite
4. **Red teaming** - Intentionally try to break the agent and capture those cases
5. **LLM-generated** - Use another LLM to generate test cases (be careful of bias)

The best eval datasets combine all of these. Start with synthetic, then continuously add production failures.

## Hill Climbing with Evals

Evals enable **hill climbing** - iteratively improving your agent:

1. Run evals, get baseline scores
2. Make a change (prompt, model, tools, etc.)
3. Run evals again
4. If scores improved, keep the change. If not, revert.
5. Repeat

This is how you systematically improve agents without relying on vibes. Every change is justified by data.

## Key Concepts

### Single-Turn Evals
Single-turn evals test **one interaction** - a user message and the agent's immediate response. They're perfect for testing:
- **Tool selection** - Did the agent pick the right tool(s)?
- **Parameter extraction** - Did it extract the correct arguments?
- **Refusal behavior** - Did it correctly NOT use tools when inappropriate?

Single-turn evals are fast, cheap, and give you high signal on whether your agent understands when to use which tools.

### Eval Categories

We use three categories to organize test cases:

1. **Golden** - Must select exactly the expected tools. No ambiguity.
2. **Secondary** - Likely selects certain tools, but there's flexibility. Scored on precision/recall.
3. **Negative** - Must NOT select forbidden tools. Tests that the agent doesn't over-reach.

### Scorers (Evaluators)

Scorers are functions that take the agent's output and the expected target, returning a score (usually 0-1):

- `toolsSelected` - Binary: did it select ALL expected tools?
- `toolsAvoided` - Binary: did it avoid ALL forbidden tools?
- `toolSelectionScore` - F1 score (precision/recall balance) for partial credit

## 3. Core Mental Model of an Eval

Every eval—simple or complex—fits into the same mental pipeline:

```
Input → Model / Agent Output → Expected Behavior → Evaluator → Score
```

# Multi-turn Evals

## Overview

Single-turn evals test tool selection - did the model pick the right tool? Multi-turn evals test the full agent loop - did the agent accomplish the task across multiple steps? This is where we evaluate agent behavior end-to-end.

## Why Multi-Turn Evals Matter

Single-turn evals answer: "Given this prompt, does the model call the right tool?"

But agents don't work in single turns. They:
1. Receive a task
2. Call a tool
3. Process the result
4. Decide what to do next
5. Call another tool (or respond)
6. Repeat until done

Multi-turn evals answer: "Given this task, does the agent complete it correctly?"

This catches failures that single-turn evals miss:
- Agent picks right first tool but wrong second tool
- Agent gets stuck in loops
- Agent misinterprets tool results
- Agent gives up too early
- Agent doesn't know when to stop

## The Challenge: Non-Deterministic Output

Single-turn evals can be fairly deterministic - did the model call `readFile` or not?

Multi-turn evals are messy:
- The agent might take different valid paths to the same goal
- Tool call order might vary but still be correct
- Final response wording varies every run
- Intermediate reasoning differs

How do you evaluate something when the "right answer" isn't a fixed string?

## LLM-as-Judge

The solution: use another LLM to evaluate the output.

Instead of checking `output === expected`, we ask a judge model:
- "Given this task and these tool results, is this response correct?"
- "Does this answer make sense?"
- "Did the agent accomplish the goal?"

### Why LLM-as-Judge Works

**Semantic understanding**: The judge understands meaning, not just string matching. "The file contains 'hello world'" and "File content: hello world" are both correct.

**Flexible criteria**: You can define evaluation criteria in natural language: "Score higher if the agent explains its reasoning."

**Handles variation**: Different valid approaches get recognized as valid.

### Why LLM-as-Judge Has Limitations

**Cost**: Every eval requires an LLM call. Running 1000 evals means 1000 judge calls.

**Latency**: Slower than deterministic checks.

**Inconsistency**: The judge itself is non-deterministic. Same output might get 8/10 one run and 7/10 the next.

**Bias**: Judge models have their own biases. They might prefer verbose responses or certain phrasings.

**Gaming**: If you know the judge criteria, you (or the agent) can optimize for the judge rather than actual quality.

### Making LLM-as-Judge More Reliable

**Use structured output**: Don't ask for free-form evaluation. Use a schema:
```typescript
const judgeSchema = z.object({
  score: z.number().min(1).max(10),
  reason: z.string(),
});
```

**Use a stronger model**: The judge should be at least as capable as the agent being evaluated. We use a reasoning model with high effort.

**Clear criteria**: Define exactly what 1-10 means:
- 10: Fully addresses the task using tool results correctly
- 7-9: Mostly correct with minor issues
- 4-6: Partially addresses the task
- 1-3: Mostly incorrect or irrelevant

**Multiple judges**: Run the same eval through multiple judge calls, average the scores.

## Multi-Turn Eval Data Strategy

The hardest part of multi-turn evals is designing the test data.

### What You Need Per Test Case

1. **Input**: The user's task or pre-filled conversation
2. **Available tools**: Which tools the agent can use
3. **Mock tool results**: What each tool returns when called
4. **Expected behavior**: What should happen
5. **Evaluation criteria**: How to judge success

### Input Strategies

**Fresh task**: Just a user prompt. Agent starts from scratch.
```json
{
  "prompt": "Read the config file and tell me the database host"
}
```

**Mid-conversation**: Pre-filled message history. Test continuation.
```json
{
  "messages": [
    { "role": "user", "content": "I need to update the config" },
    { "role": "assistant", "content": "I'll help. What changes?" },
    { "role": "user", "content": "Change the port to 8080" }
  ]
}
```

### Mock Tool Results

For deterministic testing, tools return fixed values:
```json
{
  "mockTools": {
    "readFile": {
      "description": "Read file contents",
      "result": "DB_HOST=localhost\nDB_PORT=5432"
    },
    "writeFile": {
      "description": "Write to file",
      "result": "Successfully wrote 45 characters"
    }
  }
}
```

The agent sees real tool schemas but gets canned responses. This:
- Makes tests reproducible
- Avoids file system side effects
- Lets you test edge cases (what if file not found?)
- Speeds up evaluation (no actual I/O)

### Expected Behavior

You can check multiple things:

**Tool order**: Did tools get called in the right sequence?
```json
{
  "expectedToolOrder": ["readFile", "writeFile"]
}
```

**Forbidden tools**: Were certain tools avoided?
```json
{
  "forbiddenTools": ["deleteFile", "runCommand"]
}
```

**Output quality**: Does the response make sense? (LLM judge)
```json
{
  "originalTask": "Read config and report the database host",
  "mockToolResults": { "readFile": "DB_HOST=localhost" }
}
```

## Combining Evaluators

Multi-turn evals typically use multiple evaluators:

1. **toolOrderCorrect**: Did tools execute in expected sequence?
2. **toolsAvoided**: Were forbidden tools not called?
3. **llmJudge**: Does the final response make sense?

Each returns a score 0-1. You can weight them differently or require all to pass.