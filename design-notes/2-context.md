# 2. Context

## In one line
Context is the entire bundle of text the model sees in one request — the system prompt, the conversation memory, any attached files, and your latest message — all stitched together.

## The analogy
The conversation transcript (memory, chapter 1) is one stack of paper on the intern's desk. But it isn't the only thing on the desk.

There's also:

- A **standing-orders sheet** at the top — instructions the intern must follow no matter what ("you are a helpful design assistant," "always be concise"). This is the **system prompt**.
- **Documents you handed them** — the screenshot you pasted, the brief you uploaded, the spec you copied in.
- **Your latest question** — the new sticky note you just put down.

All of it sits on the desk together. The intern reads everything before answering. **That whole desk is "context."**

The desk has a maximum size — the **context window**. If you keep piling things on, the oldest stack starts falling off the back, and the intern can no longer see it.

## What it really is

Every time the system makes a request to the model, it builds one big text bundle that contains:

- **System prompt** — standing instructions about role and behavior
- **Memory** — the full conversation transcript so far (chapter 1)
- **Attached content** — files, images, documents you've added
- **Your current message** — the new thing you just typed

This bundle is the **context**. It's everything the model can possibly see for this one request. Anything not in the bundle effectively doesn't exist as far as this turn is concerned.

The **context window** is the hard maximum size of that bundle, measured in tokens (roughly word-fragments). Different models have different limits. When the bundle would exceed the limit, the system has to drop or summarize older parts to make room.

## Why it matters to you

- **More context isn't always better.** A desk overflowing with unrelated material makes it harder for the model to focus on what's actually being asked.
- **Pasting a long document costs you context space.** Every paragraph competes with everything else on the desk.
- **When sessions get long, things start dropping.** Old conversation turns and old attached files fall off the back of the desk first, usually silently.
- **"The model went off-track halfway through" often means the desk got too full.** Starting a fresh session can fix it more cleanly than continuing to pile on.

## Easy to confuse with

- **Memory.** Memory is the *conversation transcript* part of context. Context is the *whole desk*: system prompt + memory + files + current message. See chapter 1.
- **Training.** Training is what the model permanently absorbed before it ever met you. Context is what's on the desk *right now* in this single request.

## Live demo
**Section 2: Conversation** in the app — same demo as memory, but focus on the system prompt at the top and the context size meter. That total size is the full bundle being sent each turn — the whole desk.
