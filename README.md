# Node.js TypeScript RESTful API

This project is a simple RESTful API built with Node.js and TypeScript. It provides user-related operations such as creating, retrieving, updating, and deleting users.

## Project Structure (Updated)

- src/
  - app.ts: Express app setup
  - server.ts: Entry point (starts the server)
  - controllers/: Route handlers
  - routes/: Route definitions
  - services/: Business logic
  - models/: Database models/schemas
  - middleware/: Express middleware
  - utils/: Utility/helper functions
  - types/: TypeScript type definitions
  - config/: Configuration files
- tests/: Unit and integration tests

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd node-ts-rest-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Compile TypeScript:**
   ```
   npm run build
   ```

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### Create User

- **Endpoint:** `POST /users`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

### Get User

- **Endpoint:** `GET /users/:id`

### Update User

- **Endpoint:** `PUT /users/:id`
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com"
  }
  ```

### Delete User

- **Endpoint:** `DELETE /users/:id`

## Running with Docker Compose

This project includes a `docker-compose.yml` file to easily run both the Node.js API and MongoDB in containers.

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Usage
1. **Build and start the services:**
   ```bash
   docker-compose up --build
   ```
   This will start both the API (on port 3000) and MongoDB (on port 27017).

2. **Access the API:**
   - Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for Swagger UI.
   - The API will connect to MongoDB automatically using the internal Docker network.

3. **Stop the services:**
   Press `Ctrl+C` in the terminal, then run:
   ```bash
   docker-compose down
   ```

### Data Persistence
- MongoDB data is stored in a Docker volume (`mongo-data`) so your data persists between restarts.

### Customization
- You can change the exposed ports or environment variables in `docker-compose.yml` as needed.

## JWT Authentication

This API uses [JWT (JSON Web Token)](https://jwt.io/) for authentication and authorization.

### How it works
1. **Register or Login:**
   - Register a new user via `POST /auth/register` or login via `POST /auth/login`.
   - On successful login, you will receive a JWT token in the response.

2. **Using the Token:**
   - For protected endpoints, include the token in the `Authorization` header:
     ```
     Authorization: Bearer <your_jwt_token>
     ```
   - You can use the "Authorize" button in Swagger UI to set your token for all requests.

3. **Protected Routes:**
   - Most `/users` endpoints require a valid JWT token.
   - Some routes (like creating, updating, or deleting users) require the user to have an `admin` role.

4. **Token Payload:**
   - The JWT token contains the user's ID and role (e.g., `{ userId: ..., role: 'admin' }`).
   - The server verifies the token on each request to protected routes.

### Example
```bash
# Register
curl -X POST http://localhost:3000/auth/register -H 'Content-Type: application/json' -d '{"name":"Test","email":"test@example.com","password":"testpass"}'

# Login
curl -X POST http://localhost:3000/auth/login -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"testpass"}'
# Response: { "token": "..." }

# Access a protected route
curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:3000/users/me
```

### Notes
- Tokens expire after 1 hour by default.
- If you try to access a protected route without a valid token, you will receive a 401 Unauthorized error.
- If you try to access an admin-only route without the `admin` role, you will receive a 403 Forbidden error.

## License

This project is licensed under the MIT License.