import React from 'react';
import './App.css';
import Book from './components/Book.js';

export default class App extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        books : [],
        bookToAdd: ""
      }
  }
  componentWillMount =()=>{
    this.manipulateBooks('GET',{})
  }

  manipulateBooks =(type, body)=>{
    let request = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    if(type == 'POST'){
      request.body = body
    }
    fetch(' http://localhost:5000/books', request).then(r => r.json())
    .then((data) =>{
      if(type == 'GET') this.setState({books: data.response})
    });
  }

  addBook =(name)=>{
    let {books, bookToAdd} = this.state
    if(bookToAdd === ""){
      alert('Enter book name')
      return
    }
    let body = {'id': books.length, 'name': bookToAdd}
    this.manipulateBooks('POST', JSON.stringify(body))
    books.push(body)
    this.setState({books})
  }

  renderBooks =()=>{
      let {books} = this.state
      let arr = []
      for(let i = 0; i < books.length; i++){
        arr.push(
          <Book key={i} id={books[i].id} name = {books[i].name}/>
        )
      }
      return arr
  }

  render(){
    return (
      <div className="App">
        <div className="NewBook">
          <input onChange={(event)=>{this.setState({"bookToAdd":event.target.value})}}/>
          <button onClick={this.addBook}>Add</button>
        </div>
        <div className="BookContainer">
          {this.renderBooks()}
        </div>
      </div>
    );
  }
}

