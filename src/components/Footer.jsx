import styles from './Footer.module.css';

function Footer() {
  return (
    <footer id={styles.footer}>
      <a className={styles.copyright} href="https://x.com/ovxbjh" target="_blank">
        ⓒ {new Date().getFullYear()} <strong>ov.</strong> All rights reserved
      </a>
    </footer>
  );
}

export default Footer;
