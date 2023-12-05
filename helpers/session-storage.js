/**
 *
 * @param {string} name
 * @param {string|number} value
 */
export const setItemToSessionStorage = (name, value) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(name, value);
  }
};

/**
 * 
 * @param {string} name 
 * @returns 
 */
export const getItemFromSessionStorage = (name) => {
  if (typeof window !== "undefined") {
    if(name === "undefined"){
      return undefined;
    }
    return window.sessionStorage.getItem(name)
  }
  return undefined
};

/**
 * 
 * @param {string} name 
 * @returns 
 */
export const removeItemFromSessionStorage = (name) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(name)
  }
};
