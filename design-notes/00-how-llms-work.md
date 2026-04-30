# 0. How LLMs work

## In one line
An LLM is a very well-read pattern-matcher that predicts what text comes next, one piece at a time.

## The analogy
Imagine an intern who has read most of the public internet — books, articles, code, conversations, recipes, screenplays. They have no memory of you, no awareness of today's date, and no way to look anything up. But because they've read so much, when you start a sentence they can finish it in a way that *sounds* exactly like the kind of text it should be.

That's an LLM. It doesn't "know" things the way a database does. It has *absorbed patterns* of how language tends to go, and uses those patterns to predict the next word, then the next, then the next.

## What it really is

**It predicts the next token.** Give it some text, and it produces a probability for what should come next. Then it picks one, adds it to the text, and predicts again. That's the whole loop. "Tokens" are roughly words or word-fragments — "design", "ing", ".", " " each count as one.

**It's probabilistic, not deterministic.** Run the same prompt twice and you'll usually get two different answers. There's a setting called *temperature* that controls how random the choices are — low temperature plays it safe, high temperature gets more creative.

**It has a knowledge cutoff.** The model was trained on text up to a certain date. It doesn't know what happened after that. It also doesn't know anything *specific* to you — your project, your team, your files — unless you tell it.

**It can be confidently wrong.** Because it's pattern-matching, not retrieving facts, it sometimes generates statements that *sound right* but aren't. This is called a "hallucination." The model isn't lying — it genuinely has no internal sense of "I don't know."

## Why it matters to you

- **Garbage in, garbage out is even more true here.** A vague prompt produces a plausible-sounding but generic answer. A specific prompt with the right context produces something useful.
- **The model can be confidently wrong.** Sanity-check facts, dates, names, and specifics — especially anything the model couldn't have seen before its training cutoff.
- **You're not "talking to an AI" — you're feeding text to a predictor.** Everything you type, paste, or attach becomes part of the prediction. There's no separate "AI brain" reading between the lines.

## Easy to confuse with

- **A search engine.** Google looks things up; an LLM generates plausible text. An LLM has no live web access unless a tool gives it one.
- **A database.** A database stores and retrieves exact records. An LLM stores nothing — it generates fresh text every time, even when the answer happens to be correct.
- **A reasoning engine.** It can produce step-by-step text that *looks* like reasoning, and often this works well — but underneath, it's still next-token prediction.
