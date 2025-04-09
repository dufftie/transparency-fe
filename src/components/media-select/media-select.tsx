'use client';

import { JSX, useRef, useState } from 'react';
import ArticlesCount from '@/components/articles-count';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import MediaSelectOption from '@/components/media-select/media-select-option';
import { groupBy, indexOf, isNull, sortBy } from 'lodash';
import map from 'lodash/map';
import MediaSelectDetail from '@/components/media-select/media-select-detail';

const MediaSelect = ({ medias }): JSX.Element => {
  const scopeRef = useRef(null);
  const [activeMedia, setActiveMedia] = useState(undefined);

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

  useGSAP(
    () => {
      gsap.fromTo(
        '.media-select-option',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.2, ease: 'power2.out' }
      );
    },
    { scope: scopeRef }
  );

  const fullMediasList = [
    ...medias,
    // MEDIA CHANNELS THAT WEREN'T YET ANALYSED
    { disabled: true, title: 'Delfi', language_code: 'et' },
    { disabled: true, title: 'rus.Delfi', language_code: 'ru' },
    { disabled: true, title: 'ERR', language_code: 'et' },
    { disabled: true, title: 'rus.ERR', language_code: 'ru' },
    { disabled: true, title: 'Õhtuleht', language_code: 'et' },
  ];

  const groupedMedias = groupBy(fullMediasList, 'language_code');

  const languageOrder = ['et', 'ru', 'en'];

  const orderedLists = sortBy(
    map(groupedMedias, (items, code) => ({ title: code, items })),
    group => indexOf(languageOrder, group.title) // Sort based on languageOrder array
  );

  return (
    <div className="media-select" ref={scopeRef}>
      <div className="media-select__title">Medias</div>
      <div className="media-select__options">
        {orderedLists.map((list, index) => (
          <div className="media-select-option-group" key={index}>
            <div className="media-select-option-group__title">{list.title}</div>
            {list.items.map((media, index) => (
              <MediaSelectOption key={index} media={media} setActiveMedia={setActiveMedia} />
            ))}
          </div>
        ))}
      </div>
      <div className="media-select__details">
        <MediaSelectDetail media={activeMedia} />
      </div>
    </div>
  );
};

export default MediaSelect;
