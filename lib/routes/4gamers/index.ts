import type { Route } from '@/types';

import { handler } from './category';

export const route: Route = {
    name: '最新消息',
    categories: ['game'],
    maintainers: ['TonyRL'],
    path: '/',
    example: '/4gamers/category/352',
    radar: [
        {
            source: ['www.4gamers.com.tw/'],
        },
    ],
    handler,
    url: 'www.4gamers.com.tw/',
};
