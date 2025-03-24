import React from 'react';
import { Alert } from 'antd';

interface ArticleErrorProps {
  message: string;
}

const ArticleError = ({ message }: ArticleErrorProps) => {
  return (
    <div className="article-error">
      <Alert
        message="Error"
        description={message}
        type="error"
        showIcon
      />
    </div>
  );
};

export default ArticleError;