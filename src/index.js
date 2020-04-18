import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

let testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class Form extends React.Component {
  state = {
    username: ""
  }
  handleChange = (event) => { // update username every time a character is entered
    this.setState(
      { username: event.target.value }
    );
    console.log(this.state.username);
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.get(`http://api.github.com/users/${this.state.username}`);
    this.props.onSubmit(res.data); // the onSubmit prop is a function reference
    console.log(res.data);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Github username"
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="gitprofile">
        <img src={profile.avatar_url} alt="placeholder"/>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="tagline">{profile.company}</div>
        </div>
      </div>
    )
  }
}

const CardList = (props) => {
  return (
    <div>
  	  {props.profiles.map(profile => <Card {...profile} key={profile.avatar_url}/>)}
	</div>
  )
};

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }
  state = {
    profiles: testData,
  };
  addProfile = (newProfile) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, newProfile] // use spread operator to concat
    }));
  };
  render() {
    return (
      <>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addProfile}/>
        <CardList profiles={this.state.profiles}/>
      </>
    )
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App title="GitHub Profiles"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
