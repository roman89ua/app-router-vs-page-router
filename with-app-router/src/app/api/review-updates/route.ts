import { NextRequest, NextResponse } from "next/server";
import { CACHE_REVIEW_TAG } from "@/services/reviews.service";
import { revalidateTag } from "next/cache";

enum ReviewRevalidationTriggers {
  create = "create",
  update = "update",
  delete = "delete",
}

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const events: ReviewRevalidationTriggers[] = Object.values(
    ReviewRevalidationTriggers
  );

  const isRevalidateEventForReviews = events.some((element) =>
    (requestData.event as string).endsWith(element)
  );

  if (requestData.model === CACHE_REVIEW_TAG && isRevalidateEventForReviews) {
    revalidateTag(CACHE_REVIEW_TAG);
  }

  return NextResponse.json({
    status: 204,
  });
}
