import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { Metadata } from "next";

// export const dynamic = "force-dynamic";
// export const revalidate = 30;
export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const latestReviews = await getReviewsList(3);

  return (
    <section className="m-auto">
      <BiggestHeading className="mb-4">Latest reviews</BiggestHeading>
      <div className="flex justify-start">
        {Array.isArray(latestReviews) && !!latestReviews.length ? (
          <ul className="flex flex-wrap gap-5 justify-start">
            {latestReviews.map((review, index) => (
              <ReviewThumbnail
                key={review.slug}
                slug={review.slug}
                image={review.image}
                title={review.title}
                subtitle={review.subtitle}
                priority={index <= 2}
              />
            ))}
          </ul>
        ) : (
          <p>Sorry, but there is no reviews yet</p>
        )}
      </div>
    </section>
  );
}
