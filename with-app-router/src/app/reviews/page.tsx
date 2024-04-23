import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
};

async function ReviewsPage() {
  const reviews = await getReviewsList(6);

  return (
    <section title="Reviews Page" className="m-auto">
      <BiggestHeading className="mb-4">Reviews page</BiggestHeading>
      <ul className="flex flex-wrap gap-5 justify-start">
        {reviews.map((review, index) => (
          <li key={review.title + index}>
            <ReviewThumbnail
              slug={review.slug}
              image={review.image}
              title={review.title}
              subtitle={review.subtitle}
              priority={index <= 2}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ReviewsPage;
