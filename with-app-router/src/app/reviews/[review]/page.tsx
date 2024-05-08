import { getReview, getSlugs } from "@/services/reviews.service";
import Review from "@/components/Review";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { CommentForm, CommentList } from "@/components/Comment";

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

  return (
    <>
      <Review {...review} />
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3 m-auto">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm title={review.title} />
        <CommentList />
      </section>
    </>
  );
}

export default ReviewPage;
