import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank.js';
import ImageForm from './components/ImageForm/ImageForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import './App.css';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}
const initialState = {
  input: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    name:'',
    email:'',
    id:'',
    joined:'',
    entries:0
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  calculateOffsets = (data) => {
    const clarifaiValues = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('faceRecogImg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      top: clarifaiValues.top_row * height,
      bottom: height - clarifaiValues.bottom_row * height,
      left: clarifaiValues.left_col * width,
      right: width - clarifaiValues.right_col * width
    }
  }
  displayBox = (box) => {
    this.setState({box})
  }
  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState)
    }
    this.setState({route})
  }
  onButtonSubmit = () => {
    if (this.state.input) {
    fetch('https://protected-basin-68901.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
        input : this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://protected-basin-68901.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        })})
        .then(response => response.json())
        .then(entries => {
          this.setState({user: {
            ...this.state.user, entries: entries
          }})
        })
        .catch(console.log)
      }
      this.displayBox(this.calculateOffsets(response));
    })
    .catch(err => console.log(err)) 
    }
  }
  loadUser = (data) => {
    this.setState({user: {
      name: data.name,
      email: data.email,
      id: data.id,
      joined: data.joined,
      entries: data.entries
    }})
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
          (
            this.state.route === 'register' ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageForm onChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.input}/>
            </>
          )
        }
      </div>
    );
  }
}

export default App;
