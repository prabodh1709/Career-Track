# CareerTrack API documentation

Base URL: `/api`

## Public

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | API health check |
| GET | `/jobs` | Published, non-expired jobs with `search`, `location`, `employmentType`, `experienceLevel`, `sort`, `page` and `limit` filters |
| GET | `/jobs/:id` | Published job detail |
| GET | `/companies` | Companies with published jobs |
| GET | `/companies/:name` | Company profile and jobs |

## Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Create candidate account |
| POST | `/auth/login` | Login and receive JWT |

Protected endpoints use `Authorization: Bearer <token>`.

## Candidate

`GET/PATCH /profile/me`, `GET /profile/me/resume`, `GET /recommendations`, `GET /saved-jobs`, `POST/DELETE /saved-jobs/:jobId`, `GET/POST/DELETE /alerts`, `GET /alerts/:id/matches`, `GET /applications/mine`, and `POST /applications/:jobId`.

Applications can be submitted without an account. The endpoint validates candidate details and accepts private PDF/DOCX resumes up to 5 MB.

Resume uploads accept PDF and DOCX files up to 5 MB.

## Employer

`GET /jobs/mine`, `POST /jobs`, `PATCH/DELETE /jobs/:id`, `GET /applications/received`, `GET /applications/:id/resume`, `PATCH /applications/:id/status`, and `GET /applications/received.csv`.

Job posting payloads support title, company, location, employment type, experience level, salary, description, skills, responsibilities, qualifications, benefits, application instructions, deadline and publication status.

Resume download routes require an authorized candidate, the owner of the related job, or an administrator. Uploaded files are not served as public static assets.

## Admin

Owner-level admin JWTs can access platform stats, all job CRUD routes under `/admin/jobs`, account listing/role changes/deletion under `/admin/users`, and all application review/export routes under `/admin/applications`. The owner can publish, unpublish, close, edit or delete any job; update any application status/notes; download authorized resumes; promote accounts; and delete accounts with associated recruitment records. Request bodies are stripped of MongoDB operator keys before persistence, and authentication/application endpoints are rate limited.

