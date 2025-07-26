# Node.js TypeScript RESTful API + React Client

Този проект включва RESTful API, изграден с Node.js и TypeScript, и модерен React клиент с Material-UI, глобална смяна на език (BG/EN), dashboard и потребителски интерфейс за регистрация и вход.

## Project Structure (Updated)

- **backend (Node.js + TypeScript):**
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
- **client (React + Material-UI):**
  - src/
    - components/: UI components (Login, Register, Dashboard, etc.)
    - LanguageContext.js: Global language context (BG/EN)
    - App.js: Main app logic

## Setup Instructions

### Backend (API)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Compile TypeScript:**
   ```bash
   npm run build
   ```
3. **Start MongoDB:**
   - Локално или с Docker Compose:
     ```bash
     docker-compose up -d
     ```
4. **Run the API:**
   ```bash
   npm run dev
   # или
   npm start
   ```
   - По подразбиране API-то работи на порт **5002**.

### Frontend (React Client)

1. **Инсталирай зависимостите:**
   ```bash
   cd client
   npm install
   ```
2. **Стартирай клиента:**
   ```bash
   npm start
   ```
   - По подразбиране клиентът работи на порт **3000** (или следващ свободен).

3. **Отвори в браузър:**
   - [http://localhost:3000](http://localhost:3000)

## Основни UI функционалности

- **Глобална смяна на език (BG/EN):**
  - Бутон горе вдясно за превключване на езика на целия интерфейс
- **Login/Register:**
  - Компактни форми с Material-UI
  - Показване/скриване на паролата
  - Навигация между вход и регистрация с един клик
- **Dashboard:**
  - Профилна информация, статус, роля
  - Табове: Редактирай профил, Промени парола, Настройки
  - Responsive дизайн
  - Изход (logout)

## API Usage (актуализирано)

- **Регистрация:** `POST /auth/register`
- **Вход:** `POST /auth/login`
- **Потребителски операции:** `/users`, `/users/:id` (JWT защита)
- **Swagger документация:** [http://localhost:5002/api-docs](http://localhost:5002/api-docs)

## JWT Authentication

- При успешен вход се получава JWT токен, който се пази в localStorage и се използва за достъп до защитени ресурси.
- Токенът съдържа userId и роля.

## Docker Compose

- Можеш да стартираш MongoDB с:
  ```bash
  docker-compose up -d
  ```
- Данните се пазят в Docker volume.

## Примерни заявки

```bash
# Регистрация
curl -X POST http://localhost:5002/auth/register -H 'Content-Type: application/json' -d '{"name":"Test","email":"test@example.com","password":"testpass"}'

# Вход
curl -X POST http://localhost:5002/auth/login -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"testpass"}'
# Response: { "token": "..." }
```

## Screenshots

> **Добави свои скрийншоти в папка `client/public/screenshots/` и ги преименувай, ако желаеш.**

### Login/Register (BG)
![Login/Register BG](client/public/screenshots/login-bg.png)

### Dashboard (BG)
![Dashboard BG](client/public/screenshots/dashboard-bg.png)

### Login/Register (EN)
![Login/Register EN](client/public/screenshots/login-en.png)

### Dashboard (EN)
![Dashboard EN](client/public/screenshots/dashboard-en.png)

---

_За да добавиш свои изображения, направи скрийншот, запази го в `client/public/screenshots/` и редактирай имената по-горе, ако е нужно._

## License

This project is licensed under the MIT License.