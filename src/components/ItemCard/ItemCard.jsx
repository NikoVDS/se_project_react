import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
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
        className={`card__like-button ${isLiked ? "card__like-button_liked" : ""}`}
        onClick={handleLikeClick}
      >
        {isLiked ? "♥ Liked" : "♡ Like"}
      </button>
    </li>
  );
}

export default ItemCard;
