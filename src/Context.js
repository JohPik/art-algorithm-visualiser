import React, { Component } from 'react'
import { PaintingsDatabase } from './ressources/PaintingsDatabase'

const ProductContext = React.createContext()

class ProdProvider extends Component {

    state = {
        paintingList: [],
        currentPainting: {},
        raws: 1,
        columns: 1,
        columnSize: "100%",
        algorithm: "bubble-sort",
        speed: 2,
        disable: false,
        paintingParts: []
    }

    componentDidMount() {
        //Save copy of Painting List 
        const stepZero =  () => {
            return new Promise( resolve => {
                this.setPaintingsList()
                resolve();
            })
        }
        //Save copy of Painting List
        const stepOne = () => { 
            return new Promise( resolve => {
                this.setCurrentPainting()
                resolve();
            });
        }
        //Split Painting In Equal Parts
        const stepTwo = () => {
            return new Promise( resolve => {
                const { columns, raws } = this.state;
                const currentPainting = this.state.currentPainting.img
                this.splitPainting(currentPainting, columns, raws);
                resolve();
            });
        }
        stepZero().then(stepOne).then(stepTwo)
    }

    componentDidUpdate(prevProps, prevState) {
        // check whether Raws or Columns Number have changed
        if (prevState.raws !== this.state.raws || prevState.columns !== this.state.columns) {
        
        const { columns, raws } = this.state;
        const currentPainting = this.state.currentPainting.img
        this.splitPainting(currentPainting, columns, raws);
        }
    }

/********** Retrieve data from ressources & assigned current painting **********/
    setPaintingsList = () => {
        let tempPainting = []
        PaintingsDatabase.forEach( paint => {
        let singlePaint = { ...paint }
        tempPainting = [ ...tempPainting, singlePaint]
        })
        this.setState({ paintingList: tempPainting })
    }

    setCurrentPainting = (value) => {
        if(!value){
            this.setState({
                currentPainting: this.state.paintingList[0]
            })
        }
        // will need to make this smarter here !!!!!!!!!!!!!!!
    }


/********** Split Current Painting in Equal Parts **********/
    splitPainting = (src, cols, raws) => {
        //step 1 create canvas + img & TempPart
        const canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"),
        img = document.createElement("IMG");
        img.src = src

        //step 2 split painitng
        const split = (cols, raws) => {

            const paintingParts = [] // Temporary Parts

            const slicedWidth  = img.width / cols;
            const slicedHeight = img.height / raws;
            const totalNbrParts = cols * raws; 
    
            for(var i = 0; i < totalNbrParts; i++) {
                //create coordinates for sliced img
                const x = -slicedWidth * (i % cols);
                const y = -slicedHeight * Math.floor(i/cols);
                //canvas size
                canvas.width = slicedWidth; 
                canvas.height = slicedHeight;
                ctx.drawImage(img, x, y, slicedWidth * cols, slicedHeight * raws);
                //add sliced image to temporary paintingParts array
                paintingParts.push( canvas.toDataURL() );
            }

            //step 3 Add Splited Pictures to State
            this.setState({ paintingParts, columnSize: `${100/cols}%` })
        }
    
        img.onload = (() => split(cols,raws));
    }


/********** Handle Form **********/
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
        console.log("hola from submission");
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
