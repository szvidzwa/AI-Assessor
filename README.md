AI Assessment System

CIS 4109 Capstone Project – Fall 2025
The College of St. Scholastica

📋 Overview

The AI Assessment System is a web application that automatically evaluates and scores student artifacts (such as essays and reports) against predefined rubrics. The system leverages natural language processing and large-language-model (LLM) techniques to provide criterion-based feedback aligned with institutional learning outcomes.

🏗️ Features

Evaluate text artifacts using selected rubrics

Rubrics included:

Written Communication (CSS Revised)

Critical Thinking (VALUE)

Inquiry & Analysis (VALUE)

AI-driven scoring with rationale and evidence extraction

JSON export for results

Persistent storage of all assessments via SQLite + Prisma

React-based dashboard to view saved evaluations

⚙️ Tech Stack

Frontend: React (Vite), JavaScript / TypeScript, Material UI

Backend: Node.js + Express, OpenAI API integration

Database: SQLite (Prisma ORM)

Environment: VS Code

🚀 How to Run
1. Backend
cd backend
npm install
npm run dev


Create .env in backend/:

OPENAI_API_KEY=sk-your-key

2. Frontend
cd frontend
npm install
npm run dev


Open http://localhost:5173

👥 Project Team

Maria Amedie

Nick Brunn

Stephan Truscott

Simba Zvidzwa

Project Sponsor: Kris Church (kchurch1@css.edu
)
Project Champion: Aileen Beard (abearrd@css.edu
)

📖 Description

Define, design, construct, and implement an AI-driven assessment system to evaluate and score student artifacts against predefined evaluation rubrics.