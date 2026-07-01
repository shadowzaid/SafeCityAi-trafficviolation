import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { CameraIcon } from '@heroicons/react/24/outline';
import { predictWebcam } from '../api/client';
import { PageShell } from '../components/Layout';
import type { PredictionResponse } from '../types';
import { resolveAssetUrl } from '../utils/download';

export function LiveWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [confidence, setConfidence] = useState(0.35);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setStreaming(true);
    }
  }

  async function capture() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        const response = await predictWebcam(blob, confidence);
        setResult(response);
        toast.success('Webcam frame analyzed');
      } catch {
        toast.error('Webcam inference failed');
      }
    }, 'image/jpeg', 0.92);
  }

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-ink p-6 text-white">
          <p className="font-black uppercase tracking-[0.22em] text-cyanx">Live inference</p>
          <h1 className="mt-3 text-4xl font-black">Live Webcam</h1>
          <div className="mt-6 aspect-video overflow-hidden rounded-xl bg-black">
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={startCamera} className="inline-flex items-center gap-2 rounded-xl bg-cyanx px-5 py-3 font-black text-ink">
              <CameraIcon className="h-5 w-5" /> Start Camera
            </button>
            <button disabled={!streaming} onClick={capture} className="rounded-xl border border-white/20 px-5 py-3 font-black disabled:opacity-40">
              Capture Frame
            </button>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>Confidence threshold</span>
              <span>{Math.round(confidence * 100)}%</span>
            </div>
            <input className="w-full accent-cyanx" type="range" min="0.05" max="0.95" step="0.05" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-black">Latest annotated frame</h2>
          <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-slate-950">
            {result?.image_url ? (
              <img src={resolveAssetUrl(result.image_url)} alt="Webcam result" className="h-full w-full object-contain" />
            ) : (
              <div className="grid h-full place-items-center text-slate-400">Capture a frame to see results.</div>
            )}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {['Helmet', 'No_Helmet', 'License_Plate'].map((name) => (
              <div key={name} className="rounded-xl bg-slate-100 p-4 dark:bg-white/10">
                <p className="text-xs text-slate-500">{name}</p>
                <p className="text-2xl font-black">{result?.statistics?.[name] ?? 0}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
