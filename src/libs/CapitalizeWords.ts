export function capitalizeWords(input: string): string {
  const words = input?.split(" ");

  const capitalizedWords = words?.map((word) => {
    if (word?.length > 0) {
      return word?.charAt(0).toUpperCase() + word?.slice(1);
    }
    return word; // If the word is an empty string, keep it as is
  });

  return capitalizedWords?.join(" ");
}
