import { Route } from '@/types';

import ofetch from '@/utils/ofetch';
import { load } from 'cheerio';

export const route: Route = {
    path: '/journal/:id',
    name: 'Journal',
    categories: ['journal'],
    example: '/aom/journal/amr',
    maintainers: ['nczitzk'],
    parameters: {
        category: {
            description: 'Journal id, see below',
            options: [
                { value: 'world', label: 'World' },
                { value: 'business', label: 'Business' },
                { value: 'legal', label: 'Legal' },
                { value: 'markets', label: 'Markets' },
                { value: 'breakingviews', label: 'Breakingviews' },
                { value: 'technology', label: 'Technology' },
                { value: 'graphics', label: 'Graphics' },
                { value: 'authors', label: 'Authors' },
            ],
        },
    },
    handler,
    url: 'journals.aom.org',
};

const rootUrl = 'https://journals.aom.org';

const config = {
    annals: {
        title: 'Academy of Management Annals',
        link: `${rootUrl}/journal/annals`,
    },
    amd: {
        title: 'Academy of Management Discoveries',
        link: `${rootUrl}/journal/amd`,
    },
    amgblproc: {
        title: 'Academy of Management Global Proceedings',
        link: `${rootUrl}/toc/amgblproc/current`,
    },
    amj: {
        title: 'Academy of Management Journal',
        link: `${rootUrl}/journal/amj`,
    },
    amle: {
        title: 'Academy of Management Learning & Education',
        link: `${rootUrl}/journal/amle`,
    },
    amp: {
        title: 'Academy of Management Perspectives',
        link: `${rootUrl}/journal/amp`,
    },
    amproc: {
        title: 'Academy of Management Proceedings',
        link: `${rootUrl}/toc/amproc/current`,
    },
    amr: {
        title: 'Academy of Management Review',
        link: `${rootUrl}/toc/amr/0`,
    },
};

async function handler(ctx) {
    const cfg = config[ctx.req.param('id')];
    if (!cfg) {
        throw new Error('Bad id. See <a href="https://docs.rsshub.app/routes/journal#academy-of-management-journal">docs</a>');
    }

    const currentUrl = cfg.link;

    const firstResponse = await ofetch.raw(rootUrl);

    const headers = {
        cookie: `JSESSIONID=${firstResponse.headers['set-cookie'].join(' ').match(/JSESSIONID=(\S+);/)[1]}`,
    };

    const response = await ofetch(currentUrl, {
        headers,
    });
    const $ = load(response);

    $('div[data-widget-def="topContentActionWidget"]').eq(2).remove();
    $('div[data-widget-def="topContentActionWidget"]').eq(1).remove();

    const list = $('h5')
        .not('.border-top')
        .toArray()
        .map((item) => {
            item = $(item);
            const a = item.parent().get(0).tagName === 'a' ? item.parent() : item.find('a');
            return {
                title: a.attr('title'),
                link: `${rootUrl}${a.attr('href')}`,
            };
        });

    const items = await Promise.all(
        list.map((item) =>
            ctx.cache.tryGet(item.link, async () => {
                const detailResponse = await ofetch(item.link, {
                    headers,
                });
                const content = load(detailResponse);

                content('.author-info').remove();

                item.author = content('.loa-accordion').text();
                item.doi = content('meta[name="dc.Identifier"]').attr('content');
                item.description = content('.abstractInFull').html();
                item.pubDate = new Date(content('meta[name="dc.Date"]').attr('content')).toUTCString();

                return item;
            })
        )
    );

    return {
        title: cfg.title,
        link: currentUrl,
        item: items,
    };
}
