import React, { Component } from 'react'

export default class Form extends Component {
    
    state = {
        raws: 1,
        columns: 1,
        algorithm: "bubble-sort",
        speed: 2
    }

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

    handeSubmit = e => {
        e.preventDefault()
        //Do Something Late

    }

    speed = ["very slow", "slow", "normal", "fast", "very fast"]


    render() {
    
        return (
            <section className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <h3>Number of Sections</h3>
                        <p>Choose a number of colums and raws to divide the painting in equal sections.</p>
                        <input type="number"  name="raws" min="1" max="100" step="1" value={this.state.raws} onChange={this.handleChange}/>
                        <label htmlFor="raws">Raws</label>
                        <br/>
                        <input type="number"  name="columns" min="1" max="100" step="1" value={this.state.columns}  onChange={this.handleChange}/>
                        <label htmlFor="columns">Columns</label>
                    </div>
                    
                    <hr/>
                    
                    <div className="form-section">
                        <h3>Sorting Algorithm</h3>
                        <p>Select a sorting Algorithm to be used.</p>              
                        <input
                            type="radio" id="bubble-sort" name="algorithm"
                            checked={this.state.algorithm === "bubble-sort"}
                            value="bubble-sort" onChange={this.handleChange}
                        />
                        <label htmlFor="bubble-sort">Bubble Sort</label><br/>
                        <input 
                            type="radio" id="merge-sort" name="algorithm"
                            checked={this.state.algorithm === "merge-sort"}
                            value="merge-sort" onChange={this.handleChange}
                        />
                        <label htmlFor="merge-sort">Merge Sort</label><br/>
                        <input 
                            type="radio" id="quick-sort" name="algorithm"
                            checked={this.state.algorithm === "quick-sort"}
                            value="quick-sort" onChange={this.handleChange}
                        />
                        <label htmlFor="quick-sort">Quick Sort</label><br/>
                        <input 
                            type="radio" id="other-sort" name="algorithm"
                            checked={this.state.algorithm === "other-sort"}
                            value="other-sort" onChange={this.handleChange}
                            />
                        <label htmlFor="other-sort">Other Sort</label><br/>
                    </div>

                    <hr/>

                    <div className="form-section">
                        <h3>Visualisation Speed</h3>
                        <p>Select the velocity/speed of sorting algorithm.</p>
                        <input type="range" id="speed" name="speed" min="0" max="4" value={this.state.speed} onChange={this.handleChange}/>
                        <br/>
                        <label htmlFor="speed">current speed: <span className="speed-tag">{this.speed[this.state.speed]}</span></label>
                        {/* should change accordingly */}
                        
                    </div>

                    <hr/>

                    <div className="form-section">
                        <button type="submit"> Shuffle</button>
                        <button>Sort</button>
                    </div>
                </form>
            </section>
        )
    }
}
