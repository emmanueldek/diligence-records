export const timeAgo = (timestamp: string): string => {
  const currentDate: Date = new Date();
  const date: Date = new Date(timestamp);

  const seconds: number = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000,
  );
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};
