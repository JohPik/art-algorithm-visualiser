import React from 'react'

export default function Form(){
    return (
        <section className="form">
            <form>
                {/* need to make field required */}
                <div className="form-section">
                    <h3>Number of Sections</h3>
                    <p>Choose a number of colums and raws to divide the painting in equal sections.</p>
                    <input type="number"  name="raws" min="0" max="100" step="1" value="30"/>
                    <label for="raws">Raws</label>
                    <br/>
                    <input type="number"  name="columns" min="0" max="100" step="1" value="30"/>
                    <label for="columns">Columns</label>
                </div>
                
                <hr/>
                
                <div className="form-section">
                    <h3>Sorting Algorithm</h3>
                    <p>Select a sorting Algorithm to be used.</p>              
                    <input type="radio" id="bubble-sort" name="bubble-sort" value="bubble-sort"/>
                    <label for="bubble-sort">Bubble Sort</label><br/>
                    <input type="radio" id="merge-sort" name="merge-sort" value="merge-sort"/>
                    <label for="merge-sort">Merge Sort</label><br/>
                    <input type="radio" id="quick-sort" name="quick-sort" value="quick-sort"/>
                    <label for="quick-sort">Quick Sort</label><br/>
                    <input type="radio" id="other-sort" name="other-sort" value="other-sort"/>
                    <label for="other-sort">Other Sort</label><br/>
                </div>

                <hr/>

                <div className="form-section">
                    <h3>Number of Sections</h3>
                    <p>Choose a number of colums and raws to divide the painting in equal sections.</p>
                    <input type="range" id="speed" name="speed" min="0" max="4" value="2"/>
                    {/* should change accordingly */}
                    <label for="speed">current speed</label><br/>
                </div>

                <div className="form-section">
                    <input type="submit"></input>
                    <button> Sort </button>
                </div>
            </form>
        </section>
    )
}