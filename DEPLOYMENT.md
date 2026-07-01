# Deployment

Designed & Developed by Mohammed Zaid Nayaz.

## Frontend to Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set root directory to `frontend`.
4. Set environment variable:

```text
VITE_API_BASE_URL=https://your-render-api.onrender.com
```

5. Deploy.

## Backend to Render

1. Push the repository to GitHub.
2. Create a Render Blueprint from `render.yaml`.
3. Set the backend service root to `backend`.
4. Upload `weights/best.pt` or use `weights/yolov5s.pt` for transfer-learning bootstrap.
5. Confirm `/health` returns:

```json
{ "status": "healthy", "version": "1.0.0" }
```

## Production Notes

- Use a persistent disk if storing processed videos long-term.
- Use GPU infrastructure for high-volume video inference.
- Restrict CORS origins to your Vercel domain.
- Store secrets in platform environment variables.

## Docker Option

Backend:

```powershell
docker build -t safecityai-api backend
docker run -p 8000:8000 safecityai-api
```

Frontend:

```powershell
docker build -t safecityai-frontend frontend
docker run -p 5173:80 safecityai-frontend
```
