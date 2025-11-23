import { useEffect, useState } from "react";

import Button from "components/Button";
import Modal from "components/Modal";
import RatingSlider from "games/components/RatingSlider";
import ReviewTextBox from "games/components/ReviewTextBox";

function AddReviewsPopup({
  isOpen,
  setIsOpen,
  gameData,
  reviewToEdit = null,
  onSetReview,
}) {
  const { title, imageUrl } = gameData;
  const [reviewScore, setReviewScore] = useState(
    reviewToEdit?.reviewScore || null
  );
  const [review, setReview] = useState({
    title: reviewToEdit?.reviewTitle || "",
    body: reviewToEdit?.reviewBody || "",
  });
  //This will set the initial values when editing a review IF THERE IS A REVIEW
  useEffect(() => {
    if (!reviewToEdit) return;

    setReviewScore(reviewToEdit.reviewScore);
    setReview({
      title: reviewToEdit.reviewTitle,
      body: reviewToEdit.reviewBody,
    });
  }, [reviewToEdit]);

  //Handle adding a new review
  const handleAdd = () => {
    const newReview = {
      reviewScore,
      reviewTitle: review.title,
      reviewBody: review.body,
      //need to change this
      category: "Recommended",
    };
    onSetReview(newReview);
    setReviewScore(null);
    setReview({ title: "", body: "" });
  };
  //Handles editing an exisitng reivew
  const handleEdit = () => {
    const updatedReview = {
      ...reviewToEdit,
      reviewScore,
      reviewTitle: review.title,
      reviewBody: review.body,
    };
    console.log("edited");
    onSetReview(updatedReview);
  };

  const handleSubmit = () => {
    if (reviewToEdit) {
      handleEdit();
    } else {
      handleAdd();
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setReviewScore(reviewToEdit?.reviewScore || null);
    setReview({
      title: reviewToEdit?.reviewTitle || "",
      body: reviewToEdit?.reviewBody || "",
    });
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <main className="space-y-2 divide-y divide-gray-300">
          <div className="space-y-3">
            <p className="font-bold text-xl">
              {reviewToEdit ? "Edit Review" : "Leave a Review"}
            </p>
            <p className="">Share your thoughts about {title}!</p>
          </div>

          <section className="flex items-center gap-4 py-2">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg w-24 h-24 object-cover"
            />
            <div className="flex flex-col w-full">
              <h2 className="font-semibold text-gray-800">{title}</h2>
            </div>
          </section>

          <RatingSlider onSelect={setReviewScore} value={reviewScore} />
          <ReviewTextBox onChange={setReview} value={review} />
        </main>

        <div className="flex gap-3">
          <Button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 w-full"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 w-full"
          >
            {reviewToEdit ? "Update Review" : "Submit"}
          </Button>
        </div>
        <p className="text-sm text-center">
          {reviewToEdit
            ? "Clicking 'Cancel' will discard your changes and restore your original review."
            : "Clicking 'Cancel' will permanently delete your review."}
        </p>
      </form>
    </Modal>
  );
}

export default AddReviewsPopup;
