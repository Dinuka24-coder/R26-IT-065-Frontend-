export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const fmtConf = (c) => `${Math.round(c * 100)}%`;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
