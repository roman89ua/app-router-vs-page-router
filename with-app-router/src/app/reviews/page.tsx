import { getReviewsList } from "@/services/reviews.service";
import { Metadata } from "next";
import { PaginationBar } from "@/components/PaginationBar";
import ReviewSearch from "@/components/ReviewSearch";
import ReviewsList from "@/components/ReviewsList";
import BiggestHeading from "@/components/BiggestHeading";

// export const dynamic = "force-dynamic";

// export const revalidate = 60;

type ReviewsPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function parsePageParam(param: string = "") {
  if (param) {
    const page = parseInt(param, 10);
    if (Number.isFinite(page) && page > 0) return page;
  }
  return 1;
}

export const generateMetadata = async ({
  searchParams,
}: ReviewsPageProps): Promise<Metadata> => ({
  title: `Reviews | Page ${searchParams.page ?? 1}`,
});

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
    <section title='Reviews Page' className='m-auto'>
      <BiggestHeading className='mb-4'>Reviews page</BiggestHeading>
      <section
        title='pagination and search section'
        className='flex items-center flex-col justify-center md:flex-row md:justify-between md:items-center py-4'
      >
        <ReviewSearch />
        <PaginationBar
          currentPage={page}
          pageCount={pageCount}
          path='/reviews'
        />
      </section>
      <ReviewsList reviews={reviews} />
    </section>
  );
}

export default ReviewsPage;
