import React from "react";

function FormatDate(dataString: string): string {
  return new Date(dataString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export default FormatDate;
