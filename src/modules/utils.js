/**
 * Replaces all occurences of a substring within a string with a specified value.
 *
 * @param {String} string String to replace parts of
 * @param {String} replace Part of string to replace
 * @param {String} replaceBy Part to replace with
 * @returns `String`
 */
export function replaceAll(
  string,
  replace,
  replaceBy
) {
  const regex = new RegExp(replace, 'g')
  const newString = string.replace(regex, replaceBy)
  return newString
}

/**
 * Replace string by multiple values from array.
 *
 * @param {String} string String to replace parts of.
 * @param {Array} replaceArray Array of items which to replace the string with
 * @param {String} replaceBy String to replace the parts of the first string with
 * @returns `String` of which parts from the `replaceArray` have been replaced by `replaceBy`
 */
export function replaceByArray(
  string,
  replaceArray,
  replaceBy
) {
  // TODO: Fix replaceArray function
  let newString = string
  // return replaceArray.forEach((item) => replaceAll(string, item, replaceBy));
  //  Return something so JS doesn't yell at me.
  return newString
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {String} string String of which to capitalize the first letter
 * @returns `String` with capitalized first letter
 */
export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Removes excessive whitespace at the start or end of an object's property.
 *
 * @param {[{}]} data - An array of objects
 * @param {string} property - The property to be trimmed
 * @returns {[]} - The cleaned array of objects
 */
export function removeWhitespace(data, property) {
  return data.map((item) => {
    const trimmed = item[property].trim()
    return { [property]: trimmed }
  })
}
