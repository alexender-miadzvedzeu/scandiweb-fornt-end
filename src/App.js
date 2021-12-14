import React from 'react';
import './App.css';
import { getCutegories } from './core/apolloClient'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    getCutegories()
    .then(categories => {
      this.setState({categories})
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>ZALUPA</h1>
      </div>
    )
  }
}

export default App;
