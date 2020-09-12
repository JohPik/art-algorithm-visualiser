import React from 'react'
import { ContextConsumer } from '../Context'

export default function Header(props){

    const renderPainting = props => {
        
        const color = props.currentPainting.colorApp || "yellow"
        return (
            <div className={`logo ${color}`}>
                <img src="/imgs/logo-artgorithm.svg" alt="Artgorithm logo"/> 
            </div>
        )
    }

    return (
        <ContextConsumer>
            {props => renderPainting(props)}
        </ContextConsumer>
    )
}

