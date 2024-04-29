import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { Metadata } from "next";

// export const dynamic = "force-dynamic"; //dynamic rendering of the page
// export const revalidate = 30; //revalidation by type ends
export const metadata: Metadata = {
  title: "Home",
};

const ITEMS_PER_PAGE = 3;

export default async function Home() {
  const { reviews } = await getReviewsList(ITEMS_PER_PAGE);

  return (
    <section className="m-auto">
      <BiggestHeading className="mb-4">Latest reviews</BiggestHeading>
      <div className="flex justify-start">
        {Array.isArray(reviews) && !!reviews.length ? (
          <ul className="flex flex-wrap gap-5 justify-start">
            {reviews.map((review, index) => (
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
