# CareerTrack test cases

| ID | Area | Test | Expected result |
|---|---|---|---|
| TC-01 | Health | Open `/api/health` | Returns HTTP 200 and `status: ok` |
| TC-02 | Auth | Register with valid details | Account and JWT are created |
| TC-03 | Auth | Register duplicate email | Request is rejected |
| TC-04 | Auth | Login with valid credentials | User is redirected to dashboard |
| TC-05 | Jobs | Browse `/` or `/jobs` | Published jobs are visible without login |
| TC-06 | Jobs | Search by keyword/location | Matching jobs remain visible |
| TC-07 | Jobs | Open job detail | Role, company, skills and apply CTA appear |
| TC-08 | Profile | Save preferences | Profile values persist in MongoDB |
| TC-09 | Recommendations | Open dashboard with preferences | Matching jobs are ranked higher |
| TC-10 | Applications | Submit PDF/DOCX application | Application is stored and status is Submitted |
| TC-11 | Applications | Apply twice to same job | Duplicate application is rejected |
| TC-12 | Saved jobs | Save and remove a job | Saved jobs list updates correctly |
| TC-13 | Alerts | Create an alert and view matches | Matching published jobs are returned |
| TC-14 | Employer | Post a job | Authenticated owner can see it in My jobs |
| TC-15 | Employer | Update applicant status | Owner can move an application through statuses |
| TC-16 | Admin | Open admin stats as candidate | Request is rejected with HTTP 403 |
| TC-17 | Admin | Moderate a job as admin | Job status changes successfully |
| TC-18 | Deployment | Run production build/start | One service serves frontend and `/api` |
| TC-19 | Jobs | Open a job beyond the first result page | Direct job-detail endpoint loads the published job |
| TC-20 | Jobs | Click Load more jobs | Additional matching jobs appear without losing filters |
| TC-21 | Profile | Upload a valid PDF/DOCX resume | Resume is stored privately and profile confirms upload |
| TC-22 | Application | Submit application without login | Required candidate fields and resume are accepted |
| TC-23 | Admin | Delete candidate from admin users list | Account and related records are removed after confirmation |
| TC-24 | Security | Open admin endpoint as candidate | Request returns HTTP 403 and no admin data is exposed |
| TC-25 | Security | Download an application resume | Candidate, job owner and admin can download; other users receive HTTP 403 |
| TC-26 | Owner | Control all jobs and applications | Owner updates status, deletes a job and changes application status | Changes apply across the platform |
| TC-27 | Owner | Manage account roles | Owner promotes or demotes another account | Role updates and owner cannot remove own access |
| TC-28 | Jobs | Create a job with responsibilities, qualifications, benefits and instructions | Structured job detail sections are stored and displayed |
| TC-29 | Jobs | Filter admin jobs by status and search, then paginate | Matching job records appear on the correct page |
| TC-30 | Applications | Filter owner applications by job, date and status | Only matching applications remain visible |
| TC-31 | Security | Submit a body containing `$` or `.` keys | Unsafe MongoDB operator keys are removed before persistence |
| TC-32 | Job detail | Open a published job with a deadline | Salary, experience, dates, sections and apply instructions are visible |

