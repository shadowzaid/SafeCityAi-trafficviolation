import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL } from '../api/client';
import { PageShell } from '../components/Layout';

const endpoints = [
  ['GET', '/', 'API identity and owner metadata'],
  ['GET', '/health', 'Health check for Render and uptime monitors'],
  ['POST', '/predict', 'Image inference with confidence threshold'],
  ['POST', '/predict-video', 'Video inference and processed video output'],
  ['POST', '/webcam', 'Single webcam frame inference'],
  ['GET', '/metrics', 'Runtime request and detection statistics'],
];

export function ApiDocs() {
  return (
    <PageShell>
      <div className="max-w-3xl">
        <p className="font-black uppercase tracking-[0.22em] text-cyanx">Developer surface</p>
        <h1 className="mt-3 text-4xl font-black">API Docs</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          SafeCityAI exposes a clean FastAPI contract with Swagger, CORS, validation, rate limiting, and downloadable annotated media.
        </p>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
        {endpoints.map(([method, path, body]) => (
          <div key={path} className="grid gap-3 border-b border-slate-200 p-5 last:border-0 dark:border-white/10 md:grid-cols-[90px_180px_1fr]">
            <span className="rounded-lg bg-ink px-3 py-1 text-center text-sm font-black text-white dark:bg-white dark:text-ink">{method}</span>
            <code className="font-black text-cyanx">{path}</code>
            <span className="text-slate-600 dark:text-slate-300">{body}</span>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-2xl bg-ink p-6 text-white">
        <div className="flex items-center gap-3">
          <CodeBracketIcon className="h-8 w-8 text-cyanx" />
          <h2 className="text-2xl font-black">Example response</h2>
        </div>
        <pre className="mt-5 overflow-x-auto rounded-xl bg-black/40 p-5 text-sm text-mint">{`{
  "detections": [
    {
      "class": "No_Helmet",
      "confidence": 0.91,
      "bbox": [120, 220, 80, 110]
    }
  ],
  "image_url": "/results/result.jpg",
  "fps": 28.4,
  "inference_ms": 35.2,
  "statistics": {
    "Helmet": 1,
    "No_Helmet": 1,
    "License_Plate": 1
  }
}`}</pre>
        <a className="mt-5 inline-flex rounded-xl bg-cyanx px-5 py-3 font-black text-ink" href={`${API_BASE_URL}/docs`} target="_blank" rel="noreferrer">
          Open Swagger
        </a>
      </section>
    </PageShell>
  );
}
