import React, { useState } from "react";
import { useLang } from "../../contexts/LangContext";
import ReviewStars from "./ReviewStars";
interface ReviewFormProps {
  workerId: string;
  onSubmit: (data: { rating: number; content: string }) => Promise<void>;
}
const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const { t } = useLang();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError(t("review.ratingRequired"));
      return;
    }
    if (!content.trim()) {
      setError(t("review.contentRequired"));
      return;
    }
    try {
      setLoading(true);
      setError("");
      await onSubmit({ rating, content });
      setRating(0);
      setContent("");
    } catch (err: any) {
      setError(err.message || t("review.submitError"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("review.rating")}
        </label>
        <ReviewStars
          rating={rating}
          size="lg"
          interactive
          onChange={setRating}
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("review.content")}
        </label>
        <textarea
          id="content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          placeholder={t("review.contentPlaceholder")}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff] disabled:bg-blue-300"
      >
        {loading ? t("review.submitting") : t("review.submit")}
      </button>
    </form>
  );
};
export default ReviewForm;

