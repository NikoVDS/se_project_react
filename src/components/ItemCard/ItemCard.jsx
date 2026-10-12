import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked =
    currentUser && item.likes
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    if (!currentUser || !onCardLike) return;

    onCardLike({
      id: item._id,
      isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>

        {currentUser && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_liked" : ""
            }`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike item" : "Like item"}
            aria-pressed={isLiked}
          >
            {isLiked ? "♥" : "♡"}
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
