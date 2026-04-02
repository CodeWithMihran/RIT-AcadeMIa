# 🚀 RIT AcadeMIa — Your Academic OS

> A full-stack Learning Management System (LMS) designed to bring clarity, structure, and efficiency to student learning.

---

## 📌 Overview

RIT AcadeMIa is a centralized academic platform that solves one of the biggest student problems — scattered resources and lack of structured learning.

Instead of jumping between WhatsApp, Google Drive, and YouTube, students get everything in one organized system with progress tracking.

---

## 🎯 Problem Statement

Students often struggle with scattered academic resources across multiple platforms, leading to wasted time and inefficient learning. There is no structured way to organize syllabus, track progress, or access relevant study materials efficiently.

---

## 💡 Solution

RIT AcadeMIa provides:

- 📚 Centralized academic resources  
- 🧠 Topic-wise structured learning  
- 📊 Real-time progress tracking  
- 🎯 Personalized dashboard  

---

## ✨ Key Features

### 👨‍🎓 Student Features
- 🔐 Secure Authentication (Login/Register)
- 📂 Branch & Semester-based Subject Filtering
- 📖 Unit-wise Study Resources (Notes, Books, PYQs, YouTube)
- 🧩 Topic-wise Learning Structure
- ✅ Topic Completion Tracking
- 📊 Circular Progress Visualization
- 📈 Subject & Unit Progress Calculation

### 🛠️ Admin Features
- ➕ Add/Edit Subjects
- 🧱 Create Units & Topics
- 📎 Upload Notes, Books, PYQs
- 🎥 Add YouTube Resources
- 👥 Manage Users

---

## 🧠 Core Functionalities

### 🔹 Smart Subject Filtering
Subjects are dynamically shown based on:

branch + semester

---

### 🔹 Topic-Based Progress Tracking

- ✔ Persistent storage in database  
- ✔ No data loss after logout  
- ✔ Real-time updates  

---

### 🔹 Progress Calculation

- Unit Progress = Completed Topics / Total Topics  
- Subject Progress = Total Completed Topics / Total Topics  

---

### 🔹 Visual Learning Experience

- Circular Progress Bars  
- Dashboard Analytics  
- LMS-like UI (Inspired by Coursera/Udemy)

---

## 🏗️ Tech Stack

### 💻 Frontend
- HTML  
- CSS (Tailwind CSS)  
- EJS  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB  
- Mongoose  

### 🔐 Authentication
- bcrypt  
- express-session / JWT  

---

## 🏛️ Architecture

This project follows MVC Architecture:

Models → Database schemas  
Views → UI (EJS templates)  
Controllers → Business logic  

---

## 📁 Project Structure

RIT-Academia/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── views/
├── public/
├── config/
├── app.js

---

## 🔄 Application Flow

Register → Login → Dashboard  
→ Subjects (filtered)  
→ Study Units  
→ Mark Topics Completed  
→ Track Progress  

---

## 🔥 Highlights

- 🚀 Full-stack production-ready application  
- 🧠 Real-world problem solving  
- 📊 Data-driven progress tracking  
- 🔐 Secure authentication system  
- 🏗️ Scalable architecture  
- 🎯 Built with real student use-case  

---

## 🌐 Live Demo

https://rit-academia.onrender.com

---

## 🚧 Future Improvements

- 📱 Mobile Responsiveness Enhancement  
- 📊 Advanced Analytics Dashboard  
- 🔔 Notifications & Reminders  
- 📥 File Upload System  
- 🎥 Embedded Video Player  

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 👨‍💻 Author

Md Mihran Sohail

- Aspiring Full Stack Developer  
- Building real-world projects  
- Focused on solving student problems  

---

## ⭐ Show Your Support

If you like this project:

- Star the repository  
- Share it with others  

---

## 💥 Final Note

RIT AcadeMIa is not just a project — it's a system built to transform how students learn.
