import { getReview, getSlugs } from "@/services/reviews.service";
import Review from "@/components/Review";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ReviewPageProps = {
  params: { review: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ review: slug }));
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(params.review);

  if (!review) {
    notFound();
  }

  const title = review.title;

  return {
    title,
    description: `${title} page`,
  };
}

async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReview(params.review);

  if (!review) {
    notFound();
  }

  return <Review {...review} />;
}

export default ReviewPage;
