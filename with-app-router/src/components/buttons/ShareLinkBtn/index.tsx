"use client";

import { LinkIcon } from "@/components/icons/LinkIcon";
import { useState } from "react";
import { elementWithLiftEffect } from "@/components/styles/button-styles";
import { useIsClient } from "@/app/hooks/useIsClient";

function ShareLinkBtn() {
  const [clicked, setClicked] = useState(false);
  const isClient = useIsClient();

  const clickHandler = async () => {
    if (isClient) {
      await navigator.clipboard.writeText(window.location.href);
      setClicked(true);
      setTimeout(() => setClicked(false), 2000);
    }
  };

  return (
    <button
      type='button'
      onClick={clickHandler}
      className={elementWithLiftEffect}
    >
      <LinkIcon className='w-4 h-4' />{" "}
      {clicked ? "Copied to clipboard" : `Share link`}
    </button>
  );
}

export default ShareLinkBtn;
