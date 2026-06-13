import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Link({ href, ...props }: any) {
  const to = typeof href === "object" ? href.pathname : href;
  return <RouterLink to={to || "#"} {...props} />;
}
