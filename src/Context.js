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
        paintingParts: [],
        partsNbrs: [],
        partsNbrsMixed: []
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
        console.log("MEGA MEGA UPDATE", this.state )
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

        //step 2 split painting
        const split = (cols, raws) => {

            const paintingParts = [] // Temporary Parts
            const partsNbrs = [] // Temporay Part Nbrs

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
                partsNbrs.push( i );
                
                // paintingParts.push( [ i, canvas.toDataURL() ] );
                // const tempPart = {};
                //tempPart[i] = canvas.toDataURL();
                //paintingParts.push(tempPart)
                // paintingParts.push( canvas.toDataURL() );
            }

            //step 3 Add Splited Pictures to State
            this.setState({ paintingParts, partsNbrs ,columnSize: `${100/cols}%` })
        }
    
        img.onload = (() => split(cols,raws));
    }

/********** Shuffle Method **********/

    shuffle = () => {
        const { partsNbrs } = this.state

        const mix = parts => {
            const array = [...partsNbrs]

            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            this.setState({ partsNbrs: array })
        }

        mix(partsNbrs)

    }


/********** Sorting Methods **********/

/*** Bubble Sort ***/
    bubbleSort = async (array, ms) => {
        
        const partsNbrs = [...array]
        let noSwaps
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        const changeState = async () => { await sleep(ms).then(() => setAsyncState({ partsNbrs })) }
        const setAsyncState = (newState) => new Promise( resolve => this.setState(newState, resolve))   // from https://stackoverflow.com/questions/53409325/does-this-setstate-return-promise-in-react#:~:text=setState%20is%20usually%20not%20used,doesn't%20return%20a%20promise.

        for (var i = partsNbrs.length; i > 0; i--) {
            noSwaps = true;
            for(var j = 0; j < i - 1; j++){
                if(partsNbrs[j] > partsNbrs[j+1]){
                    var temp = partsNbrs[j];
                    partsNbrs[j] = partsNbrs[j+1];
                    partsNbrs[j+1] = temp;
                    noSwaps = false;         
                }
            }
            await changeState()
            if(noSwaps) break;
        }
    }

    insertionSort = ( array, ms ) => {
        console.log("hello from insertion Sort")
    }

    mergeSort = ( array, ms ) => {
        console.log("hello from Merge Sort")
    }

    quickSort = ( array, ms ) => {
        console.log("hello from Quick Sort")
    }

/*** Sort ***/
    sort = () => {
        const { algorithm, partsNbrs, speed } = this.state
        const speeds = [1000, 500, 225, 150, 75] // Sorting Speeds

        switch (algorithm) {
            case 'bubble-sort':
                this.bubbleSort(partsNbrs, speeds[speed])
                break;
            case 'insertion-sort':
                this.insertionSort(partsNbrs, speeds[speed])
                break;
            case 'merge-sort':
                this.mergeSort(partsNbrs, speeds[speed])
                break;
            case 'quick-sort':
                this.quickSort(partsNbrs, speeds[speed])
                break;
            default:
                console.log("Sorry, we are out of Options :/");
        }
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
        e.preventDefault()
    }
    
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange,
                handleSubmit: this.handleSubmit,
                shuffle: this.shuffle,
                sort: this.sort
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductProvider = ProdProvider

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }
