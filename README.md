# Civic Connect — Smart Community Issue Reporting System

Full-stack scaffold matching Team 11's Front-End presentation:
- **Frontend:** React.js (JSX components, hooks, React Router, Axios)
- **Backend:** Spring Boot (REST API, Spring Data JPA, Spring Security + JWT, H2/MySQL)

## Project Structure

```
civic-connect/
├── frontend/     React app — components mirror the slides (AdminHeader,
│                 AdminSidebar, WelcomeCard, DashboardCard, SearchFilter,
│                 ComplaintTable, StatusBadge, DepartmentCard,
│                 NotificationBell, AdminProfile, ComplaintDetailsModal,
│                 plus user-side Submit/Track Complaint and auth pages)
└── backend/      Spring Boot app — Complaint/User/Admin/Department
                  entities, JPA repositories, services, REST controllers,
                  JWT-based auth, CORS config
```

## Quick Start

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:8080`. Uses an in-memory H2 database by default
(no setup needed) — console at `http://localhost:8080/h2-console`
(JDBC URL: `jdbc:h2:mem:civicconnect`).

To use MySQL instead: edit `backend/src/main/resources/application.properties`,
comment out the H2 lines, uncomment the MySQL lines, and set your credentials.

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000` and calls the backend at
`http://localhost:8080/api` (set in `frontend/.env`).

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/user/register` | Register a citizen |
| POST | `/api/auth/user/login` | Citizen login (returns JWT) |
| POST | `/api/auth/admin/register` | Register an admin |
| POST | `/api/auth/admin/login` | Admin login (returns JWT) |
| GET | `/api/complaints` | List all complaints |
| GET | `/api/complaints/{id}` | Get one complaint |
| POST | `/api/complaints` | Submit a new complaint |
| PATCH | `/api/complaints/{id}/status` | Update complaint status |
| DELETE | `/api/complaints/{id}` | Delete a complaint |
| GET | `/api/departments` | List departments |

## Notes / Next Steps

- Passwords are hashed with BCrypt; login returns a signed JWT. A request
  filter that validates the JWT on protected routes still needs to be wired
  into `SecurityConfig` before this goes to production — right now
  `/api/complaints/**` and `/api/departments/**` are left open so the
  frontend works out of the box during development.
- Frontend components currently use sample/mock data where noted (e.g.
  `ComplaintTable`, `DashboardCard`, `DepartmentCard`) — swap these for the
  live API calls already stubbed in `src/api/` as each backend endpoint
  is wired up on the admin side.
- Add a `NotificationController`/`NotificationRepository` when you're ready
  to make `NotificationBell` dynamic (entity is already scaffolded).
