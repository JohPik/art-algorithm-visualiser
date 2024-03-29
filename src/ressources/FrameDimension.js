const calculation = ( 
    imgRelativeSize, 
    imgWidth, 
    imgHeight, 
    frameToArtPct, 
    frameToMatPct ) => {
    // step 1 create frame
    const frameWidth = imgWidth /  imgRelativeSize
    const frameGap = (frameToArtPct * 2)
    const frameHeight = imgHeight + (frameGap * frameWidth)

    const frameAspectRatio = frameHeight / frameWidth

    // step 2 create Mat
    const matTopAndBottom = (frameToMatPct * frameWidth) / frameHeight

    //step 3 create Art
    const distToFrame = (frameToArtPct - frameToMatPct) * frameWidth

    const matWidth = (1 - 2 * frameToMatPct) * frameWidth
    const artLeftandRight = distToFrame / matWidth

    const matHeight = (1 - 2 * matTopAndBottom) * frameHeight
    const artTopandBottom = distToFrame / matHeight

    //step 4 object containing all the data
    const data = {
        frameAspectRatio:  (frameAspectRatio * 100),
        matLeftandRight: (frameToMatPct * 100),
        matTopAndBottom: (matTopAndBottom * 100),
        artLeftandRight: (artLeftandRight * 100),
        artTopandBottom: (artTopandBottom * 100)
    }
    return data
}

export default calculation