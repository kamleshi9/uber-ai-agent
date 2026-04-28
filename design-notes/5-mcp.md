# 5. MCP (Model Context Protocol)

## In one line
MCP is a standard way to plug tools into an AI assistant — like a USB port for AI.

## The analogy
Before USB, every device had its own special cable: serial ports, PS/2 connectors, parallel ports, FireWire. If you bought a new printer, you needed the right port and the right driver and a lot of luck. After USB, any keyboard, any mouse, any disk worked with any computer. You stopped thinking about the connection.

**MCP is USB for AI tools.** Before MCP, every tool integration was custom — Figma needed a special integration with Claude, a different one with ChatGPT, a different one with Cursor. With MCP, anyone can build a "Figma MCP server" and *every* MCP-compatible AI assistant can use it. No custom work per AI.

## What it really is

MCP (Model Context Protocol) is an open standard for how AI assistants talk to external tools and data. It defines the "shape" of the conversation — how the assistant asks "what can you do?", how it calls a tool, how the result comes back.

The pieces:

- **An MCP server** is a small program that exposes some capability — read your Notion, query your database, control Figma. It says "here are the tools I offer."
- **An MCP client** is the AI assistant (Claude Code, etc.). It connects to one or more MCP servers and discovers what they offer.
- **The protocol** is the agreed-upon way they speak to each other, so any client can talk to any server.

Once an MCP server is connected, the tools it offers become available to the model just like any other tool (chapter 3). The difference is purely *how they were plugged in* — through a standard, instead of custom-built.

## Why it matters to you

- **You can extend what your AI assistant can do** by connecting MCP servers — Figma, Notion, Linear, your design system, your file storage. No engineering work needed for each integration.
- **The same MCP server works across AI tools.** A Figma MCP server connected to Claude Code can also connect to other MCP-compatible assistants. You're not locked in.
- **It's *not* a separate AI feature you have to learn.** From your seat, MCP just shows up as "more tools the AI can use." The protocol is the plumbing.

## Easy to confuse with

- **A tool.** A tool is one specific capability ("read Figma file"). MCP is the standard way many tools get exposed. One MCP server can offer multiple tools.
- **An API.** An API is a generic way for software to talk to other software. MCP is a *specific* protocol designed for AI assistants — narrower and more opinionated.
