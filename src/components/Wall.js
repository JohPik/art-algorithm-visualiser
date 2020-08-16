import React from 'react'
import { ContextConsumer } from '../Context'
import Art from './Art'
import InfoPlate from './InfoPlate'

export default function Wall(){

    const renderWall = props => {

        const { frameAspectRatio, 
            matLeftandRight, 
            matTopAndBottom, 
            artLeftandRight, 
            artTopandBottom } = props.artSizing

        const { frameImg } = props.currentPainting
        
        return (
            <section className="wall-wrapper">
                <div className="painting-container">
                    <div className="frame" style={{ backgroundImage: `url('${frameImg}')`, paddingBottom: frameAspectRatio + "%"}}>
                        <div className="mat" 
                            style={!matLeftandRight ? {position: "initial"} : {left: matLeftandRight + "%", right: matLeftandRight + "%", top: matTopAndBottom + "%", bottom: matTopAndBottom + "%"}}>
                            <div className="art"
                                style={{left: artLeftandRight + "%", right: artLeftandRight + "%", 
                                        top: artTopandBottom + "%", bottom: artTopandBottom + "%"}}>
                                <Art/>
                            </div>
                        </div>
                    </div>
            </div>
            <InfoPlate/>
            </section>
        )
    }    

    return (
        <ContextConsumer>
            {props => renderWall(props)}
        </ContextConsumer>
    )
}