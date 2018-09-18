import React from 'react';
import { connect } from 'react-redux'

class VisioComponent extends React.Component {

    render() {

        return (

            <div id="visio" className="VisioComponent">
                <div id="subscriber"></div>
                <div id="publisher"></div>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(VisioComponent)