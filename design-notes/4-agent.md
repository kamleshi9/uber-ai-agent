# 4. Agent & the agent loop

## In one line
An agent is an AI that pursues a goal across many steps — thinking, acting (with tools), observing the result, and deciding what to do next, until the goal is met. The "loop" is the rhythm it follows to keep going.

## The analogy
A chatbot is a Q&A robot at an information desk: you ask, it answers, done. An **agent** is a personal assistant. You say *"book me a flight to Tokyo next Friday under $800,"* and they actually go do it — open the booking site, search options, compare prices, check your calendar, hold a seat, ask you a clarifying question if needed, and confirm.

How do they get through all that? They follow a simple rhythm — the same rhythm a chef uses with a recipe:

1. **Read** the next step ("search flights for next Friday").
2. **Do** it (open the booking site, run the search).
3. **Look** at the result ("here are 12 options").
4. **Decide** what to do next based on what they see.
5. **Repeat** — until the trip is booked, the dish is done, the goal is met.

If something unexpected happens (the flight is sold out), they adapt — try different dates, ask you for input, or take a different approach. They react to what's actually happening, not a rigid script.

That rhythm — **think, act, observe, repeat** — is the **agent loop**. The agent is the whole assistant. The loop is the engine that keeps them moving toward the goal.

## What it really is

An agent is a system that combines:

1. **An LLM** — the thinker
2. **A set of tools** — the ways to act on the world (chapter 3)
3. **A goal** — what it's trying to accomplish
4. **A loop** — the mechanism that lets it take many steps, not just one

The loop looks like this:

```
   ┌──────────────┐
   │  THINK       │  ← Look at the goal and the current state
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  ACT         │  ← Use a tool (edit file, run command, search)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  OBSERVE     │  ← Read the result the tool returned
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Done?       │── No ──→ loop back to THINK
   └──────┬───────┘
          │ Yes
          ▼
        Stop
```

There's no special "agent model." Any LLM with the right tools and the right loop becomes an agent. Claude Code is an agent. So is a customer-support bot that can look up your order and issue a refund. So is a coding assistant that can read your repo, edit files, and run tests.

The loop ends when the model decides the goal is met, when it gets stuck and asks you a question, or when it hits a safety limit (too many steps, too much time, too much money spent).

## Why it matters to you

- **Working with an agent feels different from chatting.** You give it a goal, it goes off and works, you check in on the result. The interaction shifts from "answer my question" to "do this for me."
- **This is what's happening when you see "Claude is working…" for a while.** It's looping — read, edit, run, observe, fix, repeat.
- **Agents can do a lot of work in one go** — but also a lot of damage if pointed wrong. The same loop that lets it edit one file lets it edit a hundred. Reviewing what it actually did matters more, not less.
- **Loops can go wrong.** An agent can get stuck repeating the same action, or wander far from the original goal. Clear goals shorten loops; vague goals lengthen them.
- **You can usually interrupt.** If a loop is heading the wrong way, stop it early and re-state the goal more clearly, rather than waiting for it to finish.
- **An agent's quality depends on its tools.** A great LLM with weak tools is a great talker that can't act. A great LLM with the right tools is a productive collaborator.

## Easy to confuse with

- **A chatbot.** A chatbot answers; an agent acts. The boundary is fuzzy in practice — many systems sit somewhere on the spectrum.
- **A regular for-loop in code.** The agent loop isn't a fixed-count loop. The agent itself decides each turn whether to keep going. There's no "do this exactly 5 times."

## Live demo
**Section 4: Agent** in the app — give it a goal (fetch a joke, then turn it into a meme image) and watch the step-by-step timeline. Each row is one trip around the loop: think → call tool → observe result → decide next step. The whole thing runs without you intervening between steps.
