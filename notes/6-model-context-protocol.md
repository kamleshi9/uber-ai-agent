

### MCP Architecture

```pgsql
┌─────────┐
│  LLM    │
│(Claude) │
└────┬────┘
     │ 1. "I want to call tool X with args Y"
     ▼
┌──────────────┐
│  MCP Host    │   ← LLM runtime / agent loop
│ (Client)     │
└────┬─────────┘
     │ 2. JSON-RPC request
     ▼
┌────────────────┐
│  MCP Server    │   ← external system
└────┬───────────┘
     │ 3. Execute tool / fetch resource
     ▼
┌──────────────┐
│  MCP Host    │
└────┬─────────┘
     │ 4. Structured result
     ▼
┌─────────┐
│  LLM    │
└─────────┘

```