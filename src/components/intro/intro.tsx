'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './intro.module.scss';

const Intro = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, descriptionRef.current, prismRef.current].filter(Boolean);
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          // Add floating animation for prism
          gsap.to(prismRef.current, {
            y: '+=10',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }
    );

    gsap.to(prismRef.current, {
      opacity: 0.8,
      duration: 0.5,
      delay: 0.5
    });
  }, []);

  return (
    <div className={styles.intro}>
      <div ref={prismRef} className={styles.prism} />

      <h1 ref={titleRef} className={styles.title}>
        Läbipaistvus
      </h1>
      <p ref={descriptionRef} className={styles.description}>
        an independent non-profit organization focused on making media biases in Estonia
        transparent.
      </p>
    </div>
  );
};

export default Intro;
