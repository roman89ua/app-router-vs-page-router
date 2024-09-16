import React from "react";
import BiggestHeading from "@/components/BigestHeading";
import { ReviewData } from "@/components/Review/types";
import ShareLinkBtn from "@/components/buttons/ShareLinkBtn";
import Image from "next/image";
import NoImagePlaceholder from "@/components/shared/NoImagePlacehoder";

function Review({ date, image, title, body, subtitle }: ReviewData) {
  return (
    <>
      <BiggestHeading className="mb-4">{title}</BiggestHeading>
      <p className="text-xl">{subtitle}</p>
      <div className="flex gap-4 mb-4 items-baseline my-4">
        <p>{new Date(date).toLocaleDateString()}</p>
        <ShareLinkBtn />
      </div>
      <article className="bg-sky-100 border-2 border-sky-300 rounded-lg text-center p-8 shadow">
        <div>
          <div className="rounded-lg lg:float-left pb-8 lg:pr-8 overflow-hidden">
            {image ? (
              <Image
                className=""
                src={image}
                alt={`${title}. ${title} image`}
                width={600}
                height={330}
                priority
              />
            ) : (
              <NoImagePlaceholder />
            )}
          </div>
          <article
            className=" self-start text-left"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </article>
    </>
  );
}

export default Review;
