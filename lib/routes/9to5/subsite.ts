import cache from '@/utils/cache';
import got from '@/utils/got';
import parser from '@/utils/rss-parser';
const utils = require('./utils');

export default async (ctx) => {
    let title = '9To5',
        link,
        description;

    switch (ctx.req.param('subsite')) {
        case 'mac':
            link = 'https://9to5mac.com';
            title += 'Mac';
            description = 'Apple News & Mac Rumors Breaking All Day';
            break;

        case 'google':
            link = 'https://9to5google.com';
            title += 'Google';
            description = 'Google, Pixel news, Android, Home, Chrome OS, apps, more';
            break;

        case 'toys':
            link = 'https://9to5toys.com';
            title += 'Toys';
            description = 'New Gear, reviews and deals';
            break;

        default:
            break;
    }

    if (ctx.req.param('tag')) {
        link = `${link}/guides/${ctx.req.param('tag')}/feed/`;
        title = `${ctx.req.param('tag')} | ${title}`;
    } else {
        link = `${link}/feed/`;
    }

    const feed = await parser.parseURL(link);

    const items = await Promise.all(
        feed.items.splice(0, ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit')) : 10).map((item) =>
            cache.tryGet(item.link, async () => {
                const response = await got({
                    method: 'get',
                    url: item.link,
                });
                const description = utils.ProcessFeed(response.data);

                const single = {
                    title: item.title,
                    description,
                    pubDate: item.pubDate,
                    link: item.link,
                    author: item['dc:creator'],
                };

                return single;
            })
        )
    );

    ctx.set('data', {
        title,
        link,
        description,
        item: items,
    });
};
