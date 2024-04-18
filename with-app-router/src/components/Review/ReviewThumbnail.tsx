import React from "react";
import Link from "next/link";
import { ReviewDataWithSlug } from "@/components/Review/types";
import Image from "next/image";

function ReviewThumbnail({
  slug,
  image,
  title,
}: Omit<ReviewDataWithSlug, "body" | "date">) {
  return (
    <Link
      className="block w-fit "
      href={{
        pathname: `/reviews/${slug}`,
      }}
    >
      <article className="bg-sky-100 border-2 border-sky-300 rounded-lg text-center p-4 shadow hover:shadow-2xl hover:transition hover:ease-in-out hover:duration-300">
        <Image
          className="rounded-lg mb-4"
          src={image}
          alt={`${slug} image`}
          width={320}
          height={180}
        />
        <h2>{title}</h2>
      </article>
    </Link>
  );
}

export default ReviewThumbnail;
