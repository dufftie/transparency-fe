import React, { useState, useEffect, useRef } from 'react';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface ArticlePreviewProps {
  preview_url: string;
  className?: string;
}

const ArticlePreview = ({ preview_url, className }: ArticlePreviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const prevUrlRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Only set loading to true if preview_url has actually changed
    if (prevUrlRef.current !== null && prevUrlRef.current !== preview_url) {
      setIsLoading(true);
    }
    prevUrlRef.current = preview_url;
  }, [preview_url]);
  
  if (!preview_url) return <Empty description={false} />;
  
  return (
    <div className="article-preview-container">
      {isLoading && (
        <div className="article-preview-loading">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
      <img 
        className={classNames(
          'article-preview', 
          className, 
          { 
            'article-preview--is-loading': isLoading,
            'article-preview--loaded': !isLoading
          }
        )} 
        src={preview_url} 
        alt='article preview image'
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ArticlePreview;