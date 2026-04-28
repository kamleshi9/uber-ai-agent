# 3. Tools & function calling

## In one line
A "tool" is anything the model can ask the system to do for it — like read a file, search the web, or send an email. The model doesn't act directly; it requests an action and waits for the result.

## The analogy
Our intern is great at thinking and writing, but they're stuck at the desk. They can't physically open a filing cabinet, make a phone call, or look up today's weather. So they pick up a desk phone and ask a colleague: *"Please go look up the current weather in Mumbai and tell me what it is."*

The colleague does the actual work. They come back and put a slip of paper on the desk that says *"Mumbai, 32°C, humid."* The intern reads it and continues writing the answer.

That's a **tool call** — the model describes the action it wants taken, the system performs it, and the result comes back as new text on the desk.

## What it really is

By itself, an LLM only generates text. It can't read files, run commands, browse the web, or change anything in the real world. To do any of that, it needs **tools** — pre-defined actions the system has made available to it.

A tool typically has:

- **A name** — e.g. `get_weather`, `read_file`, `send_email`
- **A description** so the model knows when to use it
- **Inputs it expects** — a city name, a file path, an email address

When the model decides a tool is needed, it doesn't run the tool itself — it produces a structured request like *"call get_weather with city=Mumbai."* The system executes that request, gets the answer, and feeds the answer back to the model. The model then continues its response using the new information.

"Function calling" is just the technical name for this pattern. Same thing.

## Why it matters to you

- **The model isn't actually editing your file or browsing the web** — a tool is. Knowing this helps explain why some actions need permission and others don't.
- **The available tools shape what the model can do.** A model with no tools is a chatbot. A model with file-editing tools can edit your codebase. A model with browser tools can look things up live.
- **Tools can fail.** The phone call to the colleague might come back with an error ("city not found"). The model usually tries to recover, but if it can't, you'll see the failure surface.

## Easy to confuse with

- **The model "knowing" something.** When the model gives you a current weather reading, it didn't *know* it — a tool fetched it. Tools are how the model gets out of the desk.
- **MCP.** Tools are the *individual capabilities* (one tool = one action). MCP is the *standard plug* for connecting tools. See chapter 5.

## Live demo
**Section 3: Tools** in the app — ask for Reddit posts or current weather. The model decides when to call the tool, the system fetches the data, and the result lands back in the conversation for the model to use in its reply.
