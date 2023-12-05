import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[];
  showGraph: boolean; // Add showGraph property to the state
}

/**
 * The parent element of the react app.
 * It renders title, button, and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Set the initial state of showGraph to false
    };
  }

  /**
   * Render Graph react component with state.data parsed as property data
   */
  renderGraph() {
    // Conditionally render the graph based on the showGraph state
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
  }

  getDataFromServer() {
    let x = 0;
    // Modify the getDataFromServer method to continuously get data
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of
        // Previous data in the state and the new data from the server
        this.setState({ 
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if(x>1000){
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.setState({ showGraph: true }); // Show the graph when the button is clicked
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
