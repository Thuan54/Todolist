
# Work Management Web App (Monorepo)

## Quick Start

### Backend (Port 5000)

```bash
cd server
npm run dev
```
Ensure MongoDB is running locally: `mongosh`

Run migration file

```bash
cd server
npm run migrate
```

### Frontend (Port 5173)
```bash
cd client
npm run dev
```
Open `http://localhost:5173` in your browser.

## Tsesting
- Backend: `cd server && npm test`
- Frontend: `cd client && npm test`