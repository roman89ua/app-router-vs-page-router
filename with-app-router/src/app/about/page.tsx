import { Metadata } from "next";
import ShareLinkBtn from "@/components/buttons/ShareLinkBtn";
import BiggestHeading from "@/components/BiggestHeading";
import { dictionary } from "@/components/shared/helpers/dictionary";

export const metadata: Metadata = {
  title: "About",
};

function AboutPage() {
  return (
    <article>
      <BiggestHeading>{dictionary.about.heading}</BiggestHeading>
      <ShareLinkBtn />
      <p>{dictionary.about.paragraph}</p>
    </article>
  );
}

export default AboutPage;
