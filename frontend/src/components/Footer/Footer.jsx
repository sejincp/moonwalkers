import './Footer.css';

export default function Footer({ user, setUser }) {
  return (
    <>
      <nav className="Footer">
        <div className="footer-logo-container">
          <img
            src="/logo-ico-moonwalkers.png"
            alt="moonwalkers-logo-ico"
            className="footer-logo"
          />
        </div>
        <br />
        <p>Sejin &copy;</p>
      </nav>
    </>
  );
}
