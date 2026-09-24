import crypto from 'node:crypto';

import { load } from 'cheerio';

import cache from '@/utils/cache';
import logger from '@/utils/logger';
import md5 from '@/utils/md5';
import ofetch from '@/utils/ofetch';
import { parseDate } from '@/utils/parse-date';

const emojiFiles: Record<string, string> = {
    哈哈哈: 'coolapk_emotion_1_hahaha.png',
    惊讶: 'coolapk_emotion_2_jingya.png',
    呲牙: 'coolapk_emotion_3_ciya.png',
    流泪: 'coolapk_emotion_4_liulei.png',
    可爱: 'coolapk_emotion_5_keai.png',
    微笑: 'coolapk_emotion_6_weixiao.png',
    呵呵: 'coolapk_emotion_7_hehe.png',
    撇嘴: 'coolapk_emotion_8_piezui.png',
    色: 'coolapk_emotion_9_se.png',
    傲慢: 'coolapk_emotion_10_aoman.png',
    疑问: 'coolapk_emotion_11_yiwen.png',
    无语: 'coolapk_emotion_12_wuyu.png',
    坏笑: 'coolapk_emotion_13_huaixiao.png',
    鄙视: 'coolapk_emotion_14_bishi.png',
    发怒: 'coolapk_emotion_15_fanu.png',
    爆怒: 'coolapk_emotion_104_baonu.png',
    托腮: 'coolapk_emotion_16_tuosai.png',
    吐舌: 'coolapk_emotion_17_tushe.png',
    汗: 'coolapk_emotion_18_han.png',
    抠鼻: 'coolapk_emotion_19_koubi.png',
    亲亲: 'coolapk_emotion_20_qinqin.png',
    喷血: 'coolapk_emotion_21_penxue.png',
    笑眼: 'coolapk_emotion_22_xiaoyan.png',
    睡: 'coolapk_emotion_23_shui.png',
    捂嘴笑: 'coolapk_emotion_24_wuzuixiao.png',
    再见: 'coolapk_emotion_25_zaijian.png',
    可怜: 'coolapk_emotion_26_kelian.png',
    笑哭: 'coolapk_emotion_31_xiaoku.png',
    强: 'coolapk_emotion_27_qiang.png',
    弱: 'coolapk_emotion_28_ruo.png',
    抱拳: 'coolapk_emotion_29_baoquan.png',
    ok: 'coolapk_emotion_30_ok.png',
    嘿哈: 'coolapk_emotion_32_heiha.png',
    捂脸: 'coolapk_emotion_33_wulian.png',
    机智: 'coolapk_emotion_34_jizhi.png',
    耶: 'coolapk_emotion_35_ye.png',
    我最美: 'coolapk_emotion_38_wozuimei.png',
    酷: 'coolapk_emotion_36_ku.png',
    黑线: 'coolapk_emotion_43_heixian.png',
    喷: 'coolapk_emotion_44_pen.png',
    阴险: 'coolapk_emotion_45_yinxian.png',
    难过: 'coolapk_emotion_46_nanguo.png',
    委屈: 'coolapk_emotion_47_weiqu.png',
    吃瓜: 'coolapk_emotion_51_chigua.png',
    喝酒: 'coolapk_emotion_52_hejiu.png',
    噗: 'coolapk_emotion_53_pu.png',
    微微一笑: 'coolapk_emotion_48_weiweiyixiao.png',
    欢呼: 'coolapk_emotion_49_huanhu.png',
    白眼: 'coolapk_emotion_84_baiyan.png',
    耐克嘴: 'coolapk_emotion_81_naikezui.png',
    t耐克嘴: 'coolapk_emotion_105_tnaikezui.png',
    害羞: 'coolapk_emotion_97_haixiu.png',
    无奈: 'coolapk_emotion_98_wunai.png',
    皱眉: 'coolapk_emotion_99_zhoumei.png',
    qqdoge: 'coolapk_emotion_100_qqdoge.png',
    发呆: 'coolapk_emotion_102_fadai.png',
    舒服: 'coolapk_emotion_106_shufu.png',
    懒得理: 'coolapk_emotion_107_landeli.png',
    不开心: 'coolapk_emotion_108_bukaixin.png',
    挑眉坏笑: 'coolapk_emotion_109_tiaomeihuaixiao.png',
    害怕: 'coolapk_emotion_1010_haipa.png',
    哼唧: 'coolapk_emotion_1011_hengji.png',
    挨打: 'coolapk_emotion_1012_aida.png',
    假笑: 'coolapk_emotion_1014_jiaxiao.png',
    偷看: 'coolapk_emotion_1015.png',
    喝茶: 'coolapk_emotion_1016_hecha.png',
    哦吼吼: 'coolapk_emotion_1017_houhouhou.png',
    掩面笑: 'coolapk_emotion_1018_yanmianxiao.png',
    表面哭泣: 'coolapk_emotion_1019_biaomiankuqi.png',
    表面开心: 'coolapk_emotion_1020_biaomiankaixin.png',
    滑稽: 'coolapk_emotion_62_huaji.png',
    流汗滑稽: 'coolapk_emotion_63_liuhanhuaji.png',
    受虐滑稽: 'coolapk_emotion_64_shounuehuaji.png',
    cos滑稽: 'coolapk_emotion_65_coshuaji.png',
    斗鸡眼滑稽: 'coolapk_emotion_66_doujiyanhuaji.png',
    墨镜滑稽: 'coolapk_emotion_67_mojinghuaji.png',
    小嘴滑稽: 'coolapk_emotion_1013_xiaozuihuaji.png',
    doge: 'coolapk_emotion_37_doge.png',
    doge笑哭: 'coolapk_emotion_56_dogexiaoku.png',
    doge呵斥: 'coolapk_emotion_57_dogehechi.png',
    doge原谅ta: 'coolapk_emotion_58_dogeyuanliangta.png',
    喵喵: 'coolapk_emotion_82_miaomiao.png',
    二哈: 'coolapk_emotion_59_erha.png',
    二哈盯: 'coolapk_emotion_95_erhading.png',
    爱心: 'coolapk_emotion_40_aixin.png',
    心碎: 'coolapk_emotion_50_xinsui.png',
    玫瑰: 'coolapk_emotion_41_meigui.png',
    凋谢: 'coolapk_emotion_42_diaoxie.png',
    菜刀: 'coolapk_emotion_39_caidao.png',
    牛啤: 'coolapk_emotion_103_nb.png',
    py交易: 'coolapk_emotion_101_pyjiaoyi.png',
    绿药丸: 'coolapk_emotion_55_lvyaowan.png',
    红药丸: 'coolapk_emotion_54_hongyaowan.png',
    酷安: 'coolapk_emotion_60_kuan.png',
    酷安钓鱼: 'coolapk_emotion_1021_kuandiaoyu.png',
    绿帽: 'coolapk_emotion_61_lvmao.png',
    酷安绿帽: 'coolapk_emotion_96_kuanlvmao.png',
    火把: 'coolapk_emotion_83_huoba.png',
    酷币: 'c_coolb.png',
    酷币1分: 'c_onef.png',
    酷币2分: 'c_twof.png',
    酷币5分: 'c_fivef.png',
    酷币1毛: 'c_onem.png',
    酷币2毛: 'c_twom.png',
    酷币5毛: 'c_fivem.png',
    酷币1块: 'c_oney.png',
    酷币2块: 'c_twoy.png',
    酷币5块: 'c_fivey.png',
    酷币10块: 'c_teny.png',
    酷币20块: 'c_ty.png',
    酷币50块: 'c_fy.png',
    酷币100块: 'c_oy.png',
    酷币1$: 'c_oned.png',
    酷币2$: 'c_twod.png',
    酷币5$: 'c_fived.png',
    '酷币1€': 'c_oneo.png',
    '酷币2€': 'c_twoo.png',
    '酷币5€': 'c_fiveo.png',
    灰色酷币: 'coolapk_emotion_68.png',
    绿色酷币: 'coolapk_emotion_69.png',
    白纹酷币: 'coolapk_emotion_70.png',
    新酷币: 'coolapk_emotion_71.png',
    新币1分: 'coolapk_emotion_72.png',
    新酷币2分: 'coolapk_emotion_85.png',
    新酷币5分: 'coolapk_emotion_86.png',
    新酷币1毛: 'coolapk_emotion_87.png',
    新酷币2毛: 'coolapk_emotion_88.png',
    新酷币5毛: 'coolapk_emotion_89.png',
    新酷币1块: 'coolapk_emotion_90.png',
    新酷币2块: 'coolapk_emotion_91.png',
    新酷币5块: 'coolapk_emotion_92.png',
    新酷币10块: 'coolapk_emotion_93.png',
    新酷币20块: 'coolapk_emotion_94.png',
    新酷币50块: 'coolapk_emotion_73.png',
    新酷币100块: 'coolapk_emotion_74.png',
    新酷币1$: 'coolapk_emotion_75.png',
    新酷币2$: 'coolapk_emotion_76.png',
    新酷币5$: 'coolapk_emotion_77.png',
    '新酷币1€': 'coolapk_emotion_78.png',
    '新酷币2€': 'coolapk_emotion_79.png',
    '新酷币5€': 'coolapk_emotion_80.png',
};

const renderEmoji = (html: string) =>
    html.replaceAll(/\[([^\]\n]{1,20})\]/g, (match, name) =>
        Object.hasOwn(emojiFiles, name) ? `<img src="https://static.coolapk.com/emoticons/v9/${emojiFiles[name]}" alt="${match}" style="height: 1.5em; vertical-align: middle;">` : match
    );

const dynamicTpye = { 0: '基本动态', 8: '酷图', 9: '评论', 10: '提问', 11: '回答', 12: '图文', 15: '二手', 17: '观点', 20: '交易动态' };

const getRandomDEVICE_ID = () => crypto.randomUUID();

const get_app_token = () => {
    const DEVICE_ID = getRandomDEVICE_ID();
    const now = Math.round(Date.now() / 1000);
    const hex_now = '0x' + now.toString(16);
    const md5_now = md5(now.toString());
    const s = 'token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?' + md5_now + '$' + DEVICE_ID + '&com.coolapk.market';
    const md5_s = md5(Buffer.from(s).toString('base64'));
    const token = md5_s + DEVICE_ID + hex_now;
    return token;
};

const base_url = 'https://api.coolapk.com';
const v2_api_url = 'https://api2.coolapk.com';

const getHeaders = () => ({
    'X-Requested-With': 'XMLHttpRequest',
    'X-App-Id': 'com.coolapk.market',
    'X-App-Token': get_app_token(),
    'X-Sdk-Int': '29',
    'X-Sdk-Locale': 'zh-CN',
    'X-App-Version': '11.0',
    'X-Api-Version': '11',
    'X-App-Code': '2101202',
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; Redmi K30 5G MIUI/V12.0.3.0.QGICMXM) (#Build; Redmi; Redmi K30 5G; QKQ1.191222.002 test-keys; 10) +CoolMarket/11.0-2101202',
});

const parseTuwenFromRaw = (raw) =>
    raw.map((i) => {
        switch (i.type) {
            case 'text': {
                const output = i.message
                    .split('\n')
                    .filter((t) => t !== '')
                    .map((t) => `<p>${t}</p>`)
                    .join('');
                return output;
            }
            case 'image':
                return `<div class="img-container" style="text-align: center;">
                <img src="${i.url}">
                <p class="image-caption" style="text-align: center;">${i.description}</p></div>`;
            case 'shareUrl':
                return `<a href="${i.url}" target="_blank" rel="noopener">${i.title}</a>`;
            default:
                logger.debug(`Unknown tuwen type: ${i.type}`);
                return 'Unknown type';
        }
    });

const parseDynamic = async (item) => {
    const pubDate = parseDate(item.dateline, 'X');
    if (item.entityType === 'sponsorCard' || !item.url) {
        return;
    }
    const itemUrl = `${v2_api_url}/v6${item.url.replace('/feed/', '/feed/detail?id=')}`;
    let description, title;
    const type = Number.parseInt(item.type);
    switch (type) {
        case 0:
        case 5:
        case 7: // external share
        case 8:
        case 9:
        case 10:
        case 11:
        case 13: // feedType: video (external)
        case 15:
        case 17:
        case 20: {
            // //////////////////////////////////////////// 基本内容 ////////////////////////////////////////////
            if (item.issummary) {
                // 需要爬内容
                description = await cache.tryGet(itemUrl, async () => {
                    const result = await ofetch(itemUrl, {
                        headers: getHeaders(),
                    });
                    const message = '<p>' + result.data?.message.split('\n').join('<br>') + '</p>';
                    const picArr = item.picArr.filter(Boolean).map((i) => `<img src="${i}">`); // 若无图片，item.picArr=[""]
                    return message + picArr.join('');
                });
            } else {
                const picArr = item.picArr.filter(Boolean).map((i) => `<img src="${i}">`);
                description = '<p>' + item.message + '</p>' + picArr.join('');
            }
            const $ = load('<div class="title-filter">' + description + '</div>');
            title = $('.title-filter').text().trim(); // no need to perform substring because it's will be handled by RSSHub 'TITLE_LENGTH_LIMIT'

            // //////////////////////////////////////////// 基本内容结束 ////////////////////////////////////////////

            if (type === 17) {
                const keys = item.extra_key.split(',');
                description += '<p>' + item.vote.message_title + ` 已选${keys.length}项</p>`;
                for (const i of item.vote.options) {
                    if (keys.includes(String(i.id))) {
                        description += `<p>${i.title}√</p>`;
                    }
                }
            } else if (type === 10 || type === 11) {
                title = `${item.message_title} 更多:` + title;
            }

            break;
        }
        case 12:
            title = item.title;
            description = await cache.tryGet(itemUrl, async () => {
                const result = await ofetch(itemUrl, {
                    headers: getHeaders(),
                });

                if (!result.data) {
                    return result.message;
                }

                const raw = JSON.parse(result.data.message_raw_output);

                const tags = parseTuwenFromRaw(raw);

                return `<img src="${result.data.pic}"><hr>` + tags.join('');
            });
            break;

        default:
            // console.log(item.type);
            // console.log(item);
            break;
    }

    return {
        title,
        description: description && renderEmoji(description),
        pubDate,
        link: `https://www.coolapk.com${item.url}`,
        // guid: itemUrl,
        author: item.username,
        category: item.tags ? item.tags.split(',').map((tag) => tag.replaceAll('#', '')) : undefined,
    };
};

export default { get_app_token, base_url, getHeaders, parseDynamic, dynamicTpye };
