const got = require('#utils/got');
const { parseDate } = require('#utils/parse-date');
const timezone = require('#utils/timezone');

module.exports = async (ctx) => {
    const guid = ctx.params.id;
    const appUrl = `https://danjuanapp.com/funding/${guid}`;
    const url = `https://danjuanapp.com/djapi/fund/${guid}`;
    const response = await got({
        method: 'get',
        url,
        headers: {
            Referer: appUrl,
        },
    });
    const fd_full_name = response.data.data.fd_full_name;
    const fd_name = response.data.data.fd_name;
    const fd_code = response.data.data.fd_code;
    const unit_nav = response.data.data.fund_derived.unit_nav;
    const nav_grtd = response.data.data.fund_derived.nav_grtd;
    const end_date = response.data.data.fund_derived.end_date;

    let description = `基金代码 ${fd_code} <br> 今日净值(${end_date}) ¥${unit_nav} `;
    let title = fd_full_name;

    if (nav_grtd > 0) {
        description += `<br> 日涨跌 ${nav_grtd}%`;
        title += `📈 ${nav_grtd}%`;
    } else if (nav_grtd < 0) {
        description += `<br> 日跌跌 ${nav_grtd}%`;
        title += `📉 ${nav_grtd}%`;
    } else if (nav_grtd === '0.0000') {
        description += '无波动';
        title += '持平';
    }

    const single = {
        title,
        description,
        pubDate: timezone(parseDate(end_date), +8),
        link: appUrl,
    };

    ctx.state.data = {
        title: fd_name,
        link: appUrl,
        description,
        item: [single],
    };
};
