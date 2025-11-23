//Packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Pagination from "components/Pagination.jsx";
import UserReviewCard from "features/user/components/UserReviewCard";
//Other
import Spinner from "components/Spinner";
import NoDataYet from "components/NoDataYet";
import { useAuth } from "provider/AuthProvider";
//Hooks
import { useReviewsWithGame } from "../hooks/useReviewsWithGame";

function UserReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const nav = useNavigate();
  const {
    data: reviewsWithGame,
    isLoading,
    isError,
    error,
  } = useReviewsWithGame(user?.userId);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error:{error}</div>;
  }
  const limit = 3;
  const totalPages = Math.ceil(reviewsWithGame.length / limit);
  const currentReviews = reviewsWithGame.slice(0, 0);
  // const currentReviews = reviewsWithGame.slice(
  //   (currentPage - 1) * limit,
  //   currentPage * limit
  // );

  return (
    <div className="flex flex-col gap-2 space-y-3 p-4">
      <h2 className="mb-6 pb-1 font-extrabold text-gray-900 text-2xl">
        My Reviews
        <span className="block mt-1 border-gray-300 border-b w-40"></span>
      </h2>
      <div className="flex justify-center mx-auto">
        {currentReviews.length > 0 ? (
          <>
            <div className="gap-6 grid grid-cols-3">
              {currentReviews.map((reviewAndData) => (
                <UserReviewCard
                  key={reviewAndData.reviewId}
                  reviewAndData={reviewAndData}
                />
              ))}
            </div>
            <div className="flex justify-center mx-auto">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : (
          <NoDataYet
            message="No reviews yet."
            actionText="Add the first review"
            user={user}
            onAction={() => nav("/")}
          />
        )}
      </div>
    </div>
  );
}

export default UserReviewsPage;
