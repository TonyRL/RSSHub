const got = require('#utils/got');
module.exports = async (ctx) => {
    const type_id = ctx.params.type_id || '2';
    const tagid = ctx.params.tagid || '';
    const sort = ctx.params.sort || '-push_at';
    const url = `https://www.whalegogo.com/list/portal-${type_id}?tag_id=all`;
    // type_id = 2:快讯 / 1:文章  / 7:活动  / 8:评测
    // tagid   =  70:视频 /73:访谈
    // sort    =  -push_at 最新 / hot最热
    const response = await got({
        method: 'get',
        url: `https://api.whalegogo.com/v1/articles/search?tagid=${tagid}&type_id=${type_id}&sort=${sort}&page=1&per-page=12`,
        headers: {
            Referer: url,
        },
    });
    const list = response.data.items;
    const out = await Promise.all(
        list.map(async (info) => {
            const title = info.title;
            const date = info.push_at;
            const id = info.id;
            // const cid = info.cid;
            const author = info.author.username;
            const itemUrl = `https://www.whalegogo.com/news?id=${id}`;
            const cache = await ctx.cache.get(itemUrl);
            // console.log(cid);
            if (cache) {
                return Promise.resolve(JSON.parse(cache));
            }
            const response = await got({
                method: 'get',
                url: `https://api.whalegogo.com/v1/articles/${id}?expand=content`,
                headers: {
                    Referer: url,
                },
            });
            const description = response.data.content;

            const single = {
                title,
                author,
                link: itemUrl,
                description,
                pubDate: new Date(date * 1000).toUTCString(),
            };
            ctx.cache.set(itemUrl, JSON.stringify(single));
            return Promise.resolve(single);
        })
    );

    ctx.state.data = {
        title: '鲸跃汽车',
        link: url,
        item: out,
    };
};
