import React from 'react'
import { ProductConsumer } from '../Context'

export default function InfoPlate(){

    const renderPainting = props => {
        const { name, link, artist, artistLink, dimensions, location, medium, years} = props.currentPainting
        console.log(props)

        return ( //Render Each individual images
            <div className="info-plate">
                <a href={link} className="plate name">{name}</a>
                <br/>
                <a href={artistLink} className="plate artist">{artist}</a> 
                <br/>
                {years} | {dimensions} | {medium}
                <br/>
                {location}
            </div>
        )
    }
    return (
        <ProductConsumer>
            {props => renderPainting(props)}
        </ProductConsumer>
    )
}