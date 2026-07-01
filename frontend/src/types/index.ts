export interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface PredictionResponse {
  detections: Detection[];
  image_url?: string;
  video_url?: string;
  fps: number;
  inference_ms: number;
  statistics: Record<string, number>;
}

export interface ApiMetrics {
  total_requests: number;
  image_requests: number;
  video_requests: number;
  webcam_requests: number;
  detections_by_class: Record<string, number>;
  average_latency_ms: number;
}
