import { all, call, takeEvery, put}                                                          from 'redux-saga/effects';
import OT                                                                                    from "@opentok/client";
import {FETCH_SESSION_CREDENTIALS, RECEIVED_SESSION_CREDENTIALS, receivedSessionCredentials} from '../actions/actions';
import {opentokSession as activeSession} from '../utils/opentokSession';

export default function* mainSaga() {
    console.log('WELL GOOD JOMB');
    yield all([
        takeEvery(FETCH_SESSION_CREDENTIALS, fetchSession),
        takeEvery(RECEIVED_SESSION_CREDENTIALS, openTokSession)
    ])
}

function* fetchSession() {
    try {
        const res = yield call(fetch, 'http://localhost:8080/room/session', {method: 'GET'});
        const json = yield call([res, 'json']);

        yield put(receivedSessionCredentials(json));


        console.log(json);
    } catch (error) {
        console.error(error);
    }
}

function* openTokSession(payload) {
    const active = new activeSession(payload);
    const session = active.session;

    session.on('streamCreated', e => {
        console.log('streamCreated : ', e);
        const { stream } = e;

        active.setStream(stream);
        active.setSubscriber(stream);
        const subscriber = active.subscriber;

        subscriber.on('destroyed', () => {
            session.unsubscribe(subscriber);
        })
    });

    session.on('connectionCreated', e => {
        console.log('connectionCreated : ', e);
    });

    session.on('connectionDestroyed', function*(e) {
        console.log('connectionDestroyed : ', e);
    });

    session.on('signal', e => {
        console.log('signal : ', e);
    });


    active.connect();
}