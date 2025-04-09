import classNames from 'classnames';
import Hint from './hint';

interface CardProps {
  label: string;
  children: JSX.Element;
  primary?: boolean;
  noBorder?: boolean;
  hint?: string;
}

const Card = ({ label, children, primary, noBorder, hint }: CardProps) => {
  return (
    <div className={classNames('card', {
      'card--primary': primary,
      'card--no-border': noBorder
    })}>
      <div className='card__header'>
        <div className='card__label'>{label}</div>
        <Hint title={hint} />
      </div>
      {children}
    </div>
  );
};

export default Card;
