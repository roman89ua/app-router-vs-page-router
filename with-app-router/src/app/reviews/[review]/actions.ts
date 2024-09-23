"use server";

import { dictionary } from "@/app/utils/dictionary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addComment,
  CommentInputType,
} from "@/services/review-comments.service";
import { ErrorType } from "@/app/reviews/[review]/types";

function userInputValidation(data: CommentInputType): string {
  if (!data.username) {
    return dictionary.reviewCommentForm.error.userNameRequired;
  }

  if (data.username.trim().length > 50) {
    return dictionary.reviewCommentForm.error.userNameToLong;
  }

  if (!data.message) {
    return dictionary.reviewCommentForm.error.commentRequired;
  }

  if (data.message.trim().length > 500) {
    return dictionary.reviewCommentForm.error.commentLengthToBig;
  }

  return "";
}

export async function addCommentReviewAction(
  formData: FormData
): Promise<ErrorType | undefined> {
  const data: CommentInputType = {
    username: formData.get(dictionary.reviewCommentForm.username) as string,
    message: formData.get(dictionary.reviewCommentForm.message) as string,
    review: formData.get(
      dictionary.reviewCommentForm.related_review_id
    ) as string,
    slug: formData.get(dictionary.reviewCommentForm.slug) as string,
  };
  const errorMessage = userInputValidation(data);

  if (errorMessage?.trim()) {
    return {
      isError: true,
      message: errorMessage,
    };
  }

  await addComment(data);

  const currentPath = `/reviews/${data.slug}`;

  revalidatePath(currentPath);
  redirect(currentPath);

  return undefined;
}
