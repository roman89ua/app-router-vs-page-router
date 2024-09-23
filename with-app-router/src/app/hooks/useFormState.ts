import { FormEventHandler, useState } from "react";
import { ErrorType } from "@/app/reviews/[review]/types";

type useFormState = {
  isLoading: boolean;
  error: ErrorType;
};

export const useFormState = (
  action: (formData: FormData) => Promise<ErrorType>
) => {
  const [state, setState] = useState<useFormState>({
    isLoading: false,
    error: null,
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, error: null, isLoading: true }));
    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await action(formData);

    if (result?.isError) {
      setState((prev) => ({ ...prev, error: result, isLoading: false }));
    } else {
      form.reset();
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { state, submitHandler };
};
