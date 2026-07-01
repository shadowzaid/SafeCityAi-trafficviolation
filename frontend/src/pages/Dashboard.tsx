import { useEffect, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, ChartPieIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { PageShell } from '../components/Layout';
import { getMetrics } from '../api/client';
import type { ApiMetrics } from '../types';

export function Dashboard() {
  const [metrics, setMetrics] = useState<ApiMetrics | null>(null);

  useEffect(() => {
    void getMetrics().then(setMetrics).catch(() => setMetrics(null));
  }, []);

  return (
    <PageShell>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-black uppercase tracking-[0.22em] text-cyanx">Mission control</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">SafeCityAI Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Upload evidence, run realtime detection, tune confidence, and monitor model behavior from a single operational surface.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Action icon={PhotoIcon} title="Image Detection" href="/image-detection" body="Run YOLOv5 on photos and download annotated evidence." />
        <Action icon={VideoCameraIcon} title="Video Detection" href="/video-detection" body="Process traffic footage with FPS and class statistics." />
        <Action icon={CameraIcon} title="Live Webcam" href="/live-webcam" body="Capture frames from the browser camera for live inference." />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <Metric label="Requests" value={metrics?.total_requests ?? 0} />
        <Metric label="Images" value={metrics?.image_requests ?? 0} />
        <Metric label="Videos" value={metrics?.video_requests ?? 0} />
        <Metric label="Avg latency" value={`${metrics?.average_latency_ms ?? 0} ms`} />
      </div>
      <section className="mt-8 rounded-2xl bg-ink p-6 text-white dark:bg-black/30">
        <div className="flex items-center gap-3">
          <ChartPieIcon className="h-8 w-8 text-cyanx" />
          <div>
            <h2 className="text-2xl font-black">Detection history</h2>
            <p className="text-slate-400">Aggregated class counts from the live API process.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {['Helmet', 'No_Helmet', 'License_Plate'].map((name) => (
            <div key={name} className="rounded-xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{name}</p>
              <p className="mt-2 text-3xl font-black">{metrics?.detections_by_class?.[name] ?? 0}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

function Action({ icon: Icon, title, body, href }: { icon: HeroIcon; title: string; body: string; href: string }) {
  return (
    <Link to={href} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-white/5">
      <Icon className="h-10 w-10 text-cyanx" />
      <h2 className="mt-5 text-2xl font-black">{title}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{body}</p>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}
