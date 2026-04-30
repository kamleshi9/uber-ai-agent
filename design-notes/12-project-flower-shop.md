# 12. Project: Build a flower shop website

This is a hands-on project. By the end, you'll have a real webpage — a flower ordering site with a product gallery, prices, and a wishlist — published at a shareable URL.

You'll practice plan mode, working with separate files, making iterative improvements, and publishing. The design is yours to decide: pick the flowers, choose the layout, add whatever features you want.

---

## Step 1: Set up the project

Open Cursor. Go to **File → Open Folder**, then navigate to wherever you keep projects (Desktop is fine) and click **New Folder**, name it `flower-shop`, then click **Open**.

Cursor is now pointed at your project folder. You'll see `flower-shop` in the Explorer panel on the left — empty for now.

---

## Step 2: Create a CLAUDE.md

Before launching Claude Code, create a `CLAUDE.md` in the folder. This tells Claude the rules for this project.

**Creating files and folders in Cursor:**

In the Explorer panel (left sidebar), you'll see your `flower-shop` folder. To create a new file:

1. Hover over the folder name in Explorer — a row of icons appears to the right
2. Click the **New File** icon (a page with a `+`)
3. Type `CLAUDE.md` and press `Enter`
4. The file opens in the Editor — paste your content there

To create a folder the same way: click the **New Folder** icon (a folder with a `+`) instead. You can also right-click anywhere in the Explorer panel for a context menu with these options.

Create `CLAUDE.md` with this content:

```
# Flower shop project

## Code conventions
- Always keep CSS in a separate styles.css file
- Always keep JavaScript in a separate script.js file
- Never inline CSS or JS into the HTML file
- The HTML, CSS, and JS files must always stay in sync

## Project
- This is a flower ordering website
- Target audience: people who want to send flowers as gifts
- Tone: warm, elegant, not corporate
```

Once Claude Code reads this, it will always use separate files — without you having to ask.

---

## Step 3a: Open Claude Code in the terminal

Open a terminal inside Cursor with `Cmd + Shift + P`, type **Create New Terminal**, and press `Enter`. A terminal panel opens at the bottom, already inside your `flower-shop` folder.

Then launch Claude Code:

```
aifx agent run claude --dangerously-skip-permissions
```

Claude Code will read your `CLAUDE.md` automatically.

Once it's running, give the session a name so you can find it later:

```
/rename flower-shop
```

Then connect Claude Code to your Cursor window so they stay in sync:

```
/ide
```

---

## Step 3b: Open the Claude Code extension as a panel

For a better layout, you can also run Claude Code as a visual panel inside Cursor — keeping your files on the left and Claude on the right.

Press `Cmd + Shift + P`, type **Claude Code**, and select **Claude Code: Open in New Tab**. It opens as a tab in the editor area.

**Move it to the right side:**

1. Click and hold the Claude Code tab
2. Drag it all the way to the right edge of the editor area — you'll see a blue highlight appear on the right half
3. Drop it there — Claude Code is now in a right-side panel, your files on the left

**Lock the layout so files always open on the left:**

Right-click the Claude Code panel tab → **Lock Group**. This is the setting that makes files open on the left — a locked panel refuses to open files, so Cursor has no choice but to use the left panel instead.

After locking, click once anywhere in the left editor to make it the active group. Cursor opens files in whichever panel was last clicked — so keeping focus on the left means any file you click in Explorer always opens there.

Your workspace should now look like this:

```
┌─────────────┬──────────────────┬──────────────────┐
│  Explorer   │   Editor (left)  │   Claude Code    │
│             │                  │                  │
│  File tree  │  Files open here │  Chat with       │
│             │  when you click  │  Claude here     │
│             │  them            │                  │
└─────────────┴──────────────────┴──────────────────┘
```

Then rename the session so you can find it later — type this in the Claude Code panel:

```
/rename flower-shop
```

---

## Step 4: Ask Claude Code to remember the plan rule

Instead of baking the plan-folder rule into `CLAUDE.md`, ask Claude Code to save it to memory. This way you'll see how memory works — and the rule will apply across future sessions in this project.

Type this into Claude Code:

```
add this to project memory: before starting any significant work, write a plan to the ./plan folder. Name plan files descriptively like ./plan/01-initial-build.md, ./plan/02-improvements.md, etc.
```

Claude will save this to its memory system. From now on, it will write a plan first without you having to ask each time.

---

## Step 5: Tell Claude what to build

First, switch to plan mode. You can do this two ways:

- **In the terminal:** type `/plan`
- **In the extension:** click the mode button in the bottom-right corner of the Claude Code panel, next to the send button — select **Plan** from the menu

Plan mode means Claude will think through and write a plan before touching any files.

Now describe what you want — be as specific or open-ended as you like:

```
I want to build a flower ordering website. It should have:
- A header with a shop name and tagline
- A product gallery showing flowers with images, names, and prices
- A "Add to wishlist" button on each flower
- A wishlist panel that shows what you've saved
- A clean, elegant design
```

Feel free to change anything — add a cart, a search bar, a featured section, a different color scheme. This is your site.

---

## Step 6: Review and approve the plan

Claude will create a `./plan/01-initial-build.md` file with its approach — what files it'll create, what the structure will look like, what features it'll build first.

Read it. You're looking for:

- Does the structure make sense?
- Does it match what you asked for?
- Is anything missing or wrong?

If you want changes, say so:

```
In the plan, add a section for a hero banner at the top with a seasonal promotion message.
Also remove the newsletter signup — I don't want that.
```

Once you're happy: `"Looks good, go ahead."`

Before Claude starts building, switch mode from Plan to **Auto** (bypass permissions) so it can create and edit files without asking for approval at every step. Click the mode button in the bottom-right of the Claude Code panel and select **Auto** — or type `shift+tab` to cycle through modes in the terminal.

Claude will then build `index.html`, `styles.css`, and `script.js` — three separate files as your CLAUDE.md requires.

---

## Step 7: Open the site in your browser

Once Claude finishes, open the file in your browser:

```
open index.html
```

Or find the `flower-shop` folder in Finder and double-click `index.html`. It opens as a working webpage — no server needed.

---

## Step 8: Make improvements

This is where the real designing happens. Look at what Claude built and tell it what to change. Be direct — describe what you see and what you want instead.

Some starting points:

```
"The flower cards feel too cramped. Add more spacing between them."
"Change the color scheme to blush pink and sage green."
"The wishlist panel should slide in from the right instead of appearing below."
"Add a subtle hover animation to each flower card."
"The price should be more prominent — make it larger and in a different color."
"Add a 'Bestseller' badge to the first three flowers."
```

You can make as many rounds of changes as you want. Before bigger changes, ask Claude to write a new plan:

```
"Before changing the layout, write a plan to ./plan/02-layout-redesign.md"
```

---

## Step 9: Install the page publisher and publish

When you're happy with the result, publish it so you can share a link.

**Install the publisher** (if not already done):

```
/plugin marketplace add https://code.uber.internal/devexp/agent-marketplace.git
/plugin install page-publisher@agent-marketplace
```

Exit and relaunch, or run `/reload-plugins` to pick up the new plugin without leaving the session:

```
/reload-plugins
```

Or if you prefer a full restart:

```
exit
aifx agent run claude
```

**Publish:**

```
"Publish this page to terrablob"
```

Claude will build a self-contained version of the site and push it to `personal.uberinternal.com/yourname/flower-shop.html`. You'll get a link you can share with anyone at Uber.

---

## What you just practiced


| Skill                               | Where you used it                                 |
| ----------------------------------- | ------------------------------------------------- |
| Setting up a project with CLAUDE.md | Step 2 — code conventions and project context     |
| Using Claude Code's memory          | Step 4 — saving the plan rule across sessions     |
| Plan mode                           | Steps 5–6 — reviewing approach before Claude acts |
| Working with separate files         | Throughout — HTML, CSS, JS always separate        |
| Iterative improvement               | Step 8 — describing changes in plain English      |
| Publishing                          | Step 9 — page-publisher to a shareable URL        |


---

## Ideas to keep going

- Add a checkout form with a delivery date picker
- Make it mobile-friendly: `"Make the layout work well on a phone screen"`
- Add a flower care guide section below the shop
- Use real flower photos by linking to image URLs
- Add a search or filter by flower type or price range
- Ask Claude to `"make the page feel more premium — think high-end florist, not supermarket"`

