"use client";

import { elementWithLiftEffect } from "@/components/styles/button-styles";
import { dictionary } from "@/app/utils/dictionary";
import { addCommentReviewAction } from "@/app/reviews/[review]/actions";
import { useFormState } from "@/app/hooks/useFormState";

type CommentFormProps = {
  title: string;
  slug: string;
  reviewId: number;
};

const USERNAME = dictionary.reviewCommentForm.username;
const MESSAGE = dictionary.reviewCommentForm.message;
const RELATED_REVIEW = dictionary.reviewCommentForm.related_review_id;
const SLUG = dictionary.reviewCommentForm.slug;

export function CommentForm({ title, slug, reviewId }: CommentFormProps) {
  const { state, submitHandler } = useFormState(addCommentReviewAction);

  return (
    <form
      onSubmit={submitHandler}
      className="border-2 border-sky-300 bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded-lg"
    >
      <p className="pb-1">
        {dictionary.reviewCommentForm.alreadyPlayed} <strong>{title}</strong>
        {dictionary.common.questionMark}{" "}
        {dictionary.reviewCommentForm.haveYouSay}
        {dictionary.common.exclamationMark}
      </p>
      <input
        id={RELATED_REVIEW}
        name={RELATED_REVIEW}
        type="hidden"
        defaultValue={reviewId}
      />
      <input id={SLUG} name={SLUG} type="hidden" defaultValue={slug} />
      <div className="flex">
        <label htmlFor={USERNAME} className="shrink-0 w-32">
          {dictionary.reviewCommentForm.nameInputLabel}
        </label>
        <input
          id={USERNAME}
          name={USERNAME}
          className={`${elementWithLiftEffect} w-full max-w-48 focus-visible:outline-sky-400`}
          required
          maxLength={50}
          minLength={2}
        />
      </div>
      <div className="flex">
        <label htmlFor={MESSAGE} className="shrink-0 w-32">
          {dictionary.reviewCommentForm.commentInputLabel}
        </label>
        <textarea
          id={MESSAGE}
          name={MESSAGE}
          className={`${elementWithLiftEffect} w-full focus-visible:outline-sky-400`}
          required
          maxLength={500}
          minLength={5}
        />
      </div>
      {state.error?.isError && (
        <p className="text-red-600">{state.error.message}</p>
      )}
      <button
        type="submit"
        className={`${elementWithLiftEffect} w-fit self-center disabled:bg-rose-300 disabled:cursor-no-drop`}
        disabled={state.isLoading}
      >
        {dictionary.common.submit}
      </button>
    </form>
  );
}
