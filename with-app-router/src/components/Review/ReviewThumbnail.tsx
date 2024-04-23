import React from "react";
import Link from "next/link";
import { ReviewDataWithSlug } from "@/components/Review/types";
import Image from "next/image";

function ReviewThumbnail({
  slug,
  image,
  title,
  priority,
  subtitle,
}: Omit<ReviewDataWithSlug, "body" | "date"> & { priority?: boolean }) {
  return (
    <Link
      className="block w-fit "
      href={{
        pathname: `/reviews/${slug}`,
      }}
    >
      <article className="flex flex-col w-96 items-center justify-center bg-sky-100 border-2 border-sky-300 rounded-lg text-center p-4 shadow hover:shadow-2xl hover:transition hover:ease-in-out hover:duration-300">
        <Image
          priority={priority}
          className="rounded-lg mb-4"
          src={image}
          alt={`${slug} image`}
          width={320}
          height={180}
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-xs hidden sm:block">{subtitle}</p>
        </div>
      </article>
    </Link>
  );
}

export default ReviewThumbnail;
