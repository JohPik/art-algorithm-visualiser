import React from 'react'
import { ProductConsumer } from '../Context'

export default function Painting(){

    const renderPainting = props => {
        const { paintingParts } = props
        const altName = props.currentPainting.name

        return ( //Render Each individual images
            paintingParts.map( (part, i) => <img src={part} key={i} alt={`${altName} part number ${i}`}/> )
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}
