import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(i <= Math.round(rating) ? <AiFillStar key={i} className="text-yellow-500" /> : <AiOutlineStar key={i} className="text-gray-400" />);
  }

  return <div className="flex items-center">{stars}</div>;
};
export default StarRating;