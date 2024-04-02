import { getReview, getSlugs } from "@/services/getReviews.service";
import Review from "@/components/Review";
import { Metadata, ResolvingMetadata } from "next";

type PreviewPageProps = {
  params: { review: string };
  searchParams: { [key: string]: string | string[] | undefined };
  parent: ResolvingMetadata;
};

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  // searchParams,
  // parent,
}: PreviewPageProps): Promise<Metadata> {
  const review = await getReview(params.review);
  const title = review.title;

  return {
    title: title,
    description: `${title} page`,
  };
}

async function ReviewPage({ params }: PreviewPageProps) {
  const review = await getReview(params.review);

  return <Review {...review} />;
}

export default ReviewPage;
