import { useState } from 'react';
import toast from 'react-hot-toast';
import { predictVideo } from '../api/client';
import { DetectionPanel, handleError } from '../components/DetectionPanel';
import { PageShell } from '../components/Layout';
import type { PredictionResponse } from '../types';

export function VideoDetection() {
  const [confidence, setConfidence] = useState(0.35);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  async function run(file: File) {
    setLoading(true);
    try {
      const response = await predictVideo(file, confidence);
      setResult(response);
      toast.success('Video processing complete');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <DetectionPanel
        title="Video Detection"
        description="Process traffic footage, preserve annotated video, and inspect aggregate detection statistics."
        accept="video/mp4,video/quicktime,video/x-msvideo"
        mode="video"
        loading={loading}
        confidence={confidence}
        result={result}
        onConfidence={setConfidence}
        onRun={run}
      />
    </PageShell>
  );
}
