# Designer Session 1: How LLMs Work + Core Vocabulary

These notes are for designers who use Claude Code (or any AI assistant) to design and prototype, and want a clear mental model of what's happening under the hood.

You don't need to read code. You don't need to build anything. The goal is that the next time someone says "context window", "MCP", or "agent loop", you know exactly what they mean — and you can use the tool more deliberately.

## Read in this order

| # | File | What it covers |
|---|---|---|
| 0 | [How LLMs work](0-how-llms-work.md) | The intuition for what an LLM actually is |
| 1 | [Memory](1-memory.md) | Why the whole conversation gets re-sent every turn |
| 2 | [Context](2-context.md) | The full bundle the model sees in one request |
| 3 | [Tools & function calling](3-tools-and-function-calling.md) | How the model takes action in the world |
| 4 | [Agent & the agent loop](4-agent.md) | What an agent is, and the rhythm it uses to run |
| 5 | [MCP](5-mcp.md) | The standard plug for connecting tools |
| 6 | [RAG](6-rag.md) | How a model answers questions about your stuff |
| 7 | [Claude Code wrap-up](7-claude-code-wrap-up.md) | Where each concept shows up in Claude Code |

## How each chapter is laid out

Every concept file follows the same five sections, so you always know where to look:

1. **In one line** — the short version
2. **The analogy** — the concrete metaphor that makes it click
3. **What it really is** — plain-English explanation
4. **Why it matters to you** — what this changes for how you work
5. **Easy to confuse with** — the close-cousin term it's not

Some chapters also end with a **Live demo** callout pointing to a section of the demo app you can run during the session.

Skim the first two sections of any chapter to get the gist in under a minute. Read the rest when you want to go deeper.

## Live demo mapping

The runnable demo app in `/src` has four sections. Each chapter's "Live demo" callout points to the right one:

| App section | Chapters it demonstrates |
|---|---|
| **Section 1: Intro** | 0 — How LLMs work (model picker, temperature, basic API call, token usage) |
| **Section 2: Conversation** | 1 — Memory & 2 — Context (watch the conversation transcript get re-sent every turn, see the context size grow) |
| **Section 3: Tools** | 3 — Tools & function calling (Reddit + weather tool calls) |
| **Section 4: Agent** | 4 — Agent & the agent loop (multi-step joke → meme workflow with a step-by-step timeline) |

Chapters 5 (MCP) and 6 (RAG) are conceptual only — no demo.

## A note on the engineering version

There's a parallel set of notes in `/notes` aimed at engineers — same concepts, but with code and API details. You don't need to read it. If you ever get curious about *how* something works under the hood, that's where to look.
