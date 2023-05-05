import React, { Component } from "react";
import { PaintingsDatabase } from "./ressources/PaintingsDatabase";
import FrameDimension from "./ressources/FrameDimension";

const Context = React.createContext();

class Provider extends Component {
  state = {
    paintingList: [],
    currentPainting: {},
    raws: 1,
    columns: 1,
    columnSize: "100%",
    rawSize: "100%",
    algorithm: "bubble-sort",
    speed: 2,
    disableForm: false,
    paintingParts: [],
    partsNbrs: [],
    partsNbrsClone: [], //Save value before execution
    artSizing: {},
    isShuffled: false,
    isSorting: false,
  };

  componentDidMount() {
    /*** Retrieve data from ressources & assigned current painting ****/
    const setPaintingsList = async () => {
      let tempPainting = [];
      PaintingsDatabase.forEach((paint) => {
        let singlePaint = { ...paint };
        tempPainting = [...tempPainting, singlePaint];
      });
      this.setState({ paintingList: tempPainting });
    };

    setPaintingsList().then(this.changePainting);
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.raws !== this.state.raws ||
      prevState.columns !== this.state.columns
    ) {
      const { columns, raws } = this.state;
      const currentPainting = this.state.currentPainting.img;
      this.splitPainting(currentPainting, columns, raws);
    }
  }

  /********** Change Painting **********/
  changePainting = (e) => {
    //Save copy of Painting List

    const setCurrentPainting = async (value) => {
      let { id } = this.state.currentPainting;

      const setPainting = (e) => {
        this.setState(
          () => {
            return { currentPainting: this.state.paintingList[e] };
          },
          () => {
            const {
              imgRelativeSize,
              imgWidth,
              imgHeight,
              frameToArtPct,
              frameToMatPct,
            } = this.state.currentPainting.sizing;
            this.setState({
              artSizing: FrameDimension(
                imgRelativeSize,
                imgWidth,
                imgHeight,
                frameToArtPct,
                frameToMatPct
              ),
            });
          }
        );
      };

      switch (value) {
        case "next":
          setPainting(id + 1);
          break;
        case "previous":
          setPainting(id - 1);
          break;
        default:
          setPainting(0);
          break;
      }
    };

    //Split Painting In Equal Parts
    const splitCurrentPainting = () => {
      return new Promise((resolve) => {
        const { columns, raws } = this.state;
        const currentPainting = this.state.currentPainting.img;
        this.splitPainting(currentPainting, columns, raws);
        resolve();
      });
    };

    setCurrentPainting(e).then(splitCurrentPainting);
  };

  /********** Split Current Painting in Equal Parts **********/
  splitPainting = (src, cols, raws) => {
    //step 1 create canvas + img & TempPart
    const canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      img = document.createElement("IMG");
    img.src = src;

    //step 2 split painting
    const split = (cols, raws) => {
      const paintingParts = []; // Temporary Parts
      const partsNbrs = []; // Temporay Part Nbrs

      const slicedWidth = img.width / cols;
      const slicedHeight = img.height / raws;
      const totalNbrParts = cols * raws;

      for (var i = 0; i < totalNbrParts; i++) {
        //create coordinates for sliced img
        const x = -slicedWidth * (i % cols);
        const y = -slicedHeight * Math.floor(i / cols);
        //canvas size
        canvas.width = slicedWidth;
        canvas.height = slicedHeight;
        ctx.drawImage(img, x, y, slicedWidth * cols, slicedHeight * raws);
        //add sliced image to temporary paintingParts array
        paintingParts.push(canvas.toDataURL());
        partsNbrs.push(i);
      }

      //step 3 Add Splited Pictures to State
      this.setState({
        paintingParts,
        partsNbrs,
        columnSize: `${100 / cols}%`,
        rawSize: `${100 / raws}%`,
      });
    };

    img.onload = () => split(cols, raws);
  };

  /********** Shuffle Method **********/

  shuffle = () => {
    const { partsNbrs } = this.state;

    const mix = (parts) => {
      const array = [...partsNbrs];

      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      this.setState({ partsNbrs: array, isShuffled: true });
    };

    mix(partsNbrs);
  };

  /********** Sorting Methods **********/

  /*** Required for Visual ***/
  //Stop function execution for ms time
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Manage Async nature of this.setState -> from https://stackoverflow.com/questions/53409325/does-this-setstate-return-promise-in-react#:~:text=setState%20is%20usually%20not%20used,doesn't%20return%20a%20promise.
  setAsyncState = (newState) =>
    new Promise((resolve) => this.setState(newState, resolve));

  //Change state after waiting for sleep
  changeState = async (partsNbrs, ms) => {
    await this.sleep(ms).then(() => this.setAsyncState({ partsNbrs }));
  };

  /*** Bubble Sort ***/
  bubbleSort = async (array, ms) => {
    const partsNbrs = [...array];
    let noSwaps;

    for (var i = partsNbrs.length; i > 0; i--) {
      noSwaps = true;
      for (var j = 0; j < i - 1; j++) {
        if (partsNbrs[j] > partsNbrs[j + 1]) {
          var temp = partsNbrs[j];
          partsNbrs[j] = partsNbrs[j + 1];
          partsNbrs[j + 1] = temp;
          noSwaps = false;
        }
      }
      await this.changeState(partsNbrs, ms);
      if (noSwaps) break;
    }
  };

  /*** Insertion Sort ***/
  insertionSort = async (array, ms) => {
    const partsNbrs = [...array];

    for (let i = 1; i < partsNbrs.length; i++) {
      let key = partsNbrs[i];
      let j = i - 1;
      while (j >= 0 && partsNbrs[j] > key) {
        partsNbrs[j + 1] = partsNbrs[j];
        j = j - 1;
      }
      partsNbrs[j + 1] = key;
      await this.changeState(partsNbrs, ms);
    }
  };

  /*** Merge Sort ***/
  mergeSort = async (array, ms) => {
    const partsNbrs = [...array];
    let partsNbrsObject = partsNbrs.map((val, ind) => {
      return { val, ind };
    });

    //Allowing to visualise merge sort
    const animation = async (result) => {
      let values = [];
      let index = [];

      result.forEach((el) => {
        values.push(el.val);
        index.push(el.ind);
      });

      let sortedIndex = [...index].sort((a, b) => a - b);

      if (JSON.stringify(index) !== JSON.stringify(sortedIndex)) {
        partsNbrs.splice(Math.min(...index), index.length, ...values);
        await this.changeState(partsNbrs, ms);
      }

      return values.map((val, i) => {
        return { val, ind: sortedIndex[i] };
      });
    };

    // Merge Sort and Merge Method
    const merge = (arr1, arr2) => {
      let sorted = [];

      while (arr1.length && arr2.length) {
        if (arr1[0].val < arr2[0].val) sorted.push(arr1.shift());
        else sorted.push(arr2.shift());
      }

      let result = sorted.concat(arr1.slice().concat(arr2.slice()));

      return animation(result);
    };

    const mergeSort = async (arr) => {
      if (arr.length <= 1) return arr;
      let mid = Math.floor(arr.length / 2);
      let left = await mergeSort(arr.slice(0, mid));
      let right = await mergeSort(arr.slice(mid));
      return merge(left, right);
    };

    await mergeSort(partsNbrsObject);
  };

  /*** Quick Sort ***/
  quickSort = async (array, ms) => {
    const partsNbrs = [...array];

    const partition = (partsNbrs, left, right) => {
      // create pivot as middle value
      const pivot = partsNbrs[Math.floor((right + left) / 2)];
      while (left <= right) {
        while (partsNbrs[left] < pivot) {
          left++;
        }
        while (partsNbrs[right] > pivot) {
          right--;
        }
        if (left <= right) {
          // swap values using destructuring
          [partsNbrs[left], partsNbrs[right]] = [
            partsNbrs[right],
            partsNbrs[left],
          ];
          left++;
          right--;
        }
      }
      return left;
    };

    const qckSort = async (partsNbrs, left = 0, right = array.length - 1) => {
      let index;
      await this.changeState(partsNbrs, ms);
      if (partsNbrs.length > 1) {
        // create the partition (split the array)
        index = partition(partsNbrs, left, right);
        if (left < index - 1) await qckSort(partsNbrs, left, index - 1);
        if (index < right) await qckSort(partsNbrs, index, right);
      }
      // await this.changeState(partsNbrs, ms)
    };

    await qckSort(partsNbrs);
  };

  /*** Sort ***/
  sort = () => {
    const { algorithm, partsNbrs, speed } = this.state;
    const speeds = [500, 225, 150, 75, 25]; // Sorting Speeds

    // Form Management during Sorting
    const desactivateForm = async () => {
      await this.setAsyncState({ disableForm: true });
    };
    const activateForm = async () => {
      await this.setAsyncState({ disableForm: false });
    };

    // Select Sorting Methof
    const selectAlgorithm = async () => {
      // eslint-disable-next-line default-case
      switch (algorithm) {
        case "bubble-sort":
          await this.bubbleSort(partsNbrs, speeds[speed]);
          break;
        case "insertion-sort":
          await this.insertionSort(partsNbrs, speeds[speed]);
          break;
        case "merge-sort":
          await this.mergeSort(partsNbrs, speeds[speed]);
          break;
        case "quick-sort":
          await this.quickSort(partsNbrs, speeds[speed]);
          break;
      }
    };

    desactivateForm()
      .then(() => this.setState({ isSorting: true }))
      .then(() => selectAlgorithm(algorithm))
      .then(() => this.setState({ isSorting: false }))
      .then(() => activateForm());
  };

  /********** Handle Form **********/
  handleChange = (e) => {
    const { type, value } = e.target;

    const isValidNumber = value > 0 && value <= 100;

    if (type === "number" && isValidNumber) {
      return this.setState({ [e.target.name]: +value, isShuffled: false });
    }

    if (type === "radio") {
      return this.setState({ algorithm: value, isShuffled: false });
    }

    if (type === "range") {
      return this.setState({ speed: +value, isShuffled: false });
    }
  };

  handleSubmit = (e) => e.preventDefault();

  render() {
    const {
      state,
      props,
      handleChange,
      handleSubmit,
      shuffle,
      sort,
      changePainting,
    } = this;

    return (
      <Context.Provider
        value={{
          ...state,
          handleChange,
          handleSubmit,
          shuffle,
          sort,
          changePainting,
        }}
      >
        {props.children}
      </Context.Provider>
    );
  }
}

const ContextProvider = Provider;

const ContextConsumer = Context.Consumer;

export { ContextProvider, ContextConsumer };
