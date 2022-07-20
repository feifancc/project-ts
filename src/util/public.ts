export const isArr = (data: unknown) => {
  return Array.isArray(data);
};
export const isObj = (data: unknown) => {
  if (data && typeof data === "object" && !isArr(data)) return true;
  return false;
};

export const tokenHandle = () => {
  let { tokenTime } = localStorage;
  tokenTime = tokenTime || "0";
  const currentTile = Date.now();
  if (currentTile - +tokenTime >= 10800000) {
    localStorage.setItem("tokenTime", "2430");
    localStorage.removeItem("token");
    return true;
  }
  return false;
};
