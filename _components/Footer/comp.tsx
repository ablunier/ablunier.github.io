export default ({ comp, madeWith }: Lume.Data) => {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__wrapper">
          <comp.SocialLinks />
          <p><small>{madeWith} <a href="https://lume.land/" target="_blank">Lume</a></small></p>
        </div>
      </div>
    </footer>
  );
}
