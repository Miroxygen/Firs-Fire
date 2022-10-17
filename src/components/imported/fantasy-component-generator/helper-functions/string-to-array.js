

/**
 * A helper function for my classes to turn strings into arrays
 * without making duplicate code and cluttering up the classes.
 * @param {string} string 
 * @param {string} splitValue The value in the string where it will split into array indexes
 */
export function getArrayFromString(string, splitValue) {
    const arrayFromString = string.split(splitValue)
    return arrayFromString
}