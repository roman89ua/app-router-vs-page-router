import BiggestHeading from "@/components/BigestHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

function AboutPage() {
  return (
    <article>
      <BiggestHeading>About this site.</BiggestHeading>
      <p>This web site was created to have practice with Next.js framework.</p>
    </article>
  );
}

export default AboutPage;
