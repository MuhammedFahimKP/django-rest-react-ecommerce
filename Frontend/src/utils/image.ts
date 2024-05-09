
/**
 * 
 * @param image :Blob
 * @returns 
 */

export function genrateImageUrl(image:Blob) :string {
   
   console.log(image)

    const url = URL.createObjectURL(image)

    return url

}