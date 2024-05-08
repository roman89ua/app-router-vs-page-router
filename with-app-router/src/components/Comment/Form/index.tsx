"use client";
import { FormEvent } from "react";
import { elementWithLiftEffect } from "@/components/styles/button-styles";

export interface CommentFormProps {
  title: string;
}

export function CommentForm({ title }: CommentFormProps) {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form e", e);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="border-2 border-sky-300 bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded-lg"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          id="userField"
          className={`${elementWithLiftEffect} w-48 focus-visible:outline-sky-400`}
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          id="messageField"
          className={`${elementWithLiftEffect} w-full focus-visible:outline-sky-400`}
        />
      </div>
      <button
        type="submit"
        className={`${elementWithLiftEffect} w-fit self-center`}
      >
        Submit
      </button>
    </form>
  );
}
