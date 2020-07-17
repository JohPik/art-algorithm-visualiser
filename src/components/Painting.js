import React from 'react'
import { ProductConsumer } from '../Context'

export default function Painting(){

    const renderPainting = props => {
        const { paintingParts, columnSize } = props
        const altName = props.currentPainting.name

        return ( //Render Each individual images
            paintingParts.map( part => <img key={part[0]} src={part[1]} alt={`${altName} part number ${part[0]}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
            // paintingParts.map( (part, i) => <img src={part} key={i} alt={`${altName} part number ${i}`} className="paiting-part" style={{maxWidth: columnSize}}/> )
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}
