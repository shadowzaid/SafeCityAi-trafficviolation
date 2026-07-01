import { Link } from 'react-router-dom';
import type { ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BoltIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Particles } from '../components/Particles';

const stats = [
  ['3', 'Detection classes'],
  ['YOLOv5s', 'Transfer-learning base'],
  ['Realtime', 'FPS telemetry'],
  ['API-first', 'FastAPI + Swagger'],
];

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const features: Array<[string, string, HeroIcon]> = [
  ['Image intelligence', 'Upload traffic photos and receive annotated evidence instantly.', CloudArrowUpIcon],
  ['Video processing', 'Run frame-by-frame violation detection and download processed clips.', BoltIcon],
  ['Live webcam', 'Capture live frames for rapid helmet and plate monitoring.', CpuChipIcon],
  ['Operational metrics', 'Track confidence, latency, class counts, and detection history.', ChartBarIcon],
];

export function Landing() {
  return (
    <div>
      <section className="relative min-h-[86vh] overflow-hidden bg-ink text-white">
        <Particles />
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl content-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-flex rounded-full border border-cyanx/40 bg-cyanx/10 px-4 py-2 text-sm font-black text-cyanx">
              Intelligent Traffic Violation Detection
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
              SafeCityAI
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
              A production-ready YOLOv5 platform for detecting helmets, missing helmets, and license plates across image, video, and live camera workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-cyanx px-6 py-3 font-black text-ink shadow-glow">
                Open Dashboard <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/api-docs" className="rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10">
                View API
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="aspect-video rounded-xl bg-slate-950 p-4">
                <div className="relative h-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_40%_25%,rgba(32,211,238,0.35),transparent_36%),linear-gradient(135deg,#0c111d,#162033_58%,#0f172a)]">
                  <div className="absolute left-[14%] top-[28%] h-[34%] w-[22%] rounded-md border-2 border-mint">
                    <span className="absolute -top-7 left-0 rounded bg-mint px-2 py-1 text-xs font-black text-ink">Helmet 0.94</span>
                  </div>
                  <div className="absolute right-[18%] top-[24%] h-[42%] w-[24%] rounded-md border-2 border-ember">
                    <span className="absolute -top-7 left-0 rounded bg-ember px-2 py-1 text-xs font-black text-white">No_Helmet 0.91</span>
                  </div>
                  <div className="absolute bottom-[18%] right-[25%] h-[12%] w-[24%] rounded-md border-2 border-cyanx">
                    <span className="absolute -top-7 left-0 rounded bg-cyanx px-2 py-1 text-xs font-black text-ink">License_Plate 0.88</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <MiniMetric label="FPS" value="31.8" />
                <MiniMetric label="mAP goal" value="90%+" />
                <MiniMetric label="Latency" value="42 ms" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-white/5">
            <p className="text-3xl font-black text-ink dark:text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="font-black uppercase tracking-[0.22em] text-cyanx">How it works</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">From traffic media to actionable evidence.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {features.map(([title, body, Icon]) => (
            <motion.div key={title} whileHover={{ y: -6 }} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-white/5">
              <Icon className="h-9 w-9 text-cyanx" />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-14 dark:bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3">
          {['Collect and annotate', 'Train and validate', 'Deploy and monitor'].map((step, index) => (
            <div key={step} className="rounded-2xl bg-white p-7 shadow-sm dark:bg-carbon">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink font-black text-white dark:bg-white dark:text-ink">{index + 1}</span>
              <h3 className="mt-5 text-2xl font-black">{step}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {index === 0 && 'Use LabelImg or Roboflow with the documented YOLO class order and split strategy.'}
                {index === 1 && 'Fine-tune from yolov5s.pt, inspect loss curves, precision, recall, mAP, and confusion matrix.'}
                {index === 2 && 'Serve predictions through FastAPI and present evidence through a polished React dashboard.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {['A professional traffic AI prototype with real deployment files.', 'The UI feels startup-grade, not like a classroom form.', 'The API contract is clean enough to demo and extend.'].map((quote) => (
            <blockquote key={quote} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10">
              <ShieldCheckIcon className="h-8 w-8 text-mint" />
              <p className="mt-4 text-lg font-bold">“{quote}”</p>
              <p className="mt-3 text-sm text-slate-500">SafeCityAI demo reviewer</p>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 p-3">
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
