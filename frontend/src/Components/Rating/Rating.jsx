import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// Pick the right star icon for a given position (1-5) based on the rating:
// full star if the rating reaches it, half star if it's within half a point,
// empty star otherwise.
const starFor = (position, value) => {
  if (value >= position) return <FaStar />;
  if (value >= position - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((position) => (
        <span key={position}>{starFor(position, value)}</span>
      ))}
      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};

export default Rating;
