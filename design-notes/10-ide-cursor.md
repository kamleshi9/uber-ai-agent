# 10. IDEs & Cursor

## What is an IDE?

IDE stands for **Integrated Development Environment** — the main tool engineers use to read and write code. Think of it as a very specialized document editor built for code: it knows what files are in your project, understands code structure, runs code for you, and has AI built in.

The most popular AI-first IDE right now is **Cursor**. Download it at cursor.com.

---

## What you see when you open Cursor

When you open a project folder in Cursor, you'll see several panels:

```
┌─────────────┬─────────────────────────────┬──────────────┐
│  Explorer   │         Editor              │  Agent chat  │
│             │                             │              │
│  File tree  │  Open files — read and      │  Type prompts│
│  of your    │  edit code here             │  here, AI    │
│  project    │                             │  edits files │
│             │                             │  for you     │
│─────────────┤─────────────────────────────┤              │
│  Search     │         Terminal            │              │
│             │  (built-in CLI window)      │              │
└─────────────┴─────────────────────────────┴──────────────┘
```

| Panel | What it does |
|---|---|
| **Explorer** | File tree of your project — like Finder, but inside the app. Click a file to open it in the Editor. |
| **Search** | Search for any text across every file in the project at once. |
| **Editor** | Where you read and edit files. Like Pages or Word, but for code. |
| **Terminal** | A built-in CLI window — same as opening Terminal separately, already pointed at your project. |
| **Agent chat** | The AI assistant. Describe what you want; it reads files, makes edits, and shows you what changed. |
| **Extensions** | Add-ons for extra capabilities (themes, file previewers, language support, etc.). |

There are also panels for debugging, Git history, and more — you won't need those.

---

## Cursor always works on a folder

Like Claude Code, Cursor doesn't just open files — it opens **folders**. The folder you select becomes its workspace: the Explorer shows everything in it, the Agent can read and edit anything inside it, and the Terminal starts there.

To open a project: **File → Open Folder** → select your project folder.

If you open Cursor without selecting a folder, the Agent won't have any files to work with. Always open the folder first.

---

## The part you'll actually use: Agent mode

Most of Cursor's UI — the editor, the file tabs, the search panel — is designed for engineers who read and write code line by line. As a designer or PM, you'll mostly live in **Agent mode**.

In Agent mode you describe what you want in plain English, and Cursor reads your files, makes the changes, and shows you exactly what it changed (and you can undo any of it).

Cursor also has a **background agent** mode — the AI works on its own without you watching each edit live. You give it a goal, it runs, and shows you the finished result. Useful for longer tasks.

---

## Reading Markdown files in Cursor

Cursor has Markdown preview built in. Open any `.md` file and press `Cmd + Shift + V` to toggle a formatted preview alongside the raw text — headings, bullet points, bold, and tables render properly instead of the raw symbols.

---

## Easy to confuse with

- **Cursor vs Claude Code.** Cursor is a full visual IDE (file tree, editor, AI chat) you open like an app. Claude Code is a CLI tool you run in the terminal. They can work together — install the Claude Code IDE extension to connect them.
- **The Editor vs Agent mode.** The Editor is for manually typing code. Agent mode is the AI doing the editing for you. You'll use Agent mode almost exclusively.
- **Cursor vs VS Code.** VS Code is a similar IDE by Microsoft — also popular, also has AI extensions. Cursor is built from VS Code but with AI as the primary feature from the start.
