const Card = ({ label, content }) => {
  return (
    <div className='card'>
      <div className='card__label'>{label}</div>
      <div className='card__content'>{content}</div>
    </div>
  );
};

export default Card;
