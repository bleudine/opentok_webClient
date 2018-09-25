import OT from "@opentok/client";

export class opentokSession {
    constructor(payload) {
        this.tokbox = payload;
        this.tokboxSession = OT.initSession(this.tokbox.apiKey, this.tokbox.sessionId);
        this.sessionSubscriber = null;
        this.sessionPublisher = null;
        this.currentStream = null;
        this.connectionId = null;
    }

    onPublish(error) {
        console.log(arguments);
        if (error) {
            console.error(error);
        }
    }

    onSubscribe(error) {
        if (error) {
            console.error(error);
        }
    }

    onConnection(error, event) {
        if (error) {
            console.error(error);
        } else {
            this.connectionId = event.target.connection.connectionId
        }
    }

    initPublisher(onPublish = this.onPublish) {
        this.sessionPublisher = OT.initPublisher('publisher', {
            insertMode: 'append',
            width: '30%',
            height: '30%',
        }, onPublish)
    }

    setSubscriber(stream, onSubscribe = this.onSubscribe) {
        this.sessionSubscriber= this.tokboxSession.subscribe(stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%',
            fitMode: 'contain',
        })
    }

    setStream(stream) {
        this.currentStream = stream;
    }

    unsetStream() {
        this.currentStream = null;
    }

    get session() {
        return this.tokboxSession;
    }

    get publisher() {
        return this.sessionPublisher;
    }

    get subscriber() {
        return this.sessionSubscriber;
    }

    get stream() {
        return this.currentStream;
    }

    get clientConnectionID() {
        return this.connectionId;
    }

    connect() {
        return this.session.connect(this.tokbox.token, this.onConnection.bind(this));
    }

    disconnect() {
        return this.session.disconnect();
    }
}