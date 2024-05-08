"use client";
import { LinkIcon } from "@/components/icons/LinkIcon";
import { useState } from "react";
import { elementWithLiftEffect } from "@/components/styles/button-styles";

function ShareLinkBtn() {
  const [clicked, setClicked] = useState(false);

  const clickHandler = async () => {
    await navigator.clipboard.writeText(location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <button onClick={clickHandler} className={elementWithLiftEffect}>
      <LinkIcon className="w-4 h-4" />{" "}
      {clicked ? "Copied to clipboard" : `Share link`}
    </button>
  );
}

export default ShareLinkBtn;
