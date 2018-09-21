import React                     from 'react';
import { connect }               from 'react-redux'
import {fetchSessionCredentials} from '../../actions/actions';

class VisioComponent extends React.Component {

    render() {

        return (

            <div id="visio" className="VisioComponent">
                <div id="subscriber"></div>
                <div id="publisher"></div>
                <button onClick={this.props.fetchSessionCredentials}>Generate Session</button>
                {
                    this.props.token &&
                    this.props.sessionId &&
                    <a target="_blank" href={`http://192.168.10.216:4000?token=${this.props.token}&sessionId=${this.props.sessionId}`}>share this link</a>
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
    })
)(VisioComponent)