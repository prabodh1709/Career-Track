# CareerTrack

CareerTrack is a MERN-based job portal and recruitment management system. It provides public job discovery and login-free applications for candidates, plus secure administrative tools for managing jobs and applications.

## Workspace structure

```text
CareerTrack/
├── backend/       # Node.js + Express REST API
├── frontend/      # React + Vite client
├── docs/          # API, database, test and project documentation
├── screenshots/   # Evidence for the final submission
├── .env.example
└── package.json
```

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- MongoDB locally, or a MongoDB Atlas connection string

## Setup

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `JWT_SECRET`. For a separate Vite development server, copy `frontend/.env.example` to `frontend/.env`.
2. Install dependencies:

   ```bash
   npm install
   npm run install:all
   ```

3. Start the development servers:

   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173` and the API on `http://localhost:5000`.

To add the 50 demo opportunities used by the project screens, run `npm run seed:jobs` after MongoDB is connected. To grant administrator access to an existing account, run `npm run make-admin --prefix backend -- your-email@example.com`.

## Development phases

- P1: workspace and application foundation
- P2: frontend base UI
- P3: public job portal
- P4: candidate applications
- P5–P6: backend APIs and MongoDB models
- P7–P10: authentication, dashboard and management modules
- P11–P15: security, testing, documentation and deployment

## Environment safety

Never commit `.env`, database credentials, JWT secrets, uploaded resumes, or production tokens. Use `.env.example` as the safe configuration template.

## Production deployment

The project can be deployed as one Node.js service. Express serves `frontend/dist` and the API remains available under `/api`. The included `render.yaml` is configured for Render's free plan. Add `MONGODB_URI` and `JWT_SECRET` as deployment secrets, then allow the Render service outbound CIDR ranges in MongoDB Atlas.

API reference: [docs/API_Documentation.pdf](docs/API_Documentation.pdf).

Test plan: [docs/Test_Cases.xlsx](docs/Test_Cases.xlsx).

The public homepage provides live search, location/type/experience filters, sorting, saved jobs, hide/reset actions and load-more pagination. Job details include salary, dates, responsibilities, qualifications, skills, benefits and application instructions. Candidate profiles include preferences, Open to Work, professional links and private PDF/DOCX resume upload. Candidates can apply without registration, employers can manage their own hiring workflows, and owner-level administrators can control every account, job and application with search, filters, edit controls, pagination and CSV export.

Submission documents:

- [API_Documentation.pdf](docs/API_Documentation.pdf)
- [Database_Schema.pdf](docs/Database_Schema.pdf)
- [Test_Cases.xlsx](docs/Test_Cases.xlsx)
- [Project_Report.pdf](docs/Project_Report.pdf)

Live demonstration:

- Public portal: `https://careertrack-gesy.onrender.com`
- API health: `https://careertrack-gesy.onrender.com/api/health`
- Owner dashboard: `https://careertrack-gesy.onrender.com/admin`

For the final demonstration, use a safe demo account and never publish its password, database credentials, JWT secrets, uploaded resumes or other private candidate information.


