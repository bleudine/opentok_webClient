import React                     from 'react';
import { connect }               from 'react-redux'
import {initVisioChat, sendMessage} from '../../actions/actions';

class VisioComponent extends React.Component {
    input = null;

    componentDidMount() {
        this.props.initVisioChat();
    }

    render() {

        return (

            <div id="visio" className="VisioComponent">
                <div id="subscriber"/>
                <div id="publisher"/>
                <div id="chatBox"/>
                <form id="chatForm" onSubmit={e => {
                    e.preventDefault();
                    this.props.sendMessage(this.input.value)
                }}>
                    <input ref={input => this.input = input} id="textInput" type="text" />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        initVisioChat: () => dispatch(initVisioChat()),
        sendMessage: message => dispatch(sendMessage(message))
    })
)(VisioComponent)