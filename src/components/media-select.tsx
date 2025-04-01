'use client';

import { JSX, useRef, useState } from 'react';
import ArticlesCount from '@/components/articles-count';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const MediaSelect = ({ medias }): JSX.Element => {
  const scopeRef = useRef(null);
  const [activeMedia, setActiveMedia] = useState(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.media-select-detail__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.inOut' }
      );
    },
    { scope: scopeRef, dependencies: [activeMedia] }
  );

  return (
    <div className="media-select">
      <div className="media-select__title">Medias</div>
      <div className="media-select__options">
        {medias.map(media => (
          <a
            key={media.id}
            href={'/media/' + media.slug}
            onMouseOver={() => setActiveMedia(media)}
            onMouseLeave={() => setActiveMedia(null)}
          >
            {media.title}
          </a>
        ))}
      </div>
      <div className="media-select__details" ref={scopeRef}>
        {activeMedia && (
          <div className="media-select-detail">
            <p className="media-select-detail__description">{activeMedia.description}</p>
            <ArticlesCount
              analyzed_count={activeMedia.analyzed_count}
              total_count={activeMedia.total_count}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSelect;
