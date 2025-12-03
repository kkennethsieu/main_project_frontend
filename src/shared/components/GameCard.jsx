const GameCard = ({ game }) => {
  const { title, releaseYear, imageUrl, metacriticScore, genres } = game;
  const genreList = Array.isArray(genres)
    ? genres
    : typeof genres === "string"
    ? JSON.parse(genres)
    : [];

  console.log(game);
  return (
    <div className="bg-white shadow-md hover:shadow-xl p-3 border border-gray-200 rounded-xl transition cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg w-full h-48 object-cover"
      />

      <div className="flex flex-col gap-1 mt-2">
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>

        <div className="flex justify-between items-center text-gray-500 text-xs">
          <span>{releaseYear}</span>
          <div className="flex gap-1">
            {genreList?.slice(0, 3).map((genre, i) => (
              <span key={i} className="bg-gray-100 px-2 py-0.5 rounded-full">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1 text-gray-700 text-sm">
          ⭐ {metacriticScore}/100
        </div>
      </div>
    </div>
  );
};

export default GameCard;
