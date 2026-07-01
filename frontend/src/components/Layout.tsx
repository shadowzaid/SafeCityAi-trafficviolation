import { NavLink, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  CameraIcon,
  MoonIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const links = [
  ['Dashboard', '/dashboard'],
  ['Image', '/image-detection'],
  ['Video', '/video-detection'],
  ['Webcam', '/live-webcam'],
  ['API Docs', '/api-docs'],
  ['Features', '/features'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export function Layout() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-ink transition dark:bg-carbon dark:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-carbon/75">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white shadow-glow dark:bg-white dark:text-ink">
              <ShieldCheckIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight">SafeCityAI</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">YOLOv5 Traffic Intelligence</span>
            </span>
          </NavLink>
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-ink text-white dark:bg-white dark:text-ink'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/dashboard"
              className="hidden items-center gap-2 rounded-lg bg-cyanx px-4 py-2 text-sm font-black text-ink shadow-glow sm:flex"
            >
              <SparklesIcon className="h-4 w-4" />
              Launch
            </NavLink>
            <button
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-ink transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {links.slice(0, 6).map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold dark:border-white/10"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-8 dark:border-white/10 dark:bg-carbon">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-ink dark:text-white">Designed & Developed by Mohammed Zaid Nayaz</p>
            <p>Project Owner: Mohammed Zaid Nayaz</p>
          </div>
          <div className="flex items-center gap-2">
            <CameraIcon className="h-5 w-5 text-cyanx" />
            <span>Copyright © 2026 Mohammed Zaid Nayaz. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto min-h-[74vh] max-w-7xl px-4 py-10"
    >
      {children}
    </motion.section>
  );
}
