import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/time';

export const route: Route = {
    path: '/:id',
    categories: ['anime'],
    example: '/laimanhua/tiandikangzhanjiVERSUS',
    parameters: { id: '漫画 ID，可在 URL 中找到' },
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
        nsfw: true,
    },
    radar: [
        {
            source: ['www.laimanhua8.com/kanmanhua/:id'],
        },
    ],
    name: '漫画列表',
    maintainers: ['TonyRL'],
    handler,
};

async function handler(ctx) {
    const id = ctx.req.param('id');
    const baseUrl = 'https://www.laimanhua8.com';
    const link = `${baseUrl}/kanmanhua/${id}/`;

    const { data: response } = await got(link, {
        responseType: 'buffer',
    });
    let $ = load(new TextDecoder('utf-8').decode(response));
    const charset = $('meta[http-equiv="Content-Type"]')
        .attr('content')
        ?.match(/charset=(.*)/)?.[1];
    if (charset && charset.toLowerCase() !== 'utf-8') {
        $ = load(new TextDecoder(charset).decode(response));
    }

    const updateTime = $('head meta[property="og:novel:update_time"]').attr('content');
    const items = $('.plist a')
        .toArray()
        .flatMap((item, index) => {
            const $item = $(item);
            const href = $item.attr('href');
            if (!href) {
                return [];
            }
            return {
                title: $item.attr('title')!,
                link: new URL(href, link).href,
                pubDate: index === 0 && updateTime ? parseDate(updateTime) : undefined,
                author: $('head meta[property="og:novel:author"]').attr('content'),
            };
        });

    return {
        title: `${$('head meta[property="og:novel:book_name"]').attr('content')} - 来漫画`,
        description: $('.introduction').text(),
        image: $('head meta[property="og:image"]').attr('content'),
        link,
        item: items,
    };
}
