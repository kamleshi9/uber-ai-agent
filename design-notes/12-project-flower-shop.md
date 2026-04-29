# 12. Project: Build a flower shop website

This is a hands-on project. By the end, you'll have a real webpage — a flower ordering site with a product gallery, prices, and a wishlist — published at a shareable URL.

You'll practice plan mode, working with separate files, making iterative improvements, and publishing. The design is yours to decide: pick the flowers, choose the layout, add whatever features you want.

---

## Step 1: Set up the project

Create a fresh folder for this project and move into it:

```
mkdir flower-shop
cd flower-shop
```

---

## Step 2: Create a CLAUDE.md

Before launching Claude Code, create a `CLAUDE.md` in the folder. This is where you set the rules for how Claude should work in this project — and you'll add the plan folder instruction here too.

Create a file called `CLAUDE.md` with this content:

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

## Step 3: Launch Claude Code

```
aifx agent run claude
```

Claude Code will read your `CLAUDE.md` automatically.

---

## Step 4: Ask Claude Code to remember the plan rule

Instead of baking the plan-folder rule into `CLAUDE.md`, ask Claude Code to save it to memory. This way you'll see how memory works — and the rule will apply across future sessions in this project.

Type this into Claude Code:

```
Remember: before starting any significant work, write a plan to the ./plan folder. Name plan files descriptively like ./plan/01-initial-build.md, ./plan/02-improvements.md, etc.
```

Claude will save this to its memory system. From now on, it will write a plan first without you having to ask each time.

---

## Step 5: Tell Claude what to build

Now describe what you want — be as specific or open-ended as you like:

```
I want to build a flower ordering website. It should have:
- A header with a shop name and tagline
- A product gallery showing flowers with images, names, and prices
- A "Add to wishlist" button on each flower
- A wishlist panel that shows what you've saved
- A clean, elegant design

Before you start, write a plan to ./plan/01-initial-build.md and wait for my approval.
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

Exit and relaunch:

```
exit
aifx agent run claude
```

**Publish:**

```
"Publish this page"
```

Claude will build a self-contained version of the site and push it to `personal.uberinternal.com/yourname/flower-shop.html`. You'll get a link you can share with anyone at Uber.

---

## What you just practiced

| Skill | Where you used it |
|---|---|
| Setting up a project with CLAUDE.md | Step 2 — code conventions and project context |
| Using Claude Code's memory | Step 4 — saving the plan rule across sessions |
| Plan mode | Steps 5–6 — reviewing approach before Claude acts |
| Working with separate files | Throughout — HTML, CSS, JS always separate |
| Iterative improvement | Step 8 — describing changes in plain English |
| Publishing | Step 9 — page-publisher to a shareable URL |

---

## Ideas to keep going

- Add a checkout form with a delivery date picker
- Make it mobile-friendly: `"Make the layout work well on a phone screen"`
- Add a flower care guide section below the shop
- Use real flower photos by linking to image URLs
- Add a search or filter by flower type or price range
- Ask Claude to `"make the page feel more premium — think high-end florist, not supermarket"`
