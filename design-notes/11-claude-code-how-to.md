# 11. Using Claude Code

## Starting Claude Code

Navigate to your project folder, then type `claude`:

```
cd ~/Desktop/my-project
claude
```

The first time, it'll ask you to log in. After that, it opens directly.

> **At Uber**, always use `aifx agent run claude` — both on a devpod and on your local Mac.

---

## Essential commands

Inside Claude Code, commands start with `/`. Type them at the prompt at any time:

| Command | What it does |
|---|---|
| `/compact` | Summarizes the conversation so far and frees up context space. Use when the session is getting long and Claude starts feeling slow or forgetful. The conversation continues — nothing is lost. |
| `/clear` | Wipes the entire conversation and starts fresh. Unlike `/compact`, there's no summary — you start from zero. |
| `/resume` | Picks up a previous conversation session. |
| `/rewind` | Steps back to an earlier point in the conversation, undoing the changes made since then. |
| `/context` | Shows what's currently in the context window — useful to see how full the "desk" is. |
| `/model` | Switch which Claude model you're using mid-session. |
| `/plugin` | Browse and install skills from the marketplace. |
| `/mcp` | View and manage MCP server connections. |
| `/ide` | Connect Claude Code to your open Cursor or VS Code window so they stay in sync. |
| `/exit` | Quit Claude Code. Or press `Ctrl + C` twice. |

---

## Memory & CLAUDE.md

These are the same thing under the hood — both are just text files that get loaded into context at the start of every session. The only difference is **who writes them**.

- **CLAUDE.md** is written by **you** — your rules, your project context, your preferences. Claude reads it but doesn't change it.
- **Memory** is written by **Claude** — things it has learned about you that it saves for next time. You don't write these; Claude does, when you ask it to remember something.

Both live in the same place and work the same way: text on disk that gets put on the desk at the start of each session.

**Asking Claude to save something to memory:**

```
"Remember that I always want separate CSS and JS files"
"Remember that my name is Priya and I'm a designer on the Eats team"
# store that I prefer concise answers
```

Claude writes that to a memory file in `~/.claude/`. Next session, it reads it back and knows.

**CLAUDE.md — what you write:**

Create a file called `CLAUDE.md` in your project folder for project-specific context:

```
# Project context

## About this project
- This is the Acme onboarding flow redesign
- Target audience: first-time mobile users
- Designer: [your name] | PM: [their name]

## Preferences
- Write for a non-technical audience
- Prefer concise answers
- Always check with me before making file changes
- When in doubt, show a plan first
```

Claude Code reads `CLAUDE.md` automatically every time it starts in that folder.

**Two levels — both work the same way:**

| Level | Who writes it | File location | What it's for |
|---|---|---|---|
| **Project CLAUDE.md** | You | `./CLAUDE.md` | Rules and context for this specific project |
| **User CLAUDE.md** | You | `~/.claude/CLAUDE.md` | Your preferences across every project |
| **Memory** | Claude | `~/.claude/memory/` | Things Claude has learned and saved about you |

Start with the project `CLAUDE.md`. Ask Claude to save things to memory as you go. Over time, you build up context that makes every session feel like it already knows you.

---

## Skills

A skill is a pre-built, reusable workflow you can invoke with a slash command. Instead of re-explaining a complex task every session, you run one command.

```
/data-analyst:analyze "how many trips in SF last 7 days?"
/page-publisher "summarize this research and publish it as a page"
```

**Where skills are stored:**

| Level | Location | What it means |
|---|---|---|
| **User-level** | `~/.claude/` | Available to you in every project |
| **Project-level** | `.claude/` inside your project folder | Only available in that specific project |

**Installing skills:**

```
/plugin marketplace add <marketplace-url>   ← register a marketplace (one-time)
/plugin install <skill-name>               ← install a skill from it
```

Exit and relaunch Claude Code after installing.

**Useful skills to install:**

| Skill | What it does |
|---|---|
| `page-publisher` | Build an HTML page and publish it to a shareable URL |
| `data-analyst` | Write and run SQL queries against Uber's data warehouse, explain results in plain English |

---

## Modes

Claude Code has different modes that control how much autonomy it has before acting:

| Mode | What it means | When to use it |
|---|---|---|
| **Default (ask before edit)** | Claude asks your approval before changing any file | When starting out or making unfamiliar changes |
| **Auto** | Claude makes decisions and edits without asking at each step — still pauses on sensitive actions | Once you trust it on a task |
| **Edit mode** | Claude edits files directly with minimal back-and-forth | Fast iteration on code you understand |
| **Plan mode** | Claude writes out the full approach first, waits for approval, then acts | Before any significant multi-file change |
| **Dangerously bypass permissions** | Claude runs everything without asking — no approval prompts at all | Only on non-critical projects when you need speed and trust it fully |

### Plan mode — the most useful one for designers

Plan mode is how you see the AI's full approach before it touches anything. It's the safest way to tackle anything non-trivial.

**Starting plan mode:**

Type `/plan` or ask Claude directly:

```
Before making any changes, write a plan for how you'd approach this.
```

**What happens in plan mode:**

1. Claude reads the relevant files to understand the current state.
2. It writes a step-by-step plan — what it'll change, why, and in what order.
3. You read the plan. You can approve it, ask it to revise, or redirect entirely.
4. Only after you say "go ahead" (or similar) does Claude start making changes.
5. After changes, it summarizes what it did and waits for your review.

**Why this matters:** You're reviewing intent before impact. If the plan is wrong, you correct it with a sentence — instead of undoing a dozen file edits after the fact.

Use plan mode for anything that touches more than one file, or anything where the approach isn't obvious.

---

## Writing better prompts

### Give a path, not just a description

Instead of: `"fix the header"`

Try: `"in src/components/Header.tsx, change the logo size from 32px to 48px"`

The more specific the file path, the less guessing Claude has to do.

### Reference files with @

Type `@` and start typing a filename — Claude Code will autocomplete from your project:

```
Look at @src/components/Button.tsx and tell me why the hover state isn't working
```

### Select lines with /ide

If Claude Code is connected to Cursor (via `/ide`), you can select lines in the editor and type `/ide` in Claude Code — it pulls those exact lines into context automatically, without copying and pasting.

---

## Web file types

If you're working on web projects, these are the three file types you'll encounter:

| File type | What it is | What it contains |
|---|---|---|
| `.html` | Structure — the skeleton of the page | Elements: headings, buttons, images, sections |
| `.css` | Style — colors, fonts, spacing, layout | Rules that describe how elements look |
| `.js` | Behavior — what happens when you interact | Logic: what happens when you click, scroll, type |

You can ask Claude to change any of these in plain English:

```
"In index.html, change the background color of the hero section to #F5F5F5"
"In styles.css, increase the font size on mobile to 18px"
"In script.js, make the modal close when you press Escape"
```

### Inlining

Normally a web page is three separate files (`.html`, `.css`, `.js`). "Inlining" means merging them into one `.html` file — the CSS and JS move inside the HTML file. This makes the page much easier to share and open: one file, double-click, it works.

Ask Claude to inline when you want a single shareable file:

```
"Inline all the CSS from styles.css and all the JS from script.js into index.html.
Give me one self-contained file I can open in any browser."
```

### Publishing a page

Once Claude has built you an HTML page, you can publish it to a shareable URL:

1. Install the page publisher skill: `/plugin install page-publisher@agent-marketplace`
2. Relaunch Claude Code
3. Ask: `"Publish this page"`

The result is a link at `personal.uberinternal.com/yourname/...` you can share with anyone at Uber.

---

## Working with .md files

`.md` (Markdown) files are plain text files that use simple symbols for formatting:

```
# Heading
**bold text**
- bullet point
[link text](url)
```

They're used for documentation, READMEs, design notes, and decision logs. Claude Code reads and writes them fluently.

**Useful prompts:**

```
"Create a DECISIONS.md file that documents why we chose this color system"
"Summarize this README.md in plain language for a non-technical audience"
"Add a section to NOTES.md with today's research findings"
"Convert this bullet list into a proper CLAUDE.md format"
```

**Reading .md files properly in Cursor:**

Open any `.md` file in Cursor and press `Cmd + Shift + V` to see the formatted preview alongside the raw text. No extension needed — it's built in.

---

## Reference

Full Claude Code documentation (Uber internal): [claudecode_noneng.html](https://personal.uberinternal.com/udaym/aieng/claudecode_noneng.html)

For engineering-focused tips and advanced usage, see the companion [Claude Code Workshop](https://personal.uberinternal.com/udaym/aieng/claudecode.html).
