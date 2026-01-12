export function thumb(url: string, w = 400) {
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/c_fill,w_${w},q_auto,f_auto/`);
}
