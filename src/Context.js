import React, { Component } from 'react'
import { PaintingsDatabase } from './ressources/PaintingsDatabase'

const ProductContext = React.createContext()

class ProdProvider extends Component {

    state = {
        paintingList: [],
        currentPainting: {},
        raws: 1,
        columns: 1,
        algorithm: "bubble-sort",
        speed: 2,
        disable: false
    }
    
    componentWillMount() {
        this.setPaintingsList()
    }

    componentDidMount() {
        this.setCurrentPainting()
    }

    setPaintingsList = () => {
        let tempPainting = []
        PaintingsDatabase.forEach( paint => {
        let singlePaint = { ...paint }
        tempPainting = [ ...tempPainting, singlePaint]
        })
        this.setState({ paintingList: tempPainting })
    }

    setCurrentPainting = (value) => {
        console.log(value)
        if(!value){
            this.setState({
                currentPainting: this.state.paintingList[0]
            })
        }
        // will need to make this smarter here !!!!!!!!!!!!!!!
    }

    //handle change in the form
    handleChange = e => {
        if(e.target.type === "radio"){
            this.setState({
                algorithm : e.target.value
            })
        } else { //change string to a number
            this.setState({
                [e.target.name] : Number(e.target.value) 
            })
        }
    }

    //MIGHT NOT NEED IT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    handleSubmit = e => {
        console.log("hola");
        e.preventDefault()
        //Do Something Late

    }
    
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange,
                handleSubmit: this.handleSubmit
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductProvider = ProdProvider

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }
