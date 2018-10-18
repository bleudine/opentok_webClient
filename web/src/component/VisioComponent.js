import React                     from 'react';
import { connect }               from 'react-redux';
import {fetchSessionCredentials} from '../actions/actions';
import {sendMessage}             from '../actions/actions';

class VisioComponent extends React.Component {
    input = null;

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
                <button onClick={this.props.fetchSessionCredentials}>Generate Session</button>
                {
                    this.props.token &&
                    this.props.sessionId &&
                    <a target="_blank" href={`http://localhost:4000?token=${this.props.token}&sessionId=${this.props.sessionId}`}>share this link</a>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.session.token,
        sessionId: state.session.sessionId,
    }),
    dispatch => ({
        fetchSessionCredentials: () => dispatch(fetchSessionCredentials()),
        sendMessage: message => dispatch(sendMessage(message))
    })
)(VisioComponent)