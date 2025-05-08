import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__menu}>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className={styles.footer__logo}>
        MTÜ Läbipaistvus
      </div>
    </footer>
  );
};

export default Footer; 