'use client';

import React from 'react';
import { ExportOutlined } from '@ant-design/icons';

interface MediaHeaderProps {
  title: string;
  url: string;
  description: string;
}

export default function MediaHeader({ title, url, description }: MediaHeaderProps) {
  return (
    <div className="media-header">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div>
          <ExportOutlined className="media-header__link-icon" />
          <span className="media-header__title">{title}</span>
          <p className="media-header__description">{description}</p>
        </div>
      </a>
    </div>
  );
}
