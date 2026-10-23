# Todo App (MERN)

Register, login, auto-login with JWT, and a personal todo list for every user.

```
todo-app/
  server/   Express + Mongoose + bcryptjs + JWT   (http://localhost:1000)
  client/   React (Vite)                          (http://localhost:5173)
```

## Setup

### 1. Server

```
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Open `.env` and fill in your own values:

- `MONGO_URI`  : your MongoDB connection string (include the database name, e.g. `/todo_db`)
- `JWT_SECRET` : a long random string

Generate a secret with:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start it:

```
npm start
```

You should see `Connected to Database!` and `The server is running at: http://localhost:1000`.

### 2. Client (in a second terminal)

```
cd client
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## API

| Method | Route             | Auth         | Body                      | Success reply           |
|--------|-------------------|--------------|---------------------------|-------------------------|
| POST   | /api/register     | none         | { name, email, password } | 201 { message }         |
| POST   | /api/login        | none         | { email, password }       | 200 { token, name }     |
| GET    | /api/user         | Bearer token | none                      | 200 { name }            |
| POST   | /api/todos        | Bearer token | { task }                  | 201 the new todo        |
| GET    | /api/todos        | Bearer token | none                      | 200 [ todos ]           |
| PUT    | /api/todos/:id    | Bearer token | { task }                  | 200 the updated todo    |
| PATCH  | /api/todos/:id    | Bearer token | none                      | 200 the toggled todo    |
| DELETE | /api/todos/:id    | Bearer token | none                      | 200 { message }         |

## Flow

1. Register creates the user (password stored as a bcrypt hash), then the app shows the login screen.
2. Login returns a JWT (valid 1 hour). React saves it in localStorage.
3. On page load, React sends the token to `/api/user`. If valid, the todo screen shows.
4. Logout deletes the token.

## Todos

- Every todo belongs to the user who created it. Each todo route looks the todo up by its id **and** the logged-in user's id, so nobody can read, edit, finish or delete another user's todo (they get a 404 "Todo not found").
- Delete is a soft delete: the todo gets `isDeleted: true` and is no longer returned.
- Finish / Undo flips `isFinished`.
