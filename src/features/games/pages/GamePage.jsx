//Packages
import { useState } from "react";
import { useParams } from "react-router-dom";
//Components
import Spinner from "components/Spinner";
import AboutGame from "features/games/components/AboutGame";
import GameList from "features/games/components/GameList";
import HeroImage from "features/games/components/HeroImage";
import Reviews from "features/games/components/Reviews";

//Game Not Found
import GameNotFound from "components/GameNotFound";

//Hooks
import { useGame, useReviews } from "../hooks";

function GamePage() {
  const { id } = useParams();

  const {
    data: gameData,
    isLoading: loadingGame,
    isError: gameError,
    error: gameErrorObj,
  } = useGame(id);

  const {
    data: reviews = [],
    isLoading: loadingReviews,
    isError: reviewsError,
    error: reviewsErrorObj,
  } = useReviews(id);

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  const totalPages = Math.ceil(reviews?.length / limit);

  const currentReviews = reviews.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  if (loadingGame || loadingReviews) return <Spinner />;

  if (gameError) return <p>Error loading game: {gameErrorObj.message}</p>;
  if (reviewsError)
    return <p>Error loading reviews: {reviewsErrorObj.message}</p>;

  const screenshotsArray = (() => {
    try {
      return JSON.parse(gameData?.screenshots || "[]");
    } catch {
      return [];
    }
  })();

  return (
    <div>
      {gameData ? (
        <>
          <HeroImage image={screenshotsArray[1] || ""} title={gameData.title} />
          <div className="flex lg:flex-row flex-col gap-6 mx-auto px-4 lg:px-8 py-6 max-w-[1700px]">
            {/* Left side - Reviews */}
            <div className="w-full lg:w-2/3">
              <Reviews
                gameData={gameData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentReviews={currentReviews}
                totalPages={totalPages}
              />
            </div>

            {/* Right side - About Game */}
            <div className="w-full lg:w-1/3">
              <AboutGame gameData={gameData} />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10">
          <GameNotFound />
        </div>
      )}
      <div className="flex flex-col gap-10 mx-auto p-20 max-w-[1700px]">
        <GameList header="Recommended for you" />
      </div>
    </div>
  );
}

export default GamePage;
