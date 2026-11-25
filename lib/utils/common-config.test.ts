import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import buildData from '@/utils/common-config';
import { parseDate } from '@/utils/time';

const url = 'http://rsshub.test/buildData';

describe('common-config', () => {
    it('extracts page and item values with callbacks and preserves literal text', async () => {
        const suffix = 'buildData';
        const literal = `$('script').text() %one% + %two%`;
        const data = await buildData({
            link: url,
            url,
            title: ($) => $('.content li a').first().text() + ' - ' + suffix,
            description: literal,
            item: {
                item: '.content li',
                title: ($) => $('a').text() + ' - ' + suffix,
                link: ($) => $('a').attr('href'),
                description: ($) => $('.description').html(),
                pubDate: ($) => parseDate($('.date').text(), 'YYYY-MM-DD', 0),
            },
        });
        expect(data).toEqual({
            link: url,
            title: '1 - buildData',
            description: literal,
            allowEmpty: false,
            item: [
                { title: '1 - buildData', link: '/1', description: 'RSSHub1', pubDate: Temporal.Instant.from('2025-01-01T00:00:00Z'), guid: undefined },
                { title: '2 - buildData', link: '/2', description: 'RSSHub2', pubDate: Temporal.Instant.from('2025-01-02T00:00:00Z'), guid: undefined },
            ],
        });
    });

    it('preserves constants, numeric dates, missing fields and allowEmpty', async () => {
        const date = 1_735_689_600_000;
        const data = await buildData({
            url,
            title: 'Feed',
            allowEmpty: true,
            item: { item: '.content li', title: 'Item', description: undefined, pubDate: date },
        });
        expect(data.allowEmpty).toBe(true);
        expect(data.item).toEqual(Array.from({ length: 2 }, () => ({ title: 'Item', description: undefined, pubDate: date, link: undefined, guid: undefined })));
        const empty = await buildData({ url, title: 'Empty', item: { item: '.missing', title: 'Item' } });
        expect(empty.item).toEqual([]);
        expect(empty.allowEmpty).toBe(false);
    });

    it('decodes non-UTF-8 responses before calling selectors', async () => {
        const { default: server } = await import('@/setup.test');
        server.use(
            http.get(
                'http://rsshub.test/buildData-gbk',
                () =>
                    new HttpResponse(Buffer.from('3c68313ed6d0cec4b1eacce23c2f68313e3c756c3e3c6c693e3c6120687265663d222f31223ed6d0cec4ccf5c4bf3c2f613e3c2f6c693e3c2f756c3e', 'hex'), {
                        headers: { 'content-type': 'text/html; charset=gbk' },
                    })
            )
        );
        const data = await buildData({ url: 'http://rsshub.test/buildData-gbk', title: ($) => $('h1').text(), item: { item: 'li', title: ($) => $('a').text(), link: ($) => $('a').attr('href') } });
        expect(data.title).toBe('中文标题');
        expect(data.item[0]).toMatchObject({ title: '中文条目', link: '/1' });
    });
});
