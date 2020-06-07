import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      response: '',
      apiResponse: '',
      loading: true
    }

  }
  componentDidMount() {
    
    fetch('/weatherapi').then((response) => (
      response.text()
    )).then((res) => {
      this.setState({ apiResponse: res, loading: false });
    });
  }

  render() {
    if(this.state.loading) return(<p>loading</p>)
    return (
      <div className="App">
        {this.state.apiResponse}
      </div>
    );
  }

}

