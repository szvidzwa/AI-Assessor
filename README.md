# AI Assessment System  
**CIS 4109 Capstone Project – Fall 2025**  
**The College of St. Scholastica**

---

## 📘 Project Overview  
The **AI Assessment System** is a web application designed to assist educators in evaluating student artifacts quickly, consistently, and transparently.  
It leverages **AI-driven scoring** to analyze written submissions and assess them against academic rubrics such as **Written Communication**, **Critical Thinking**, and **Inquiry & Analysis**.

This project demonstrates the integration of web development, database design, and artificial intelligence to automate assessment and generate meaningful feedback aligned with institutional learning outcomes.

---

## 🎯 Objectives  
- Define, design, and implement an **AI-driven assessment system** aligned with college learning outcomes.  
- Automate scoring for written assignments using predefined rubrics.  
- Provide **criterion-level feedback**, including rationale and evidence for each score.  
- Enable **data storage and retrieval** for historical analysis.  
- Support **scalability** for additional rubrics and courses.

---

## ⚙️ System Architecture  

### Frontend  
- **React (Vite)** web interface for submitting text, selecting rubrics, and viewing results.  
- Interactive scoring view with AI rationale, evidence, and performance levels.  
- Instructor dashboard for browsing saved assessments.

### Backend  
- **Node.js + Express** API server.  
- Integrates **OpenAI API** for natural language evaluation based on rubric criteria.  
- **SQLite database (via Prisma ORM)** to persist scores and artifact metadata.

---

## 💻 Technologies Used  

| Category | Tools / Frameworks |
|-----------|--------------------|
| **Frontend** | React, Vite, JavaScript, Material UI |
| **Backend** | Node.js, Express |
| **Database** | SQLite, Prisma ORM |
| **AI Integration** | OpenAI GPT-4 / GPT-4o-mini |
| **Development** | VS Code, GitHub, Postman |

---

## 🚀 Setup & Execution  

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
⚙️ Environment Setup (.env file)
bash
Copy code
# Inside your /backend directory, create a file named .env and add the following lines:

# OpenAI API key for AI-driven scoring
OPENAI_API_KEY=sk-your-openai-key-here

# 💡 Replace sk-your-openai-key-here with your actual API key from https://platform.openai.com

# Optional additional environment settings:
DATABASE_URL="file:./prisma/dev.db"
OPENAI_MODEL=gpt-4o-mini
MAX_TOKENS=800
2️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Then open: http://localhost:5173

📊 Key Features
🤖 AI-based scoring and feedback

📚 Rubric-based evaluation on a selection of 9 rubrics

💾 Persistent storage of all assessments

📈 Instructor dashboard for review and export

🧩 Scalable architecture for future rubric additions

👥 Project Team
Role	Member
Project Sponsor	Kris Church – kchurch1@css.edu
Project Champion	Aileen Beard – abearrd@css.edu
Team Members	Maria Amedie
Nick Brunn
Yohanan Bisrat
Simba Zvidzwa

🧩 Future Enhancements
Integration with Learning Management Systems (LMS)

Support for oral communication and multimedia rubrics

Automated PDF feedback report generation

Analytics dashboard for tracking performance trends

🏁 Summary
The AI Assessment System demonstrates how artificial intelligence can augment academic evaluation by providing consistent, rubric-aligned scoring of student artifacts.
It lays the groundwork for scalable, transparent, and data-driven assessment tools in higher education.
