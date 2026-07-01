import { useEffect, useState } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('safecity-theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('safecity-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((value) => !value) };
}
