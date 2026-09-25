# 💪 LiftLedger — FitLog Workout Library

A dark, no-nonsense gym companion. Pick a lift from the library, lock it into today's plan and watch the week's work add up.

**Live site:** https://liftledger-app.vercel.app
**Repo:** https://github.com/Md-Foisal/liftledger

![FitLog banner](public/banner.png)

## About the project

FitLog shows 12 workouts from a public API. You can open any workout to see the full specs and steps, then add it to **Today's Plan** or **Save it for later**. The My Plan page keep track of your minutes and calories for the day. Everything is saved in the browser, so a page reload does not clear your plan.

This was made for Programming Hero B14 Assignment 6 and follows the given Figma design.

## Technologies used

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **DaisyUI** (dropdown and loading spinner)
- **Sonner** for toast notifications
- **Lucide React** icons
- **localStorage** for saving plan data
- Deployed on **Vercel**

## Key features

1. **Workout library** — 12 lifts loaded from the API in a responsive 3x4 grid, with a loading animation while data comes in.
2. **Workout details page** — big image, category tags, key specs table (equipment, difficulty, sets, reps, duration, calories, rating) and 4 step instructions.
3. **Today's plan and saved list** — add or save any workout with one click, navbar badges update live and a toast confirms it. Plan has a cap of 5 lifts.
4. **My Plan dashboard** — live stats for exercises, minutes and calories, tabs for Today's Plan / Saved, Mark as Done and remove buttons.
5. **Sort by** duration, calories or rating on the My Plan page.
6. **Remembers your data** — plan and saved list stay after reload (localStorage).
7. **Custom 404 page** and works on mobile, tablet and desktop.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero banner and the workout library |
| `/workouts/[id]` | Details of one workout |
| `/my-plan` | Today's plan, saved list, stats and sort |
| any other path | 404 page |

## Run it locally

```bash
git clone https://github.com/Md-Foisal/liftledger.git
cd liftledger
npm install
npm run dev
```

Then open http://localhost:3000

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- One workout: `https://api.abcz.workers.dev/api/fitlog/:id`

---

Made by [Md. Foisal](https://github.com/Md-Foisal)
