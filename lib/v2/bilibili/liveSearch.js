const got = require('#utils/got');

module.exports = async (ctx) => {
    const key = ctx.params.key;
    const order = ctx.params.order;

    const urlEncodedKey = encodeURIComponent(key);
    let orderTitle = '';

    switch (order) {
        case 'live_time':
            orderTitle = '最新开播';
            break;
        case 'online':
            orderTitle = '人气直播';
            break;
    }

    const response = await got({
        method: 'get',
        url: `https://api.bilibili.com/x/web-interface/search/type?search_type=live_room&keyword=${urlEncodedKey}&order=${order}&coverType=user_cover&page=1`,
        headers: {
            Referer: `https://search.bilibili.com/live?keyword=${urlEncodedKey}&order=${order}&coverType=user_cover&page=1&search_type=live`,
        },
    });
    const data = response.data.data.result;

    ctx.state.data = {
        title: `哔哩哔哩直播-${key}-${orderTitle}`,
        link: `https://search.bilibili.com/live?keyword=${urlEncodedKey}&order=${order}&coverType=user_cover&page=1&search_type=live`,
        description: `哔哩哔哩直播-${key}-${orderTitle}`,
        item: data.map((item) => ({
            title: `${item.uname} ${item.title} (${item.cate_name}-${item.live_time})`,
            description: `${item.uname} ${item.title} (${item.cate_name}-${item.live_time})`,
            pubDate: new Date(item.live_time.replace(' ', 'T') + '+08:00').toUTCString(),
            guid: `https://live.bilibili.com/${item.roomid} ${item.live_time}`,
            link: `https://live.bilibili.com/${item.roomid}`,
        })),
    };
};
