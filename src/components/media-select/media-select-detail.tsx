import { isNull, isUndefined } from 'lodash';
import ArticlesCount from '@/components/articles-count';
import Card from '@/components/card';

interface Media {
  title: string;
  editors?: Array<{ name: string }>;
  description: string;
  analyzed_count: number;
  total_count: number;
}

interface MediaSelectDetailProps {
  media: Media | null | undefined;
}

const MediaSelectDetail = ({ media }: MediaSelectDetailProps) => {
  if (isUndefined(media)) return null;

  if (isNull(media)) {
    return (
      <div className="media-select-detail">
        <p className="media-select-detail__description">
          Unfortunately this media was not yet analysed. Please consider supporting the project in
          order to cover more media.
        </p>
      </div>
    );
  }

  const { title, editors, description, analyzed_count, total_count } = media;
  const editor = editors && editors[editors?.length - 1] || null;
  return (
    <div className="media-select-detail">
      <div className="media-select-detail__header">
        <p className="media-select-detail__title">{title}</p>
        {editor && <Card label='Editor-in-Chief' noBorder><span>{editor.name}</span></Card>}
        <ArticlesCount analyzed_count={analyzed_count} total_count={total_count} />
      </div>
      <p className="media-select-detail__description">{description}</p>
    </div>
  );
};

export default MediaSelectDetail;
