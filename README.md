# Repo-Grade 🚀  
### Turn Any GitHub Repository into a Developer Report Card

Repo-Grade is an AI-powered web application that analyzes public GitHub repositories and generates a **numeric score, written evaluation, and personalized improvement roadmap** — like feedback from a coding mentor.

Built for the **GitGrade Hackathon** | Theme: AI + Code Analysis + Developer Profiling

---

## 🔍 Problem

Students push projects to GitHub but don't know:
- How professional their code looks
- How recruiters might evaluate it
- What steps to improve

**GitGrade provides clear, actionable feedback on any public GitHub repository.**

---

## ✨ Features

- 🔗 Accepts any **public GitHub repository URL**
- 📊 Generates **numeric score (0–100)** with level & badge
- 🧠 Evaluates: project structure, commit history, documentation, testing, tech stack
- 🤖 AI-powered mentor-style summary
- 🗺️ Personalized roadmap (immediate fixes, skill improvements, best practices)
- 🌐 Fully deployed (Vercel + Render)

---

## 🧮 Scoring Breakdown

| Dimension | Details |
|-----------|---------|
| Code Structure | Folder organization |
| Git Practices | Commit frequency & quality |
| Documentation | README presence |
| Testing | Test-related files |
| Professional Setup | CI, `.gitignore`, hygiene |

**Tiers:** 0–39 (Beginner), 40–69 (Intermediate), 70–100 (Advanced)

---

## 🛠️ Tech Stack

**Frontend:** React (Vite) → Vercel  
**Backend:** Node.js + Express + GitHub API + Groq LLM → Render


## 🚀 Check it out Live at:
[GitGrade Live Demo](https://repo-grade.vercel.app/)