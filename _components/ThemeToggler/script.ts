const cookieThemeMatch = document.cookie.match(/(?:^|; )theme=(dark|light)/);
const themeToggle = document.querySelector('.theme-toggler') as HTMLButtonElement | null;

themeToggle?.setAttribute('aria-pressed', String(cookieThemeMatch?.[1] === 'dark'));

themeToggle?.addEventListener('click', (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const isDark = current !== 'dark';
  const theme = isDark ? 'dark' : 'light';

  html.setAttribute('data-theme', theme);
  button.setAttribute('aria-pressed', String(isDark));
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
});
