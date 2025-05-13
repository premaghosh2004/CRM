Criminal Record Management System (CRMS)

Overview  
The **Criminal Record Management System (CRMS)** is a secure, role-based web application designed to manage criminal records efficiently. It provides different dashboards for **Judges, Police Officers, and Jailors**, ensuring controlled access based on user roles. The system uses **JWT authentication** for security and allows CRUD (Create, Read, Update, Delete) operations on criminal records.  

Built with a **React frontend** and **Node.js + Express backend**, it ensures fast performance and scalability. **MongoDB** serves as the database for flexible data storage, while **Tailwind CSS** provides a responsive and modern UI.  



 **Key Features**  
 **Role-Based Access Control** – Secure logins for **Judges, Police, and Jailors**  
 **JWT Authentication** – Encrypted token-based security  
 **CRUD Operations** – Manage criminal records (Add, View, Edit, Delete)  
 **Responsive UI** – Works on desktop and mobile (Tailwind CSS)  
 **API-Driven** – Backend with Express.js & MongoDB  



**Tech Stack**  
**Frontend**  
- **React.js** (Frontend framework)  
- **Vite** (Fast build tool)  
- **Tailwind CSS** (Styling)  
- **Axios** (API calls)  

**Backend**  
- **Node.js** (Runtime)  
- **Express.js** (Server framework)  
- **MongoDB** (Database)  
- **Mongoose** (MongoDB modeling)  
- **JWT** (Authentication)  



**Quick Setup**  
**1. Install Dependencies**  
- **Node.js** (v16+)  
- **MongoDB** (Running locally or cloud URI)  

2. Run Backend**  
```bash
cd backend
npm install
npm start
```
(Server runs on `http://localhost:3000`)  

**3. Run Frontend**  
```bash
cd frontend
npm install
npm run dev
```
(Frontend runs on `http://localhost:5173`)  

---

**Default Login Credentials**  
| Role    | Username | Password |  
|---------|----------|----------|  
| Judge   | `judge`  | `123`    |  
| Police  | `police` | `123`    |  
| Jailor  | `jailor` | `123`    |  

---

**API Endpoints (Postman Testing)**  
| Method | Endpoint          | Description          |  
|--------|-------------------|----------------------|  
| POST   | `/auth/login`     | User Login (JWT)     |  
| GET    | `/api/records`    | Fetch all records    |  
| POST   | `/api/records`    | Add new record       |  
| PUT    | `/api/records/:id`| Update record        |  
| DELETE | `/api/records/:id`| Delete record        |  

---

## **Deployment**  
1. **Build Frontend:**  
   ```bash
   cd frontend
   npm run build
   ```
2. **Run Backend in Production:**  
   ```bash
   cd backend
   NODE_ENV=production node server.js
   ```
3. **Deploy** (Vercel, Netlify, Render, etc.)  

---

 **Contributing**  
🔹 Fork the repo  
🔹 Create a feature branch (`git checkout -b new-feature`)  
🔹 Commit changes (`git commit -m "Added feature"`)  
🔹 Push to branch (`git push origin new-feature`)  
🔹 Open a **Pull Request**  

🚀 **Happy Coding!** 🚀
