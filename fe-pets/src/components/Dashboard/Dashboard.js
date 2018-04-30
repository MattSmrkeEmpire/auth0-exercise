import axios from 'axios'
import React from 'react'
import './Dashboard.css'

class Dashboard extends React.Component {
  endpoint = 'http://127.0.0.1:8000/pets/'
  constructor(props) {
    super(props);
    this.state = {
      getResponse: 'No request',
      postResponse: 'No request',
      deleteResponse: 'No request',
    }
  }

  getHeaders() {
    let headers = {}
    const accessToken = this.props.auth.getAccessToken()
    if (accessToken) {
      headers = { 'Authorization': `Bearer ${accessToken}`}
    }
    return headers
  }

  makeGetRequest() {
    this.setState({getResponse: 'making request...'})
    const headers = this.getHeaders()
    const request = axios.get(this.endpoint, { headers })
    return request.then(
      response => {
        this.setState({getResponse: JSON.stringify(response.data, null, 2)})
      },
      err => {
        this.setState({getResponse: `Error: ${err.message}`})
      }
    )
  }

  makePostRequest() {
    this.setState({postResponse: 'making request...'})
    const headers = this.getHeaders()
    const request = axios.post(this.endpoint, {
      name: this.refs.postName.value,
      animal_type: this.refs.postAnimalType.value,
    }, { headers })
    return request.then(
      response => {
        this.setState({postResponse: JSON.stringify(response.data, null, 2)})
      },
      err => {
        this.setState({postResponse: `Error: ${err.message}`})
      }
    )
  }

  makeDeleteRequest() {
    this.setState({deleteResponse: 'making request...'})
    const headers = this.getHeaders()
    const request = axios.delete(this.endpoint + this.refs.deleteId.value, { headers })
    return request.then(
      response => {
        this.setState({deleteResponse: JSON.stringify(response.data, null, 2)})
      },
      err => {
        this.setState({deleteResponse: `Error: ${err.message}`})
      }
    )
  }

  render() {
    return (
      <div>
        <h1>PetStore Dashboard</h1>
        <div className="request-wr">
          <button onClick={this.makeGetRequest.bind(this)}>GET</button>
          <pre>{ this.state.getResponse}</pre>
        </div>
        <div className="request-wr">
          <button onClick={this.makePostRequest.bind(this)}>POST</button>
          <span>
            <label>Name: <input type="text" ref="postName"></input></label>
            <label>Animal Type: <input type="text" ref="postAnimalType"></input></label>
          </span>
          <pre>{ this.state.postResponse}</pre>
        </div>
        <div className="request-wr">
          <button onClick={this.makeDeleteRequest.bind(this)}>DELETE</button>
          <span>
            <label>ID: <input type="number" ref="deleteId"></input></label>
          </span>
          <pre>{ this.state.deleteResponse}</pre>
        </div>
      </div>
    )
  }
}

export default Dashboard
