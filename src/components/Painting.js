import React from 'react'
import { ProductConsumer } from '../Context'

export default function Painting(){

    const renderPainting = props => {
        const painting = props.currentPainting.img
        console.log(painting)

        return (
            <img src={painting}/>
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}