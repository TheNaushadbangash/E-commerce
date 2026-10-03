import { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  const addReview = (review) => {
    const updatedReviews = [review, ...reviews];

    setReviews(updatedReviews);

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}
