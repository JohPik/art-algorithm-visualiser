import React from 'react'
import { ProductConsumer } from '../Context'

export default function Painting(){

    const renderPainting = props => {
        const { img, name } = props.currentPainting
        // console.log(props)

        return (
            <img src={img} alt={name}/>
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}


