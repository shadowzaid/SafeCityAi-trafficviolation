import axios from 'axios';
import type { ApiMetrics, PredictionResponse } from '../types';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

export async function predictImage(file: File, confidence: number): Promise<PredictionResponse> {
  const data = new FormData();
  data.append('file', file);
  const response = await api.post<PredictionResponse>('/predict', data, {
    params: { confidence },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function predictVideo(file: File, confidence: number): Promise<PredictionResponse> {
  const data = new FormData();
  data.append('file', file);
  const response = await api.post<PredictionResponse>('/predict-video', data, {
    params: { confidence },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function predictWebcam(blob: Blob, confidence: number): Promise<PredictionResponse> {
  const data = new FormData();
  data.append('file', blob, 'webcam-frame.jpg');
  const response = await api.post<PredictionResponse>('/webcam', data, {
    params: { confidence },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function getMetrics(): Promise<ApiMetrics> {
  const response = await api.get<ApiMetrics>('/metrics');
  return response.data;
}
