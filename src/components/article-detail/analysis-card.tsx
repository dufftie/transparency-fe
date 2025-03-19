'use client';

import React, { JSX } from 'react';
import { Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface AnalysisCardProps {
  title: string;
  score: number;
  explanation: string;
  hint?: string | JSX.Element;
}

export default function AnalysisCard(props: AnalysisCardProps) {
  const { title, score, explanation, hint } = props;

  return (
    <div className="analysis-card">
      <span className="analysis-card__title">{title}</span>
      <p className="analysis-card__body">{explanation}</p>
      <div className="analysis-card__details">
        <span>Objectivity: <i>{score} / 10</i></span>
        {hint && (
          <Popover
            title="Prompt used"
            content={hint}
            className="analysis-card-hint"
            classNames={{ root: 'analysis-card-hint__inner' }}
            trigger="click"
          >
            <QuestionCircleOutlined />
          </Popover>
        )}
      </div>
    </div>
  );
}
