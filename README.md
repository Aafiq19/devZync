# devZync Website 🖤✨

> Premium web development & hosting agency — Sri Lanka

---

## 📁 Project Structure

```
devzync/
├── index.html          ← Main website page
├── css/
│   └── style.css       ← All styles & brand colors
├── js/
│   └── main.js         ← Animations & interactions
├── Dockerfile          ← Docker build instructions
├── docker-compose.yml  ← Easy run configuration
├── nginx.conf          ← Web server configuration
└── .dockerignore       ← Files to exclude from Docker
```

---

## 🐳 What is Docker?

Docker is a tool that packages your website + web server into a
**container** — a self-contained box that runs the same on ANY
computer, anywhere in the world.

Think of it like this:
- 📦 Normal website = files on YOUR computer only
- 🐳 Docker = your website in a sealed box that runs anywhere

---

## 🚀 How to Run devZync with Docker

### Step 1 — Install Docker
Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
Install it and make sure it's running (you'll see the whale icon).

### Step 2 — Open Terminal
- Windows: Search "Command Prompt" or "PowerShell"
- Mac: Search "Terminal"
- Linux: Ctrl + Alt + T

### Step 3 — Go to this project folder
```bash
cd path/to/devzync
# Example: cd C:\Users\YourName\Downloads\devzync
```

### Step 4 — Build & Run with ONE command
```bash
docker-compose up --build
```

That's it! 🎉 Open your browser and go to:
👉 http://localhost:8080

---

## 🛠️ Useful Docker Commands

```bash
# Start the website
docker-compose up

# Start in background (won't block terminal)
docker-compose up -d

# Stop the website
docker-compose down

# Rebuild after making changes
docker-compose up --build

# See running containers
docker ps

# See container logs
docker logs devzync-website
```

---

## ✏️ How to Edit the Website

1. Open `index.html` to change text content
2. Open `css/style.css` to change colors/fonts/layout
3. Open `js/main.js` to change animations/behavior
4. After changes, run: `docker-compose up --build`

### Change Colors
In `css/style.css`, find `:root` at the top:
```css
:root {
  --gold: #C9A96E;      ← Change this for accent color
  --black: #0D0D0D;     ← Change this for background
}
```

---

## 🌍 Deploy to the Internet (Next Steps)

Once you're happy with the site locally, you can deploy using:
- **Railway** (free): railway.app
- **Render** (free): render.com
- **DigitalOcean** (paid): digitalocean.com

All of these support Docker deployments!

---

## 📱 Brand Colors

| Color      | Hex       | Use              |
|------------|-----------|------------------|
| Obsidian   | #0D0D0D   | Background       |
| Gold       | #C9A96E   | Accents & logo   |
| Champagne  | #EDE0C8   | Body text        |
| Charcoal   | #1E1E1E   | Card backgrounds |
| Smoke      | #2E2E2E   | Borders          |

---

Made with 🖤 by devZync · Sri Lanka
