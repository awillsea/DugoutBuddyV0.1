// src/utils/dateUtils.ts
import { Timestamp } from 'firebase/firestore';

export const formatDate = (date: Date | Timestamp): string => {
  const jsDate = date instanceof Timestamp ? date.toDate() : date;
  return jsDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};