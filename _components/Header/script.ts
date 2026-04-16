const menuToggler = document.querySelector('.site-header__menu-toggler') as HTMLButtonElement | null;

menuToggler?.addEventListener('click', (event) => {
  const overlay = document.querySelector('.site-header__overlay') as HTMLElement;
  const button = event.currentTarget as HTMLButtonElement;
  const isOpen = overlay.classList.contains('open');

  button.setAttribute('aria-expanded', String(!isOpen));
  overlay.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
});
