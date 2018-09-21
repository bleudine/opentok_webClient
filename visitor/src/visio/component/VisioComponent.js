import React                     from 'react';
import { connect }               from 'react-redux'
import {initVisioChat} from '../../actions/actions';

class VisioComponent extends React.Component {

    componentDidMount() {
        this.props.initVisioChat();
    }

    render() {

        return (

            <div id="visio" className="VisioComponent">
                <div id="subscriber"/>
                <div id="publisher"/>
            </div>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        initVisioChat: () => dispatch(initVisioChat())
    })
)(VisioComponent)