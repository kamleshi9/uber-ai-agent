# AI Agent Learning Lab

An interactive educational application and comprehensive session material for learning how to build AI agents using OpenAI's API. This repository includes both a hands-on web application and detailed theoretical notes that progressively teach AI agent concepts from basics to advanced implementations.

## Session Materials & Learning Notes

This repository includes comprehensive learning materials in the `/notes` directory covering theoretical concepts and best practices:

### Available Session Notes

1. **[0-open-ai-api.md](notes/0-open-ai-api.md)** – OpenAI API Setup and Configuration
   - Environment setup
   - API key management
   - Basic client initialization

2. **[1-hello-chat.md](notes/1-hello-chat.md)** - One-Off vs. Chat-Based LLM Interactions
   - Understanding different interaction patterns
   - Context management strategies
   - Token usage optimization
   - Best practices for both approaches

3. **[2-memory.md](notes/2-memory.md)** – Memory and Context Management
   - Conversation history handling
   - State persistence
   - Context window management

4. **[3-agent.md](notes/3-agent.md)** – What is an Agent?
   - Agent core concepts and definitions
   - Types of agents (Chat-based vs. Task-based)
   - Real-world applications and use cases
   - Best practices and design principles
   - Common challenges and solutions

5. **[4-function-call.md](notes/4-function-call.md)** – Function Calling & Tool Use
   - Tool definition and schemas
   - Function calling patterns
   - Tool orchestration

6. **[5-agent-loop.md](notes/5-agent-loop.md)** - Agentic Loops
   - Multi-step reasoning
   - Task completion workflows
   - Loop management and termination

7. **[6-model-context-protocol.md](notes/6-model-context-protocol.md)** - Model Context Protocol (MCP)
   - Standardized context management
   - Protocol implementation
   - Advanced integration patterns
8. **[7-retrieval-augmented-generation.md](notes/7-retrieval-augmented-generation.md)** - RAG (Retrieval Augmented Generation)
   - Information retrieval concepts
   - Augmented generation techniques
   - Implementation strategies

9. **[8-evals.md](notes/8-evals.md)** - Evaluations (Evals) for AI Agents
   - Understanding offline vs. online evaluations
   - Single-turn and multi-turn eval strategies
   - LLM-as-judge methodology
   - Eval data sources and test design
   - Hill climbing with evals for systematic improvement
   - Scoring mechanisms and evaluator functions

### Using the Session Materials

These notes are designed to be used alongside the interactive application:
- Start with note 0 to set up your environment
- Read each note before exploring the corresponding section in the app
- Notes provide theoretical foundation while the app provides practical implementation
- Perfect for self-paced learning or structured workshop sessions

## Features

### Section 1: Introduction to LLM APIs
Learn the basics of making API calls to OpenAI with:
- System prompt configuration
- Model selection (GPT-4, GPT-4 Turbo, GPT-3.5 Turbo)
- Temperature and token controls
- Request/response visualization
- Token usage tracking

### Section 2: Conversational AI with Memory
Understand how LLMs maintain context:
- Full conversation history management
- LowDB-based persistence
- Context size visualization
- Message history display
- Conversation clearing

### Section 3: Function Calling & Tools
Explore how LLMs can use external tools:
- Reddit API integration (fetch posts from subreddits)
- Weather API integration (get current weather)
- Tool definition schemas
- Tool call visualization
- Multi-tool orchestration

### Section 4: AI Agent - Multi-Step Workflow
Experience agentic workflows:
- Complex task execution (fetch joke → generate meme)
- Step-by-step agent reasoning
- Multiple tool coordination
- DALL-E 3 image generation
- Visual execution timeline

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **AI**: OpenAI API (GPT-4, DALL-E 3)
- **Database**: LowDB (JSON-based)
- **APIs**: Reddit API, OpenWeather API
- **Styling**: Custom CSS with CSS variables

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_OPENAI_API_KEY=your_VITE_OPENAI_API_KEY_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Project Structure

```
uber-ai-agent/
├── notes/                              # Learning materials & session notes
│   ├── 0-open-ai-api.md               # OpenAI API setup
│   ├── 1-hello-chat.md                # LLM interaction patterns
│   ├── 2-memory.md                    # Memory & context management
│   ├── 3-agent.md                     # Agent concepts & design
│   ├── 4-function-call.md             # Function calling & tools
│   ├── 5-agent-loop.md                # Agentic loops & workflows
│   ├── 6-model-context-protocol.md    # MCP integration
│   ├── 7-retrieval-augmented-generation.md  # RAG implementation
│   └── 8-evals.md                     # Agent evaluations & testing
│
├── src/
│   ├── components/
│   │   ├── Section1_Intro/            # Basic API introduction
│   │   ├── Section2_Conversation/     # Conversation with memory
│   │   ├── Section3_Tools/            # Function calling demo
│   │   ├── Section4_Agent/            # Complete agent workflow
│   │   └── shared/                    # Reusable components
│   │       ├── AgentStepView.tsx      # Agent step visualization
│   │       ├── JsonViewer.tsx         # JSON response viewer
│   │       ├── MessageBubble.tsx      # Chat message component
│   │       └── Navigation.tsx         # Section navigation
│   ├── lib/
│   │   ├── openai.ts                  # OpenAI client setup
│   │   ├── localStore.ts              # LocalStorage database
│   │   └── tools/                     # Tool implementations
│   │       ├── reddit.ts              # Reddit API integration
│   │       ├── weather.ts             # Weather API integration
│   │       └── dalle.ts               # DALL-E image generation
│   ├── types/
│   │   └── index.ts                   # TypeScript definitions
│   ├── App.tsx                        # Main application
│   ├── App.css                        # Styles
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles
│
├── .env                                # Environment variables
└── package.json                        # Project dependencies
```

## Learning Path

1. **Start with Section 1** to understand basic API calls and parameters
2. **Move to Section 2** to learn about conversation context and state management
3. **Explore Section 3** to see how LLMs can interact with external APIs
4. **Complete Section 4** to experience a full agentic workflow

## Key Concepts Demonstrated

- **Stateless Nature of LLMs**: Understanding why we send full conversation history
- **Function Calling**: How to define and execute tools
- **Agentic Loops**: Multi-step reasoning and tool orchestration
- **Token Management**: Monitoring and optimizing API usage
- **Error Handling**: Graceful fallbacks and error messages

## API Usage

This app uses:
- OpenAI GPT-5-mini for chat completions
- OpenAI DALL-E 3 for image generation
- Reddit's public JSON API (no auth required)
- OpenWeatherMap API (demo mode available)

## Important Notes

- The app uses `dangerouslyAllowBrowser: true` for OpenAI API calls - this is for learning purposes only
- In production, API calls should go through a backend server
- Conversations are stored locally in `db.json`
- The app demonstrates concepts; production apps need additional security measures
- This is session material intended for educational workshops and training

## License

MIT

## Contributing

This is an educational project. Feel free to fork and extend it for your own learning!

