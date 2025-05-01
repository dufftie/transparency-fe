import { isNull, isUndefined } from 'lodash';
import ArticlesCount from '@/components/articles-count';
import Card from '@/components/card';
import styles from './media-select.module.scss';
import { Media } from './media-select';

interface MediaSelectDetailProps {
  media: Media | null | undefined;
}

const MediaSelectDetail = ({ media }: MediaSelectDetailProps) => {
  if (isUndefined(media)) return null;

  if (isNull(media)) {
    return (
      <div className={styles.detail}>
        <p className={styles.detailDescription}>
          Unfortunately this media was not yet analysed. Please consider supporting the project in
          order to cover more media.
        </p>
      </div>
    );
  }

  const { title, editors, description, analyzed_count, total_count } = media;
  const editor = editors && editors[editors?.length - 1] || null;
  return (
    <div className={styles.detail}>
      <div className={styles.detailHeader}>
        <p className={styles.detailTitle}>{title}</p>
        {editor && <Card label='Editor-in-Chief' borderless><span>{editor.name}</span></Card>}
        <ArticlesCount analyzed_count={analyzed_count as number} total_count={total_count as number} />
      </div>
      <p className={styles.detailDescription}>{description}</p>
    </div>
  );
};

export default MediaSelectDetail;
