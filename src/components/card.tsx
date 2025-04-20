import classNames from 'classnames';
import Hint from './hint';

interface CardProps {
  label?: string;
  children: JSX.Element;
  primary?: boolean;
  noBorder?: boolean;
  hint?: string;
  className?: string;
}

const Card = ({ label, children, primary, noBorder, hint, className }: CardProps) => {
  return (
    <div className={classNames('card', className, {
      'card--primary': primary,
      'card--no-border': noBorder,
    })}>
      <div className='card__header'>
        {label && <div className='card__label'>{label}</div>}
        {hint && <Hint title={hint} />}
      </div>
      {children}
    </div>
  );
};

export default Card;
