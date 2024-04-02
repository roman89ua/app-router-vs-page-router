"use client";
import { LinkIcon } from "@/components/icons/LinkIcon";
import { useState } from "react";

function ShareLinkBtn() {
  const [clicked, setClicked] = useState(false);

  const clickHandler = async () => {
    await navigator.clipboard.writeText(location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <button
      onClick={clickHandler}
      className="flex gap-2 items-center py-3 px-6 border-2 border-sky-300 rounded-lg
        shadow hover:shadow-2xl hover:bg-sky-100 hover:transition
        hover:ease-in-out hover:duration-300"
    >
      <LinkIcon className="w-4 h-4" />{" "}
      {clicked ? "Copied to clipboard" : `Share link`}
    </button>
  );
}

export default ShareLinkBtn;
