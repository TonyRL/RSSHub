import type { Context } from 'hono';

import type { Route } from '@/types';
import ofetch from '@/utils/ofetch';
import { parseDate } from '@/utils/time';

export const route: Route = {
    path: '/user/:username',
    categories: ['social-media'],
    example: '/fansone/user/eeooa0314',
    parameters: { username: 'Username, can be found in the URL' },
    features: {
        nsfw: true,
    },
    radar: [
        {
            source: ['fansone.co/:username', 'fansone.co/:lang/:username'],
        },
    ],
    name: 'User Posts',
    maintainers: ['TonyRL'],
    handler,
    url: 'fansone.co',
};

async function handler(ctx: Context) {
    const { username } = ctx.req.param();
    const baseUrl = 'https://fansone.co';

    const response = await ofetch(`${baseUrl}/api/post`, {
        query: {
            username,
            page: 1,
            limit: ctx.req.query('limit') ?? 30,
            uid: 'NONE',
            isEnablePager: false,
        },
    });

    const items = response.data.map((post) => {
        const content = post.content_zh;
        const images = (post.images || post.thumb).split(',').filter((image) => image && !content.includes(image));
        return {
            title: post.title || post.content.replaceAll('<br />', ' '),
            description: content + images.map((image) => `<br><img src="${image}">`).join(''),
            link: `${baseUrl}/post/${post.id}`,
            pubDate: parseDate(post.created_at),
            author: post.displayname,
            category: post.tags.split(',').filter(Boolean),
        };
    });

    const user = response.data[0];

    return {
        title: `${user?.displayname} (@${user?.username}) - FansOne`,
        link: `${baseUrl}/${username}`,
        image: user?.avatar,
        item: items,
    };
}
