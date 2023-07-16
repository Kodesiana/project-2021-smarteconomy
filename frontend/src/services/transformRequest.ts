
export function transformRequest(obj: { [key: string]: any; }): { [key: string]: any; } {
  Object.keys(obj).forEach((key) => {
    if (key === 'sort_by') {
      obj[key] = obj[key]//.toString().charAt(0).toUpperCase() + obj[key].toString().slice(1);
    }
  });
  return obj;
}
