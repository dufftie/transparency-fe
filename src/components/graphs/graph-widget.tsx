'use client';

import React, { JSX, ReactNode } from 'react';

/**
 * GraphWidget component that accepts settings and graph content as props
 * This allows for more flexible composition where settings and graph components
 * can be defined outside and passed in
 */
interface GraphWidgetProps {
  title?: string;
  settings?: ReactNode;
  children: ReactNode;
}

const GraphWidget = ({ title, settings, children }: GraphWidgetProps): JSX.Element => {
  return (
    <div className="graph-widget">
      {(title || settings) && (
        <div className="graph-widget__settings">
          {title && <span className="graph-widget__title">{title}</span>}
          {settings}
        </div>
      )}
      <div className="graph-widget__content">
        {children}
      </div>
    </div>
  );
};

export default GraphWidget;
