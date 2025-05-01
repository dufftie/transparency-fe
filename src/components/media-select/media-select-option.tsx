import React from 'react';
import classNames from 'classnames';
import styles from './media-select.module.scss';
import { Media, SetActiveMedia } from './media-select';

interface MediaSelectOptionProps {
  media: Media;
  setActiveMedia: SetActiveMedia;
}

const MediaSelectOption = ({ media, setActiveMedia }: MediaSelectOptionProps) => {
  const { disabled } = media;

  return (
    <a
      key={media.id}
      href={disabled ? `/support?from=${media.title}` : '/media/' + media.slug}
      onMouseOver={() => disabled ? setActiveMedia(null) : setActiveMedia(media)}
      onMouseLeave={() => setActiveMedia(undefined)}
      className={classNames(styles.option, {
        [styles.disabled]: disabled,
      })}
    >
      {media.title}
    </a>
  );
};

export default MediaSelectOption;
