# CricketVerse 🏏

A complete, responsive cricket portal built with HTML5, CSS3, JavaScript, and Bootstrap 5.

## Project structure

```
newproj/
├── index.html
├── style.css
├── script.js
├── README.md
└── image/
    ├── players/   (put local player photos here if you want to replace the placeholders)
    ├── teams/     (put local team logos here if you want to replace the placeholders)
    └── hero/      (optional — the hero uses a built-in animated CSS/SVG cricket ball, no image needed)
```

## Quick start in VS Code

1. Open the `newproj` folder in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab if you don't have it.
3. Right-click `index.html` in the file explorer and choose **"Open with Live Server"**.
4. Your browser will open the site automatically (usually at `http://127.0.0.1:5500`).

That's it — no Node.js, npm, or build step required.

## About the images

- **Player photos** currently use `https://ui-avatars.com` — a free service that generates a colored initials avatar for each player. These links always work, so nothing will ever appear broken.
- **Team logos** currently use `https://flagcdn.com` national flag images — also free and reliable.
- **Hero graphic** is a hand-built animated CSS/SVG cricket ball (no external image needed at all).

### To replace a player photo with your own local image
1. Save your image inside `image/players/`, e.g. `image/players/virat.jpg`.
2. Open `script.js`, find the `players` array, and change that player's `image` value, e.g.:
   ```js
   image: "image/players/virat.jpg",
   ```

### To replace a team logo with your own local image
1. Save your image inside `image/teams/`, e.g. `image/teams/india.png`.
2. Open `script.js`, find the `teams` array, and change that team's `logo` value, e.g.:
   ```js
   logo: "image/teams/india.png",
   ```

### To use a local hero image instead of the animated ball
1. Save an image inside `image/hero/`, e.g. `image/hero/cricket-hero.jpg`.
2. In `index.html`, inside the `.cv-hero-visual` column, replace the `.cv-ball-stage` block with:
   ```html
   <img src="image/hero/cricket-hero.jpg" alt="Cricket action" class="img-fluid rounded-4">
   ```

## Notes

- All match, ranking, news, and testimonial content is **sample/demo data** for illustration — it is not pulled from a live API.
- The site works fully on desktop, laptop, tablet, and mobile.
