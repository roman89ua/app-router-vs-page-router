"use client";

import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/app/hooks/useIsClient";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SuggestionsReviewInfo } from "@/components/Review/types";
import { CheckIcon } from "@heroicons/react/16/solid";
import { buttonWithLiftEffect } from "@/components/styles/button-styles";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

export default function ReviewSearch() {
  const isClient = useIsClient();

  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SuggestionsReviewInfo[]
  >([]);

  const suggestionsWithDelay = useRef(
    debounce(async (queryString: string) => {
      let reviews;

      try {
        const response = await fetch(
          "/api/reviews-suggestions?query=" + encodeURIComponent(queryString),
        );
        reviews = await response.json();
      } catch (e) {
        console.error(e);
      }

      setSearchSuggestions(reviews ?? []);
    }, 750),
  ).current;

  useEffect(() => {
    if (query.length > 1) {
      suggestionsWithDelay(query);
    } else {
      setSearchSuggestions([]);
    }

    return () => {
      suggestionsWithDelay.cancel();
    };
  }, [query]);

  if (!isClient) return null;

  const changeHandler = (review: SuggestionsReviewInfo) => {
    router.push(`/reviews/${review.slug}`);
  };

  const onType = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value.trim());

  return (
    <div className="relative w-60">
      <Combobox onChange={changeHandler}>
        <Combobox.Input
          onChange={onType}
          placeholder="search..."
          className={` ${buttonWithLiftEffect} focus-visible:outline-sky-300 w-full`}
        />
        <Combobox.Options className="absolute bg-white w-full py-3 shadow-xl max-h-80 overflow-y-auto overscroll-y-auto">
          {searchSuggestions.map((review) => {
            return (
              <Combobox.Option
                key={review.slug}
                value={review}
                className="w-full py-1"
              >
                {({ active, selected }) => (
                  <span
                    className={`flex items-center gap-4 ${active ? `bg-blue-900 bg-gradient-to-r from-sky-900 to-blue-500 text-white` : ""}`}
                  >
                    <span className={"w-6 h-6"}>
                      {selected && <CheckIcon className={"w-6 h-6"} />}
                    </span>
                    <span className="truncate">{review.title}</span>
                  </span>
                )}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
