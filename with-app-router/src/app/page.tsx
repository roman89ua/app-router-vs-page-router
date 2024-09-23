import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import { Metadata } from "next";
import ReviewsList from "@/components/ReviewsList";

// export const dynamic = "force-dynamic"; //dynamic rendering of the page
// export const revalidate = 30; //revalidation by type ends
export const metadata: Metadata = {
  title: "Home",
};

const ITEMS_PER_PAGE = 3;

export default async function Home() {
  const { reviews } = await getReviewsList(ITEMS_PER_PAGE);

  return (
    <section className='m-auto'>
      <BiggestHeading className='mb-4'>Latest reviews</BiggestHeading>
      <ReviewsList reviews={reviews} />
    </section>
  );
}
