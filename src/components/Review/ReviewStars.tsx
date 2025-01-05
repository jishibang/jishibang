import React from "react";
interface ReviewStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}
const ReviewStars: React.FC<ReviewStarsProps> = ({
  rating,
  size = "sm",
  interactive = false,
  onChange,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  const renderStar = (index: number) => {
    const filled = index < rating;
    const starClass = `${sizeClasses[size]} ${
      filled ? "text-yellow-400" : "text-gray-300"
    } ${interactive ? "cursor-pointer" : ""}`;
    return (
      <svg
        key={index}
        className={starClass}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => interactive && onChange?.(index + 1)}
        onMouseEnter={() => interactive && onChange?.(index + 1)}
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
          clipRule="evenodd"
        />
      </svg>
    );
  };
  return (
    <div
      className="flex"
      onMouseLeave={() => interactive && onChange?.(0)}
    >
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
};
export default ReviewStars;
