"use client";

import { H5 } from "@/components";

const AppError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <div className="card fixed top-2 left-2 py-2 px-3 rounded-xl h-fit w-[350px]">
        <H5>Network error. Check your internet connection and refresh page</H5>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default AppError;
