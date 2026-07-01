import { useState } from 'react';
import toast from 'react-hot-toast';
import { predictImage } from '../api/client';
import { DetectionPanel, handleError } from '../components/DetectionPanel';
import { PageShell } from '../components/Layout';
import type { PredictionResponse } from '../types';

export function ImageDetection() {
  const [confidence, setConfidence] = useState(0.35);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  async function run(file: File) {
    setLoading(true);
    try {
      const response = await predictImage(file, confidence);
      setResult(response);
      toast.success('Image detection complete');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <DetectionPanel
        title="Image Detection"
        description="Upload road images to detect helmets, missing helmets, and license plates with annotated bounding boxes."
        accept="image/png,image/jpeg,image/webp"
        mode="image"
        loading={loading}
        confidence={confidence}
        result={result}
        onConfidence={setConfidence}
        onRun={run}
      />
    </PageShell>
  );
}
