import type { Route } from '@/types';
import cache from '@/utils/cache';
import got from '@/utils/got';

import { getCategories, parseItem, parseList } from './utils';

export const route: Route = {
    name: '分类',
    categories: ['game'],
    maintainers: ['TonyRL'],
    path: '/category/:category',
    example: '/4gamers/category/352',
    parameters: { category: '分类 ID，可从分类 URL 中找到' },
    radar: [
        {
            source: ['www.4gamers.com.tw/news'],
        },
    ],
    handler,
    url: 'www.4gamers.com.tw/news',
};

export async function handler(ctx) {
    const category = ctx.req.param('category');
    const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit')) : 25;
    const isLatest = !category;

    const { data: response } = await got(`https://www.4gamers.com.tw/site/api/news/${isLatest ? 'latest' : `by-category/${category}`}`, {
        searchParams: {
            nextStart: 0,
            pageSize: limit,
        },
    });
    const list = parseList(response.data.results);

    const items = await Promise.all(list.map((item) => cache.tryGet(item.link, () => parseItem(item))));

    let categories = [];
    let categoryName = '最新消息';
    if (!isLatest) {
        categories = await getCategories(cache.tryGet);
        categoryName = categories.find((c) => c.id === Number.parseInt(category)).name;
    }

    return {
        title: `4Gamers - ${categoryName}`,
        link: `https://www.4gamers.com.tw/news${isLatest ? '' : `/category/${category}/${categoryName}`}`,
        item: items,
    };
}
