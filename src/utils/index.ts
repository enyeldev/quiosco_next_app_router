export function formatCurrecny(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";

  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.jpg`;
  }
}
