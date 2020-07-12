import React, { Component } from 'react'

const ProductContext = React.createContext()

class ProdProvider extends Component {

    state = {
        raws: 1,
        columns: 1,
        algorithm: "bubble-sort",
        speed: 2,
        disable: false
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
