# 📚 Study Session Visualizer

## 🚀 VS Code mein kaise chalayein — Step-by-Step Guide

---

## ✅ Step 1: Node.js Install Karo

1. https://nodejs.org/ website kholo
2. "LTS" version download karo (green button wala)
3. Install karo (sab default settings theek hain)
4. Check karo ki install hua ya nahi — Terminal mein likho:
   ```
   node -v
   npm -v
   ```
   Dono mein version number aana chahiye (e.g. v20.x.x)

---

## ✅ Step 2: VS Code Install Karo (agar nahi hai)

1. https://code.visualstudio.com/ se download karo
2. Install karo

---

## ✅ Step 3: Project Folder Open Karo

1. Jo folder tumhe diya gaya hai usse kisi jagah rakh do (e.g. Desktop pe)
2. VS Code kholo
3. File → Open Folder → `study-session-visualizer` folder select karo

---

## ✅ Step 4: Terminal Kholo

VS Code mein:
- Top menu → Terminal → New Terminal
- Ya shortcut: Ctrl + ` (backtick key)

---

## ✅ Step 5: Dependencies Install Karo

Terminal mein yeh command likho aur Enter dabaao:

```bash
npm install
```

⏳ Thoda time lagega (1-2 minute) — wait karo

---

## ✅ Step 6: App Chalao

```bash
npm start
```

✅ Browser automatically khulega aur app chal jayega!
URL: http://localhost:3000

---

## 🎯 Features of this App

- 📊 **Dashboard** — Weekly charts, pie charts, summary cards
- ➕ **Add Session** — Naya study session add karo
- 📋 **History** — Saare sessions dekho aur delete karo
- 📚 **Subjects** — Subject-wise statistics
- 💡 **Insights** — Productivity score aur recommendations

---

## ❓ Common Problems

**Error: 'npm' is not recognized**
→ Node.js dobara install karo aur VS Code restart karo

**Port already in use**
→ `Y` press karo jab poochhe (different port pe chalega)

**npm install mein error**
→ Internet connection check karo aur dobara try karo
