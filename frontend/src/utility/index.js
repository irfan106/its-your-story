export const excerpt = (htmlString, maxLength) => {
  if (!htmlString) return "";

  const plainText = htmlString
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;
};
