const utils = require('./utils');
import { config } from '@/config';

export default async (ctx) => {
    if (!config.twitter || !config.twitter.consumer_key || !config.twitter.consumer_secret) {
        throw new Error('Twitter RSS is disabled due to the lack of <a href="https://docs.rsshub.app/install/#pei-zhi-bu-fen-rss-mo-kuai-pei-zhi">relevant config</a>');
    }
    const woeid = ctx.req.param('woeid') ?? 1; // Global information is available by using 1 as the WOEID
    const client = await utils.getAppClient();
    const data = await client.v1.get('trends/place.json', { id: woeid });
    const [{ trends }] = data;

    ctx.set('data', {
        title: `Twitter Trends on ${data[0].locations[0].name}`,
        link: `https://twitter.com/i/trends`,
        item: trends
            .filter((t) => !t.promoted_content)
            .map((t) => ({
                title: t.name,
                link: t.url,
                description: t.name + (t.tweet_volume ? ` (${t.tweet_volume})` : ''),
            })),
    });
};
