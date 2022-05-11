import React from 'react'
import { ContextConsumer } from '../Context'

export default function Art(){

    const renderPainting = props => {
        const { paintingParts, columnSize, rawSize, partsNbrs} = props
        const altName = props.currentPainting.name

        return ( //Render Each individual images
            // v3
            partsNbrs.map( part => <img src={paintingParts[part]} key={part} alt={`${altName} section`} className={`part-${part}`} style={{width: columnSize, height: rawSize }}/> )
            // v2
            // paintingParts.map( part => <img key={part[0]} src={part[1]} alt={`${altName} part number ${part[0]}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
            //v1 
            // paintingParts.map( (part, i) => <img src={part} key={i} alt={`${altName} part number ${i}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
        )
    }
    return (
        <ContextConsumer>
            {props => renderPainting(props)}
        </ContextConsumer>
    )
}
