import { EnvelopeIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { PageShell } from '../components/Layout';

export function Contact() {
  return (
    <PageShell>
      <div className="max-w-3xl">
        <p className="font-black uppercase tracking-[0.22em] text-cyanx">Contact</p>
        <h1 className="mt-3 text-4xl font-black">Project Owner</h1>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card icon={UserIcon} title="Owner" body="Mohammed Zaid Nayaz" />
        <Card icon={EnvelopeIcon} title="Project" body="SafeCityAI – Intelligent Traffic Violation Detection" />
        <Card icon={MapPinIcon} title="Availability" body="Ready for demos, reviews, and deployment setup." />
      </div>
    </PageShell>
  );
}

function Card({ icon: Icon, title, body }: { icon: typeof UserIcon; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-white/5">
      <Icon className="h-10 w-10 text-cyanx" />
      <h2 className="mt-5 text-xl font-black">{title}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{body}</p>
    </div>
  );
}
