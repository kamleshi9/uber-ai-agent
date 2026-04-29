# 7. The CLI

## In one line
The CLI is a text-based way to give instructions to your Mac — like texting your laptop instead of tapping on icons.

## The analogy
Your Mac has two ways to interact with it:

- **Icons and buttons** — the visual interface you're used to. Click the icon, drag the file, open the menu. Designed to be visual and discoverable.
- **Text commands** — type exactly what you want, press Enter, get a result back. Less visual, but faster and more powerful once you know the basics.

The **terminal** is just a window where you type those commands. It's a text box your Mac listens to.

Claude Code lives here. You open a terminal, type `claude`, and start a conversation. That's it.

---

## Opening a terminal on Mac

Press `Cmd + Space`, type **Terminal**, press `Enter`.

Or skip Apple's default and use **Warp** instead — it's a modern terminal built for humans, with autocomplete, readable output, and AI built in. Download at warp.dev. Most people find it much friendlier than the default terminal.

---

## How a command is structured

Every command follows the same pattern:

```
command  [options]  [arguments]
```

- **command** — what you want to do
- **options** — flags that change how it behaves (usually start with `--` or `-`)
- **arguments** — what you're doing it *to* (a folder, a file, a URL)

A real example:

```
git  commit  --message  "updated the homepage layout"
 ↑      ↑       ↑              ↑
tool  action  option        argument
```

You read it left to right: *"use git, do a commit, with this message."*

Another example — navigating to a folder:

```
cd  ~/Desktop/my-project
↑        ↑
tool   argument (the path)
```

`cd` means "change directory" — it's how you move between folders in the terminal, the same way you'd double-click a folder in Finder.

---

## Commands you'll actually use

| Command | What it does | Example |
|---|---|---|
| `cd` | Move into a folder | `cd ~/Desktop/my-project` |
| `ls` | List files in the current folder | `ls` |
| `pwd` | Show which folder you're currently in | `pwd` |
| `claude` | Start Claude Code | `claude` |
| `git status` | See what files have changed | `git status` |
| `git add .` | Stage all changes | `git add .` |
| `git commit -m "message"` | Save a snapshot with a description | `git commit -m "updated nav"` |
| `git push` | Upload your changes to GitHub | `git push` |

You don't need to memorize all of these. Claude Code will often tell you exactly what to type when it needs you to run something — just copy and paste.

---

## Getting help for any command

Add `--help` to the end of any command to see what it does and what options it accepts:

```
git --help
claude --help
```

The terminal prints a short manual right there. It's always accurate — unlike a web search that might be outdated.

---

## Shortcuts that will save you constantly

| Shortcut | What it does |
|---|---|
| `↑` (up arrow) | Bring back the last command you typed — press it again for the one before that |
| `Opt + ←` / `Opt + →` | Jump one word left or right (instead of moving one character at a time) |
| `Cmd + K` | Clear the terminal screen (your history is still there, just scrolled away) |
| `Ctrl + C` | Stop whatever is running right now |
| `Shift + Enter` | Add a new line without submitting (useful in Claude Code for multi-line prompts) |
| `Tab` | Autocomplete a file or folder name — start typing, press Tab, it fills in the rest |

The `↑` shortcut alone will save you dozens of re-types per session. Use it constantly.

---

## Easy to confuse with

- **Terminal vs CLI.** The terminal is the *window*; CLI is the *concept* (text-based interface). The words are used interchangeably — both are fine.
- **Finder vs the terminal.** Finder and the terminal see the same files and folders on your Mac — they're just two different interfaces to the same place. `cd Desktop` in the terminal is the same as clicking into your Desktop folder in Finder.
- **The IDE.** VS Code is a full code editor with a visual interface. The terminal is a plain text window. Claude Code can run in either — as a CLI in the terminal, or as an extension panel inside VS Code.
