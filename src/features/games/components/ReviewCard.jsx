import { useDislikeReview, useLikeReview } from "../hooks";
import { useAuth } from "provider/AuthProvider";

export default function ReviewCard({ review }) {
  const { reviewScore, reviewBody, reviewTitle, createdAt, gameId, reviewId } =
    review;
  const { username, avatarURL } = review.user || {};
  const { likes, dislikes } = review.likesCount || {};

  const { user } = useAuth();
  const likeReview = useLikeReview(gameId, reviewId, user.userId);
  const dislikeReview = useDislikeReview(gameId, reviewId, user.userId);
  const handleLike = () => {
    likeReview.mutate();
    console.log("liked");
  };
  const handleDislike = () => {
    dislikeReview.mutate();
    console.log("liked");
  };

  return (
    <div className="bg-white shadow-sm hover:shadow-md mb-5 p-5 border border-gray-200 rounded-2xl w-full transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          {avatarURL && (
            <img
              src={avatarURL}
              alt={username}
              className="rounded-full w-6 h-6 object-cover"
            />
          )}
          <p className="font-semibold">{username || "Unknown"}</p>
        </div>
        {createdAt && (
          <p>
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Title */}
      {reviewTitle && (
        <h3 className="mb-2 font-semibold text-gray-900 text-lg">
          {reviewTitle}
        </h3>
      )}

      {/* Body */}
      {reviewBody && (
        <p className="mb-4 text-gray-700 text-sm leading-relaxed">
          {reviewBody}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {reviewScore != null && (
            <span className="bg-orange-100 px-2.5 py-1 rounded-md font-semibold text-orange-600">
              ★ {reviewScore}/10
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-gray-500 text-xs">
          <button
            className="flex items-center gap-1"
            onClick={() => handleLike()}
          >
            👍 {likes || 0}
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => handleDislike()}
          >
            👎 {dislikes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
