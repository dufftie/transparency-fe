import React, { useState, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

interface ArticlePreviewProps {
  preview_url: string;
  className?: string;
}

const ArticlePreview = ({ preview_url, className }: ArticlePreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Reset loading state when preview_url changes
  useEffect(() => {
    setIsLoading(true);
  }, [preview_url]);
  
  if (!preview_url) return <Empty description={false} />;
  
  return (
    <div className="article-preview-container">
      {isLoading && (
        <div className="article-preview-loading">
          <Spin />
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