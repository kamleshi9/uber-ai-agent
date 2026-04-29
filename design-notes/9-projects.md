# 9. Projects & repos

## A project is just a folder

On your Mac, a "project" is nothing special — it's a regular folder. Everything related to a piece of work sits inside it: code files, images, config, notes.

When you add Git to that folder, it becomes a **repo** (short for repository). Git turns the folder into a time machine — it tracks every change ever made, so you can see history, undo mistakes, and let multiple people work on the same code without overwriting each other.

```
my-project/
├── index.html
├── styles.css
├── script.js
└── .git/          ← this hidden folder is what makes it a "repo"
```

The `.git` folder is created automatically. You never touch it directly.

---

## Creating a new project from scratch

```
mkdir my-project     ← create the folder
cd my-project        ← move into it
git init             ← add Git tracking (now it's a repo)
claude               ← launch Claude Code here
```

That's it. Claude Code sees everything inside `my-project` and can read, create, and edit files in it.

---

## How Claude Code works at the folder level

Claude Code always runs in the folder you're currently in when you type `claude`. That folder becomes its workspace — it can see files inside it, but nothing outside it.

If you want Claude Code to work on a different project, navigate to that folder first:

```
cd ~/Desktop/other-project
claude
```

**Practical rule:** always `cd` into your project folder before launching `claude`.

---

## Using an existing project (cloning)

If a project already exists online (GitHub or an internal repo), you need to **clone** it — download a copy to your Mac and set up the Git connection at the same time.

```
git clone <repo-url>    ← downloads the repo into a new folder
cd <folder-name>        ← move into it
claude                  ← launch Claude Code
```

The URL comes from the repo's GitHub page → green **Code** button → SSH tab → copy the URL.

---

## Uber's monorepo

Most companies have many separate repos — one per project. Uber works differently: most code lives in one giant repo called the **monorepo**. There are a few of them:

| Monorepo | What's inside |
|---|---|
| `go-code` | Backend services written in Go |
| `web-code` | Web and mobile frontends |
| `java-code` | Services written in Java |
| `ml-code` | Machine learning code |

The monorepo is one folder with thousands of subfolders — one per team, feature, or service. If you want to change the Uber Eats checkout page, that's a subfolder inside `web-code`.

**Running Claude Code on the monorepo:**

You can point Claude Code at just your team's subfolder (faster, more focused):

```
cd web-code/rides/checkout
claude
```

Or at the monorepo root to ask questions across all services (slower but broader):

```
cd web-code
claude
```

Ask your engineering team which subfolder your product lives in.

---

## Setting up SSH authentication (one-time)

Before you can clone Uber repos or push changes, your Mac needs to be authenticated with GitHub using SSH. This proves to GitHub that your Mac is allowed to access the code.

**Step 1 — Generate an SSH key:**

```
ssh-keygen -t ed25519 -C "yourname@uber.com"
```

Press `Enter` through all the prompts to accept defaults. This creates two files in `~/.ssh/` — a private key (keep this secret) and a public key (safe to share).

**Step 2 — Copy the public key:**

```
cat ~/.ssh/id_ed25519.pub
```

Select and copy all the output.

**Step 3 — Add it to GitHub:**

Go to [github.com](https://github.com) → click your profile picture → **Settings** → **SSH and GPG keys** → **New SSH key** → paste the key → save.

**Step 4 — Test it:**

```
ssh -T git@github.com
```

You should see: `Hi yourname! You've successfully authenticated.`

You only ever need to do this once per Mac.

---

## Basic Git commands you'll use

| Command | What it does |
|---|---|
| `git status` | Show which files have changed |
| `git pull` | Download the latest changes from the remote repo |
| `git add .` | Stage all changed files to be committed |
| `git commit -m "description"` | Save a snapshot with a label |
| `git push` | Upload your committed changes to GitHub |
| `git log --oneline` | See recent commit history in one line each |

Claude Code can run all of these for you — just ask it to "commit and push my changes with the message X" and it will handle the git commands.
