import { load } from 'cheerio';
import type { Context } from 'hono';

import type { DataItem, Route } from '@/types';
import cache from '@/utils/cache';
import ofetch from '@/utils/ofetch';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/:channel?',
    categories: ['social-media'],
    example: '/teamblind/tech',
    parameters: {
        channel: 'Channel slug from the channel URL, e.g. `tech` for `www.teamblind.com/channels/tech`. Popular posts when omitted.',
    },
    features: {
        antiCrawler: true,
    },
    radar: [
        {
            source: ['www.teamblind.com/channels/:channel'],
            target: '/:channel',
        },
    ],
    name: 'Posts',
    maintainers: ['TonyRL'],
    handler,
    url: 'www.teamblind.com',
};

async function handler(ctx: Context) {
    const { channel } = ctx.req.param();
    const baseUrl = 'https://www.teamblind.com';
    const link = channel ? `${baseUrl}/channels/${channel}` : baseUrl;

    const response = await ofetch(link);
    const $ = load(response);

    const flight = $('script:contains("__next_f.push")')
        .toArray()
        .map((script) => JSON.parse($(script).text().slice(22, -2)))
        .join('');
    const line = flight.split('\n').find((l) => l.includes('"articleList"'))!;
    let articleList: any[] = [];
    JSON.parse(line.slice(line.indexOf(':') + 1), (key, value) => {
        if (key === 'articleList') {
            articleList = value;
        }
        return value;
    });

    const list: DataItem[] = articleList.map((article) => ({
        title: article.title,
        link: `${baseUrl}/post/${article.alias}`,
        author: article.memberNickname,
        category: [article.boardName],
        description: article.images.map((image) => `<img src="${image.fileName}">`).join(''),
    }));

    const items = await Promise.all(
        list.map((item) =>
            cache.tryGet(item.link!, async () => {
                const response = await ofetch(item.link!);
                const $ = load(response);
                const post = JSON.parse($('#article-discussion-forum-posting-schema').text());
                item.description = post.text.replaceAll('\n', '<br>') + item.description;
                item.pubDate = parseDate(post.datePublished);
                return item;
            })
        )
    );

    return {
        title: $('head title').text(),
        link,
        image: `${baseUrl}/favicon.ico`,
        item: items,
    };
}
