import { load } from 'cheerio';

import type { Route } from '@/types';
import logger from '@/utils/logger';
import { parseDate } from '@/utils/parse-date';
import puppeteer from '@/utils/puppeteer';

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

    const browser = await puppeteer();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        request.resourceType() === 'document' || request.resourceType() === 'script' ? request.continue() : request.abort();
    });
    logger.http(`Requesting ${currentUrl}`);
    await page.goto(currentUrl, {
        waitUntil: 'domcontentloaded',
    });

    const html = await page.content();
    await page.close();
    const $ = load(html);

    const list = $('.article-meta')
        .toArray()
        .map((item) => {
            const $item = $(item);
            const a = $item.find('.issue-item__title a');
            return {
                title: a.text(),
                description: $item.find('.toc-item__abstract').text(),
                link: `${rootUrl}${a.attr('href')}`,
            };
        });

    const items = await Promise.all(
        list.map((item) =>
            ctx.cache.tryGet(item.link, async () => {
                const page = await browser.newPage();
                await page.setRequestInterception(true);
                page.on('request', (request) => {
                    request.resourceType() === 'document' || request.resourceType() === 'script' ? request.continue() : request.abort();
                });
                logger.http(`Requesting ${currentUrl}`);
                await page.goto(item.link, {
                    waitUntil: 'domcontentloaded',
                });
                const detailResponse = await page.content();
                const content = load(detailResponse);

                content('.author-info').remove();

                item.author = content('.loa-accordion').text();
                item.doi = content('meta[name="dc.Identifier"]').attr('content');
                item.description = content('.abstractInFull').html();
                item.pubDate = parseDate(content('meta[name="dc.Date"]').attr('content'));

                return item;
            })
        )
    );

    await browser.close();
    return {
        title: cfg.title,
        link: currentUrl,
        item: items,
    };
}
