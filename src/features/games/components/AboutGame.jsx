import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Button from "components/Button";
import AddReviewsPopup from "games/components/AddReviewsPopup";

//Hooks/Prpoviders
import { useCreateReview } from "../hooks/useCreateReview";
import { useAuth } from "provider/AuthProvider";

function AboutGame({ gameData }) {
  const { releaseYear, genres, developer, publisher, description } = gameData;
  const { user } = useAuth();

  const nav = useNavigate();
  // Normalize genres in case API sends stringified array
  const genreList = Array.isArray(genres)
    ? genres
    : typeof genres === "string"
    ? JSON.parse(genres)
    : [];

  const [isOpen, setIsOpen] = useState(false);

  const createReviewMutation = useCreateReview(gameData.id, user?.userId);
  const handleAdd = (newData) => {
    // craete must contain reviewScore, reviewTitle,reviewBody, and userId
    const newReview = {
      userId: user.userId,
      gameId: gameData.id,
      reviewScore: newData.reviewScore,
      reviewTitle: newData.reviewTitle,
      reviewBody: newData.reviewBody,
      category: newData.category,
    };
    createReviewMutation.mutate(newReview);
  };

  const handleOpen = () => {
    if (!user) {
      nav("/login");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 border border-gray-200 rounded-2xl">
        {/* Header */}
        <h2 className="mb-6 pb-3 border-white/10 border-b font-bold text-3xl">
          About This Game
        </h2>

        {/* Game Info Grid */}
        <section className="gap-x-8 gap-y-4 grid grid-cols-2 max-w-xl">
          {/* Labels */}
          <div className="space-y-3 font-medium text-gray-800">
            <p>Released On:</p>
            <p>Genre:</p>
            <p>Developer:</p>
            <p>Publisher:</p>
            <p>Description:</p>
          </div>

          {/* Values */}
          <div className="space-y-3 text-gray-700">
            <p className="font-semibold">{releaseYear}</p>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2">
              {genreList?.slice(0, 3).map((genre, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded-full font-medium text-gray-800 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="font-semibold">{developer}</p>
            <p className="font-semibold">{publisher}</p>

            {/* Truncated description with ellipsis */}
            <p className="font-normal text-gray-700 leading-relaxed">
              {description?.length > 350
                ? `${description.slice(0, 350)}...`
                : description}
            </p>
          </div>
        </section>

        {/* Review Button */}
        <div className="mt-8">
          <Button
            className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg px-6 py-3 rounded-xl w-full font-semibold transition-colors"
            onClick={handleOpen}
          >
            {user ? "✍ Review This Game" : "Log in to Review This Game"}
          </Button>
        </div>
      </div>

      {/* Add Review Popup */}

      {isOpen && user && (
        <AddReviewsPopup
          onSetReview={handleAdd}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          gameData={gameData}
          reviewToEdit={null}
        />
      )}
    </>
  );
}

export default AboutGame;
