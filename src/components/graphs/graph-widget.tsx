'use client';

import React, { JSX, ReactNode } from 'react';

/**
 * GraphWidget component that accepts settings and graph content as props
 * This allows for more flexible composition where settings and graph components
 * can be defined outside and passed in
 */
interface GraphWidgetProps {
  title?: string;
  description?: string;
  extra?: ReactNode;
  children: ReactNode;
}

const GraphWidget = ({ title, description, extra, children }: GraphWidgetProps): JSX.Element => {
  return (
    <div className="graph-widget">
      <div className="graph-widget__context">
        {title && <h3 className="graph-widget__title">{title}</h3>}
        {description && <span className="graph-widget__description">{description}</span>}
        {extra && <div className="graph-widget__extra">{extra}</div>}
      </div>
      <div className="graph-widget__content">{children}</div>
    </div>
  );
};

export default GraphWidget;
