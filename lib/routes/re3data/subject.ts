import { Route } from '@/types';
import ofetch from '@/utils/ofetch';
import { Subject } from './types';

export const route: Route = {
    path: '/subject',
    name: 'Subject',
    categories: ['study'],
    example: '/re3data/subject',
    maintainers: ['TonyRL'],
    handler,
    radar: [
        {
            source: ['www.re3data.org/browse/by-subject/'],
        },
    ],
};

async function handler() {
    const baseUrl = 'https://www.re3data.org';
    const link = `${baseUrl}/browse/by-subject/`;

    const response = await ofetch<Subject>(`${link}data.json`);

    const list = response;

    return {
        title: 'Subjects | re3data.org',
        link,
        language: 'zh',
        item: list,
    };
}
