import { Button as BaseButton } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';

const Button = ({ children, ...props }: BaseButtonProps) => {
  return <BaseButton {...props}>{children}</BaseButton>;
};

export default Button;
