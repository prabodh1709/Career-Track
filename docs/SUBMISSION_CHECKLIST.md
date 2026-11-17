# CareerTrack Submission Checklist

## Submission links

- GitHub repository: https://github.com/prabodh1709/Career-Track
- Deployed application: https://careertrack-gesy.onrender.com
- Deployment health check: https://careertrack-gesy.onrender.com/api/health

## Source-code deliverable

- [x] React frontend source in `frontend/`
- [x] Node.js and Express backend source in `backend/`
- [x] REST API routes, middleware, controllers and models
- [x] MongoDB schemas and connection configuration
- [x] Authentication, authorization and owner-level administration
- [x] Private resume upload and validation handling
- [x] Root and package lock files for reproducible installation
- [x] Safe environment templates in `.env.example`, `backend/.env.example` and `frontend/.env.example`
- [x] `.gitignore` excludes secrets, dependencies, builds and uploaded files

## Functional evidence to capture

- [ ] Public jobs homepage with search, filters, sorting and pagination/load more
- [ ] Job detail page with login-free application form
- [ ] Candidate dashboard, preferences and recommendations
- [ ] Candidate profile with professional links and resume upload
- [ ] Employer job posting and My Jobs management
- [ ] Application management with filters, statuses, notes, private resume download and CSV export
- [ ] Owner/admin dashboard with statistics, job moderation, account roles and deletion controls
- [ ] Mobile-width public jobs view

## Supporting documents

- `docs/API_Documentation.pdf`
- `docs/Database_Schema.pdf`
- `docs/Test_Cases.xlsx`
- `docs/Project_Report.pdf`
- `docs/DEPLOYMENT.md`

## Final safety checks

- Never submit `.env` files, passwords, database credentials, JWT secrets or real resumes.
- Keep the Atlas database user password separate from the repository.
- Free Render storage is temporary for uploaded resumes; use durable object storage or a paid disk for production retention.
- Before submission, open the deployed URL, verify `/api/health`, and capture the evidence views above.
