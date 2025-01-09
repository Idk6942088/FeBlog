export const extractUrlAndId = (cloudinaryUrl) => {
    const lastSlashIndex = cloudinaryUrl.lastIndexOf("/")
    const url = cloudinaryUrl.substring(0,lastSlashIndex)
    const id = cloudinaryUrl.substring(lastSlashIndex+1)
    return {url,id}
}

//DOMParser tisztító:

export const sanitizeHTML=(htmlAsText)=>{
    const doc=new DOMParser().parseFromString(htmlAsText,"text/html")
    return doc.body.textContent || ""
}