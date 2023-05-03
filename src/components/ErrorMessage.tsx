import React from "react";

interface ErrorMessageProp {
  errorProp: Error;
}

export default function ErrorMessage(prop: ErrorMessageProp) {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      Dear user, we are sorry about error "{prop.errorProp.message}"
    </div>
  );
}
