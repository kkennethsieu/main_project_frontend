import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Components
import Button from "components/Button";
import Pagination from "components/Pagination";
import AddReviewsPopup from "games/components/AddReviewsPopup";
import ReviewCard from "games/components/ReviewCard";
import ReviewFilter from "games/components/ReviewFilter";
import NoDataYet from "components/NoDataYet";

//Other
import { useCreateReview } from "../hooks";
import { useAuth } from "provider/AuthProvider";

function Reviews({
  gameData,
  currentPage,
  setCurrentPage,
  totalPages,
  currentReviews,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  const createReviewMutation = useCreateReview(gameData.id);

  const handleAdd = (newData) => {
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
      <div className="space-y-8 p-6 md:p-8">
        <h2 className="font-bold text-3xl">Reviews: {gameData.gameName}</h2>
        <section className="flex flex-col justify-center items-center mx-auto">
          {currentReviews && currentReviews.length > 0 ? (
            <>
              <ReviewFilter />
              {currentReviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <NoDataYet
              message="No reviews yet."
              actionText="Add the first review"
              onAction={() => setIsOpen(true)}
              user={user}
            />
          )}
          <div className="mt-8">
            <Button
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl w-full font-semibold transition-colors"
              onClick={handleOpen}
            >
              {user
                ? `Leave a review for ${gameData.title}`
                : `Log in to Review ${gameData.title}`}
            </Button>
          </div>
        </section>
      </div>
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

export default Reviews;
