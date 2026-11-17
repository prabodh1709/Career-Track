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
6. The included `render.yaml` declares a 1 GB persistent disk mounted at `/opt/render/project/src/uploads`. The upload folder is private and is never served as static content. If your Render plan does not support disks, replace it with a durable object-storage adapter before accepting production resumes.
7. Open the generated service URL. The frontend and API share the same origin.

## Local production check

```bash
npm install
npm run install:all
npm run build
npm start
```

Open `http://localhost:5000`.

