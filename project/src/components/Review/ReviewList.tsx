import React from "react";
import { useLang } from "../../contexts/LangContext";
import { Review } from "../../types/review";
import ReviewStars from "./ReviewStars";
interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}
const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading }) => {
  const { t } = useLang();
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1677ff] mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">{t("review.loading")}</p>
      </div>
    );
  }
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t("review.noReviews")}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <img
                src={review.userAvatar || "/default-avatar.png"}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">
                    {review.userName}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <ReviewStars rating={review.rating} />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700 whitespace-pre-line">
            {review.content}
          </p>
          {review.reply && (
            <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {t("review.workerReply")}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.replyAt!).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.reply}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ReviewList;
