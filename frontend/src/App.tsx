import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { ApiDocs } from './pages/ApiDocs';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { Features } from './pages/Features';
import { ImageDetection } from './pages/ImageDetection';
import { Landing } from './pages/Landing';
import { LiveWebcam } from './pages/LiveWebcam';
import { NotFound } from './pages/NotFound';
import { VideoDetection } from './pages/VideoDetection';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/image-detection" element={<ImageDetection />} />
        <Route path="/video-detection" element={<VideoDetection />} />
        <Route path="/live-webcam" element={<LiveWebcam />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
