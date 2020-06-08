import React, { Component } from 'react'
import { connect } from 'react-redux'

class IndexCollect extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div>222</div>
        <div>33</div>
        <div>111</div>
      </div>
    )
  }
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(IndexCollect);