import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import ReviewThumbnail from "@/components/Review/ReviewThumbnail";
import { Metadata, ResolvingMetadata } from "next";
import { PaginationBar } from "@/components/PaginationBar";

// export const dynamic = "force-dynamic";

// export const revalidate = 60;

type ReviewsPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async (
  { searchParams }: ReviewsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  return {
    title: `Reviews | Page ${searchParams.page ?? 1}`,
  };
};

const PAGE_SIZE = 3;

async function ReviewsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = parsePageParam(searchParams.page);

  const { reviews, pageCount } = await getReviewsList(PAGE_SIZE, page);

  return (
    <section title="Reviews Page" className="m-auto">
      <BiggestHeading className="mb-4">Reviews page</BiggestHeading>
      <PaginationBar
        currentPage={page}
        pageCount={pageCount}
        path={"/reviews"}
      />
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
function parsePageParam(param: string = "") {
  if (!!param) {
    const page = parseInt(param);
    if (isFinite(page) && page > 0) return page;
  }
  return 1;
}
