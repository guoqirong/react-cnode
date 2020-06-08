import React, { Component } from 'react'
import { Spin } from 'antd';

class Loading extends Component {
	render() {
		return (
			<div style={{width: '90vw', height: '80vh'}}>
				<Spin tip="Loading..." size="large" style={{width: '90vw', height: '80vh'}}>
					{ this.props.children }
				</Spin>
			</div>
		)
	}
}

export default Loading;