const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/timezone'));
const got = require('#utils/got');
const { art } = require('#utils/render');
const path = require('path');
const config = require('#config').value;
const md5 = require('#utils/md5');

// Constants
const CACHE_KEY = 'trending-all-in-one';
const DATA_REPO_BASE_URL = 'https://raw.githubusercontent.com/huqi-pr/trending-in-one/master/raw';
const DATE_FORMAT = 'YYYY-MM-DD';
// TODO: support custom data repo urls
const CHANNELS = {
    'toutiao-search': {
        baseUrl: 'https://so.toutiao.com/search?keyword=',
        name: '今日头条热搜',
    },
    'weibo-search': {
        baseUrl: 'https://s.weibo.com/weibo?q=',
        name: '微博热搜',
    },
    'zhihu-search': {
        baseUrl: 'https://www.zhihu.com/search?q=',
        name: '知乎热搜',
    },
    'zhihu-questions': {
        baseUrl: 'https://www.zhihu.com/search?type=question&q=',
        name: '知乎热门话题',
    },
    'zhihu-video': {
        baseUrl: 'https://www.zhihu.com/search?type=video&q=',
        name: '知乎热门视频',
    },
};

// Helper Functions
const processRawDataByChannel = {
    'toutiao-search': ({ word: title }) => ({
        // 源 url 存在 encoding 问题，暂时不使用
        url: CHANNELS['toutiao-search'].baseUrl + encodeURIComponent(title),
        title,
    }),
    'weibo-search': ({ title }) => ({
        // 源 url 存在 encoding 问题，暂时不使用
        url: CHANNELS['weibo-search'].baseUrl + encodeURIComponent(title),
        title,
    }),
    'zhihu-questions': (item) => item,
    'zhihu-search': ({ query }) => {
        const title = query.trim();
        return {
            // 源 url 存在 encoding 问题，暂时不使用
            url: CHANNELS['zhihu-search'].baseUrl + encodeURIComponent(title),
            title,
        };
    },
    'zhihu-video': (item) => item,
};

const hasKeyword = (str, keywordList) => keywordList.some((keyword) => str.includes(keyword));
const toShanghaiTimezone = (date) => dayjs.tz(date, 'Asia/Shanghai');
const processRawData = (channel) => (res) => res.map((item) => processRawDataByChannel[channel](item));
const filterKeyword = (keywordList) => (res) => res.filter(({ title }) => hasKeyword(title, keywordList));

// Data Fetcher
// TODO: support channel selection
const fetchAllData = async (keywordList = [], dateList = [], cache) => {
    const cachedGetData = (url) => cache.tryGet(url, () => got(url).json(), config.cache.contentExpire, false);

    let data = await Promise.all(
        dateList.map(async (dateTime) => ({
            dateTime,
            data: await Promise.all(
                Object.keys(CHANNELS).map(async (channel) => ({
                    name: CHANNELS[channel].name,
                    data: await cachedGetData(`${DATA_REPO_BASE_URL}/${channel}/${dateTime.format(DATE_FORMAT)}.json`)
                        .then(processRawData(channel))
                        .then(filterKeyword(keywordList)),
                }))
            ),
        }))
    );

    for (const i of data) {
        i.count = i.data.reduce((acc, { data }) => acc + data.length, 0);
    }

    data = data.filter(({ count }) => count > 0);

    if (data.length === 0) {
        return data;
    }

    const prev = cache.get(CACHE_KEY + ':latest-items');

    const latest = data[0];
    latest.newItemCount = 0;
    if (latest.count > 0 && prev) {
        // Mark new items in latest
        for (const channel in latest.data) {
            for (const i of latest.data[channel].data) {
                i.new = !(i.url in prev);
                latest.newItemCount += i.new ? 1 : 0;
            }
        }
        // Save latest data to cache
        const cachedItems = latest.data.reduce((acc, { data: channel }) => {
            for (const item of channel) {
                acc[item.url] = true;
            }
            return acc;
        }, {});
        cache.set(CACHE_KEY + ':latest-items', cachedItems, config.cache.contentExpire);

        latest.count = Object.keys(cachedItems).length;
    }

    return data;
};

// Generate Feed Items
const searchLinkUrls = (keyword) => [
    `https://tophub.today/search?e=tophub&q=${keyword}`,
    `https://www.baidu.com/s?wd=${keyword}`,
    `https://www.google.com/search?q=${keyword}`,
    `https://www.zhihu.com/search?type=content&q=${keyword}`,
    `https://s.weibo.com/weibo/${keyword}`,
    `https://www.douyin.com/search/${keyword}`,
    `https://so.toutiao.com/search?keyword=${keyword}`,
];

const searchLinkNames = ['热榜', '百度', '谷歌', '知乎', '微博', '抖音', '头条'];

const createItem = ({ dateTime, data, count, newItemCount }, keywords, isToday) => {
    const EOD = dateTime.endOf('day');
    const pubDate = isToday ? new Date() : EOD.toDate();
    const countStr = isToday && newItemCount ? newItemCount + '🆕' : count;

    return {
        title: `${keywords.join(', ')} | ${dateTime.format(DATE_FORMAT)} 热点追踪 (${countStr})`,
        author: 'Trending All In One',
        pubDate,
        description: art(path.join(__dirname, 'templates/content.art'), {
            data,
            queries: keywords.map((query) => ({
                links: searchLinkUrls(encodeURIComponent(query)).map((url, index) => `<a href="${url}" rel="noopener noreferrer" target="_blank">${searchLinkNames[index]}</a>`),
                key: query,
            })),
        }),
        guid: `trending-all-in-one-${EOD.toISOString()}-${md5(JSON.stringify(data))}-${keywords.join('-')}`,
    };
};

// Main
module.exports = async (ctx) => {
    // Prevent making over 100 requests per invocation
    if (ctx.params.numberOfDays > 14) {
        throw new Error('days must be less than 14');
    }
    const numberOfDays = ctx.params.numberOfDays || 3;
    const currentShanghaiDateTime = dayjs(toShanghaiTimezone(new Date()));
    const currentShanghaiDateStr = currentShanghaiDateTime.format(DATE_FORMAT);
    const dateList = [];
    for (let i = 0; i < numberOfDays; i++) {
        const d = currentShanghaiDateTime.subtract(i, 'day');
        dateList.push(d);
    }

    const keywordList = ctx.params.keywords
        .replace('，', ',')
        .split(',')
        .map((keyword) => keyword.trim());
    const keywordStr = keywordList.join(', ');

    const data = await fetchAllData(keywordList, dateList, ctx.cache).catch(() => []);
    const item =
        data.length > 0
            ? data.map((i, index) => createItem(i, keywordList, index === 0))
            : [
                  {
                      title: `${keywordStr} | ${currentShanghaiDateStr} 热点追踪 (0)`,
                      author: 'Trending All In One',
                      description: `近${numberOfDays}日的热搜都不包含下列关键词：${keywordStr}<br>请耐心等待，或添加更多关键词试试。`,
                      guid: `trending-all-in-one-${md5(JSON.stringify(data))}-${keywordList.join('-')}`,
                  },
              ];

    ctx.state.data = {
        title: `${keywordStr} | 热点聚合`,
        description: `${keywordStr} | 今日头条热搜，知乎热门视频，知乎热搜榜，知乎热门话题，微博热搜榜聚合追踪`,
        language: 'zh-cn',
        item,
    };
};
