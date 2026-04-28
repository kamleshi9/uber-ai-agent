# 1. Memory

## In one line
Memory is the running transcript of your conversation, re-sent to the model on every single turn — because the model itself remembers nothing.

## The analogy
Imagine the intern has total amnesia. Every time you come back with a follow-up question, they don't recognize you, don't remember what you were just talking about, don't even know there was a "just." Nothing carries over.

To make a conversation possible, an invisible assistant stands behind you with a clipboard. Every time you ask the intern something new, the assistant first hands them the entire transcript of everything you've said and everything they've said so far. The intern reads the whole transcript, then answers your new question.

**That transcript is "memory."** It's not living inside the intern — it's being re-handed to them, fresh, every single time.

## What it really is

LLMs are **stateless**. Each request to the model is completely independent. The model has no built-in concept of "this user," "this conversation," or "we just discussed X."

To create the *experience* of a conversation, the system around the model:

1. **Stores** every message — yours and the model's — in a list.
2. **Re-sends** the full list with every new turn, with your latest message tacked on the end.
3. The model reads the whole list as one big block of text, and predicts the next reply.

So when you say "what about the second one?" in your fifth message, the model can answer because turn 5's request includes turns 1, 2, 3, 4, and your new message all in order. Without that re-sending, your follow-up would be meaningless.

## Why it matters to you

- **Each new chat starts from zero.** Open a new conversation and the transcript is empty — the model has no idea who you are or what you've been working on.
- **Long conversations get heavier with every turn.** Turn 50 sends all 49 prior turns plus your new message. This is why long chats feel slower and cost more.
- **"The AI forgot something" usually has a simple explanation.** Either the conversation got long enough that old turns were trimmed off the front to make room, or you're in a different chat session entirely.
- **The AI has no privileged knowledge of you.** It only knows what's in the transcript right now. If you want it to remember something, say it — or write it down somewhere it gets re-loaded next session.

## Easy to confuse with

- **Context.** Memory (the conversation transcript) is *part of* context. Context is the bigger envelope that also includes the system prompt, any files you've attached, and your current message. See chapter 2.
- **Long-term notes (like a project README or `CLAUDE.md`).** Files set up to be auto-loaded each session are a different mechanism — they get poured into context at the start of every new session. They're not stored inside the model.

## Live demo
**Section 2: Conversation** in the app — start a chat, send a few messages, and watch the full conversation transcript get re-sent on every turn. The token counter shows how each new message piles on top of everything that came before.
