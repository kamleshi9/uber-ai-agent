# 8. Claude Code wrap-up

You've now seen the core concepts in the abstract, and (if you've been running the demo app) seen most of them live. This page maps each one to where you'll actually meet it inside Claude Code, so the vocabulary stays attached to something concrete.

## The map

| Concept | Where you see it in Claude Code |
|---|---|
| **LLM** | Claude itself — the model behind every reply you get. |
| **Memory** | The full conversation transcript that Claude Code re-sends to the model on every turn. New session = empty transcript. |
| **Context** | The whole bundle Claude Code sends each request: the conversation transcript (memory) + Claude Code's system prompt + files you've opened or pasted + your current message + any `CLAUDE.md` notes that got auto-loaded at session start. The "context left" indicator shows how full the desk is. |
| **Tool / function calling** | Every time Claude Code reads a file, edits a file, runs a command, or fetches a URL — that's a tool call. You'll see permission prompts when a tool wants to do something sensitive. |
| **Agent** | Claude Code itself is an agent. You give it a goal ("rename this component everywhere") and it pursues that goal across many steps. |
| **Agent loop** | The "Claude is working…" phase. You can watch it: read a file → edit it → run a check → read the result → decide what to do next. That's the loop. |
| **MCP** | The MCP servers you connect — Figma, Notion, Linear, GitHub, etc. Once connected, their tools show up alongside Claude Code's built-in tools. |
| **RAG** | Claude Code's ability to search across your project (or external docs) before answering. When it greps your codebase before suggesting a fix, that's RAG in action. |

## What this means for how you use Claude Code

- **Watch your context.** If a session feels like the model is "drifting" or forgetting what you said, the desk may be over-full. Start a fresh session for a new task. (Long conversations also get slower — that's all that re-sent memory adding up.)
- **Set up `CLAUDE.md` for things you want auto-loaded.** Project-level (`./CLAUDE.md`) and user-level (`~/.claude/CLAUDE.md`) both exist. Each session starts with these poured into your context, so you don't have to re-explain who you are or what conventions to follow.
- **Permission prompts are tool calls.** When Claude asks "can I run X?", it's because a tool wants to act. Skim what it's about to do before approving.
- **Connect MCP servers for the things you actually use.** Figma access, your design-system docs, your file storage — each one expands what Claude Code can do.
- **Treat it like an agent, not a search box.** Give it a clear goal and let the loop run. Then review what it actually changed.

## Where to go next

- **The demo app in `/src`** — Section 1 (intro), Section 2 (conversation), Section 3 (tools), Section 4 (agent). Run any of these to poke at a concept hands-on.
- **The engineering notes in `/notes`** — same concepts, with code and API details. You don't need them — but if you ever get curious about *how* a tool is defined or what an MCP server actually looks like under the hood, that's where to peek.
