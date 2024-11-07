export const capitalize = (str: string) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const titleStr = (str: string): string => {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    const words = str.split(' ');
    const capitalizedWords = words.map(word => capitalize(word));
    return capitalizedWords.join(' ');
  };

export const startsWith = (text: string, prefix: string): boolean => {
  return text.slice(0, prefix.length) === prefix;
}

export const getLocaleVariant = (text: string | undefined, locale: number): string => {
  if(!text) return ''
  return text.split(';')[locale];
}