"use client";

import { useEffect, useState } from "react";

export const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isClient) setIsClient(true);
  }, []);

  return isClient;
};
