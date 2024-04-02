import BiggestHeading from "@/components/BigestHeading";
import { getLatestReview } from "@/services/getReviews.service";
import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const latestReview = await getLatestReview();

  return (
    <section className="m-auto">
      <BiggestHeading className="mb-4">Latest review</BiggestHeading>
      <div className="flex justify-start">
        {!!latestReview ? (
          <ReviewThumbnail
            slug={latestReview.slug}
            image={latestReview.image}
            title={latestReview.title}
          />
        ) : (
          <p>Sorry, but there is no reviews yet</p>
        )}
      </div>
    </section>
  );
}
