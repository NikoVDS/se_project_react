import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({
      id: item._id,
      isLiked: item.isLiked,
    });
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      <button
        type="button"
        className={`card__like-button ${
          item.isLiked ? "card__like-button_liked" : ""
        }`}
        onClick={handleLikeClick}
      >
        {item.isLiked ? "♥ Liked" : "♡ Like"}
      </button>
    </li>
  );
}

export default ItemCard;
