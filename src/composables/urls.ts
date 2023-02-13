export const extractCouponCode = (url:string) => {
    const startIndex = url.indexOf("couponCode=") + "couponCode=".length;
    let endIndex = url.indexOf("&", startIndex);
    if (endIndex === -1)endIndex = url.length;
    return url.substring(startIndex, endIndex)
}

export const extractCourseName = (url:string) => {
    const startIndex = url.indexOf("/course/") + "/course/".length;
    let endIndex = url.indexOf("/", startIndex);
    if (endIndex === -1) {
    endIndex = url.length;
    }
    return url.substring(startIndex, endIndex)
}