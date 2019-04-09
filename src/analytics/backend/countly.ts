// tslint:disable:no-console
import { fetchUserId, shouldTrack } from '../utils'
import { AnalyticsBackend } from './types'
import { AnalyticsEvent, AnalyticsTrackEventOptions } from '../types'

export default class CountlyAnalyticsBackend implements AnalyticsBackend {
    static DEF_TRACKING = true

    private countlyConnector

    /**
     * @param {Object} args
     * @param {string} args.countlyConnector Connector to the Countly.
     * @param {string} args.url url of the counly server.
     * @param {string} args.appKey app key of the counly server.
     */
    constructor({
        countlyConnector,
        ...args
    }: {
        countlyConnector: any
        url: string
        appKey: string
    }) {
        this.countlyConnector = countlyConnector

        this.initCountly(args)
    }

    private initCountly({ url, appKey }) {
        this.countlyConnector.app_key = appKey
        this.countlyConnector.url = url
        this.countlyConnector.init()
    }

    private get countlyQueue() {
        return this.countlyConnector.q
    }

    private enqueueEvent({ key, id, value = null }) {
        const event = [
            'add_event',
            {
                key,
                count: 1,
                segmentation: {
                    id,
                    ...(value ? { value } : {}),
                },
            },
        ]
        this.countlyQueue.push(event)
    }

    async trackEvent(
        event: AnalyticsEvent,
        options: AnalyticsTrackEventOptions,
    ) {
        const userId = await fetchUserId()
        if (!userId) {
            return
        }

        const isEvent = (wanted: { category: string; action: string }) =>
            event.category === wanted.category && event.action === wanted.action
        if (isEvent({ category: 'Global', action: 'Install' })) {
            this.enqueueEvent({
                id: userId,
                key: 'install',
            })
        } // Add other events to send to Countly as else if (isEvent(...)) { ... } statements
    }
}
