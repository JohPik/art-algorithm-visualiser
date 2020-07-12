import React from 'react'

import Painting from './Painting'
import InfoPlate from './InfoPlate'

export default function Wall(){
    return (
        <section className="wall-wrapper">
            <div className="painting">
            <div className="frame">
                {/* will add Mat later */}
                {/* <div class="mat"></div> */}
                <div className="art">
                    <Painting/>
                </div>
                <InfoPlate/>
            </div>
        </div>
        </section>
    )
}