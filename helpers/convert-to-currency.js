/**
 * 
 * @description Convert string to comma separated like currency
 * @param {string} string 
 * @returns {string}
 */

export const convertToCurrency = (string) => {
    if(typeof string === "number"){
        string = string.toString();
    }
    const str = string.split(".");
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  };