'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import classNames from 'classnames';
import styles from './articles-count.module.scss';

interface ArticlesCountProps {
  total_count: number;
  analyzed_count: number;
  layout?: 'horizontal' | 'vertical';
}

export default function ArticlesCount({
  total_count,
  analyzed_count,
  layout = 'horizontal',
}: ArticlesCountProps) {
  const scopeRef = useRef(null);
  const totalCountRef = useRef(null);
  const analyzedCountRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        scopeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );

      const animateNumber = (element: HTMLElement, endValue: number) => {
        gsap.fromTo(
          element,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            ease: 'expo.out',
            modifiers: {
              innerText: function (innerText) {
                return gsap.utils
                  .snap(1, innerText)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              },
            },
          }
        );

        gsap.fromTo(
          `.${styles.count__value}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      };

      animateNumber(totalCountRef.current!, total_count);
      animateNumber(analyzedCountRef.current!, analyzed_count);
    },
    { scope: scopeRef, dependencies: [total_count, analyzed_count] }
  );

  return (
    <div className={classNames(styles.count, styles[`count--${layout}`])} ref={scopeRef}>
      <div className={styles.count__value}>
        <div className={styles.count__label}>Scanned</div>
        <span ref={totalCountRef}>{total_count.toLocaleString()}</span>
      </div>
      <div className={styles.count__value}>
        <div className={styles.count__label}>Analysed</div>
        <span ref={analyzedCountRef}>{analyzed_count.toLocaleString()}</span>
      </div>
    </div>
  );
}
