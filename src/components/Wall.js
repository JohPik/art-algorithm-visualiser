import React from 'react'

import Painting from './Painting'
import Divider from './Divider'
import InfoPlate from './InfoPlate'



export default function Wall(){
    return (
        <>
        <p>Wall component</p>
        <Painting/>
        <p>or</p>
        <Divider/>
        <InfoPlate/>
        </>
    )
}