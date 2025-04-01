import React from 'react';
import classNames from 'classnames';

const MediaSelectOption = ({ media, setActiveMedia }) => {
  const { disabled } = media;

  return (
    <a
      key={media.id}
      href={disabled ? `/donate?from=${media.title}` : '/media/' + media.slug}
      onMouseOver={() => disabled ? setActiveMedia(null) : setActiveMedia(media)}
      onMouseLeave={() => setActiveMedia(undefined)}
      className={classNames('media-select-option', {
        'media-select-option--disabled': disabled,
      })}
    >
      {media.title}
    </a>
  );
};

export default MediaSelectOption;
