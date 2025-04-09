'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import classNames from 'classnames';

const ArticlesCount = ({ total_count, analyzed_count, layout = 'horizontal' }) => {
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

      const animateNumber = (element, endValue) => {
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
          '.articles-count__value',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      };

      animateNumber(totalCountRef.current, total_count);
      animateNumber(analyzedCountRef.current, analyzed_count);
    },
    { scope: scopeRef, dependencies: [total_count, analyzed_count] }
  );

  return (
    <div className={classNames('articles-count', `articles-count--${layout}`)} ref={scopeRef}>
      <div className="articles-count__value">
        <div className="articles-count__label">Scanned</div>
        <span ref={totalCountRef}>{total_count.toLocaleString()}</span>
      </div>
      <div className="articles-count__value">
        <div className="articles-count__label">Analysed</div>
        <span ref={analyzedCountRef}>{analyzed_count.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ArticlesCount;
