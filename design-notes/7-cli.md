# 7. The CLI

## In one line
The CLI is a text-based way to give instructions to your computer — like texting your laptop instead of tapping on icons.

## The analogy
Your computer has two ways to interact with it:

- **Icons and buttons** — the visual interface you're used to. Tap the icon, drag the file, click the menu. Designed to be visual and discoverable.
- **Text commands** — type exactly what you want, press enter, get a result back. Less visual, but more direct and flexible.

The **terminal** (also called the shell or command line) is just a window where you type those commands. It's a text box your computer listens to.

Claude Code lives here. You open a terminal, type `claude`, and start talking to it. Responses come back as text in the same window.

## What it really is

CLI stands for **Command Line Interface** — an interface to your computer that uses text instead of graphics.

Instead of double-clicking to open a folder, you type `cd Documents`. Instead of dragging a file to trash, you type a command that removes it. Same actions, different interface.

For designers using Claude Code, the important things are:

- **The terminal is just a window.** It looks intimidating because it's all text and no icons, but it's doing the same things your computer always does.
- **You launch Claude Code by typing `claude`.** Like opening an app, except you type its name instead of clicking.
- **Commands are case-sensitive and need to be exact.** `Claude` is not the same as `claude`. Unlike a GUI where you can click around to find things, the CLI requires precision.
- **You don't need to memorize commands.** Claude Code itself can tell you what to type when it needs you to run something.

## Why it matters to you

- **Claude Code's primary interface is the terminal.** Open one, type `claude`, and you're in.
  - Mac: press `Cmd + Space`, type "Terminal", press Enter.
  - Windows: search for "PowerShell" or "Windows Terminal".
- **Some things Claude Code does will print output in the terminal** — running tests, installing packages, checking for errors. You'll see text scroll by. You don't need to understand all of it.
- **There's a less terminal-heavy option.** Claude Code has extensions for VS Code (a code editor) that give you a panel with a more familiar interface. If the terminal feels too foreign, ask your engineering team to help you get that set up instead.

## Easy to confuse with

- **The terminal vs the CLI.** The terminal is the *window*; CLI is the *concept* (text-based interface). Most people use these words interchangeably and that's fine.
- **The shell.** The shell is the program *inside* the terminal that interprets commands (`bash`, `zsh`, etc.). You don't need to know which one you're running — just open the terminal and type.
- **The IDE.** An IDE (like VS Code) is a full code editor with a GUI. The terminal is a plain text window. Claude Code can run in either — as a CLI tool in the terminal, or as an extension panel inside an IDE.
