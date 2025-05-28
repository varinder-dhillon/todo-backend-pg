Here’s a professional and concise `README.md` file tailored to your `todo-backend-pg` project, with a focus on building a PERN stack backend using best practices:

---

```markdown
# 📝 Todo Backend with PostgreSQL (PERN Stack)

This is a backend API for a Todo application built with **Node.js**, **Express**, **PostgreSQL**, and **TypeScript** — the **PERN stack**. It follows backend best practices including structured architecture, connection pooling, and environment-based configuration.

## 📦 Tech Stack

- **PostgreSQL** – Relational database for storing todo items.
- **Express.js** – Fast and minimalist web framework for Node.js.
- **TypeScript** – Type-safe JavaScript for scalable backend development.
- **pg** – Node.js client for PostgreSQL.
- **dotenv** – Manage environment variables securely.
- **ts-node-dev** – Live-reload for fast development.

---

## 📁 Project Structure

```

todo-backend-pg/
├── src/
│   ├── config/           # DB config (connection pool)
│   ├── controllers/      # Route logic
│   ├── routes/           # API routes
│   ├── models/           # DB query logic
│   ├── server.ts         # App initialization
├── .env                  # Environment variables
├── tsconfig.json         # TypeScript config
├── package.json
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/varinder-dhillon/todo-backend-pg.git
cd todo-backend-pg
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=learning
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🔄 API Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/todos`     | Get all todos       |
| POST   | `/todos`     | Create a new todo   |
| PUT    | `/todos/:id` | Update a todo by ID |
| DELETE | `/todos/:id` | Delete a todo by ID |

> Use tools like Postman or Insomnia to test endpoints.

---

## 🌱 Best Practices Followed

* ✅ Environment-based configuration (`dotenv`)
* ✅ Database connection pooling (`pg.Pool`)
* ✅ Modular and scalable folder structure
* ✅ TypeScript for type safety
* ✅ Version control with Git
* ✅ Production-ready scripts

---

## 🔗 Related Projects

* [Frontend Repo (React)](https://github.com/varinder-dhillon/todo-frontend)

---

## 🧑‍💻 Author

Made with ❤️ by [Varinder Dhillon](https://github.com/varinder-dhillon)

---

