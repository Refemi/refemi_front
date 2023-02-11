export default function stringClean(string) {
  return string.replace(/[^a-zA-Z0-9 ]/g, "");
}
