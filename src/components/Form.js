import React from 'react'
import { ProductConsumer } from '../Context'

export default function Form() {
    const hello = values => {
        
        const {raws, columns, algorithm, speed, disable, handleChange, handleSubmit}  = values;
        const speedVariant = ["very slow", "slow", "normal", "fast", "very fast"]
        
        return (
            <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Number of Sections</h3>
                        <p>Choose a number of colums and raws to divide the painting in equal sections.</p>
                        <input type="number"  name="raws" min="1" max="100" step="1" value={raws} onChange={handleChange}/>
                        <label htmlFor="raws">Raws</label>
                        <br/>
                        <input type="number"  name="columns" min="1" max="100" step="1" value={columns}  onChange={handleChange}/>
                        <label htmlFor="columns">Columns</label>
                    </div>
                    
                    <hr/>
                    
                    <div className="form-section">
                        <h3>Sorting Algorithm</h3>
                        <p>Select a sorting Algorithm to be used.</p>              
                        <input
                            type="radio" id="bubble-sort" name="algorithm"
                            checked={algorithm === "bubble-sort"}
                            value="bubble-sort" onChange={handleChange}
                        />
                        <label htmlFor="bubble-sort">Bubble Sort</label><br/>
                        <input 
                            type="radio" id="merge-sort" name="algorithm"
                            checked={algorithm === "merge-sort"}
                            value="merge-sort" onChange={handleChange}
                        />
                        <label htmlFor="merge-sort">Merge Sort</label><br/>
                        <input 
                            type="radio" id="quick-sort" name="algorithm"
                            checked={algorithm === "quick-sort"}
                            value="quick-sort" onChange={handleChange}
                        />
                        <label htmlFor="quick-sort">Quick Sort</label><br/>
                        <input 
                            type="radio" id="other-sort" name="algorithm"
                            checked={algorithm === "other-sort"}
                            value="other-sort" onChange={handleChange}
                            />
                        <label htmlFor="other-sort">Other Sort</label><br/>
                    </div>

                    <hr/>

                    <div className="form-section">
                        <h3>Visualisation Speed</h3>
                        <p>Select the velocity/speed of sorting algorithm.</p>
                        <input type="range" id="speed" name="speed" min="0" max="4" value={speed} onChange={handleChange}/>
                        <br/>
                        <label htmlFor="speed">current speed: <span className="speed-tag">{speedVariant[speed]}</span></label>               
                    </div>

                    <hr/>

                    <div className="form-section">
                        <button type="submit" disabled={disable}>Shuffle</button>
                        <button>Sort</button>
                    </div>
                </form>
        )
    }
    return (
        <section className="form-wrapper">
            <ProductConsumer>
                {value => hello(value)}
            </ProductConsumer>
        </section>
    )
}
