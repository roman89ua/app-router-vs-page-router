import React from "react";
import BiggestHeading from "@/components/BigestHeading";
import { ReviewData } from "@/components/Review/types";
import ShareLinkBtn from "@/components/buttons/ShareLinkBtn";

function Review({ date, image, title, body }: ReviewData) {
  return (
    <>
      <BiggestHeading className="mb-4">{title}</BiggestHeading>
      <div className="flex gap-4 mb-4 items-baseline">
        <p>{date}</p>
        <ShareLinkBtn />
      </div>
      <article className="bg-sky-100 border-2 border-sky-300 rounded-lg text-center p-4 shadow ">
        <div className="flex flex-col items-start lg:flex-row">
          <img
            className="rounded-lg"
            src={image}
            alt="stardew valley image"
            width={600}
            height={330}
          />
          <article
            className="p-6 self-start text-left"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </article>
    </>
  );
}

export default Review;
