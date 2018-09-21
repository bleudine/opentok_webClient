import OT from "@opentok/client";

export class opentokSession {
    constructor(payload) {
        this.tokbox = payload;
        this.tokboxSession = OT.initSession(this.tokbox.apiKey, this.tokbox.sessionId);
        this.sessionSubscriber = null;
        this.sessionPublisher = null;
        this.currentStream = null;
    }

    onPublish(error) {
        if (error) {
            console.error(error);
        }
    }

    onSubscribe(error) {
        if (error) {
            console.error(error);
        }
    }

    onConnection(error) {
        if (error) {
            console.error(error);
        }
    }

    initPublisher(onPublish = this.onPublish) {
        this.sessionPublisher = OT.initPublisher('publisher', {
            insertMode: 'append',
            width: '100%',
            height: '100%',
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

    connect() {
        return this.session.connect(this.tokbox.token, this.onConnection);
    }

    disconnect() {
        return this.session.disconnect();
    }
}