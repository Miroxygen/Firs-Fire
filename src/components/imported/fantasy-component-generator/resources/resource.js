
/**
 * Head class for all the resources.
 * If a class is a child of resource the main purpose of it is to use the getRandomResource,
 * and to show the connection that a class is considered a resource only and is not meant
 * to be used on its own.
 */
export class Resource {
    constructor() {

    }

    /**
     * @param {array} resourceArray 
     * @returns Random index element.
     */
    getRandomResource(resourceArray) {
        try {
            if(Array.isArray(resourceArray)) {
                const randomNumber = Math.floor(Math.random() * resourceArray.length)
                return resourceArray[randomNumber]
            } else {
                throw new Error("Trying to use something else than array in getRandomResource")
            }
        } catch (error) {
            console.error(error)
        }
    }
}