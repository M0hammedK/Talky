import React from "react";

interface Props {
  error: string | null;
}

export default function ErrorMessage({ error }: Props) {
  return (
    <div>
      {error && (
        <div className="mt-4 text-sm text-red-500">
          {typeof error === "string" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: error.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <div>{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
