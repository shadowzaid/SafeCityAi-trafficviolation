import { ArrowDownTrayIcon, ChartBarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { PredictionResponse } from '../types';
import { downloadUrl, resolveAssetUrl } from '../utils/download';

interface Props {
  title: string;
  description: string;
  accept: string;
  mode: 'image' | 'video';
  loading: boolean;
  confidence: number;
  result: PredictionResponse | null;
  onConfidence: (value: number) => void;
  onRun: (file: File) => Promise<void>;
}

export function DetectionPanel({
  title,
  description,
  accept,
  mode,
  loading,
  confidence,
  result,
  onConfidence,
  onRun,
}: Props) {
  const asset = resolveAssetUrl(result?.image_url || result?.video_url);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="light-card rounded-2xl p-6 shadow-xl dark:glass">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-cyanx">{mode} inference</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{title}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
        <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/70 px-6 py-12 text-center transition hover:border-cyanx dark:border-white/15 dark:bg-white/5">
          <PhotoIcon className="h-12 w-12 text-cyanx" />
          <span className="mt-4 text-lg font-black">Drop or choose a file</span>
          <span className="mt-1 text-sm text-slate-500">Secure upload, validated before inference</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onRun(file);
            }}
          />
        </label>
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span>Confidence threshold</span>
            <span>{Math.round(confidence * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={confidence}
            onChange={(event) => onConfidence(Number(event.target.value))}
            className="w-full accent-cyanx"
          />
        </div>
      </section>

      <section className="rounded-2xl bg-ink p-5 text-white shadow-2xl dark:bg-black/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-mint">Result</p>
            <h2 className="mt-1 text-2xl font-black">Annotated output</h2>
          </div>
          {asset && (
            <button
              onClick={() => downloadUrl(asset, mode === 'image' ? 'safecityai-result.jpg' : 'safecityai-video.mp4')}
              className="grid h-11 w-11 place-items-center rounded-xl bg-white text-ink transition hover:bg-cyanx"
              aria-label="Download result"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-slate-950">
          {loading && <div className="h-full w-full skeleton" />}
          {!loading && asset && mode === 'image' && <img src={asset} alt="Annotated result" className="h-full w-full object-contain" />}
          {!loading && asset && mode === 'video' && <video src={asset} controls className="h-full w-full" />}
          {!loading && !asset && (
            <div className="grid h-full place-items-center px-8 text-center text-slate-400">
              Upload media to see bounding boxes, confidence scores, FPS, and detection statistics.
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="FPS" value={result?.fps ?? 0} />
          <Metric label="Latency" value={`${result?.inference_ms ?? 0} ms`} />
          <Metric label="Detections" value={result?.detections.length ?? 0} />
        </div>
        <div className="mt-5 rounded-xl bg-white/10 p-4">
          <div className="mb-3 flex items-center gap-2 font-black">
            <ChartBarIcon className="h-5 w-5 text-cyanx" />
            Statistics
          </div>
          <div className="grid gap-2">
            {['Helmet', 'No_Helmet', 'License_Plate'].map((name) => (
              <div key={name} className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-sm">
                <span>{name}</span>
                <span className="font-black">{result?.statistics?.[name] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
        {result?.detections?.[0] && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 max-h-44 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-mint"
          >
            {JSON.stringify(result.detections.slice(0, 10), null, 2)}
          </motion.pre>
        )}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

export function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Inference failed';
  toast.error(message);
}
