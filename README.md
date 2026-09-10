<div align="center">

# 🎓 InternPort

### Internship Management System

A full-stack internship management platform that helps students discover internship opportunities, apply online, manage their profiles, and track application status, while giving administrators the tools to manage internships and review applications.

<br>

![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📌 About the Project

**InternPort** is a role-based Internship Management System built to make the internship application process simpler and more organized for students and administrators.

Students can create an account, maintain their academic and skill profile, browse internships, filter opportunities, apply directly through the platform, and monitor whether an application is **Pending**, **Accepted**, or **Rejected**.

Administrators can create and manage internship listings, review student applications, update application decisions, and monitor platform activity from a dedicated dashboard.

---

## ✨ Key Features

### 👨‍🎓 Student

- Register and log in securely
- Access a personalized student dashboard
- Create and update student profile information
- Add department, semester, phone number, skills, and bio
- Browse available internships
- Search internships by title or company
- Filter internships by location and work type
- View complete internship details and requirements
- Apply directly for an internship
- Duplicate applications to the same internship are prevented
- View all submitted applications
- Track application status as **Pending**, **Accepted**, or **Rejected**
- View dashboard statistics for total, accepted, pending, and rejected applications

### 🛡️ Admin

- Secure admin access with role-based authorization
- Access an admin dashboard
- View total students, internships, and applications
- Create new internship opportunities
- Edit existing internships
- Delete internship listings
- View all student applications
- Review applicant information, skills, department, and semester
- Accept or reject internship applications

---

## 🔎 Internship Discovery

InternPort supports searching and filtering to help students quickly find relevant opportunities.

Students can filter by:

- **Keyword:** Internship title or company
- **Location**
- **Work Type:** Remote, On-site, or Hybrid

Each internship can include:

- Title
- Company
- Location
- Work type
- Duration
- Description
- Requirements
- Application deadline

---

## 🔄 Application Workflow

```text
Student Registration / Login
          │
          ▼
   Complete Profile
          │
          ▼
 Browse Internships
          │
          ▼
 Search / Filter
          │
          ▼
 View Internship Details
          │
          ▼
        Apply
          │
          ▼
       Pending
          │
          ▼
  Admin Reviews Application
       /          \
      ▼            ▼
 Accepted       Rejected
```

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- Local Storage

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL
- MySQL2

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs password hashing
- Bearer token authentication
- Role-Based Access Control (RBAC)
- Protected backend routes

### Development Tools

- Git
- GitHub
- VS Code
- npm
- Nodemon

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────┐
│             Frontend                │
│      HTML • CSS • JavaScript        │
│                                     │
│ Student UI            Admin UI      │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / REST API
                   ▼
┌─────────────────────────────────────┐
│          Node.js + Express.js       │
│                                     │
│ Authentication                     │
│ Student Management                  │
│ Internship Management               │
│ Application Management              │
│ Dashboard Services                  │
│ Role Authorization                  │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│                MySQL                │
│                                     │
│ Users • Students                    │
│ Internships • Applications          │
└─────────────────────────────────────┘
```

---

## 📂 Project Structure

```text
internship-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── internshipController.js
│   │   └── studentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── internshipRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── assets/
│   │   └── images/
│   │
│   ├── css/
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── applications.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── internships.js
│   │   ├── manageApplications.js
│   │   ├── manageInternships.js
│   │   └── profile.js
│   │
│   ├── pages/
│   │   ├── admin-dashboard.html
│   │   ├── internship-details.html
│   │   ├── internships.html
│   │   ├── login.html
│   │   ├── manage-applications.html
│   │   ├── manage-internships.html
│   │   ├── my-applications.html
│   │   ├── profile.html
│   │   ├── register.html
│   │   └── student-dashboard.html
│   │
│   └── index.html
│
└── README.md
```

### Structure Overview

- **config/** handles the MySQL database connection.
- **controllers/** contains the business logic for authentication, students, internships, applications, and dashboards.
- **middleware/** verifies JWTs and enforces role-based permissions.
- **routes/** defines the REST API endpoints.
- **frontend/js/** handles API communication and page-specific client-side behavior.
- **frontend/pages/** contains the student and admin interfaces.

---

## 🗄️ Database Design

The application works with four main entities:

### `users`
Stores account and authentication information.

```text
user_id
name
email
password
role
```

### `students`
Stores the extended student profile.

```text
student_id
user_id
department
semester
phone
skills
bio
```

### `internships`
Stores internship opportunities.

```text
internship_id
title
company
location
type
duration
description
requirements
deadline
created_at
```

### `applications`
Connects students with internships and tracks application decisions.

```text
application_id
student_id
internship_id
status
applied_at
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a student account |
| `POST` | `/api/auth/login` | Public | Authenticate user and return JWT |

### Student Profile

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/students/profile` | Student | Get student profile |
| `PUT` | `/api/students/profile` | Student | Update student profile |

### Internships

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/internships` | Public | Get internships with optional filters |
| `GET` | `/api/internships/:id` | Public | Get one internship |
| `POST` | `/api/internships` | Admin | Create an internship |
| `PUT` | `/api/internships/:id` | Admin | Update an internship |
| `DELETE` | `/api/internships/:id` | Admin | Delete an internship |

### Applications

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/applications/apply/:internshipId` | Student | Apply for an internship |
| `GET` | `/api/applications/my-applications` | Student | Get student's applications |
| `GET` | `/api/applications` | Admin | View all applications |
| `PUT` | `/api/applications/:applicationId/status` | Admin | Accept, reject, or update an application |

### Dashboards

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/student` | Student | Get student application statistics |
| `GET` | `/api/dashboard/admin` | Admin | Get platform statistics |

---

## 🔐 Authentication Flow

InternPort uses JWT-based authentication.

```text
Login Request
     │
     ▼
Verify Email & Password
     │
     ▼
Generate JWT
     │
     ▼
Store Token in Browser Local Storage
     │
     ▼
Send Bearer Token with Protected Requests
     │
     ▼
Backend Verifies Token + User Role
     │
     ▼
Allow / Deny Access
```

New registrations are created with the **student** role. Administrative operations are protected by admin-only middleware.

JWT authentication tokens currently expire after **1 day**.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MySQL
- Git
- A browser or a local static server such as VS Code Live Server

### 1. Clone the Repository

```bash
git clone https://github.com/dey-sarna/YOUR-REPOSITORY-NAME.git
cd internship-management-system
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306

JWT_SECRET=your_secure_jwt_secret
```

> Use your own database name and credentials.

### 3. Prepare the Database

Create the required MySQL database and tables for:

```text
users
students
internships
applications
```

Make sure an admin account exists with the `admin` role if you want to use the administrative dashboard.

### 4. Start the Backend

Development mode:

```bash
npm run dev
```

Or:

```bash
npm start
```

By default, the API runs at:

```text
http://localhost:5000
```

### 5. Start the Frontend

The frontend is built with static HTML, CSS, and JavaScript, so no frontend dependency installation is required.

Open `frontend/index.html` using a local static server such as **Live Server**.

The frontend currently expects the backend API at:

```text
http://localhost:5000/api
```

---

## 🎯 Project Objectives

- Create a centralized internship discovery and application platform
- Simplify the internship application process for students
- Allow students to maintain relevant academic and skill information
- Provide transparent application status tracking
- Help administrators efficiently manage internship opportunities
- Provide a structured system for reviewing student applications
- Demonstrate full-stack development with authentication, authorization, REST APIs, and relational databases

---

## 🧠 What This Project Demonstrates

InternPort demonstrates practical use of:

- Full-stack web development
- REST API design
- Client-server architecture
- MySQL relational database integration
- JWT authentication
- Password hashing with bcryptjs
- Role-Based Access Control
- Protected backend routes
- CRUD operations
- Search and filtering
- Dashboard analytics
- Frontend-backend API integration
- Browser local storage
- Modular backend organization

---

## 🚧 Future Improvements

Potential improvements for future versions include:

- Resume/CV upload with applications
- Company or recruiter accounts
- Email notifications for application decisions
- Internship bookmarking / saved opportunities
- Application withdrawal
- Advanced search and pagination
- Skills-based internship recommendations
- Deadline reminders
- Analytics and reporting dashboard
- Password reset and email verification
- Refresh-token based authentication
- Cloud deployment and production configuration

---

## 📈 Current Project Status

| Module | Status |
|---|---|
| Student Registration & Login | ✅ Implemented |
| JWT Authentication | ✅ Implemented |
| Role-Based Authorization | ✅ Implemented |
| Student Profile Management | ✅ Implemented |
| Internship Browsing | ✅ Implemented |
| Search & Filtering | ✅ Implemented |
| Internship Application | ✅ Implemented |
| Duplicate Application Prevention | ✅ Implemented |
| Application Status Tracking | ✅ Implemented |
| Student Dashboard | ✅ Implemented |
| Admin Dashboard | ✅ Implemented |
| Internship CRUD | ✅ Implemented |
| Application Review | ✅ Implemented |
| Accept / Reject Applications | ✅ Implemented |

---

## 👩‍💻 Author

### Sarna Dey

Computer Science & Engineering Student  
Aspiring Software Engineer | Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-dey--sarna-181717?style=for-the-badge&logo=github)](https://github.com/dey-sarna)

---

## ⭐ Support

If you find **InternPort** useful or interesting, consider giving the repository a ⭐.
