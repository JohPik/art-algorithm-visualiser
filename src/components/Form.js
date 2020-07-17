import React from 'react'
import { ProductConsumer } from '../Context'

export default function Form() {
    const renderForm = values => {
        
        const {raws, columns, algorithm, speed, disable, handleChange, handleSubmit, shuffle}  = values;
        const speedVariant = ["very slow", "slow", "normal", "fast", "very fast"]
        
        return (
            <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Number of Sections</h3>
                        <p>Divide painting in equal sections.</p>
                        <input type="number"  name="raws" min="1" max="100" step="1" value={raws} onChange={handleChange}/>
                        <label htmlFor="raws">Raws</label>
                        <br/>
                        <input type="number"  name="columns" min="1" max="100" step="1" value={columns}  onChange={handleChange}/>
                        <label htmlFor="columns">Columns</label>
                    </div>
            
                    <div className="form-section">
                        <h3>Sorting Algorithm</h3>
                        <p>Select a sorting Algorithm.</p>              
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

                    <div className="form-section">
                        <h3>Visualisation Speed</h3>
                        <p>Select the speed of sorting algorithm.</p>
                        <input type="range" id="speed" name="speed" min="0" max="4" value={speed} onChange={handleChange}/>
                        <br/>
                        <label htmlFor="speed">current speed:</label>
                        <p className="speed-tag">{speedVariant[speed]}</p>               
                    </div>

                    <div className="form-section">
                        <button disabled={disable} className="shadow-button" onClick={shuffle}>Shuffle</button>
                        <button className="full-button">Sort</button>
                    </div>
                </form>
        )
    }
    return (
        <section className="form-wrapper">
            <ProductConsumer>
                {value => renderForm(value)}
            </ProductConsumer>
        </section>
    )
}
