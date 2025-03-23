import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';
import { PopoverProps } from 'antd/lib';

interface HintProps extends PopoverProps {}

const Hint = (props: HintProps) => {
  return (
    <Popover className="hint" classNames={{ root: 'hint__inner' }} trigger="click" {...props}>
      <QuestionCircleOutlined />
    </Popover>
  );
};

export default Hint;
