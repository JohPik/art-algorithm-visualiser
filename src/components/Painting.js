import React from 'react'
import { ProductConsumer } from '../Context'

export default function Painting(){

    const renderPainting = props => {
        const { paintingParts, columnSize, partsNbrs} = props
        const altName = props.currentPainting.name

        // console.log("paintingParts", paintingParts)
        // console.log("partsNbrs", partsNbrs)

        return ( //Render Each individual images
            // v3
            partsNbrs.map( part => <img src={paintingParts[part]} key={part} alt={`${altName} section`} className={`part-${part}`} style={{maxWidth: columnSize}}/> )
            // v2
            // paintingParts.map( part => <img key={part[0]} src={part[1]} alt={`${altName} part number ${part[0]}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
            //v1 
            // paintingParts.map( (part, i) => <img src={part} key={i} alt={`${altName} part number ${i}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}
