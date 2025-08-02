export const formatString = (template: string, variables: Record<string, string>): string => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, p1) => variables[p1.trim()] || '');
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};