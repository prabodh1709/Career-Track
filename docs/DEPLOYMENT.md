# CareerTrack deployment

CareerTrack is configured as a single Node.js web service. Express serves the built React application and exposes REST APIs under `/api`.

## MongoDB Atlas

Create an Atlas database user and allow the hosting provider's connection access. Keep the connection string private.

## Render

1. Push the `CareerTrack` folder to a GitHub repository.
2. Create a Render Web Service from the repository.
3. Use the included `render.yaml`, or set:
   - Build command: `npm install && npm run install:all && npm run build`
   - Start command: `npm start`
4. Add `MONGODB_URI` and `JWT_SECRET` as secret environment variables.
5. In Render, open the service's **Connect → Outbound** tab and add the displayed outbound CIDR ranges to MongoDB Atlas Network Access. Do not use the laptop IP for the deployed service. Dedicated fixed egress IPs are a paid option.
6. The included `render.yaml` uses Render's free web-service plan, so no payment method is needed for the demo deployment. Free services have ephemeral storage: uploaded resumes remain private but can be removed when Render restarts or redeploys the service. For production resume retention, attach a paid persistent disk or replace local uploads with durable object storage such as S3-compatible storage.
7. Open the generated service URL. The frontend and API share the same origin.

## Local production check

```bash
npm install
npm run install:all
npm run build
npm start
```

Open `http://localhost:5000`.

