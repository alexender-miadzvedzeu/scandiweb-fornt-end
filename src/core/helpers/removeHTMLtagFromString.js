export const removeHTMLtagFromString = string => {
  const regex = /(<([^>]+)>)/ig,  
  body = string,   
  result = body.replace(regex, "");
 return result
};