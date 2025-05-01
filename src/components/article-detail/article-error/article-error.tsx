import React from 'react';
import { Alert } from 'antd';
import styles from './article-error.module.scss';

interface ArticleErrorProps {
  message: string;
}

export const ArticleError = ({ message }: ArticleErrorProps) => {
  return (
    <div className={styles.error}>
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