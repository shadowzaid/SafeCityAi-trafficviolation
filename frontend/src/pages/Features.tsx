import { BoltIcon, CloudIcon, CpuChipIcon, LockClosedIcon, PresentationChartLineIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';
import { PageShell } from '../components/Layout';

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const items: Array<[HeroIcon, string, string]> = [
  [CpuChipIcon, 'YOLOv5 Transfer Learning', 'Train from yolov5s.pt for Helmet, No_Helmet, and License_Plate detection.'],
  [VideoCameraIcon, 'Multi-modal inference', 'Image, video, and live webcam workflows share a consistent detection contract.'],
  [PresentationChartLineIcon, 'Metrics and evidence', 'FPS, latency, class counts, history, and downloadable annotated media.'],
  [LockClosedIcon, 'Security controls', 'Rate limiting, upload validation, size limits, CORS, and environment-based configuration.'],
  [CloudIcon, 'Deployable architecture', 'Frontend prepared for Vercel and backend prepared for Render.'],
  [BoltIcon, 'GPU-first runtime', 'CUDA detection when available with CPU fallback for demos and deployment.'],
];

export function Features() {
  return (
    <PageShell>
      <p className="font-black uppercase tracking-[0.22em] text-cyanx">Platform capabilities</p>
      <h1 className="mt-3 text-4xl font-black">Features</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([Icon, title, body]) => (
          <div key={title} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-white/5">
            <Icon className="h-10 w-10 text-cyanx" />
            <h2 className="mt-5 text-xl font-black">{title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
