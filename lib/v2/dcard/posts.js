const { parseDate } = require('@/utils/parse-date');
const { getCookieJar } = require('./utils');
const { setCookies } = require('@/utils/puppeteer-utils');
const logger = require('@/utils/logger');

const typeMap = {
    latest_HK: {
        link: '?listKey=latest_HK&immersiveVideoListKey=v_latest_HK&noWidget=true&listType=globalPaging',
        // api: '/globalPaging/head?listKey=latest_HK',
        title: '最新',
    },
    latest_TW: {
        link: '?listKey=latest_TW&immersiveVideoListKey=v_latest_TW&noWidget=true&listType=globalPaging',
        // api: '/globalPaging/head?listKey=latest_TW',
        title: '最新',
    },
    popular_HK: {
        link: '?listKey=popular_HK&immersiveVideoListKey=v_popular_HK&noWidget=true&listType=globalPaging',
        // api: '/globalPaging/head?listKey=popular_HK',
        title: '熱門',
    },
    popular_TW: {
        link: '?listKey=popular_TW&immersiveVideoListKey=v_popular_TW&noWidget=true&listType=globalPaging',
        // api: '/globalPaging/head?listKey=popular_TW',
        title: '熱門',
    },
};

module.exports = async (ctx) => {
    const { type = 'latest_TW' } = ctx.params;
    const browser = await require('@/utils/puppeteer')();

    // const link = `https://www.dcard.tw/f`;
    const link = `https://www.dcard.tw/f${typeMap[type].link}`;
    // const api = `https://www.dcard.tw/service/api/v2${typeMap[type].api}`;
    const title = `Dcard - ${typeMap[type].title}`;

    const cookieJar = await getCookieJar(browser, ctx.cache);

    const pageData = await ctx.cache.tryGet(`dcard:pageData:${type}`, async () => {
        // let pageDataResponse;
        const page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on('request', (request) => {
            // request.resourceType() === 'document' || request.resourceType() === 'script' ? request.continue() : request.abort();
            request.resourceType() === 'document' || request.resourceType() === 'script' || request.resourceType() === 'fetch' || request.resourceType() === 'xhr' ? request.continue() : request.abort();
        });
        await page.setExtraHTTPHeaders({
            referer: 'https://www.dcard.tw/f',
        });
        await setCookies(page, await cookieJar.getCookieString('https://www.dcard.tw'), 'www.dcard.tw');

        logger.debug(`Requesting ${link}`);
        await page.goto(link, {
            waitUntil: 'domcontentloaded',
        });
        await page.waitForSelector('#__next > div:nth-child(2) > div:nth-child(2)');
        // await page.click('#__next > div:nth-child(2) > div:nth-child(2) a:nth-child(3)'); // 1: local, 2: popular, 3: latest

        const pageNextData = JSON.parse(await page.evaluate(() => document.querySelector('#__NEXT_DATA__').textContent));

        const cookies = await page.cookies();
        await Promise.all(cookies.map((cookie) => cookieJar.setCookie(`${cookie.name}=${cookie.value}`, 'https://www.dcard.tw/f')));
        await ctx.cache.set('dcard:cookieJar', cookieJar.toJSON());

        page.close();

        return pageNextData;
    });

    const list = Object.values(pageData.props.initialState.post.data).map((item) => ({
        title: `「${item.forumName}」${item.title}`,
        link: `https://www.dcard.tw/f/${item.forumAlias}/p/${item.id}`,
        description: item.excerpt,
        author: `${item.anonymousSchool ? '匿名' : item.school}${item.anonymousDepartment ? '' : ` ${item.department}`}．${item.gender === 'M' ? '男' : '女'}`,
        pubDate: parseDate(item.createdAt),
        update: parseDate(item.updatedAt),
        category: [...new Set([item.forumName, ...item.topics])],
        forumAlias: item.forumAlias,
        id: item.id,
    }));

    browser.close();

    ctx.state.json = {
        page: pageData,
    };

    ctx.state.data = {
        title,
        link,
        description: '不想錯過任何有趣的話題嗎？趕快加入我們吧！',
        item: list,
    };
};
