import { PageShell } from '../components/Layout';

export function About() {
  return (
    <PageShell>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-black uppercase tracking-[0.22em] text-cyanx">About</p>
          <h1 className="mt-3 text-4xl font-black">Built for safer roads.</h1>
        </div>
        <div className="space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          <p>
            SafeCityAI is an intelligent object detection system focused on traffic safety workflows. It combines YOLOv5, FastAPI, and a premium React dashboard to identify helmet compliance and license plates from road media.
          </p>
          <p>
            The project is owned, designed, and developed by Mohammed Zaid Nayaz and prepared as a complete presentation-ready AI engineering project with training, deployment, reporting, and documentation assets.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
