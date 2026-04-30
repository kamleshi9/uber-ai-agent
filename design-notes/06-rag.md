# 6. RAG (Retrieval-Augmented Generation)

## In one line
RAG is when the model first looks something up in your documents, then uses what it found to answer.

## The analogy
**Closed-book exam:** the student answers from memory only. They might know a lot, but they can't reference anything specific you didn't teach them.

**Open-book exam:** the student is allowed to look things up in a textbook before answering. They search for the relevant page, read it, and then write their answer using what they found.

Plain LLM use is a closed-book exam. **RAG turns it into an open-book exam.** Before answering, the system searches a library of *your* documents — your design system docs, your past project briefs, your meeting notes — pulls out the relevant snippets, and feeds them into the context. Now the model can answer from your actual material, not just its training.

## What it really is

Three steps:

1. **Retrieve** — search a collection of your documents and pull out the snippets that look most relevant to the question.
2. **Augment** — paste those snippets into the context, alongside the user's question.
3. **Generate** — the model answers, using the snippets it now has on the desk.

The "library" is usually a special kind of database that's good at searching by *meaning* rather than exact words. ("How do we handle errors?" can find a doc titled "Failure states", even though no words overlap.)

## Why it matters to you

- **RAG is how you get an AI to answer questions about *your* stuff** — your design system, your old projects, your team's documentation. The model wasn't trained on any of that.
- **RAG is only as good as the library.** If your docs are messy or out of date, the answers will be too.
- **RAG quietly adds context.** The retrieved snippets show up on the desk along with your question. They take context space, and they shape the answer.

## Easy to confuse with

- **Memory.** Memory is the running conversation transcript — already in every request. RAG goes *outside* that transcript and fetches extra material from a document library when it's needed.
- **Training.** Training bakes information into the model permanently, for everyone. RAG keeps the information in a separate library that you control and can update anytime.
- **A search engine.** A search returns links. RAG uses search results as context for an answer — you get the answer, not the links.
