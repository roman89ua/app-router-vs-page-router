import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { ReviewDataWithSlug } from "@/components/Review/types";

function ReviewsList({
  reviews,
}: {
  reviews: Omit<ReviewDataWithSlug, "body">[];
}) {
  return (
    <div className='flex justify-start'>
      {Array.isArray(reviews) && !!reviews.length ? (
        <ul className='flex flex-wrap gap-5 justify-start'>
          {reviews.map((review, index) => (
            <ReviewThumbnail
              key={review.slug}
              slug={review.slug}
              image={review.image}
              title={review.title}
              subtitle={review.subtitle}
              priority={index <= 5}
            />
          ))}
        </ul>
      ) : (
        <p>Sorry, but there is no reviews yet</p>
      )}
    </div>
  );
}
export default ReviewsList;
