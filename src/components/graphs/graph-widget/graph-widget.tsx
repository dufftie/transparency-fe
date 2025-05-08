import React, { JSX, ReactNode } from 'react';
import styles from './graph-widget.module.scss';

interface GraphWidgetProps {
  title?: string;
  description?: string;
  extra?: ReactNode;
  children: ReactNode;
}

export default function GraphWidget({
  title,
  description,
  extra,
  children,
}: GraphWidgetProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.context}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <span className={styles.description}>{description}</span>}
        {extra && <div>{extra}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
