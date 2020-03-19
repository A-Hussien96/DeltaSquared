import React from 'react';

export default class Book extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        name: ''
      }
  }
  componentWillMount =()=>{
    let {name, id} = this.props
    this.setState({name, id})
  }
  remove =()=>{
    let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    let {id, name} = this.state
    request.body = JSON.stringify({ id, name })
    console.log(request)
    fetch(' http://localhost:5000/deleteBooks', request)
    .then((data) =>{
      alert('Deleted')
      document.location.reload()
    });
  }

  render(){
    return (
      <div className="book">
        <h1>{this.state.name}</h1>
        <button onClick={this.remove}>Delete</button>
      </div>
    );
  }
}

