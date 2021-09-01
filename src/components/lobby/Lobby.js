import React from 'react';
import { connect } from 'react-redux';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  const handleChange=(event)=> {
   
   [event.target.name] = event.target.value
  }
  render() {
    return (
      <div>
        <div className="chatbox">
          <h3>Battle Chat</h3>
          <ul id="chatMessages"></ul>
          <input
          type = 'text'
          value
          onChange={this.handleChange}
          ></input>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      auth: state.auth
  };
};

export default connect(mapState, null)(Lobby);
