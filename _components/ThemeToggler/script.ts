const themeToggle = document.querySelector('.theme-toggler') as HTMLButtonElement | null;
const html = document.documentElement;

themeToggle?.setAttribute('aria-pressed', String(html.getAttribute('data-theme') === 'dark'));

themeToggle?.addEventListener('click', (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  const isDark = html.getAttribute('data-theme') !== 'dark';
  const theme = isDark ? 'dark' : 'light';

  html.setAttribute('data-theme', theme);
  button.setAttribute('aria-pressed', String(isDark));
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!document.cookie.match(/(?:^|; )theme=(dark|light)/)) {
    const theme = e.matches ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    themeToggle?.setAttribute('aria-pressed', String(e.matches));
  }
});
