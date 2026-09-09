import { beforeEach, describe, expect, it, vi } from 'vitest';

import nintendo from '../lib/routes/nintendo/utils';
import cache from '../lib/utils/cache';
import got from '../lib/utils/got';

vi.mock('../lib/utils/cache', () => ({
    default: { tryGet: vi.fn((_key, getValue) => getValue()) },
}));
vi.mock('../lib/utils/got', () => ({ default: vi.fn() }));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('Nintendo Nuxt data', () => {
    it('reads serialized object references and escaped content without executing page scripts', () => {
        const html = `<script>console.log(window.__NUXT__);throw new Error('Unrelated page code');</script>
        <script>window.__NUXT__=(function(a,b){a.title=b;a.content="<p>A&amp;B</p>";return {data:[{newsList:[a],newsData:a}]}}({},"News \\u4e2d\\u6587"));</script>`;

        expect(nintendo.nuxtReader(html)).toEqual({
            newsList: [{ title: 'News 中文', content: '<p>A&amp;B</p>' }],
            newsData: { title: 'News 中文', content: '<p>A&amp;B</p>' },
        });
    });

    it('preserves cached article content, category, and publication time', async () => {
        const link = 'https://www.nintendoswitch.com.cn/topics/test';
        vi.mocked(got).mockResolvedValue({
            data: '<script>window.__NUXT__={data:[{newsData:{content:"<p>Article</p>",category:["News"],releaseTime:1704067200000}}]};</script>',
        });

        const items = await nintendo.ProcessNewsChina([{ link, description: '<img src="cover.png">' }], cache);

        expect(cache.tryGet).toHaveBeenCalledWith(link, expect.any(Function));
        expect(items[0]).toEqual({
            link,
            description: '<img src="cover.png"><p>Article</p>',
            category: ['News'],
            pubDate: new Date('2024-01-01T00:00:00.000Z'),
        });
    });

    it.each(['<html>No page data</html>', '<script>window.__NUXT__=fetch("https://example.com");</script>'])('rejects missing or executable page data', (html) => {
        expect(() => nintendo.nuxtReader(html)).toThrow('Nuxt 框架信息提取失败');
    });
});
