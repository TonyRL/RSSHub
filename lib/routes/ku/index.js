const got = require('#utils/got');

const nameProps = {
    yuedu: '阅读',
    yiciyuan: '异次元',
    haikuo: '海阔',
};

module.exports = async (ctx) => {
    const name = ctx.params.name || 'yuedu';
    const api = `http://ku.mumuceo.com/${name}/index/getlist`;
    const response = await got.post(api, {
        json: {
            page: 1,
            limit: 10,
        },
    });
    const data = response.data.data;
    ctx.state.data = {
        title: `${nameProps[name]} - 源仓库`,
        link: 'http://ku.mumuceo.com/',
        description: `源仓库 - ${nameProps[name]} RSS`,
        item: data.map((item) => ({
            title: item.yuansite,
            link: `http://ku.mumuceo.com/${name}/detail/index/id/${item.id}.html`,
            author: item.username,
            pubDate: item.time,
            description: item.yuan,
        })),
    };
};
