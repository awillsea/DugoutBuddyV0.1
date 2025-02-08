export const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };
  
  export const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };