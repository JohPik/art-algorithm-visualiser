import React from 'react'
import { ContextConsumer } from '../Context'
import Art from './Art'
import InfoPlate from './InfoPlate'

export default function Wall(){

    const renderWall = props => {

        const changeArt = props.changePainting

        const { frameAspectRatio, 
            matLeftandRight, 
            matTopAndBottom, 
            artLeftandRight, 
            artTopandBottom } = props.artSizing

        const { frameImg, sizing, id } = props.currentPainting 

        // const maxWidth = !sizing ? null : (sizing.imgWidth / (sizing.imgRelativeSize * 10)) * 10 
        const maxWidth = !sizing ? null : sizing.imgWidth
        
        console.log("maxWidth", maxWidth)

        const roundNum = (num) => (Math.round(num * 10) / 10) - 0.1
        
        return (
            <section className="wall-wrapper">
                <div className="painting-container" style={{ maxWidth }}>
                { id ?  <button onClick={() => changeArt("previous")}>Backward</button> : null }
                    <div className="frame" style={{ backgroundImage: `url('${frameImg}')`, paddingBottom: frameAspectRatio + "%"}}>
                        <div className="mat" 
                            style={!matLeftandRight ? {
                                position: "initial"} : {
                                    left: roundNum(matLeftandRight) + "%", 
                                    right: roundNum(matLeftandRight) + "%", 
                                    top: roundNum(matTopAndBottom) + "%", 
                                    bottom: roundNum(matTopAndBottom) + "%"
                                    }}>
                            <div className="art"
                                style={{left: artLeftandRight + "%", right: artLeftandRight + "%", 
                                        top: artTopandBottom + "%", bottom: artTopandBottom + "%"}}>
                                <Art/>
                            </div>
                        </div>
                    </div>
                { id !== 4 ?  <button onClick={() => changeArt("next")}>Forward</button> : null }
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