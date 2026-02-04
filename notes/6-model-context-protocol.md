### MCP: The USB for AI Agents

MCP (Model Context Protocol) is fundamentally just a protocol - a standardized way for AI systems to communicate with external tools and data sources. Like USB provides a universal interface for hardware devices, MCP provides a universal interface for AI agents to connect to various services and tools.

**Key Insight**: MCP is protocol-first, not implementation-specific. Just as USB works across different operating systems and devices, MCP enables AI agents to interact with any system that implements the protocol - regardless of the underlying technology stack.

**Benefits of the protocol approach**:
- **Interoperability**: Any MCP-compatible agent can use any MCP server
- **Decoupling**: Tool providers don't need to know about specific AI models
- **Standardization**: One interface to learn, instead of custom integrations per tool
- **Ecosystem growth**: Third parties can build MCP servers without coordinating with AI vendors


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

### MCP Core Concepts

#### 1. **Components**

**MCP Host (Client)**
- The AI application or agent runtime that wants to access external capabilities
- Examples: Claude Desktop, IDEs, custom AI applications
- Initiates connections to MCP servers
- Manages the lifecycle of server connections

**MCP Server**
- Exposes tools, resources, and prompts to MCP clients
- Can be written in any language that supports JSON-RPC
- Runs as a separate process (local or remote)
- Examples: Database connectors, file system access, API integrations

#### 2. **Three Primitives**

**Tools** (Functions the LLM can invoke)
- Allow agents to perform actions
- Defined with JSON Schema for input validation
- Examples: `search_files`, `execute_query`, `send_email`
- The LLM decides when and how to use them

**Resources** (Data the LLM can read)
- Provide context and information to the agent
- Can be static or dynamic
- URI-addressable: `file:///path/to/doc`, `db://table/row`
- Examples: Documents, database records, API responses

**Prompts** (Templates and workflows)
- Reusable prompt templates with variables
- Enable consistent interaction patterns
- Can chain multiple tools and resources
- Examples: Code review workflow, data analysis template

#### 3. **Communication Protocol**

- **Transport**: JSON-RPC 2.0 over stdio, HTTP, or WebSocket
- **Bidirectional**: Both client and server can initiate requests
- **Stateful**: Maintains connection for multiple interactions
- **Type-safe**: JSON Schema validation for all messages

#### 4. **Key Features**

**Discovery**
- Servers advertise available tools, resources, and prompts
- Clients can query capabilities at runtime
- Dynamic capability negotiation

**Security**
- Server isolation: Each server runs in its own process
- User authorization: Clients can prompt for user consent
- Sandboxing: Servers can restrict access to sensitive operations

**Extensibility**
- Custom transports (stdio, SSE, WebSocket)
- Plugin architecture for new capabilities
- No vendor lock-in

### MCP in Practice

**Example Flow: Database Query**
1. LLM: "I need to find all users created last week"
2. MCP Host: Calls `list_tools()` → discovers `execute_sql` tool
3. MCP Host: Sends JSON-RPC request to database server
4. MCP Server: Validates query, executes against database
5. MCP Server: Returns structured results
6. MCP Host: Provides results to LLM
7. LLM: Synthesizes natural language response

**Why This Matters**
- The LLM doesn't need database-specific knowledge baked in
- The database server can be reused across different AI agents
- Security policies are enforced at the server level
- The same pattern works for APIs, files, browsers, etc.

### A2A (Agent-to-Agent Protocol)

**A2A** is Google's Agent-to-Agent protocol that enables AI agents to discover, communicate, and collaborate with each other. Unlike MCP which focuses on agent-to-tool communication, A2A enables direct agent-to-agent interaction - allowing agents to delegate tasks, share context, and coordinate workflows across different AI systems.