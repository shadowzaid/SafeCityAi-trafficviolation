import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout';

export function NotFound() {
  return (
    <PageShell>
      <div className="grid min-h-[56vh] place-items-center text-center">
        <div>
          <p className="text-7xl font-black text-cyanx">404</p>
          <h1 className="mt-4 text-4xl font-black">Page not found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">The requested SafeCityAI page does not exist.</p>
          <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-ink px-6 py-3 font-black text-white dark:bg-white dark:text-ink">
            Return to dashboard
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
