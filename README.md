# AI Agent Learning Lab

An interactive educational application that demonstrates how to build AI agents using OpenAI's API. This app progressively teaches four key concepts through hands-on examples.

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
src/
├── components/
│   ├── Section1_Intro/        # Basic API introduction
│   ├── Section2_Conversation/ # Conversation with memory
│   ├── Section3_Tools/        # Function calling demo
│   ├── Section4_Agent/        # Complete agent workflow
│   └── shared/                # Reusable components
├── lib/
│   ├── openai.ts             # OpenAI client setup
│   ├── db.ts                 # LowDB configuration
│   └── tools/                # Tool implementations
│       ├── reddit.ts
│       ├── weather.ts
│       └── dalle.ts
├── types/
│   └── index.ts              # TypeScript definitions
├── App.tsx                   # Main application
└── App.css                   # Styles
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
- OpenAI GPT-4 for chat completions
- OpenAI DALL-E 3 for image generation
- Reddit's public JSON API (no auth required)
- OpenWeatherMap API (demo mode available)

## Notes

- The app uses `dangerouslyAllowBrowser: true` for OpenAI API calls - this is for learning purposes only
- In production, API calls should go through a backend server
- Conversations are stored locally in `db.json`
- The app demonstrates concepts; production apps need additional security measures

## License

MIT

## Contributing

This is an educational project. Feel free to fork and extend it for your own learning!

