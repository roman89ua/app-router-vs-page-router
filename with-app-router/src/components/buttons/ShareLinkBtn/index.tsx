"use client";

import { LinkIcon } from "@/components/icons/LinkIcon";
import { useEffect, useState } from "react";
import { elementWithLiftEffect } from "@/components/styles/button-styles";
import { dictionary } from "@/components/shared/helpers/dictionary";
import { act } from "@testing-library/react";

function ShareLinkBtn() {
  const [clicked, setClicked] = useState(false);

  const clickHandler = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => act(() => setClicked(false)), 2000);
    }
  }, [clicked]);

  return (
    <button
      type='button'
      onClick={clickHandler}
      className={elementWithLiftEffect}
      disabled={clicked}
    >
      <LinkIcon className='w-4 h-4' />{" "}
      <span data-testid='share-button-value'>
        {clicked
          ? dictionary.shareLinkBtn.copied
          : dictionary.shareLinkBtn.shareLink}
      </span>
    </button>
  );
}

export default ShareLinkBtn;
