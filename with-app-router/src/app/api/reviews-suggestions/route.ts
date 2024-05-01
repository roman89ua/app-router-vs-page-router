import { NextRequest, NextResponse } from "next/server";
import { getReviewsSuggestions } from "@/services/reviews.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    throw new Error("Bad request. No query data");
  }
  const reviews = await getReviewsSuggestions(query);
  return NextResponse.json(reviews);
}
