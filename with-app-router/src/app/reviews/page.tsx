import BiggestHeading from "@/components/BigestHeading";
import { getReviewsList } from "@/services/reviews.service";
import { Metadata, ResolvingMetadata } from "next";
import { PaginationBar } from "@/components/PaginationBar";
import ReviewSearch from "@/components/ReviewSearch";
import ReviewsList from "@/components/ReviewsList";

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

const PAGE_SIZE = 6;

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
      <section
        title="pagination and search section"
        className="flex items-center flex-col justify-center md:flex-row md:justify-between md:items-center py-4"
      >
        <ReviewSearch />
        <PaginationBar
          currentPage={page}
          pageCount={pageCount}
          path={"/reviews"}
        />
      </section>
      <ReviewsList reviews={reviews} />
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
