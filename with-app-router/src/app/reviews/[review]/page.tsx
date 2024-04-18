import { getReview, getSlugs } from "@/services/reviews.service";
import Review from "@/components/Review";
import { Metadata } from "next";

type ReviewPageProps = {
  params: { review: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ review: slug }));
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(params.review);
  const title = review.title;

  return {
    title: title,
    description: `${title} page`,
  };
}

async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReview(params.review);

  return <Review {...review} />;
}

export default ReviewPage;
