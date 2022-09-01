const Router = require('@koa/router');
const router = new Router();

const RouterHandlerMap = new Map();

// 懒加载 Route Handler，Route 首次被请求时才会 require 相关文件
const lazyloadRouteHandler = (routeHandlerPath) => (ctx) => {
    if (RouterHandlerMap.has(routeHandlerPath)) {
        return RouterHandlerMap.get(routeHandlerPath)(ctx);
    }

    const handler = require(routeHandlerPath);
    RouterHandlerMap.set(routeHandlerPath, handler);
    return handler(ctx);
};

// Deprecated: DO NOT ADD ANY NEW ROUTES HERE

// RSSHub migrated to v2
// router.get('/rsshub/rss', lazyloadRouteHandler(require.resolve('./routes/rsshub/routes'))); // 弃用
// router.get('/rsshub/routes', lazyloadRouteHandler(require.resolve('./routes/rsshub/routes')));
// router.get('/rsshub/sponsors', lazyloadRouteHandler(require.resolve('./routes/rsshub/sponsors')));

// 1draw
router.get('/1draw', lazyloadRouteHandler(require.resolve('./routes/1draw/index')));

// quicker
// router.get('/quicker/qa', lazyloadRouteHandler(require.resolve('./routes/quicker/qa.js')));
// router.get('/quicker/update', lazyloadRouteHandler(require.resolve('./routes/quicker/update.js')));
// router.get('/quicker/user/action/:uid/:person', lazyloadRouteHandler(require.resolve('./routes/quicker/person.js')));
// router.get('/quicker/user/:uid/:person', lazyloadRouteHandler(require.resolve('./routes/quicker/person.js')));

// Benedict Evans
router.get('/benedictevans', lazyloadRouteHandler(require.resolve('./routes/benedictevans/recent.js')));

// bangumi
router.get('/bangumi/calendar/today', lazyloadRouteHandler(require.resolve('./routes/bangumi/calendar/today')));
router.get('/bangumi/subject/:id/:type', lazyloadRouteHandler(require.resolve('./routes/bangumi/subject')));
router.get('/bangumi/person/:id', lazyloadRouteHandler(require.resolve('./routes/bangumi/person')));
router.get('/bangumi/topic/:id', lazyloadRouteHandler(require.resolve('./routes/bangumi/group/reply')));
router.get('/bangumi/group/:id', lazyloadRouteHandler(require.resolve('./routes/bangumi/group/topic')));
router.get('/bangumi/subject/:id', lazyloadRouteHandler(require.resolve('./routes/bangumi/subject')));
router.get('/bangumi/user/blog/:id', lazyloadRouteHandler(require.resolve('./routes/bangumi/user/blog')));

// 報導者 migrated to v2
// router.get('/twreporter/newest', lazyloadRouteHandler(require.resolve('./routes/twreporter/newest')));
// router.get('/twreporter/photography', lazyloadRouteHandler(require.resolve('./routes/twreporter/photography')));
// router.get('/twreporter/category/:cid', lazyloadRouteHandler(require.resolve('./routes/twreporter/category')));

// 微博
router.get('/weibo/user/:uid/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/weibo/user')));
router.get('/weibo/keyword/:keyword/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/weibo/keyword')));
router.get('/weibo/search/hot', lazyloadRouteHandler(require.resolve('./routes/weibo/search/hot')));
router.get('/weibo/super_index/:id/:type?/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/weibo/super_index')));
router.get('/weibo/oasis/user/:userid', lazyloadRouteHandler(require.resolve('./routes/weibo/oasis/user')));

// 贴吧 migrated to v2
// router.get('/tieba/forum/:kw', lazyloadRouteHandler(require.resolve('./routes/tieba/forum')));
// router.get('/tieba/forum/good/:kw/:cid?', lazyloadRouteHandler(require.resolve('./routes/tieba/forum')));
// router.get('/tieba/post/:id', lazyloadRouteHandler(require.resolve('./routes/tieba/post')));
// router.get('/tieba/post/lz/:id', lazyloadRouteHandler(require.resolve('./routes/tieba/post')));
// router.get('/tieba/user/:uid', lazyloadRouteHandler(require.resolve('./routes/tieba/user')));

// 网易云音乐
router.get('/ncm/playlist/:id', lazyloadRouteHandler(require.resolve('./routes/ncm/playlist')));
router.get('/ncm/user/playlist/:uid', lazyloadRouteHandler(require.resolve('./routes/ncm/userplaylist')));
router.get('/ncm/artist/:id', lazyloadRouteHandler(require.resolve('./routes/ncm/artist')));
router.get('/ncm/djradio/:id', lazyloadRouteHandler(require.resolve('./routes/ncm/djradio')));
router.get('/ncm/user/playrecords/:uid/:type?', lazyloadRouteHandler(require.resolve('./routes/ncm/userplayrecords')));

// 掘金 migrated to v2
// router.get('/juejin/category/:category', lazyloadRouteHandler(require.resolve('./routes/juejin/category')));
// router.get('/juejin/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/juejin/tag')));
// router.get('/juejin/trending/:category/:type', lazyloadRouteHandler(require.resolve('./routes/juejin/trending')));
// router.get('/juejin/books', lazyloadRouteHandler(require.resolve('./routes/juejin/books')));
// router.get('/juejin/pins/:type?', lazyloadRouteHandler(require.resolve('./routes/juejin/pins')));
// router.get('/juejin/posts/:id', lazyloadRouteHandler(require.resolve('./routes/juejin/posts')));
// router.get('/juejin/news/:id', lazyloadRouteHandler(require.resolve('./routes/juejin/news')));
// router.get('/juejin/collections/:userId', lazyloadRouteHandler(require.resolve('./routes/juejin/favorites')));
// router.get('/juejin/collection/:collectionId', lazyloadRouteHandler(require.resolve('./routes/juejin/collection')));
// router.get('/juejin/shares/:userId', lazyloadRouteHandler(require.resolve('./routes/juejin/shares')));
// router.get('/juejin/column/:id', lazyloadRouteHandler(require.resolve('./routes/juejin/column')));

// 自如
router.get('/ziroom/room/:city/:iswhole/:room/:keyword', lazyloadRouteHandler(require.resolve('./routes/ziroom/room')));

// 简书
router.get('/jianshu/home', lazyloadRouteHandler(require.resolve('./routes/jianshu/home')));
router.get('/jianshu/trending/:timeframe', lazyloadRouteHandler(require.resolve('./routes/jianshu/trending')));
router.get('/jianshu/collection/:id', lazyloadRouteHandler(require.resolve('./routes/jianshu/collection')));
router.get('/jianshu/user/:id', lazyloadRouteHandler(require.resolve('./routes/jianshu/user')));

// 知乎 migrated to v2
// router.get('/zhihu/collection/:id/:getAll?', lazyloadRouteHandler(require.resolve('./routes/zhihu/collection')));
// router.get('/zhihu/people/activities/:id', lazyloadRouteHandler(require.resolve('./routes/zhihu/activities')));
// router.get('/zhihu/people/answers/:id', lazyloadRouteHandler(require.resolve('./routes/zhihu/answers')));
// router.get('/zhihu/posts/:usertype/:id', lazyloadRouteHandler(require.resolve('./routes/zhihu/posts')));
// router.get('/zhihu/zhuanlan/:id', lazyloadRouteHandler(require.resolve('./routes/zhihu/zhuanlan')));
// router.get('/zhihu/daily', lazyloadRouteHandler(require.resolve('./routes/zhihu/daily')));
// router.get('/zhihu/daily/section/:sectionId', lazyloadRouteHandler(require.resolve('./routes/zhihu/daily_section')));
// router.get('/zhihu/hotlist', lazyloadRouteHandler(require.resolve('./routes/zhihu/hotlist')));
// router.get('/zhihu/pin/hotlist', lazyloadRouteHandler(require.resolve('./routes/zhihu/pin/hotlist')));
// router.get('/zhihu/question/:questionId', lazyloadRouteHandler(require.resolve('./routes/zhihu/question')));
// router.get('/zhihu/topic/:topicId', lazyloadRouteHandler(require.resolve('./routes/zhihu/topic')));
// router.get('/zhihu/people/pins/:id', lazyloadRouteHandler(require.resolve('./routes/zhihu/pin/people')));
// router.get('/zhihu/bookstore/newest', lazyloadRouteHandler(require.resolve('./routes/zhihu/bookstore/newest')));
// router.get('/zhihu/pin/daily', lazyloadRouteHandler(require.resolve('./routes/zhihu/pin/daily')));
// router.get('/zhihu/weekly', lazyloadRouteHandler(require.resolve('./routes/zhihu/weekly')));
// router.get('/zhihu/timeline', lazyloadRouteHandler(require.resolve('./routes/zhihu/timeline')));
// router.get('/zhihu/hot/:category?', lazyloadRouteHandler(require.resolve('./routes/zhihu/hot')));

// 妹子图
router.get('/mzitu/home/:type?', lazyloadRouteHandler(require.resolve('./routes/mzitu/home')));
router.get('/mzitu/tags', lazyloadRouteHandler(require.resolve('./routes/mzitu/tags')));
router.get('/mzitu/category/:category', lazyloadRouteHandler(require.resolve('./routes/mzitu/category')));
router.get('/mzitu/post/:id', lazyloadRouteHandler(require.resolve('./routes/mzitu/post')));
router.get('/mzitu/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/mzitu/tag')));

// pixiv migrated to v2
// router.get('/pixiv/user/bookmarks/:id', lazyloadRouteHandler(require.resolve('./routes/pixiv/bookmarks')));
// router.get('/pixiv/user/illustfollows', lazyloadRouteHandler(require.resolve('./routes/pixiv/illustfollow')));
// router.get('/pixiv/user/:id', lazyloadRouteHandler(require.resolve('./routes/pixiv/user')));
// router.get('/pixiv/ranking/:mode/:date?', lazyloadRouteHandler(require.resolve('./routes/pixiv/ranking')));
// router.get('/pixiv/search/:keyword/:order?/:mode?', lazyloadRouteHandler(require.resolve('./routes/pixiv/search')));

// pixiv-fanbox
router.get('/fanbox/:user?', lazyloadRouteHandler(require.resolve('./routes/fanbox/main')));

// 法律白話文運動
router.get('/plainlaw/archives', lazyloadRouteHandler(require.resolve('./routes/plainlaw/archives.js')));

// 煎蛋
// router.get('/jandan/article', lazyloadRouteHandler(require.resolve('./routes/jandan/article')));
// router.get('/jandan/:sub_model', lazyloadRouteHandler(require.resolve('./routes/jandan/pic')));

// 喷嚏
// router.get('/dapenti/tugua', lazyloadRouteHandler(require.resolve('./routes/dapenti/tugua')));
// router.get('/dapenti/subject/:id', lazyloadRouteHandler(require.resolve('./routes/dapenti/subject')));

// Dockone
router.get('/dockone/weekly', lazyloadRouteHandler(require.resolve('./routes/dockone/weekly')));

// 众成翻译
router.get('/zcfy', lazyloadRouteHandler(require.resolve('./routes/zcfy/index')));
router.get('/zcfy/index', lazyloadRouteHandler(require.resolve('./routes/zcfy/index'))); // 废弃
router.get('/zcfy/hot', lazyloadRouteHandler(require.resolve('./routes/zcfy/hot')));

// 今日头条
router.get('/jinritoutiao/keyword/:keyword', lazyloadRouteHandler(require.resolve('./routes/jinritoutiao/keyword')));

// Disqus
router.get('/disqus/posts/:forum', lazyloadRouteHandler(require.resolve('./routes/disqus/posts')));

// Twitter
// router.get('/twitter/user/:id/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/twitter/user')));
// router.get('/twitter/list/:id/:name/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/twitter/list')));
// router.get('/twitter/likes/:id/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/twitter/likes')));
// router.get('/twitter/followings/:id/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/twitter/followings')));
// router.get('/twitter/keyword/:keyword/:routeParams?/:limit?', lazyloadRouteHandler(require.resolve('./routes/twitter/keyword')));
// router.get('/twitter/trends/:woeid?', lazyloadRouteHandler(require.resolve('./routes/twitter/trends')));
// router.get('/twitter/media/:id/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/twitter/media')));

// YouTube migrated to v2
// router.get('/youtube/user/:username/:embed?', lazyloadRouteHandler(require.resolve('./routes/youtube/user')));
// router.get('/youtube/channel/:id/:embed?', lazyloadRouteHandler(require.resolve('./routes/youtube/channel')));
// router.get('/youtube/playlist/:id/:embed?', lazyloadRouteHandler(require.resolve('./routes/youtube/playlist')));

// 极客时间
router.get('/geektime/column/:cid', lazyloadRouteHandler(require.resolve('./routes/geektime/column')));
router.get('/geektime/news', lazyloadRouteHandler(require.resolve('./routes/geektime/news')));

// 界面新闻
// router.get('/jiemian/list/:cid', lazyloadRouteHandler(require.resolve('./routes/jiemian/list.js')));

// 好奇心日报
router.get('/qdaily/:type/:id', lazyloadRouteHandler(require.resolve('./routes/qdaily/index')));

// 爱奇艺
router.get('/iqiyi/dongman/:id', lazyloadRouteHandler(require.resolve('./routes/iqiyi/dongman')));
router.get('/iqiyi/user/video/:uid', lazyloadRouteHandler(require.resolve('./routes/iqiyi/video')));

// 南方周末
router.get('/infzm/:id', lazyloadRouteHandler(require.resolve('./routes/infzm/news')));

// Dribbble
router.get('/dribbble/popular/:timeframe?', lazyloadRouteHandler(require.resolve('./routes/dribbble/popular')));
router.get('/dribbble/user/:name', lazyloadRouteHandler(require.resolve('./routes/dribbble/user')));
router.get('/dribbble/keyword/:keyword', lazyloadRouteHandler(require.resolve('./routes/dribbble/keyword')));

// 斗鱼
// router.get('/douyu/room/:id', lazyloadRouteHandler(require.resolve('./routes/douyu/room')));

// 虎牙
router.get('/huya/live/:id', lazyloadRouteHandler(require.resolve('./routes/huya/live')));

// 浪Play(原kingkong)直播
router.get('/kingkong/room/:id', lazyloadRouteHandler(require.resolve('./routes/langlive/room')));
router.get('/langlive/room/:id', lazyloadRouteHandler(require.resolve('./routes/langlive/room')));

// SHOWROOM直播
router.get('/showroom/room/:id', lazyloadRouteHandler(require.resolve('./routes/showroom/room')));

// v2ex
router.get('/v2ex/topics/:type', lazyloadRouteHandler(require.resolve('./routes/v2ex/topics')));
router.get('/v2ex/post/:postid', lazyloadRouteHandler(require.resolve('./routes/v2ex/post')));
router.get('/v2ex/tab/:tabid', lazyloadRouteHandler(require.resolve('./routes/v2ex/tab')));

// Readhub migrated to v2
// router.get('/readhub/category/:category?', lazyloadRouteHandler(require.resolve('./routes/readhub/index')));
// router.get('/readhub/:category?', lazyloadRouteHandler(require.resolve('./routes/readhub/index')));

// f-droid
router.get('/fdroid/apprelease/:app', lazyloadRouteHandler(require.resolve('./routes/fdroid/apprelease')));

// konachan
router.get('/konachan/post/popular_recent', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));
router.get('/konachan.com/post/popular_recent', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));
router.get('/konachan.net/post/popular_recent', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));
router.get('/konachan/post/popular_recent/:period', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));
router.get('/konachan.com/post/popular_recent/:period', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));
router.get('/konachan.net/post/popular_recent/:period', lazyloadRouteHandler(require.resolve('./routes/konachan/post_popular_recent')));

// PornHub
router.get('/pornhub/category/:caty', lazyloadRouteHandler(require.resolve('./routes/pornhub/category')));
router.get('/pornhub/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/pornhub/search')));
router.get('/pornhub/:language?/category_url/:url?', lazyloadRouteHandler(require.resolve('./routes/pornhub/category_url')));
router.get('/pornhub/:language?/users/:username', lazyloadRouteHandler(require.resolve('./routes/pornhub/users')));
router.get('/pornhub/:language?/model/:username/:sort?', lazyloadRouteHandler(require.resolve('./routes/pornhub/model')));
router.get('/pornhub/:language?/pornstar/:username/:sort?', lazyloadRouteHandler(require.resolve('./routes/pornhub/pornstar')));

// Prestige migrated to v2
// router.get('/prestige-av/series/:mid/:sort?', lazyloadRouteHandler(require.resolve('./routes/prestige-av/series')));

// yande.re
router.get('/yande.re/post/popular_recent', lazyloadRouteHandler(require.resolve('./routes/yande.re/post_popular_recent')));
router.get('/yande.re/post/popular_recent/:period', lazyloadRouteHandler(require.resolve('./routes/yande.re/post_popular_recent')));

// 纽约时报 migrated to v2
// router.get('/nytimes/daily_briefing_chinese', lazyloadRouteHandler(require.resolve('./routes/nytimes/daily_briefing_chinese')));
// router.get('/nytimes/book/:category?', lazyloadRouteHandler(require.resolve('./routes/nytimes/book.js')));
// router.get('/nytimes/author/:byline', lazyloadRouteHandler(require.resolve('./routes/nytimes/author.js')));
// router.get('/nytimes/:lang?', lazyloadRouteHandler(require.resolve('./routes/nytimes/index')));

// 3dm
router.get('/3dm/:name/:type', lazyloadRouteHandler(require.resolve('./routes/3dm/game')));
router.get('/3dm/news', lazyloadRouteHandler(require.resolve('./routes/3dm/news_center')));

// 喜马拉雅
router.get('/ximalaya/:type/:id/:all?', lazyloadRouteHandler(require.resolve('./routes/ximalaya/album')));
router.get('/ximalaya/:type/:id/:all/:shownote?', lazyloadRouteHandler(require.resolve('./routes/ximalaya/album')));

// EZTV
router.get('/eztv/torrents/:imdb_id', lazyloadRouteHandler(require.resolve('./routes/eztv/imdb')));

// 什么值得买
router.get('/smzdm/keyword/:keyword', lazyloadRouteHandler(require.resolve('./routes/smzdm/keyword')));
router.get('/smzdm/ranking/:rank_type/:rank_id/:hour', lazyloadRouteHandler(require.resolve('./routes/smzdm/ranking')));
router.get('/smzdm/haowen/:day?', lazyloadRouteHandler(require.resolve('./routes/smzdm/haowen')));
router.get('/smzdm/haowen/fenlei/:name/:sort?', lazyloadRouteHandler(require.resolve('./routes/smzdm/haowen_fenlei')));
router.get('/smzdm/article/:uid', lazyloadRouteHandler(require.resolve('./routes/smzdm/article')));
router.get('/smzdm/baoliao/:uid', lazyloadRouteHandler(require.resolve('./routes/smzdm/baoliao')));

// 新京报
router.get('/bjnews/:cat', lazyloadRouteHandler(require.resolve('./routes/bjnews/news')));
router.get('/bjnews/epaper/:cat', lazyloadRouteHandler(require.resolve('./routes/bjnews/epaper')));

// 停水通知 migrated to v2
// router.get('/tingshuitz/hangzhou', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/hangzhou')));
// router.get('/tingshuitz/xiaoshan', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/xiaoshan')));
// router.get('/tingshuitz/dalian', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/dalian')));
// router.get('/tingshuitz/guangzhou', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/guangzhou')));
// router.get('/tingshuitz/dongguan', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/dongguan')));
// router.get('/tingshuitz/xian', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/xian')));
// router.get('/tingshuitz/yangjiang', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/yangjiang')));
// router.get('/tingshuitz/nanjing', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/nanjing')));
// router.get('/tingshuitz/wuhan', lazyloadRouteHandler(require.resolve('./routes/tingshuitz/wuhan')));

// 米哈游
router.get('/mihoyo/bh3/:type', lazyloadRouteHandler(require.resolve('./routes/mihoyo/bh3')));
router.get('/mihoyo/bh2/:type', lazyloadRouteHandler(require.resolve('./routes/mihoyo/bh2')));

// 新闻联播 migrated to v2
// router.get('/cctv/xwlb', lazyloadRouteHandler(require.resolve('./routes/cctv/xwlb')));
// 央视新闻
// router.get('/cctv/lm/:id?', lazyloadRouteHandler(require.resolve('./routes/cctv/lm')));
// router.get('/cctv/:category', lazyloadRouteHandler(require.resolve('./routes/cctv/category')));
// router.get('/cctv/photo/jx', lazyloadRouteHandler(require.resolve('./routes/cctv/jx')));
// router.get('/cctv-special/:id?', lazyloadRouteHandler(require.resolve('./routes/cctv/special')));

// 财新博客
router.get('/caixin/blog/:column', lazyloadRouteHandler(require.resolve('./routes/caixin/blog')));
router.get('/caixin/article', lazyloadRouteHandler(require.resolve('./routes/caixin/article')));
router.get('/caixin/database', lazyloadRouteHandler(require.resolve('./routes/caixin/database')));
router.get('/caixin/yxnews', lazyloadRouteHandler(require.resolve('./routes/caixin/yxnews')));
router.get('/caixin/:column/:category', lazyloadRouteHandler(require.resolve('./routes/caixin/category')));

// 草榴社区
router.get('/t66y/post/:tid', lazyloadRouteHandler(require.resolve('./routes/t66y/post')));
router.get('/t66y/:id/:type?', lazyloadRouteHandler(require.resolve('./routes/t66y/index')));

// 色中色
router.get('/sexinsex/:id/:type?', lazyloadRouteHandler(require.resolve('./routes/sexinsex/index')));

// 国家地理 migrated to v2
// router.get('/natgeo/dailyselection', lazyloadRouteHandler(require.resolve('./routes/natgeo/dailyselection')));
// router.get('/natgeo/dailyphoto', lazyloadRouteHandler(require.resolve('./routes/natgeo/dailyphoto')));
// router.get('/natgeo/:cat/:type?', lazyloadRouteHandler(require.resolve('./routes/natgeo/natgeo')));

// 一个
router.get('/one', lazyloadRouteHandler(require.resolve('./routes/one/index')));

// Firefox
router.get('/firefox/release/:platform', lazyloadRouteHandler(require.resolve('./routes/firefox/release')));
router.get('/firefox/addons/:id', lazyloadRouteHandler(require.resolve('./routes/firefox/addons')));

// Thunderbird
router.get('/thunderbird/release', lazyloadRouteHandler(require.resolve('./routes/thunderbird/release')));

// tuicool
router.get('/tuicool/mags/:type', lazyloadRouteHandler(require.resolve('./routes/tuicool/mags')));

// Hexo
router.get('/hexo/next/:url', lazyloadRouteHandler(require.resolve('./routes/hexo/next')));
router.get('/hexo/yilia/:url', lazyloadRouteHandler(require.resolve('./routes/hexo/yilia')));
router.get('/hexo/fluid/:url', lazyloadRouteHandler(require.resolve('./routes/hexo/fluid')));

// cpython
router.get('/cpython/:pre?', lazyloadRouteHandler(require.resolve('./routes/cpython')));

// 小米
router.get('/mi/golden', lazyloadRouteHandler(require.resolve('./routes/mi/golden')));
router.get('/mi/crowdfunding', lazyloadRouteHandler(require.resolve('./routes/mi/crowdfunding')));
router.get('/mi/youpin/crowdfunding', lazyloadRouteHandler(require.resolve('./routes/mi/youpin/crowdfunding')));
router.get('/mi/youpin/new/:sort?', lazyloadRouteHandler(require.resolve('./routes/mi/youpin/new')));
router.get('/miui/:device/:type?/:region?', lazyloadRouteHandler(require.resolve('./routes/mi/miui/index')));
router.get('/mi/bbs/board/:boardId', lazyloadRouteHandler(require.resolve('./routes/mi/board')));

// Keep
// router.get('/keep/user/:id', lazyloadRouteHandler(require.resolve('./routes/keep/user')));

// 起点 migrated to v2
// router.get('/qidian/chapter/:id', lazyloadRouteHandler(require.resolve('./routes/qidian/chapter')));
// router.get('/qidian/forum/:id', lazyloadRouteHandler(require.resolve('./routes/qidian/forum')));
// router.get('/qidian/free/:type?', lazyloadRouteHandler(require.resolve('./routes/qidian/free')));
// router.get('/qidian/free-next/:type?', lazyloadRouteHandler(require.resolve('./routes/qidian/free-next')));

// 纵横
router.get('/zongheng/chapter/:id', lazyloadRouteHandler(require.resolve('./routes/zongheng/chapter')));

// 刺猬猫
router.get('/ciweimao/chapter/:id', lazyloadRouteHandler(require.resolve('./routes/ciweimao/chapter')));

// 中国美术馆
router.get('/namoc/announcement', lazyloadRouteHandler(require.resolve('./routes/namoc/announcement')));
router.get('/namoc/news', lazyloadRouteHandler(require.resolve('./routes/namoc/news')));
router.get('/namoc/media', lazyloadRouteHandler(require.resolve('./routes/namoc/media')));
router.get('/namoc/exhibition', lazyloadRouteHandler(require.resolve('./routes/namoc/exhibition')));
router.get('/namoc/specials', lazyloadRouteHandler(require.resolve('./routes/namoc/specials')));

// 懂球帝 migrated to v2
// router.get('/dongqiudi/daily', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/daily')));
// router.get('/dongqiudi/result/:team', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/result')));
// router.get('/dongqiudi/team_news/:team', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/team_news')));
// router.get('/dongqiudi/player_news/:id', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/player_news')));
// router.get('/dongqiudi/special/:id', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/special')));
// router.get('/dongqiudi/top_news/:id?', lazyloadRouteHandler(require.resolve('./routes/dongqiudi/top_news')));

// 维基百科 Wikipedia
router.get('/wikipedia/mainland', lazyloadRouteHandler(require.resolve('./routes/wikipedia/mainland')));

// 联合国 United Nations
router.get('/un/scveto', lazyloadRouteHandler(require.resolve('./routes/un/scveto')));

// e 公司
router.get('/egsea/flash', lazyloadRouteHandler(require.resolve('./routes/egsea/flash')));

// 选股宝
router.get('/xuangubao/subject/:subject_id', lazyloadRouteHandler(require.resolve('./routes/xuangubao/subject')));

// 雪球 migrated to v2
// router.get('/xueqiu/user/:id/:type?', lazyloadRouteHandler(require.resolve('./routes/xueqiu/user')));
// router.get('/xueqiu/favorite/:id', lazyloadRouteHandler(require.resolve('./routes/xueqiu/favorite')));
// router.get('/xueqiu/user_stock/:id', lazyloadRouteHandler(require.resolve('./routes/xueqiu/user_stock')));
// router.get('/xueqiu/fund/:id', lazyloadRouteHandler(require.resolve('./routes/xueqiu/fund')));
// router.get('/xueqiu/stock_info/:id/:type?', lazyloadRouteHandler(require.resolve('./routes/xueqiu/stock_info')));
// router.get('/xueqiu/snb/:id', lazyloadRouteHandler(require.resolve('./routes/xueqiu/snb')));
// router.get('/xueqiu/hots', lazyloadRouteHandler(require.resolve('./routes/xueqiu/hots')));
// router.get('/xueqiu/stock_comments/:id/:titleLength?', lazyloadRouteHandler(require.resolve('./routes/xueqiu/stock_comments')));

// Greasy Fork migrated to v2
// router.get('/greasyfork/:language/:domain?', lazyloadRouteHandler(require.resolve('./routes/greasyfork/scripts')));

// Gwern Bran­wen
router.get('/gwern/:category', lazyloadRouteHandler(require.resolve('./routes/gwern/category')));

// LinkedKeeper
router.get('/linkedkeeper/:type/:id?', lazyloadRouteHandler(require.resolve('./routes/linkedkeeper/index')));

// 开源中国 migrated to v2
// router.get('/oschina/news/:category?', lazyloadRouteHandler(require.resolve('./routes/oschina/news')));
// router.get('/oschina/user/:id', lazyloadRouteHandler(require.resolve('./routes/oschina/user')));
// router.get('/oschina/u/:id', lazyloadRouteHandler(require.resolve('./routes/oschina/u')));
// router.get('/oschina/topic/:topic', lazyloadRouteHandler(require.resolve('./routes/oschina/topic')));

// MIT Technology Review
router.get('/technologyreview', lazyloadRouteHandler(require.resolve('./routes/technologyreview/index')));
router.get('/technologyreview/:category_name', lazyloadRouteHandler(require.resolve('./routes/technologyreview/topic')));

// 安全客
router.get('/aqk/vul', lazyloadRouteHandler(require.resolve('./routes/aqk/vul')));
router.get('/aqk/:category', lazyloadRouteHandler(require.resolve('./routes/aqk/category')));

// 腾讯游戏开发者社区
router.get('/gameinstitute/community/:tag?', lazyloadRouteHandler(require.resolve('./routes/tencent/gameinstitute/community')));

// 腾讯视频 SDK
router.get('/qcloud/mlvb/changelog', lazyloadRouteHandler(require.resolve('./routes/tencent/qcloud/mlvb/changelog')));

// 腾讯吐个槽
router.get('/tucaoqq/post/:project/:key', lazyloadRouteHandler(require.resolve('./routes/tencent/tucaoqq/post')));

// Bugly SDK
router.get('/bugly/changelog/:platform', lazyloadRouteHandler(require.resolve('./routes/tencent/bugly/changelog')));

// wechat migrated to v2
// router.get('/wechat/wemp/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/wemp')));
// router.get('/wechat/ce/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/ce')));
// router.get('/wechat/announce', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/announce')));
router.get('/wechat/miniprogram/plugins', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/miniprogram/plugins')));
// router.get('/wechat/tgchannel/:id/:mpName?/:searchQueryType?', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/tgchannel')));
// router.get('/wechat/uread/:userid', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/uread')));
// router.get('/wechat/ershicimi/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/ershcimi')));
// router.get('/wechat/wxnmh/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/wxnmh')));
// router.get('/wechat/mp/homepage/:biz/:hid/:cid?', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/mp')));
// router.get('/wechat/mp/msgalbum/:biz/:aid', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/msgalbum')));
// router.get('/wechat/feeds/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/feeds')));

// All the Flight Deals
router.get('/atfd/:locations/:nearby?', lazyloadRouteHandler(require.resolve('./routes/atfd/index')));

// Fir
router.get('/fir/update/:id', lazyloadRouteHandler(require.resolve('./routes/fir/update')));

// Nvidia Web Driver
router.get('/nvidia/webdriverupdate', lazyloadRouteHandler(require.resolve('./routes/nvidia/webdriverupdate')));

// 每日环球展览 iMuseum
router.get('/imuseum/:city/:type?', lazyloadRouteHandler(require.resolve('./routes/imuseum')));

// Hopper
router.get('/hopper/:lowestOnly/:from/:to?', lazyloadRouteHandler(require.resolve('./routes/hopper/index')));

// 马蜂窝
router.get('/mafengwo/note/:type', lazyloadRouteHandler(require.resolve('./routes/mafengwo/note')));
router.get('/mafengwo/ziyouxing/:code', lazyloadRouteHandler(require.resolve('./routes/mafengwo/ziyouxing')));

// 中国地震局震情速递（与地震台网同步更新）migrated to v2
// router.get('/earthquake/:region?', lazyloadRouteHandler(require.resolve('./routes/earthquake')));
// 中国地震台网
// router.get('/earthquake/ceic/:type', lazyloadRouteHandler(require.resolve('./routes/earthquake/ceic')));

// 小说
// router.get('/novel/biquge/:id', lazyloadRouteHandler(require.resolve('./routes/novel/biquge')));
// router.get('/novel/biqugeinfo/:id/:limit?', lazyloadRouteHandler(require.resolve('./routes/novel/biqugeinfo')));
router.get('/novel/uukanshu/:uid', lazyloadRouteHandler(require.resolve('./routes/novel/uukanshu')));
router.get('/novel/wenxuemi/:id1/:id2', lazyloadRouteHandler(require.resolve('./routes/novel/wenxuemi')));
router.get('/novel/booksky/:id', lazyloadRouteHandler(require.resolve('./routes/novel/booksky')));
router.get('/novel/shuquge/:id', lazyloadRouteHandler(require.resolve('./routes/novel/shuquge')));
router.get('/novel/ptwxz/:id1/:id2', lazyloadRouteHandler(require.resolve('./routes/novel/ptwxz')));
router.get('/novel/zhaishuyuan/:id', lazyloadRouteHandler(require.resolve('./routes/novel/zhaishuyuan')));

// 中国气象网
router.get('/weatheralarm/:province?', lazyloadRouteHandler(require.resolve('./routes/weatheralarm')));

// Gitlab
router.get('/gitlab/explore/:type/:host?', lazyloadRouteHandler(require.resolve('./routes/gitlab/explore')));
router.get('/gitlab/release/:namespace/:project/:host?', lazyloadRouteHandler(require.resolve('./routes/gitlab/release')));
router.get('/gitlab/tag/:namespace/:project/:host?', lazyloadRouteHandler(require.resolve('./routes/gitlab/tag')));

// 忧郁的loli
router.get('/mygalgame', lazyloadRouteHandler(require.resolve('./routes/galgame/hhgal'))); // 废弃
router.get('/mmgal', lazyloadRouteHandler(require.resolve('./routes/galgame/hhgal'))); // 废弃
router.get('/hhgal', lazyloadRouteHandler(require.resolve('./routes/galgame/hhgal')));

// say花火
router.get('/sayhuahuo', lazyloadRouteHandler(require.resolve('./routes/galgame/sayhuahuo')));

// 终点分享
router.get('/zdfx', lazyloadRouteHandler(require.resolve('./routes/galgame/zdfx')));

// 北京林业大学 migrated to v2
// router.get('/bjfu/grs', lazyloadRouteHandler(require.resolve('./routes/universities/bjfu/grs')));
// router.get('/bjfu/kjc', lazyloadRouteHandler(require.resolve('./routes/universities/bjfu/kjc')));
// router.get('/bjfu/jwc/:type', lazyloadRouteHandler(require.resolve('./routes/universities/bjfu/jwc/index')));
// router.get('/bjfu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/bjfu/news/index')));
// router.get('/bjfu/it/:type', lazyloadRouteHandler(require.resolve('./routes/universities/bjfu/it/index')));

// 北京理工大学
router.get('/bit/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/bit/jwc/jwc')));
router.get('/bit/cs', lazyloadRouteHandler(require.resolve('./routes/universities/bit/cs/cs')));

// 北京交通大学
router.get('/bjtu/gs/:type', lazyloadRouteHandler(require.resolve('./routes/universities/bjtu/gs')));

// 大连工业大学
router.get('/dpu/jiaowu/news/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/dpu/jiaowu/news')));
router.get('/dpu/wlfw/news/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/dpu/wlfw/news')));

// 大连理工大学
// router.get('/dut/:subsite/:type', lazyloadRouteHandler(require.resolve('./routes/universities/dut/index')));

// 东南大学
router.get('/seu/radio/academic', lazyloadRouteHandler(require.resolve('./routes/universities/seu/radio/academic')));
router.get('/seu/yzb/:type', lazyloadRouteHandler(require.resolve('./routes/universities/seu/yzb')));
router.get('/seu/cse/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/seu/cse')));

// 南京工业大学
router.get('/njtech/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/njtech/jwc')));

// 南京航空航天大学 migrated to v2
// router.get('/nuaa/jwc/:type/:getDescription?', lazyloadRouteHandler(require.resolve('./routes/universities/nuaa/jwc/jwc')));
// router.get('/nuaa/cs/:type/:getDescription?', lazyloadRouteHandler(require.resolve('./routes/universities/nuaa/cs/index')));
// router.get('/nuaa/yjsy/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/nuaa/yjsy/yjsy')));

// 河海大学
router.get('/hhu/libNews', lazyloadRouteHandler(require.resolve('./routes/universities/hhu/libNews')));
// 河海大学常州校区
router.get('/hhu/libNewsc', lazyloadRouteHandler(require.resolve('./routes/universities/hhu/libNewsc')));

// 哈尔滨工业大学
router.get('/hit/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/hit/jwc')));
router.get('/hit/today/:category', lazyloadRouteHandler(require.resolve('./routes/universities/hit/today')));

// 哈尔滨工业大学（深圳）
router.get('/hitsz/article/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/hitsz/article')));

// 哈尔滨工业大学（威海）
router.get('/hitwh/today', lazyloadRouteHandler(require.resolve('./routes/universities/hitwh/today')));

// 上海科技大学
router.get('/shanghaitech/activity', lazyloadRouteHandler(require.resolve('./routes/universities/shanghaitech/activity')));
router.get('/shanghaitech/sist/activity', lazyloadRouteHandler(require.resolve('./routes/universities/shanghaitech/sist/activity')));

// 上海交通大学
router.get('/sjtu/seiee/academic', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/seiee/academic')));
router.get('/sjtu/seiee/bjwb/:type', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/seiee/bjwb')));
router.get('/sjtu/seiee/xsb/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/seiee/xsb')));

router.get('/sjtu/gs/tzgg/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/gs/tzgg')));
router.get('/sjtu/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/jwc')));
router.get('/sjtu/tongqu/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/tongqu/activity')));
router.get('/sjtu/yzb/zkxx/:type', lazyloadRouteHandler(require.resolve('./routes/universities/sjtu/yzb/zkxx')));

// 江南大学
router.get('/ju/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/ju/jwc')));

// 洛阳理工学院
router.get('/lit/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/lit/jwc')));
router.get('/lit/xwzx/:name?', lazyloadRouteHandler(require.resolve('./routes/universities/lit/xwzx')));
router.get('/lit/tw/:name?', lazyloadRouteHandler(require.resolve('./routes/universities/lit/tw')));

// 清华大学
router.get('/thu/career', lazyloadRouteHandler(require.resolve('./routes/universities/thu/career')));
router.get('/thu/:type', lazyloadRouteHandler(require.resolve('./routes/universities/thu/index')));

// 北京大学 migrated to v2
// router.get('/pku/eecs/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/pku/eecs')));
// router.get('/pku/rccp/mzyt', lazyloadRouteHandler(require.resolve('./routes/universities/pku/rccp/mzyt')));
// router.get('/pku/cls/lecture', lazyloadRouteHandler(require.resolve('./routes/universities/pku/cls/lecture')));
// router.get('/pku/bbs/hot', lazyloadRouteHandler(require.resolve('./routes/universities/pku/bbs/hot')));
// router.get('/pku/scc/recruit/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/pku/scc/recruit')));

// 上海海事大学
router.get('/shmtu/www/:type', lazyloadRouteHandler(require.resolve('./routes/universities/shmtu/www')));
router.get('/shmtu/jwc/:type', lazyloadRouteHandler(require.resolve('./routes/universities/shmtu/jwc')));

// 上海海洋大学
router.get('/shou/www/:type', lazyloadRouteHandler(require.resolve('./routes/universities/shou/www')));

// 西南科技大学
router.get('/swust/jwc/news', lazyloadRouteHandler(require.resolve('./routes/universities/swust/jwc_news')));
router.get('/swust/jwc/notice/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/swust/jwc_notice')));
router.get('/swust/cs/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/swust/cs')));

// 华南师范大学
router.get('/scnu/jw', lazyloadRouteHandler(require.resolve('./routes/universities/scnu/jw')));
router.get('/scnu/library', lazyloadRouteHandler(require.resolve('./routes/universities/scnu/library')));
router.get('/scnu/cs/match', lazyloadRouteHandler(require.resolve('./routes/universities/scnu/cs/match')));

// 广东工业大学
// router.get('/gdut/news', lazyloadRouteHandler(require.resolve('./routes/universities/gdut/news')));

// 中国科学院
router.get('/cas/sim/academic', lazyloadRouteHandler(require.resolve('./routes/universities/cas/sim/academic')));
router.get('/cas/mesalab/kb', lazyloadRouteHandler(require.resolve('./routes/universities/cas/mesalab/kb')));
router.get('/cas/iee/kydt', lazyloadRouteHandler(require.resolve('./routes/universities/cas/iee/kydt')));
router.get('/cas/cg/:caty?', lazyloadRouteHandler(require.resolve('./routes/universities/cas/cg/index')));

// 中国传媒大学
router.get('/cuc/yz', lazyloadRouteHandler(require.resolve('./routes/universities/cuc/yz')));

// UTdallas ISSO
router.get('/utdallas/isso', lazyloadRouteHandler(require.resolve('./routes/universities/utdallas/isso')));

// 南昌航空大学
router.get('/nchu/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/nchu/jwc')));

// 重庆大学
router.get('/cqu/jwc/:path*', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/jwc/announcement')));
router.get('/cqu/news/jzyg', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/news/jzyg')));
router.get('/cqu/news/tz', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/news/tz')));
router.get('/cqu/youth/:category', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/youth/info')));
router.get('/cqu/sci/:category', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/sci/info')));
router.get('/cqu/net/:category', lazyloadRouteHandler(require.resolve('./routes/universities/cqu/net/info')));

// 南京信息工程大学
// router.get('/nuist/bulletin/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/bulletin')));
// router.get('/nuist/jwc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/jwc')));
// router.get('/nuist/yjs/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/yjs')));
// router.get('/nuist/xgc', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/xgc')));
// router.get('/nuist/scs/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/scs')));
// router.get('/nuist/lib', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/library/lib')));
// router.get('/nuist/sese/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/sese')));
// router.get('/nuist/cas/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/nuist/cas')));

// 成都信息工程大学
router.get('/cuit/cxxww/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/cuit/cxxww')));

// 郑州大学
router.get('/zzu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zzu/news')));
router.get('/zzu/soft/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zzu/soft/news')));

// 郑州轻工业大学
router.get('/zzuli/campus/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zzuli/campus')));
router.get('/zzuli/yjsc/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zzuli/yjsc')));

// 重庆科技学院
router.get('/cqust/jw/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/cqust/jw')));
router.get('/cqust/lib/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/cqust/lib')));

// 常州大学
router.get('/cczu/jwc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/cczu/jwc')));
router.get('/cczu/news/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/cczu/news')));

// 四川旅游学院
router.get('/sctu/xgxy', lazyloadRouteHandler(require.resolve('./routes/universities/sctu/information-engineer-faculty/index')));
router.get('/sctu/xgxy/:id', lazyloadRouteHandler(require.resolve('./routes/universities/sctu/information-engineer-faculty/context')));
router.get('/sctu/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sctu/jwc/index')));
router.get('/sctu/jwc/:type/:id', lazyloadRouteHandler(require.resolve('./routes/universities/sctu/jwc/context')));

// 电子科技大学
router.get('/uestc/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/jwc')));
router.get('/uestc/is/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/is')));
router.get('/uestc/news/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/news')));
router.get('/uestc/auto/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/auto')));
router.get('/uestc/cs/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/cs')));
router.get('/uestc/cqe/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/cqe')));
router.get('/uestc/gr', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/gr')));
router.get('/uestc/sice', lazyloadRouteHandler(require.resolve('./routes/universities/uestc/sice')));

// 西北农林科技大学
router.get('/nwafu/news', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/news')));
router.get('/nwafu/jiaowu', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/jiaowu')));
router.get('/nwafu/gs', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/gs')));
router.get('/nwafu/lib', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/lib')));
router.get('/nwafu/nic', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/nic')));
router.get('/nwafu/54youth', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/54youth')));
router.get('/nwafu/jcc', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/jcc')));
router.get('/nwafu/yjshy', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/yjshy')));
router.get('/nwafu/cie', lazyloadRouteHandler(require.resolve('./routes/universities/nwafu/cie')));

// 云南大学
router.get('/ynu/grs/zytz', lazyloadRouteHandler(require.resolve('./routes/universities/ynu/grs/zytz')));
router.get('/ynu/grs/qttz/:category', lazyloadRouteHandler(require.resolve('./routes/universities/ynu/grs/qttz')));
router.get('/ynu/jwc/:category', lazyloadRouteHandler(require.resolve('./routes/universities/ynu/jwc/zytz')));
router.get('/ynu/home', lazyloadRouteHandler(require.resolve('./routes/universities/ynu/home/main')));

// 云南师范大学
router.get('/ynnu/edu/news', lazyloadRouteHandler(require.resolve('./routes/universities/ynnu/edu/news')));

// 昆明理工大学
router.get('/kmust/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/kmust/jwc')));
router.get('/kmust/job/careers/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/kmust/job/careers')));
router.get('/kmust/job/jobfairs', lazyloadRouteHandler(require.resolve('./routes/universities/kmust/job/jobfairs')));

// 武汉大学
router.get('/whu/cs/:type', lazyloadRouteHandler(require.resolve('./routes/universities/whu/cs')));
router.get('/whu/news/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/whu/news')));

// 潍坊学院 migrated to v2
// router.get('/wfu/news/:type?', require('./routes/universities/wfu/news'));
// router.get('/wfu/jwc', require('./routes/universities/wfu/jwc'));

// 华中科技大学
router.get('/hust/auto/notice/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/hust/aia/notice')));
router.get('/hust/auto/news', lazyloadRouteHandler(require.resolve('./routes/universities/hust/aia/news')));
router.get('/hust/aia/news', lazyloadRouteHandler(require.resolve('./routes/universities/hust/aia/news')));
router.get('/hust/aia/notice/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/hust/aia/notice')));

// 井冈山大学
router.get('/jgsu/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/jgsu/jwc')));

// 山东大学 migrated to v2
// router.get('/sdu/sc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sdu/sc')));
// router.get('/sdu/cs/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sdu/cs')));
// router.get('/sdu/cmse/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sdu/cmse')));
// router.get('/sdu/mech/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sdu/mech')));
// router.get('/sdu/epe/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/sdu/epe')));

// 中国海洋大学
router.get('/ouc/it/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/ouc/it')));

// 大连大学
router.get('/dlu/jiaowu/news', lazyloadRouteHandler(require.resolve('./routes/universities/dlu/jiaowu/news')));

// 东莞理工学院
router.get('/dgut/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/dgut/jwc')));
router.get('/dgut/xsc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/dgut/xsc')));

// 同济大学
router.get('/tju/sse/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/tju/sse/notice')));

// 华南理工大学
router.get('/scut/jwc/notice/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/scut/jwc/notice')));
router.get('/scut/jwc/school/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/scut/jwc/school')));
router.get('/scut/jwc/news', lazyloadRouteHandler(require.resolve('./routes/universities/scut/jwc/news')));

// 温州商学院
router.get('/wzbc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/wzbc/news')));

// 河南大学
router.get('/henu/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/henu/news')));

// 天津大学 migrated to v2
// router.get('/tju/oaa/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/tju/oaa')));

// 南开大学
router.get('/nku/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/nku/jwc/index')));

// 北京航空航天大学
router.get('/buaa/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/buaa/news/index')));

// 浙江工业大学
router.get('/zjut/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zjut/index')));
router.get('/zjut/design/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zjut/design')));

// 上海大学
router.get('/shu/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/shu/index')));
router.get('/shu/jwc/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/shu/jwc')));

// 北京科技大学天津学院
router.get('/ustb/tj/news/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/ustb/tj/news')));

// 深圳大学
router.get('/szu/yz/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/szu/yz')));

// 中国石油大学（华东）
router.get('/upc/main/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/upc/main')));
router.get('/upc/jsj/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/upc/jsj')));

// 华北水利水电大学
// router.get('/ncwu/notice', lazyloadRouteHandler(require.resolve('./routes/universities/ncwu/notice')));

// 太原师范学院
// router.get('/tynu', lazyloadRouteHandler(require.resolve('./routes/universities/tynu/tynu')));

// 中北大学
router.get('/nuc/:type', lazyloadRouteHandler(require.resolve('./routes/universities/nuc/index')));

// 安徽农业大学
router.get('/ahau/cs_news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/ahau/cs_news/index')));
router.get('/ahau/jwc/:type', lazyloadRouteHandler(require.resolve('./routes/universities/ahau/jwc/index')));
router.get('/ahau/main/:type', lazyloadRouteHandler(require.resolve('./routes/universities/ahau/main/index')));

// 安徽医科大学研究生学院
router.get('/ahmu/news', lazyloadRouteHandler(require.resolve('./routes/universities/ahmu/news')));

// 安徽工业大学
router.get('/ahut/news', lazyloadRouteHandler(require.resolve('./routes/universities/ahut/news')));
router.get('/ahut/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/ahut/jwc')));
router.get('/ahut/cstzgg', lazyloadRouteHandler(require.resolve('./routes/universities/ahut/cstzgg')));

// 上海理工大学
router.get('/usst/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/usst/jwc')));

// 临沂大学
router.get('/lyu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/lyu/news/index')));

// 福州大学
router.get('/fzu/:type', lazyloadRouteHandler(require.resolve('./routes/universities/fzu/news')));
router.get('/fzu_min/:type', lazyloadRouteHandler(require.resolve('./routes/universities/fzu/news_min')));

// 厦门大学
router.get('/xmu/aero/:type', lazyloadRouteHandler(require.resolve('./routes/universities/xmu/aero')));

// ifanr
router.get('/ifanr/:channel?', lazyloadRouteHandler(require.resolve('./routes/ifanr/index')));

// 果壳网
// router.get('/guokr/scientific', lazyloadRouteHandler(require.resolve('./routes/guokr/scientific')));
// router.get('/guokr/:channel', lazyloadRouteHandler(require.resolve('./routes/guokr/calendar')));

// 联合早报 已经迁移至v2模板
// router.get('/zaobao/realtime/:section?', require('./routes/zaobao/realtime'));
// router.get('/zaobao/znews/:section?', require('./routes/zaobao/znews'));
// router.get('/zaobao/:type/:section', lazyloadRouteHandler(require.resolve('./routes/zaobao/index')));
// router.get('/zaobao/interactive-graphics', lazyloadRouteHandler(require.resolve('./routes/zaobao/interactive')));

// IPSW.me
router.get('/ipsw/index/:ptype/:pname', lazyloadRouteHandler(require.resolve('./routes/ipsw/index')));

// Minecraft CurseForge
router.get('/curseforge/files/:project', lazyloadRouteHandler(require.resolve('./routes/curseforge/files')));

// 少数派 sspai migrated to v2
// router.get('/sspai/index', lazyloadRouteHandler(require.resolve('./routes/sspai/index')));
// router.get('/sspai/series', lazyloadRouteHandler(require.resolve('./routes/sspai/series')));
// router.get('/sspai/shortcuts', lazyloadRouteHandler(require.resolve('./routes/sspai/shortcutsGallery')));
// router.get('/sspai/matrix', lazyloadRouteHandler(require.resolve('./routes/sspai/matrix')));
// router.get('/sspai/column/:id', lazyloadRouteHandler(require.resolve('./routes/sspai/column')));
// router.get('/sspai/author/:id', lazyloadRouteHandler(require.resolve('./routes/sspai/author')));
// router.get('/sspai/topics', lazyloadRouteHandler(require.resolve('./routes/sspai/topics')));
// router.get('/sspai/topic/:id', lazyloadRouteHandler(require.resolve('./routes/sspai/topic')));
// router.get('/sspai/tag/:keyword', lazyloadRouteHandler(require.resolve('./routes/sspai/tag')));
// router.get('/sspai/activity/:slug', lazyloadRouteHandler(require.resolve('./routes/sspai/activity')));

// 异次元软件世界
router.get('/iplay/home', lazyloadRouteHandler(require.resolve('./routes/iplay/home')));

// xclient.info
router.get('/xclient/app/:name', lazyloadRouteHandler(require.resolve('./routes/xclient/app')));

// 中国驻外使领事馆 migrated to v2
// router.get('/embassy/:country/:city?', lazyloadRouteHandler(require.resolve('./routes/embassy/index')));

// 澎湃新闻
// router.get('/thepaper/featured', lazyloadRouteHandler(require.resolve('./routes/thepaper/featured')));
// router.get('/thepaper/channel/:id', lazyloadRouteHandler(require.resolve('./routes/thepaper/channel')));
// router.get('/thepaper/list/:id', lazyloadRouteHandler(require.resolve('./routes/thepaper/list')));

// 澎湃美数课
// router.get('/thepaper/839studio', lazyloadRouteHandler(require.resolve('./routes/thepaper/839studio/studio.js')));
// router.get('/thepaper/839studio/:id', lazyloadRouteHandler(require.resolve('./routes/thepaper/839studio/category.js')));

// 电影首发站
router.get('/dysfz', lazyloadRouteHandler(require.resolve('./routes/dysfz/index')));
router.get('/dysfz/index', lazyloadRouteHandler(require.resolve('./routes/dysfz/index'))); // 废弃

// きららファンタジア
router.get('/kirara/news', lazyloadRouteHandler(require.resolve('./routes/kirara/news')));

// 电影天堂
router.get('/dytt', lazyloadRouteHandler(require.resolve('./routes/dytt/index')));
router.get('/dytt/index', lazyloadRouteHandler(require.resolve('./routes/dytt/index'))); // 废弃

// BT之家
// router.get('/btzj/:type?', lazyloadRouteHandler(require.resolve('./routes/btzj/index')));

// 人生05电影网
router.get('/rs05/rs05', lazyloadRouteHandler(require.resolve('./routes/rs05/rs05')));

// 人人影视 (评测推荐) migrated to v2
// router.get('/rrys/review', lazyloadRouteHandler(require.resolve('./routes/rrys/review')));
// 人人影视（每日更新）
// router.get('/yyets/todayfilelist', lazyloadRouteHandler(require.resolve('./routes/yyets/todayfilelist')));

// 趣头条
router.get('/qutoutiao/category/:cid', lazyloadRouteHandler(require.resolve('./routes/qutoutiao/category')));

// NHK NEW WEB EASY migrated to v2
// router.get('/nhk/news_web_easy', lazyloadRouteHandler(require.resolve('./routes/nhk/news_web_easy')));

// BBC
router.get('/bbc/:site?/:channel?', lazyloadRouteHandler(require.resolve('./routes/bbc/index')));

// Financial Times migrated to v2
// router.get('/ft/myft/:key', lazyloadRouteHandler(require.resolve('./routes/ft/myft')));
// router.get('/ft/:language/:channel?', lazyloadRouteHandler(require.resolve('./routes/ft/channel')));

// The Verge
router.get('/verge', lazyloadRouteHandler(require.resolve('./routes/verge/index')));

// 看雪
router.get('/pediy/topic/:category?/:type?', lazyloadRouteHandler(require.resolve('./routes/pediy/topic')));

// 知晓程序
router.get('/miniapp/article/:category', lazyloadRouteHandler(require.resolve('./routes/miniapp/article')));
router.get('/miniapp/store/newest', lazyloadRouteHandler(require.resolve('./routes/miniapp/store/newest')));

// 后续
// router.get('/houxu/live/:id/:timeline?', lazyloadRouteHandler(require.resolve('./routes/houxu/live')));
// router.get('/houxu/events', lazyloadRouteHandler(require.resolve('./routes/houxu/events')));
// router.get('/houxu/lives/:type', lazyloadRouteHandler(require.resolve('./routes/houxu/lives')));

// 老司机
router.get('/laosiji/hot', lazyloadRouteHandler(require.resolve('./routes/laosiji/hot')));
router.get('/laosiji/feed', lazyloadRouteHandler(require.resolve('./routes/laosiji/feed')));
router.get('/laosiji/hotshow/:id', lazyloadRouteHandler(require.resolve('./routes/laosiji/hotshow')));

// Scientific American 60-Second Science
router.get('/60s-science', lazyloadRouteHandler(require.resolve('./routes/60s-science/transcript')));

// 99% Invisible
router.get('/99percentinvisible/transcript', lazyloadRouteHandler(require.resolve('./routes/99percentinvisible/transcript')));

// 青空文庫
router.get('/aozora/newbook/:count?', lazyloadRouteHandler(require.resolve('./routes/aozora/newbook')));

// solidot migrated to v2
// router.get('/solidot/:type?', lazyloadRouteHandler(require.resolve('./routes/solidot/main')));

// Hermes UK
router.get('/parcel/hermesuk/:tracking', lazyloadRouteHandler(require.resolve('./routes/parcel/hermesuk')));

// 数字尾巴
router.get('/dgtle', lazyloadRouteHandler(require.resolve('./routes/dgtle/index')));
router.get('/dgtle/whale/category/:category', lazyloadRouteHandler(require.resolve('./routes/dgtle/whale')));
router.get('/dgtle/whale/rank/:type/:rule', lazyloadRouteHandler(require.resolve('./routes/dgtle/whale_rank')));
router.get('/dgtle/trade/:typeId?', lazyloadRouteHandler(require.resolve('./routes/dgtle/trade')));
router.get('/dgtle/trade/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/dgtle/keyword')));

// 抽屉新热榜
router.get('/chouti/top/:hour?', lazyloadRouteHandler(require.resolve('./routes/chouti/top')));
router.get('/chouti/:subject?', lazyloadRouteHandler(require.resolve('./routes/chouti')));

// 西安电子科技大学 migrated to v2
// router.get('/xidian/jwc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/xidian/jwc')));

// Westore
router.get('/westore/new', lazyloadRouteHandler(require.resolve('./routes/westore/new')));

// 油价
router.get('/oilprice/:area', lazyloadRouteHandler(require.resolve('./routes/oilprice')));

// nHentai
router.get('/nhentai/search/:keyword/:mode?', lazyloadRouteHandler(require.resolve('./routes/nhentai/search')));
router.get('/nhentai/:key/:keyword/:mode?', lazyloadRouteHandler(require.resolve('./routes/nhentai/other')));

// 龙腾网
router.get('/ltaaa/:category?', lazyloadRouteHandler(require.resolve('./routes/ltaaa/index')));

// AcFun migrated to v2
// router.get('/acfun/bangumi/:id', lazyloadRouteHandler(require.resolve('./routes/acfun/bangumi')));
// router.get('/acfun/user/video/:uid', lazyloadRouteHandler(require.resolve('./routes/acfun/video')));

// Auto Trader
router.get('/autotrader/:query', lazyloadRouteHandler(require.resolve('./routes/autotrader')));

// 极客公园
router.get('/geekpark/breakingnews', lazyloadRouteHandler(require.resolve('./routes/geekpark/breakingnews')));

// 百度
router.get('/baidu/doodles', lazyloadRouteHandler(require.resolve('./routes/baidu/doodles')));
router.get('/baidu/topwords/:boardId?', lazyloadRouteHandler(require.resolve('./routes/baidu/topwords')));
router.get('/baidu/daily', lazyloadRouteHandler(require.resolve('./routes/baidu/daily')));

// 搜狗
router.get('/sogou/doodles', lazyloadRouteHandler(require.resolve('./routes/sogou/doodles')));

// 香港天文台
router.get('/hko/weather', lazyloadRouteHandler(require.resolve('./routes/hko/weather')));

// sankakucomplex
router.get('/sankakucomplex/post', lazyloadRouteHandler(require.resolve('./routes/sankakucomplex/post')));

// 技术头条
router.get('/blogread/newest', lazyloadRouteHandler(require.resolve('./routes/blogread/newest')));

// gnn游戏新闻
router.get('/gnn/gnn', lazyloadRouteHandler(require.resolve('./routes/gnn/gnn')));

// a9vg游戏新闻
router.get('/a9vg/a9vg', lazyloadRouteHandler(require.resolve('./routes/a9vg/a9vg')));

// IT桔子
router.get('/itjuzi/invest', lazyloadRouteHandler(require.resolve('./routes/itjuzi/invest')));
router.get('/itjuzi/merge', lazyloadRouteHandler(require.resolve('./routes/itjuzi/merge')));

// 探物
router.get('/tanwu/products', lazyloadRouteHandler(require.resolve('./routes/tanwu/products')));

// GitChat
router.get('/gitchat/newest/:category?/:selected?', lazyloadRouteHandler(require.resolve('./routes/gitchat/newest')));

// The Guardian
router.get('/guardian/:type', lazyloadRouteHandler(require.resolve('./routes/guardian/guardian')));

// 下厨房
router.get('/xiachufang/user/cooked/:id', lazyloadRouteHandler(require.resolve('./routes/xiachufang/user/cooked')));
router.get('/xiachufang/user/created/:id', lazyloadRouteHandler(require.resolve('./routes/xiachufang/user/created')));
router.get('/xiachufang/popular/:timeframe?', lazyloadRouteHandler(require.resolve('./routes/xiachufang/popular')));

// 经济观察报
router.get('/eeo/:column?/:category?', lazyloadRouteHandler(require.resolve('./routes/eeo/index')));

// 腾讯视频
router.get('/tencentvideo/playlist/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/video/playlist')));

// 看漫画
router.get('/manhuagui/comic/:id/:chapterCnt?', lazyloadRouteHandler(require.resolve('./routes/manhuagui/comic')));
router.get('/mhgui/comic/:id/:chapterCnt?', lazyloadRouteHandler(require.resolve('./routes/mhgui/comic')));
router.get('/twmanhuagui/comic/:id/:chapterCnt?', lazyloadRouteHandler(require.resolve('./routes/twmanhuagui/comic')));
// 拷贝漫画
router.get('/copymanga/comic/:id/:chapterCnt?', lazyloadRouteHandler(require.resolve('./routes/copymanga/comic')));

// 拷贝漫画
router.get('/copymanga/comic/:id', lazyloadRouteHandler(require.resolve('./routes/copymanga/comic')));

// 動漫狂
router.get('/cartoonmad/comic/:id', lazyloadRouteHandler(require.resolve('./routes/cartoonmad/comic')));
// Vol
router.get('/vol/:mode?', lazyloadRouteHandler(require.resolve('./routes/vol/lastupdate')));
// 咚漫
router.get('/dongmanmanhua/:category/:name/:id', lazyloadRouteHandler(require.resolve('./routes/dongmanmanhua/comic')));
// webtoons
router.get('/webtoons/:lang/:category/:name/:id', lazyloadRouteHandler(require.resolve('./routes/webtoons/comic')));
router.get('/webtoons/naver/:id', lazyloadRouteHandler(require.resolve('./routes/webtoons/naver')));

// Tits Guru
router.get('/tits-guru/home', lazyloadRouteHandler(require.resolve('./routes/titsguru/home')));
router.get('/tits-guru/daily', lazyloadRouteHandler(require.resolve('./routes/titsguru/daily')));
router.get('/tits-guru/category/:type', lazyloadRouteHandler(require.resolve('./routes/titsguru/category')));
router.get('/tits-guru/model/:name', lazyloadRouteHandler(require.resolve('./routes/titsguru/model')));

// typora
router.get('/typora/changelog', lazyloadRouteHandler(require.resolve('./routes/typora/changelog')));
router.get('/typora/changelog-dev/:os?', lazyloadRouteHandler(require.resolve('./routes/typora/changelog-dev')));

// TSSstatus
router.get('/tssstatus/:board/:build', lazyloadRouteHandler(require.resolve('./routes/tssstatus')));

// Anime1
router.get('/anime1/anime/:time/:name', lazyloadRouteHandler(require.resolve('./routes/anime1/anime')));
router.get('/anime1/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/anime1/search')));

// Global UDN
router.get('/udn/global/:tid', lazyloadRouteHandler(require.resolve('./routes/udn/global')));

// gitea
router.get('/gitea/blog', lazyloadRouteHandler(require.resolve('./routes/gitea/blog')));

// iDownloadBlog
router.get('/idownloadblog', lazyloadRouteHandler(require.resolve('./routes/idownloadblog/index')));

// 9to5
// router.get('/9to5/:subsite/:tag?', lazyloadRouteHandler(require.resolve('./routes/9to5/subsite')));

// TesterHome
router.get('/testerhome/newest', lazyloadRouteHandler(require.resolve('./routes/testerhome/newest')));

// 刷屏
router.get('/weseepro/newest', lazyloadRouteHandler(require.resolve('./routes/weseepro/newest')));
router.get('/weseepro/newest-direct', lazyloadRouteHandler(require.resolve('./routes/weseepro/newest-direct')));
router.get('/weseepro/circle', lazyloadRouteHandler(require.resolve('./routes/weseepro/circle')));

// 玩物志
router.get('/coolbuy/newest', lazyloadRouteHandler(require.resolve('./routes/coolbuy/newest')));

// MiniFlux
router.get('/miniflux/subscription/:parameters?', lazyloadRouteHandler(require.resolve('./routes/miniflux/get_feeds')));
router.get('/miniflux/:feeds/:parameters?', lazyloadRouteHandler(require.resolve('./routes/miniflux/get_entries')));

// NGA migrated to v2
// router.get('/nga/forum/:fid/:recommend?', lazyloadRouteHandler(require.resolve('./routes/nga/forum')));
// router.get('/nga/post/:tid', lazyloadRouteHandler(require.resolve('./routes/nga/post')));

// Nautilus
router.get('/nautilus/topic/:tid', lazyloadRouteHandler(require.resolve('./routes/nautilus/topics')));

// JavBus migrated to v2
// router.get('/javbus/home', lazyloadRouteHandler(require.resolve('./routes/javbus/home')));
// router.get('/javbus/genre/:gid', lazyloadRouteHandler(require.resolve('./routes/javbus/genre')));
// router.get('/javbus/star/:sid', lazyloadRouteHandler(require.resolve('./routes/javbus/star')));
// router.get('/javbus/series/:seriesid', lazyloadRouteHandler(require.resolve('./routes/javbus/series')));
// router.get('/javbus/studio/:studioid', lazyloadRouteHandler(require.resolve('./routes/javbus/studio')));
// router.get('/javbus/label/:labelid', lazyloadRouteHandler(require.resolve('./routes/javbus/label')));
// router.get('/javbus/uncensored/home', lazyloadRouteHandler(require.resolve('./routes/javbus/uncensored/home')));
// router.get('/javbus/uncensored/genre/:gid', lazyloadRouteHandler(require.resolve('./routes/javbus/uncensored/genre')));
// router.get('/javbus/uncensored/star/:sid', lazyloadRouteHandler(require.resolve('./routes/javbus/uncensored/star')));
// router.get('/javbus/uncensored/series/:seriesid', lazyloadRouteHandler(require.resolve('./routes/javbus/uncensored/series')));
// router.get('/javbus/western/home', lazyloadRouteHandler(require.resolve('./routes/javbus/western/home')));
// router.get('/javbus/western/genre/:gid', lazyloadRouteHandler(require.resolve('./routes/javbus/western/genre')));
// router.get('/javbus/western/star/:sid', lazyloadRouteHandler(require.resolve('./routes/javbus/western/star')));
// router.get('/javbus/western/series/:seriesid', lazyloadRouteHandler(require.resolve('./routes/javbus/western/series')));

// 中山大学
// router.get('/sysu/cse', lazyloadRouteHandler(require.resolve('./routes/universities/sysu/cse')));

// 動畫瘋
router.get('/anigamer/new_anime', lazyloadRouteHandler(require.resolve('./routes/anigamer/new_anime')));
router.get('/anigamer/anime/:sn', lazyloadRouteHandler(require.resolve('./routes/anigamer/anime')));

// Apkpure
router.get('/apkpure/versions/:region/:pkg', lazyloadRouteHandler(require.resolve('./routes/apkpure/versions')));

// 豆瓣美女 migrated to v2
// router.get('/dbmv/:category?', lazyloadRouteHandler(require.resolve('./routes/dbmv/index')));

// 中国药科大学
router.get('/cpu/home', lazyloadRouteHandler(require.resolve('./routes/universities/cpu/home')));
router.get('/cpu/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/cpu/jwc')));
router.get('/cpu/yjsy', lazyloadRouteHandler(require.resolve('./routes/universities/cpu/yjsy')));

// 字幕组
router.get('/zimuzu/resource/:id?', lazyloadRouteHandler(require.resolve('./routes/zimuzu/resource')));
router.get('/zimuzu/top/:range/:type', lazyloadRouteHandler(require.resolve('./routes/zimuzu/top')));

// 字幕库
router.get('/zimuku/:type?', lazyloadRouteHandler(require.resolve('./routes/zimuku/index')));

// SubHD.tv
// router.get('/subhd/newest', lazyloadRouteHandler(require.resolve('./routes/subhd/newest')));

// 虎嗅 migrated to v2
// router.get('/huxiu/tag/:id', lazyloadRouteHandler(require.resolve('./routes/huxiu/tag')));
// router.get('/huxiu/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/huxiu/search')));
// router.get('/huxiu/author/:id', lazyloadRouteHandler(require.resolve('./routes/huxiu/author')));
// router.get('/huxiu/article', lazyloadRouteHandler(require.resolve('./routes/huxiu/article')));
// router.get('/huxiu/collection/:id', lazyloadRouteHandler(require.resolve('./routes/huxiu/collection')));

// Steam
router.get('/steam/search/:params', lazyloadRouteHandler(require.resolve('./routes/steam/search')));

// Steamgifts
router.get('/steamgifts/discussions/:category?', lazyloadRouteHandler(require.resolve('./routes/steam/steamgifts/discussions')));

// 扇贝
router.get('/shanbay/checkin/:id', lazyloadRouteHandler(require.resolve('./routes/shanbay/checkin')));
router.get('/shanbay/footprints/:category?', lazyloadRouteHandler(require.resolve('./routes/shanbay/footprints')));

// Facebook
router.get('/facebook/page/:id', lazyloadRouteHandler(require.resolve('./routes/facebook/page')));

// 币乎
router.get('/bihu/activaties/:id', lazyloadRouteHandler(require.resolve('./routes/bihu/activaties')));

// 停电通知
router.get('/tingdiantz/nanjing', lazyloadRouteHandler(require.resolve('./routes/tingdiantz/nanjing')));
router.get('/tingdiantz/95598/:province/:city/:district?', lazyloadRouteHandler(require.resolve('./routes/tingdiantz/95598')));

// 36kr migrated to v2
// router.get('/36kr/search/article/:keyword', lazyloadRouteHandler(require.resolve('./routes/36kr/search/article')));
// router.get('/36kr/newsflashes', lazyloadRouteHandler(require.resolve('./routes/36kr/newsflashes')));
// router.get('/36kr/news/:category?', lazyloadRouteHandler(require.resolve('./routes/36kr/news')));
// router.get('/36kr/user/:uid', lazyloadRouteHandler(require.resolve('./routes/36kr/user')));
// router.get('/36kr/motif/:mid', lazyloadRouteHandler(require.resolve('./routes/36kr/motif')));

// PMCAFF
router.get('/pmcaff/list/:typeid', lazyloadRouteHandler(require.resolve('./routes/pmcaff/list')));
router.get('/pmcaff/feed/:typeid', lazyloadRouteHandler(require.resolve('./routes/pmcaff/feed')));
router.get('/pmcaff/user/:userid', lazyloadRouteHandler(require.resolve('./routes/pmcaff/user')));

// icourse163
router.get('/icourse163/newest', lazyloadRouteHandler(require.resolve('./routes/icourse163/newest')));

// patchwork.kernel.org
router.get('/patchwork.kernel.org/comments/:id', lazyloadRouteHandler(require.resolve('./routes/patchwork.kernel.org/comments')));

// 京东众筹
router.get('/jingdong/zhongchou/:type/:status/:sort', lazyloadRouteHandler(require.resolve('./routes/jingdong/zhongchou')));

// All Poetry
router.get('/allpoetry/:order?', lazyloadRouteHandler(require.resolve('./routes/allpoetry/order')));

// 华尔街见闻
// router.get('/wallstreetcn/news/global', lazyloadRouteHandler(require.resolve('./routes/wallstreetcn/news')));
// router.get('/wallstreetcn/live/:channel?', lazyloadRouteHandler(require.resolve('./routes/wallstreetcn/live')));

// 多抓鱼搜索
router.get('/duozhuayu/search/:wd', lazyloadRouteHandler(require.resolve('./routes/duozhuayu/search')));

// 创业邦
router.get('/cyzone/author/:id', lazyloadRouteHandler(require.resolve('./routes/cyzone/author')));
router.get('/cyzone/label/:name', lazyloadRouteHandler(require.resolve('./routes/cyzone/label')));

// 政府
router.get('/gov/zhengce/zuixin', lazyloadRouteHandler(require.resolve('./routes/gov/zhengce/zuixin')));
router.get('/gov/zhengce/wenjian/:pcodeJiguan?', lazyloadRouteHandler(require.resolve('./routes/gov/zhengce/wenjian')));
router.get('/gov/zhengce/govall/:advance?', lazyloadRouteHandler(require.resolve('./routes/gov/zhengce/govall')));
router.get('/gov/province/:name/:category', lazyloadRouteHandler(require.resolve('./routes/gov/province')));
router.get('/gov/city/:name/:category', lazyloadRouteHandler(require.resolve('./routes/gov/city')));
router.get('/gov/statecouncil/briefing', lazyloadRouteHandler(require.resolve('./routes/gov/statecouncil/briefing')));
router.get('/gov/news/:uid', lazyloadRouteHandler(require.resolve('./routes/gov/news')));
router.get('/gov/shuju/:caty/:item', lazyloadRouteHandler(require.resolve('./routes/gov/shuju')));
router.get('/gov/xinwen/tujie/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/xinwen/tujie')));

// 苏州
router.get('/gov/suzhou/news/:uid', lazyloadRouteHandler(require.resolve('./routes/gov/suzhou/news')));
router.get('/gov/suzhou/doc', lazyloadRouteHandler(require.resolve('./routes/gov/suzhou/doc')));

// 江苏
router.get('/gov/jiangsu/eea/:type?', lazyloadRouteHandler(require.resolve('./routes/gov/jiangsu/eea')));

// 山西
router.get('/gov/shanxi/rst/:category', lazyloadRouteHandler(require.resolve('./routes/gov/shanxi/rst')));

// 湖南
router.get('/gov/hunan/notice/:type', lazyloadRouteHandler(require.resolve('./routes/gov/hunan/notice')));

// 中华人民共和国国家发展和改革委员会
router.get('/gov/ndrc/xwdt/:caty?', lazyloadRouteHandler(require.resolve('./routes/gov/ndrc/xwdt')));

// 中华人民共和国-海关总署 migrated to v2
// router.get('/gov/customs/list/:gchannel', lazyloadRouteHandler(require.resolve('./routes/gov/customs/list')));

// 中华人民共和国教育部
// router.get('/gov/moe/:type', lazyloadRouteHandler(require.resolve('./routes/gov/moe/moe')));

// 中华人民共和国外交部
// router.get('/gov/fmprc/fyrbt', lazyloadRouteHandler(require.resolve('./routes/gov/fmprc/fyrbt')));

// 中华人民共和国住房和城乡建设部
router.get('/gov/mohurd/policy', lazyloadRouteHandler(require.resolve('./routes/gov/mohurd/policy')));

// 国家新闻出版广电总局
router.get('/gov/sapprft/approval/:channel/:detail?', lazyloadRouteHandler(require.resolve('./routes/gov/sapprft/7026')));

// 国家新闻出版署
router.get('/gov/nppa/:channel', lazyloadRouteHandler(require.resolve('./routes/gov/nppa/channels')));
router.get('/gov/nppa/:channel/:content', lazyloadRouteHandler(require.resolve('./routes/gov/nppa/contents')));

// 北京卫生健康委员会
router.get('/gov/beijing/mhc/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/beijing/mhc')));

// 北京考试院
router.get('/gov/beijing/bjeea/:type', lazyloadRouteHandler(require.resolve('./routes/gov/beijing/eea')));

// 广东省教育厅
router.get('/gov/guangdong/edu/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/guangdong/edu')));

// 广东省教育考试院
router.get('/gov/guangdong/eea/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/guangdong/eea')));

// 广东省深圳市
router.get('/gov/shenzhen/xxgk/zfxxgj/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/shenzhen/xxgk/zfxxgj')));

// 日本国外務省記者会見
router.get('/go.jp/mofa', lazyloadRouteHandler(require.resolve('./routes/go.jp/mofa/main')));

// 小黑盒
router.get('/xiaoheihe/user/:id', lazyloadRouteHandler(require.resolve('./routes/xiaoheihe/user')));
router.get('/xiaoheihe/news', lazyloadRouteHandler(require.resolve('./routes/xiaoheihe/news')));
router.get('/xiaoheihe/discount/:platform?', lazyloadRouteHandler(require.resolve('./routes/xiaoheihe/discount')));

// 惠誉评级
router.get('/fitchratings/site/:type', lazyloadRouteHandler(require.resolve('./routes/fitchratings/site')));

// 移动支付 migrated to v2
// router.get('/mpaypass/news', lazyloadRouteHandler(require.resolve('./routes/mpaypass/news')));
// router.get('/mpaypass/main/:type?', lazyloadRouteHandler(require.resolve('./routes/mpaypass/main')));

// 新浪科技探索
router.get('/sina/discovery/:type', lazyloadRouteHandler(require.resolve('./routes/sina/discovery')));

// 新浪科技滚动新闻
router.get('/sina/rollnews', lazyloadRouteHandler(require.resolve('./routes/sina/rollnews')));

// 新浪体育
router.get('/sina/sports/:type', lazyloadRouteHandler(require.resolve('./routes/sina/sports')));

// 新浪专栏创事记
router.get('/sina/csj', lazyloadRouteHandler(require.resolve('./routes/sina/chuangshiji')));

// 新浪财经－国內
router.get('/sina/finance', lazyloadRouteHandler(require.resolve('./routes/sina/finance')));

// Animen
router.get('/animen/news/:type', lazyloadRouteHandler(require.resolve('./routes/animen/news')));

// D2 资源库
router.get('/d2/daily', lazyloadRouteHandler(require.resolve('./routes/d2/daily')));

// ebb
router.get('/ebb', lazyloadRouteHandler(require.resolve('./routes/ebb')));

// Indienova
router.get('/indienova/:type', lazyloadRouteHandler(require.resolve('./routes/indienova/article')));

// JPMorgan Chase Institute
router.get('/jpmorganchase', lazyloadRouteHandler(require.resolve('./routes/jpmorganchase/research')));

// 美拍
router.get('/meipai/user/:uid', lazyloadRouteHandler(require.resolve('./routes/meipai/user')));

// 多知网
router.get('/duozhi', lazyloadRouteHandler(require.resolve('./routes/duozhi')));

// 人人都是产品经理
router.get('/woshipm/popular', lazyloadRouteHandler(require.resolve('./routes/woshipm/popular')));
router.get('/woshipm/wen', lazyloadRouteHandler(require.resolve('./routes/woshipm/wen')));
router.get('/woshipm/bookmarks/:id', lazyloadRouteHandler(require.resolve('./routes/woshipm/bookmarks')));
router.get('/woshipm/user_article/:id', lazyloadRouteHandler(require.resolve('./routes/woshipm/user_article')));
router.get('/woshipm/latest', lazyloadRouteHandler(require.resolve('./routes/woshipm/latest')));

// 高清电台
router.get('/gaoqing/latest', lazyloadRouteHandler(require.resolve('./routes/gaoqing/latest')));

// 鲸跃汽车
router.get('/whalegogo/home', lazyloadRouteHandler(require.resolve('./routes/whalegogo/home')));
router.get('/whalegogo/portal/:type_id/:tagid?', lazyloadRouteHandler(require.resolve('./routes/whalegogo/portal')));

// 爱思想
router.get('/aisixiang/column/:id', lazyloadRouteHandler(require.resolve('./routes/aisixiang/column')));
router.get('/aisixiang/ranking/:type?/:range?', lazyloadRouteHandler(require.resolve('./routes/aisixiang/ranking')));
router.get('/aisixiang/thinktank/:name/:type?', lazyloadRouteHandler(require.resolve('./routes/aisixiang/thinktank')));

// Hacker News
// router.get('/hackernews/:section/:type?', lazyloadRouteHandler(require.resolve('./routes/hackernews/story')));

// LeetCode
// router.get('/leetcode/articles', lazyloadRouteHandler(require.resolve('./routes/leetcode/articles')));
router.get('/leetcode/submission/us/:user', lazyloadRouteHandler(require.resolve('./routes/leetcode/check-us')));
router.get('/leetcode/submission/cn/:user', lazyloadRouteHandler(require.resolve('./routes/leetcode/check-cn')));

// 虎扑
// router.get('/hupu/bxj/:id/:order?', lazyloadRouteHandler(require.resolve('./routes/hupu/bbs')));
// router.get('/hupu/bbs/:id/:order?', lazyloadRouteHandler(require.resolve('./routes/hupu/bbs')));
// router.get('/hupu/all/:caty', lazyloadRouteHandler(require.resolve('./routes/hupu/all')));
// router.get('/hupu/dept/:dept', lazyloadRouteHandler(require.resolve('./routes/hupu/dept')));

// 牛客网 migrated to v2
// router.get('/nowcoder/discuss/:type/:order', lazyloadRouteHandler(require.resolve('./routes/nowcoder/discuss')));
// router.get('/nowcoder/schedule/:propertyId?/:typeId?', lazyloadRouteHandler(require.resolve('./routes/nowcoder/schedule')));
// router.get('/nowcoder/recommend', lazyloadRouteHandler(require.resolve('./routes/nowcoder/recommend')));
// router.get('/nowcoder/jobcenter/:recruitType?/:city?/:type?/:order?/:latest?', lazyloadRouteHandler(require.resolve('./routes/nowcoder/jobcenter')));

// Xiaomi.eu
router.get('/xiaomieu/releases', lazyloadRouteHandler(require.resolve('./routes/xiaomieu/releases')));

// sketch.com
router.get('/sketch/beta', lazyloadRouteHandler(require.resolve('./routes/sketch/beta')));
router.get('/sketch/updates', lazyloadRouteHandler(require.resolve('./routes/sketch/updates')));

// 每日安全
router.get('/security/pulses', lazyloadRouteHandler(require.resolve('./routes/security/pulses')));

// DoNews
router.get('/donews/:column?', lazyloadRouteHandler(require.resolve('./routes/donews/index')));

// WeGene
router.get('/wegene/column/:type/:category', lazyloadRouteHandler(require.resolve('./routes/wegene/column')));
router.get('/wegene/newest', lazyloadRouteHandler(require.resolve('./routes/wegene/newest')));

// instapaper
router.get('/instapaper/person/:name', lazyloadRouteHandler(require.resolve('./routes/instapaper/person')));

// UI 中国
router.get('/ui-cn/article', lazyloadRouteHandler(require.resolve('./routes/ui-cn/article')));
router.get('/ui-cn/user/:id', lazyloadRouteHandler(require.resolve('./routes/ui-cn/user')));

// Dcard
router.get('/dcard/:section/:type?', lazyloadRouteHandler(require.resolve('./routes/dcard/section')));

// 北京天文馆每日一图
router.get('/bjp/apod', lazyloadRouteHandler(require.resolve('./routes/bjp/apod')));

// 洛谷
router.get('/luogu/daily/:id?', lazyloadRouteHandler(require.resolve('./routes/luogu/daily')));
router.get('/luogu/contest', lazyloadRouteHandler(require.resolve('./routes/luogu/contest')));
router.get('/luogu/user/feed/:uid', lazyloadRouteHandler(require.resolve('./routes/luogu/userFeed')));

// 决胜网
router.get('/juesheng', lazyloadRouteHandler(require.resolve('./routes/juesheng')));

// 播客IBCラジオ イヤーマイッタマイッタ
router.get('/maitta', lazyloadRouteHandler(require.resolve('./routes/maitta')));

// 一些博客
// 敬维-以认真的态度做完美的事情: https://jingwei.link/
router.get('/blogs/jingwei.link', lazyloadRouteHandler(require.resolve('./routes/blogs/jingwei_link')));

// 王垠的博客-当然我在扯淡
router.get('/blogs/wangyin', lazyloadRouteHandler(require.resolve('./routes/blogs/wangyin')));

// 王五四文集
router.get('/blogs/wang54/:id?', lazyloadRouteHandler(require.resolve('./routes/blogs/wang54')));

// WordPress
router.get('/blogs/wordpress/:domain/:https?', lazyloadRouteHandler(require.resolve('./routes/blogs/wordpress')));

// 裏垢女子まとめ migrated to v2
// router.get('/uraaka-joshi', lazyloadRouteHandler(require.resolve('./routes/uraaka-joshi/uraaka-joshi')));
// router.get('/uraaka-joshi/:id', lazyloadRouteHandler(require.resolve('./routes/uraaka-joshi/uraaka-joshi-user')));

// 西祠胡同
router.get('/xici/:id?', lazyloadRouteHandler(require.resolve('./routes/xici')));

// 淘股吧论坛
// router.get('/taoguba/index', lazyloadRouteHandler(require.resolve('./routes/taoguba/index')));
// router.get('/taoguba/user/:uid', lazyloadRouteHandler(require.resolve('./routes/taoguba/user')));

// 今日热榜
router.get('/tophub/:id', lazyloadRouteHandler(require.resolve('./routes/tophub')));

// 游戏时光
router.get('/vgtime/news', lazyloadRouteHandler(require.resolve('./routes/vgtime/news.js')));
router.get('/vgtime/release', lazyloadRouteHandler(require.resolve('./routes/vgtime/release')));
router.get('/vgtime/keyword/:keyword', lazyloadRouteHandler(require.resolve('./routes/vgtime/keyword')));

// MP4吧
router.get('/mp4ba/:param', lazyloadRouteHandler(require.resolve('./routes/mp4ba')));

// anitama
router.get('/anitama/:channel?', lazyloadRouteHandler(require.resolve('./routes/anitama/channel')));

// 親子王國
router.get('/babykingdom/:id/:order?', lazyloadRouteHandler(require.resolve('./routes/babykingdom')));

// 四川大学
router.get('/scu/jwc/notice', lazyloadRouteHandler(require.resolve('./routes/universities/scu/jwc')));
router.get('/scu/xg/notice', lazyloadRouteHandler(require.resolve('./routes/universities/scu/xg')));

// 浙江工商大学
router.get('/zjgsu/tzgg', lazyloadRouteHandler(require.resolve('./routes/universities/zjgsu/tzgg/scripts')));
router.get('/zjgsu/gsgg', lazyloadRouteHandler(require.resolve('./routes/universities/zjgsu/gsgg/scripts')));
router.get('/zjgsu/xszq', lazyloadRouteHandler(require.resolve('./routes/universities/zjgsu/xszq/scripts')));

// 大众点评
router.get('/dianping/user/:id?', lazyloadRouteHandler(require.resolve('./routes/dianping/user')));

// 半月谈
router.get('/banyuetan/byt/:time?', lazyloadRouteHandler(require.resolve('./routes/banyuetan/byt')));
router.get('/banyuetan/:name', lazyloadRouteHandler(require.resolve('./routes/banyuetan')));

// 人民网
// router.get('/people/opinion/:id', lazyloadRouteHandler(require.resolve('./routes/people/opinion')));
// router.get('/people/env/:id', lazyloadRouteHandler(require.resolve('./routes/people/env')));
// router.get('/people/xjpjh/:keyword?/:year?', lazyloadRouteHandler(require.resolve('./routes/people/xjpjh')));
// router.get('/people/cpc/24h', lazyloadRouteHandler(require.resolve('./routes/people/cpc/24h')));

// 北极星电力网 migrated to v2
// router.get('/bjx/huanbao', lazyloadRouteHandler(require.resolve('./routes/bjx/huanbao')));

// gamersky
router.get('/gamersky/news', lazyloadRouteHandler(require.resolve('./routes/gamersky/news')));
router.get('/gamersky/ent/:category', lazyloadRouteHandler(require.resolve('./routes/gamersky/ent')));

// 游研社
// router.get('/yystv/category/:category', lazyloadRouteHandler(require.resolve('./routes/yystv/category')));
// router.get('/yystv/docs', lazyloadRouteHandler(require.resolve('./routes/yystv/docs')));

// konami
router.get('/konami/pesmobile/:lang?/:os?', lazyloadRouteHandler(require.resolve('./routes/konami/pesmobile')));

// psnine
router.get('/psnine/index', lazyloadRouteHandler(require.resolve('./routes/psnine/index')));
router.get('/psnine/shuzhe', lazyloadRouteHandler(require.resolve('./routes/psnine/shuzhe')));
router.get('/psnine/trade', lazyloadRouteHandler(require.resolve('./routes/psnine/trade')));
router.get('/psnine/game', lazyloadRouteHandler(require.resolve('./routes/psnine/game')));
router.get('/psnine/news/:order?', lazyloadRouteHandler(require.resolve('./routes/psnine/news')));
router.get('/psnine/node/:id?/:order?', lazyloadRouteHandler(require.resolve('./routes/psnine/node')));

// 浙江大学 migrated to v2
// router.get('/zju/list/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zju/list')));
// router.get('/zju/physics/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zju/physics')));
// router.get('/zju/grs/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zju/grs')));
// router.get('/zju/career/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zju/career')));
// router.get('/zju/cst/:type', lazyloadRouteHandler(require.resolve('./routes/universities/zju/cst')));
// router.get('/zju/cst/custom/:id', lazyloadRouteHandler(require.resolve('./routes/universities/zju/cst/custom')));

// 浙江大学城市学院
router.get('/zucc/news/latest', lazyloadRouteHandler(require.resolve('./routes/universities/zucc/news')));
router.get('/zucc/cssearch/latest/:webVpn/:key', lazyloadRouteHandler(require.resolve('./routes/universities/zucc/cssearch')));

// 华中师范大学
router.get('/ccnu/career', lazyloadRouteHandler(require.resolve('./routes/universities/ccnu/career')));

// Infoq
// router.get('/infoq/recommend', lazyloadRouteHandler(require.resolve('./routes/infoq/recommend')));
// router.get('/infoq/topic/:id', lazyloadRouteHandler(require.resolve('./routes/infoq/topic')));

// checkee
router.get('/checkee/:dispdate', lazyloadRouteHandler(require.resolve('./routes/checkee/index')));

// ZAKER migrated to v2
// router.get('/zaker/:type/:id', lazyloadRouteHandler(require.resolve('./routes/zaker/source')));
// router.get('/zaker/focusread', lazyloadRouteHandler(require.resolve('./routes/zaker/focusread')));

// Matters
router.get('/matters/latest/:type?', lazyloadRouteHandler(require.resolve('./routes/matters/latest')));
router.redirect('/matters/hot', '/matters/latest/heat'); // Deprecated
router.get('/matters/tags/:tid', lazyloadRouteHandler(require.resolve('./routes/matters/tags')));
router.get('/matters/author/:uid', lazyloadRouteHandler(require.resolve('./routes/matters/author')));

// MobData
router.get('/mobdata/report', lazyloadRouteHandler(require.resolve('./routes/mobdata/report')));

// 谷雨
router.get('/tencent/guyu/channel/:name', lazyloadRouteHandler(require.resolve('./routes/tencent/guyu/channel')));

// 古诗文网
router.get('/gushiwen/recommend/:annotation?', lazyloadRouteHandler(require.resolve('./routes/gushiwen/recommend')));

// 电商在线
router.get('/imaijia/category/:category', lazyloadRouteHandler(require.resolve('./routes/imaijia/category')));

// 21财经
router.get('/21caijing/channel/:name', lazyloadRouteHandler(require.resolve('./routes/21caijing/channel')));

// 北京邮电大学
router.get('/bupt/yz/:type', lazyloadRouteHandler(require.resolve('./routes/universities/bupt/yz')));
router.get('/bupt/grs', lazyloadRouteHandler(require.resolve('./routes/universities/bupt/grs')));
router.get('/bupt/portal', lazyloadRouteHandler(require.resolve('./routes/universities/bupt/portal')));
router.get('/bupt/news', lazyloadRouteHandler(require.resolve('./routes/universities/bupt/news')));
router.get('/bupt/funbox', lazyloadRouteHandler(require.resolve('./routes/universities/bupt/funbox')));

// VOCUS 方格子
router.get('/vocus/publication/:id', lazyloadRouteHandler(require.resolve('./routes/vocus/publication')));
router.get('/vocus/user/:id', lazyloadRouteHandler(require.resolve('./routes/vocus/user')));

// 一亩三分地 1point3acres
router.get('/1point3acres/blog/:category?', lazyloadRouteHandler(require.resolve('./routes/1point3acres/blog')));
router.get('/1point3acres/user/:id/threads', lazyloadRouteHandler(require.resolve('./routes/1point3acres/threads')));
router.get('/1point3acres/user/:id/posts', lazyloadRouteHandler(require.resolve('./routes/1point3acres/posts')));
router.get('/1point3acres/offer/:year?/:major?/:school?', lazyloadRouteHandler(require.resolve('./routes/1point3acres/offer')));
router.get('/1point3acres/post/:category', lazyloadRouteHandler(require.resolve('./routes/1point3acres/post')));

// 广东海洋大学
router.get('/gdoujwc', lazyloadRouteHandler(require.resolve('./routes/universities/gdou/jwc/jwtz')));

// 中国高清网
router.get('/gaoqingla/:tag?', lazyloadRouteHandler(require.resolve('./routes/gaoqingla/latest')));

// 马良行
router.get('/mlhang', lazyloadRouteHandler(require.resolve('./routes/mlhang/latest')));

// PlayStation Store
router.get('/ps/list/:gridName', lazyloadRouteHandler(require.resolve('./routes/ps/list')));
router.get('/ps/trophy/:id', lazyloadRouteHandler(require.resolve('./routes/ps/trophy')));
router.get('/ps/ps4updates', lazyloadRouteHandler(require.resolve('./routes/ps/ps4updates')));
router.get('/ps/:lang?/product/:gridName', lazyloadRouteHandler(require.resolve('./routes/ps/product')));

// Quanta Magazine
router.get('/quantamagazine/archive', lazyloadRouteHandler(require.resolve('./routes/quantamagazine/archive')));

// Nintendo
router.get('/nintendo/eshop/jp', lazyloadRouteHandler(require.resolve('./routes/nintendo/eshop_jp')));
router.get('/nintendo/eshop/hk', lazyloadRouteHandler(require.resolve('./routes/nintendo/eshop_hk')));
router.get('/nintendo/eshop/us', lazyloadRouteHandler(require.resolve('./routes/nintendo/eshop_us')));
router.get('/nintendo/eshop/cn', lazyloadRouteHandler(require.resolve('./routes/nintendo/eshop_cn')));
router.get('/nintendo/news', lazyloadRouteHandler(require.resolve('./routes/nintendo/news')));
router.get('/nintendo/news/china', lazyloadRouteHandler(require.resolve('./routes/nintendo/news_china')));
router.get('/nintendo/direct', lazyloadRouteHandler(require.resolve('./routes/nintendo/direct')));
router.get('/nintendo/system-update', lazyloadRouteHandler(require.resolve('./routes/nintendo/system-update')));

// 世界卫生组织 migrated to v2
// router.get('/who/news-room/:category?/:language?', lazyloadRouteHandler(require.resolve('./routes/who/news-room')));
// router.get('/who/speeches/:language?', lazyloadRouteHandler(require.resolve('./routes/who/speeches')));
// router.get('/who/news/:language?', lazyloadRouteHandler(require.resolve('./routes/who/news')));

// 福利资源-met.red
router.get('/metred/fuli', lazyloadRouteHandler(require.resolve('./routes/metred/fuli')));

// MIT
router.get('/mit/graduateadmissions/:type/:name', lazyloadRouteHandler(require.resolve('./routes/universities/mit/graduateadmissions')));
router.get('/mit/ocw-top', lazyloadRouteHandler(require.resolve('./routes/universities/mit/ocw-top')));
router.get('/mit/csail/news', lazyloadRouteHandler(require.resolve('./routes/universities/mit/csail/news')));

// 毕马威
router.get('/kpmg/insights', lazyloadRouteHandler(require.resolve('./routes/kpmg/insights')));

// Saraba1st
router.get('/saraba1st/thread/:tid', lazyloadRouteHandler(require.resolve('./routes/saraba1st/thread')));

// gradcafe
router.get('/gradcafe/result/:type', lazyloadRouteHandler(require.resolve('./routes/gradcafe/result')));
router.get('/gradcafe/result', lazyloadRouteHandler(require.resolve('./routes/gradcafe/result')));

// The Economist migrated to v2
// router.get('/the-economist/download', lazyloadRouteHandler(require.resolve('./routes/the-economist/download')));
// router.get('/the-economist/gre-vocabulary', lazyloadRouteHandler(require.resolve('./routes/the-economist/gre-vocabulary')));
// router.get('/the-economist/:endpoint', lazyloadRouteHandler(require.resolve('./routes/the-economist/full')));

// 鼠绘漫画
router.get('/shuhui/comics/:id', lazyloadRouteHandler(require.resolve('./routes/shuhui/comics')));

// 朝日新闻
router.get('/asahi/area/:id', lazyloadRouteHandler(require.resolve('./routes/asahi/area')));
router.get('/asahi/:genre?/:category?', lazyloadRouteHandler(require.resolve('./routes/asahi/index')));

// 7x24小时快讯
router.get('/fx678/kx', lazyloadRouteHandler(require.resolve('./routes/fx678/kx')));

// SoundCloud
router.get('/soundcloud/tracks/:user', lazyloadRouteHandler(require.resolve('./routes/soundcloud/tracks')));

// dilidili
router.get('/dilidili/fanju/:id', lazyloadRouteHandler(require.resolve('./routes/dilidili/fanju')));

// 且听风吟福利
router.get('/qtfyfl/:category', lazyloadRouteHandler(require.resolve('./routes/qtfyfl/category')));

// 派代
router.get('/paidai', lazyloadRouteHandler(require.resolve('./routes/paidai/index')));
router.get('/paidai/bbs', lazyloadRouteHandler(require.resolve('./routes/paidai/bbs')));
router.get('/paidai/news', lazyloadRouteHandler(require.resolve('./routes/paidai/news')));

// 中国银行
router.get('/boc/whpj/:format?', lazyloadRouteHandler(require.resolve('./routes/boc/whpj')));

// 漫画db
router.get('/manhuadb/comics/:id', lazyloadRouteHandler(require.resolve('./routes/manhuadb/comics')));

// 装备前线
router.get('/zfrontier/postlist/:type', lazyloadRouteHandler(require.resolve('./routes/zfrontier/postlist')));
router.get('/zfrontier/board/:boardId', lazyloadRouteHandler(require.resolve('./routes/zfrontier/board_postlist')));

// 观察者网
// router.get('/guancha/headline', lazyloadRouteHandler(require.resolve('./routes/guancha/headline')));
// router.get('/guancha/topic/:id/:order?', lazyloadRouteHandler(require.resolve('./routes/guancha/topic')));
// router.get('/guancha/member/:caty?', lazyloadRouteHandler(require.resolve('./routes/guancha/member')));
// router.get('/guancha/personalpage/:uid', lazyloadRouteHandler(require.resolve('./routes/guancha/personalpage')));
// router.get('/guancha/:caty?', lazyloadRouteHandler(require.resolve('./routes/guancha/index')));

// router.get('/guanchazhe/topic/:id/:order?', lazyloadRouteHandler(require.resolve('./routes/guancha/topic')));
// router.get('/guanchazhe/personalpage/:uid', lazyloadRouteHandler(require.resolve('./routes/guancha/personalpage')));
// router.get('/guanchazhe/index/:caty?', lazyloadRouteHandler(require.resolve('./routes/guancha/index')));

// Hpoi 手办维基
router.get('/hpoi/info/:type?', lazyloadRouteHandler(require.resolve('./routes/hpoi/info')));
router.get('/hpoi/:category/:words', lazyloadRouteHandler(require.resolve('./routes/hpoi')));
router.get('/hpoi/user/:user_id/:caty', lazyloadRouteHandler(require.resolve('./routes/hpoi/user')));

// 通用CurseForge
router.get('/curseforge/:gameid/:catagoryid/:projectid/files', lazyloadRouteHandler(require.resolve('./routes/curseforge/generalfiles')));

// 西南财经大学
router.get('/swufe/seie/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/swufe/seie')));

// Wired
router.get('/wired/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/wired/tag')));

// 语雀文档
router.get('/yuque/doc/:repo_id', lazyloadRouteHandler(require.resolve('./routes/yuque/doc')));

// 飞地
router.get('/enclavebooks/category/:id?', lazyloadRouteHandler(require.resolve('./routes/enclavebooks/category')));
router.get('/enclavebooks/user/:uid', lazyloadRouteHandler(require.resolve('./routes/enclavebooks/user.js')));
router.get('/enclavebooks/collection/:uid', lazyloadRouteHandler(require.resolve('./routes/enclavebooks/collection.js')));

// 色花堂
// router.get('/dsndsht23/picture/:subforumid', lazyloadRouteHandler(require.resolve('./routes/dsndsht23/index')));
// router.get('/dsndsht23/bt/:subforumid?', lazyloadRouteHandler(require.resolve('./routes/dsndsht23/index')));
// router.get('/dsndsht23/:subforumid?/:type?', lazyloadRouteHandler(require.resolve('./routes/dsndsht23/index')));
// router.get('/dsndsht23/:subforumid?', lazyloadRouteHandler(require.resolve('./routes/dsndsht23/index')));
// router.get('/dsndsht23', lazyloadRouteHandler(require.resolve('./routes/dsndsht23/index')));

// 数英网最新文章
router.get('/digitaling/index', lazyloadRouteHandler(require.resolve('./routes/digitaling/index')));

// 数英网文章专题
router.get('/digitaling/articles/:category/:subcate', lazyloadRouteHandler(require.resolve('./routes/digitaling/article')));

// 数英网项目专题
router.get('/digitaling/projects/:category', lazyloadRouteHandler(require.resolve('./routes/digitaling/project')));

// Bing壁纸
router.get('/bing', lazyloadRouteHandler(require.resolve('./routes/bing/index')));

// Maxjia News - DotA 2
router.get('/maxnews/dota2', lazyloadRouteHandler(require.resolve('./routes/maxnews/dota2')));

// 柠檬 - 私房歌
router.get('/ningmeng/song', lazyloadRouteHandler(require.resolve('./routes/ningmeng/song')));

// 紫竹张先生
router.get('/zzz/:category?/:language?', lazyloadRouteHandler(require.resolve('./routes/zzz')));

// AEON
router.get('/aeon/:cid', lazyloadRouteHandler(require.resolve('./routes/aeon/category')));

// AlgoCasts
router.get('/algocasts', lazyloadRouteHandler(require.resolve('./routes/algocasts/all')));

// aqicn
router.get('/aqicn/:city/:pollution?', lazyloadRouteHandler(require.resolve('./routes/aqicn/index')));

// 猫眼电影
router.get('/maoyan/hot', lazyloadRouteHandler(require.resolve('./routes/maoyan/hot')));
router.get('/maoyan/upcoming', lazyloadRouteHandler(require.resolve('./routes/maoyan/upcoming')));
router.get('/maoyan/hotComplete/:orderby?/:ascOrDesc?/:top?', lazyloadRouteHandler(require.resolve('./routes/maoyan/hotComplete')));

// cnBeta
// router.get('/cnbeta', lazyloadRouteHandler(require.resolve('./routes/cnbeta/home')));
// router.get('/cnbeta/topic/:topic_id', lazyloadRouteHandler(require.resolve('./routes/cnbeta/topic')));

// 国家退伍士兵信息
router.get('/gov/veterans/:type', lazyloadRouteHandler(require.resolve('./routes/gov/veterans/china')));

// 河北省退伍士兵信息
router.get('/gov/veterans/hebei/:type', lazyloadRouteHandler(require.resolve('./routes/gov/veterans/hebei')));

// Dilbert Comic Strip
router.get('/dilbert/strip', lazyloadRouteHandler(require.resolve('./routes/dilbert/strip')));

// 游戏打折情报
// router.get('/yxdzqb/:type', lazyloadRouteHandler(require.resolve('./routes/yxdzqb')));

// 怪物猎人
router.get('/monsterhunter/update', lazyloadRouteHandler(require.resolve('./routes/mhw/update')));
router.get('/mhw/update', lazyloadRouteHandler(require.resolve('./routes/mhw/update')));
router.get('/mhw/news', lazyloadRouteHandler(require.resolve('./routes/mhw/news')));

// 005.tv
router.get('/005tv/zx/latest', lazyloadRouteHandler(require.resolve('./routes/005tv/zx')));

// Polimi News
router.get('/polimi/news/:language?', lazyloadRouteHandler(require.resolve('./routes/polimi/news')));

// dekudeals
router.get('/dekudeals/:type', lazyloadRouteHandler(require.resolve('./routes/dekudeals')));

// 直播吧 migrated to v2
// router.get('/zhibo8/forum/:id', lazyloadRouteHandler(require.resolve('./routes/zhibo8/forum')));
// router.get('/zhibo8/post/:id', lazyloadRouteHandler(require.resolve('./routes/zhibo8/post')));
// router.get('/zhibo8/more/:category?', lazyloadRouteHandler(require.resolve('./routes/zhibo8/more')));

// 东方网 migrated to v2
// router.get('/eastday/sh', require('./routes/eastday/sh'));
// router.get('/eastday/24/:category?', require('./routes/eastday/24'));

// Metacritic
router.get('/metacritic/release/:platform/:type/:sort?', lazyloadRouteHandler(require.resolve('./routes/metacritic/release')));

// 快科技（原驱动之家）
router.get('/kkj/news', lazyloadRouteHandler(require.resolve('./routes/kkj/news')));

// Outage.Report
// router.get('/outagereport/:name/:count?', lazyloadRouteHandler(require.resolve('./routes/outagereport/service')));

// sixthtone
router.get('/sixthtone/news', lazyloadRouteHandler(require.resolve('./routes/sixthtone/news')));

// AI研习社
router.get('/aiyanxishe/:id/:sort?', lazyloadRouteHandler(require.resolve('./routes/aiyanxishe/home')));

// 活动行
router.get('/huodongxing/explore', lazyloadRouteHandler(require.resolve('./routes/hdx/explore')));

// 飞客茶馆优惠信息
// router.get('/flyert/preferential', lazyloadRouteHandler(require.resolve('./routes/flyert/preferential')));
// router.get('/flyert/creditcard/:bank', lazyloadRouteHandler(require.resolve('./routes/flyert/creditcard')));
// router.get('/flyertea/preferential', lazyloadRouteHandler(require.resolve('./routes/flyert/preferential')));
// router.get('/flyertea/creditcard/:bank', lazyloadRouteHandler(require.resolve('./routes/flyert/creditcard')));

// 中国广播
// router.get('/radio/:channelname/:name', lazyloadRouteHandler(require.resolve('./routes/radio/radio')));

// TOPYS
// router.get('/topys/:category', lazyloadRouteHandler(require.resolve('./routes/topys/article')));

// 巴比特作者专栏
router.get('/8btc/:authorid', lazyloadRouteHandler(require.resolve('./routes/8btc/author')));
router.get('/8btc/news/flash', lazyloadRouteHandler(require.resolve('./routes/8btc/news/flash')));

// VueVlog
router.get('/vuevideo/:userid', lazyloadRouteHandler(require.resolve('./routes/vuevideo/user')));

// 证监会
router.get('/csrc/news/:suffix?', lazyloadRouteHandler(require.resolve('./routes/csrc/news')));
router.get('/csrc/fashenwei', lazyloadRouteHandler(require.resolve('./routes/csrc/fashenwei')));
router.get('/csrc/auditstatus/:apply_id', lazyloadRouteHandler(require.resolve('./routes/csrc/auditstatus')));

// LWN.net Alerts
router.get('/lwn/alerts/:distributor', lazyloadRouteHandler(require.resolve('./routes/lwn/alerts')));

// 英雄联盟
router.get('/lol/newsindex/:type', lazyloadRouteHandler(require.resolve('./routes/lol/newsindex')));

// 掌上英雄联盟
router.get('/lolapp/recommend', lazyloadRouteHandler(require.resolve('./routes/lolapp/recommend')));
router.get('/lolapp/article/:uuid', lazyloadRouteHandler(require.resolve('./routes/lolapp/article')));

// 左岸读书
router.get('/zreading', lazyloadRouteHandler(require.resolve('./routes/zreading/home')));

// NBA
router.get('/nba/app_news', lazyloadRouteHandler(require.resolve('./routes/nba/app_news')));

// 天津产权交易中心
router.get('/tprtc/cqzr', lazyloadRouteHandler(require.resolve('./routes/tprtc/cqzr')));
router.get('/tprtc/qyzc', lazyloadRouteHandler(require.resolve('./routes/tprtc/qyzc')));
router.get('/tprtc/news', lazyloadRouteHandler(require.resolve('./routes/tprtc/news')));

// ArchDaily
router.get('/archdaily', lazyloadRouteHandler(require.resolve('./routes/archdaily/home')));

// aptonic Dropzone actions
router.get('/aptonic/action/:untested?', lazyloadRouteHandler(require.resolve('./routes/aptonic/action')));

// 印记中文周刊
router.get('/docschina/jsweekly', lazyloadRouteHandler(require.resolve('./routes/docschina/jsweekly')));

// im2maker
router.get('/im2maker/:channel?', lazyloadRouteHandler(require.resolve('./routes/im2maker/index')));

// 巨潮资讯
router.get('/cninfo/announcement/:column/:code/:orgId/:category?/:search?', lazyloadRouteHandler(require.resolve('./routes/cninfo/announcement')));

// 金十数据
router.get('/jinshi/index', lazyloadRouteHandler(require.resolve('./routes/jinshi/index')));

// 中央纪委国家监委网站
router.get('/ccdi/scdc', lazyloadRouteHandler(require.resolve('./routes/ccdi/scdc')));

// 中华人民共和国农业农村部
router.get('/gov/moa/sjzxfb', lazyloadRouteHandler(require.resolve('./routes/gov/moa/sjzxfb')));
router.get('/gov/moa/:suburl(.*)', lazyloadRouteHandler(require.resolve('./routes/gov/moa/moa')));

// 香水时代
router.get('/nosetime/:id/:type/:sort?', lazyloadRouteHandler(require.resolve('./routes/nosetime/comment')));
router.get('/nosetime/home', lazyloadRouteHandler(require.resolve('./routes/nosetime/home')));

// 涂鸦王国
router.get('/gracg/:user/:love?', lazyloadRouteHandler(require.resolve('./routes/gracg/user')));

// 大侠阿木
router.get('/daxiaamu/home', lazyloadRouteHandler(require.resolve('./routes/daxiaamu/home')));

// 美团技术团队
router.get('/meituan/tech/home', lazyloadRouteHandler(require.resolve('./routes//meituan/tech/home')));

// 码农网
router.get('/codeceo/home', lazyloadRouteHandler(require.resolve('./routes/codeceo/home')));
router.get('/codeceo/:type/:category?', lazyloadRouteHandler(require.resolve('./routes/codeceo/category')));

// BOF
router.get('/bof/home', lazyloadRouteHandler(require.resolve('./routes/bof/home')));

// 爱发电
router.get('/afdian/explore/:type?/:category?', lazyloadRouteHandler(require.resolve('./routes/afdian/explore')));
router.get('/afdian/dynamic/:uid', lazyloadRouteHandler(require.resolve('./routes/afdian/dynamic')));

// Simons Foundation
router.get('/simonsfoundation/articles', lazyloadRouteHandler(require.resolve('./routes/simonsfoundation/articles')));
router.get('/simonsfoundation/recommend', lazyloadRouteHandler(require.resolve('./routes/simonsfoundation/recommend')));

// 王者荣耀
// router.get('/tencent/pvp/newsindex/:type', lazyloadRouteHandler(require.resolve('./routes/tencent/pvp/newsindex')));

// 《明日方舟》游戏 (migrated to v2)
// router.get('/arknights/news', lazyloadRouteHandler(require.resolve('./routes/arknights/news')));
// アークナイツ(明日方舟日服) (migrated to v2)
// router.get('/arknights/japan', lazyloadRouteHandler(require.resolve('./routes/arknights/japan')));
// 塞壬唱片
router.get('/siren/news', lazyloadRouteHandler(require.resolve('./routes/siren/index')));

// ff14 migrated to v2
// router.get('/ff14/ff14_zh/:type', lazyloadRouteHandler(require.resolve('./routes/ff14/ff14_zh')));
// router.get('/ff14/ff14_global/:lang/:type', lazyloadRouteHandler(require.resolve('./routes/ff14/ff14_global')));

// 学堂在线
router.get('/xuetangx/course/:cid/:type', lazyloadRouteHandler(require.resolve('./routes/xuetangx/course_info')));
router.get('/xuetangx/course/list/:mode/:credential/:status/:type?', lazyloadRouteHandler(require.resolve('./routes/xuetangx/course_list')));

// wikihow
router.get('/wikihow/index', lazyloadRouteHandler(require.resolve('./routes/wikihow/index.js')));
router.get('/wikihow/category/:category/:type', lazyloadRouteHandler(require.resolve('./routes/wikihow/category.js')));

// 正版中国
router.get('/getitfree/category/:category?', lazyloadRouteHandler(require.resolve('./routes/getitfree/category.js')));
router.get('/getitfree/search/:keyword?', lazyloadRouteHandler(require.resolve('./routes/getitfree/search.js')));

// 万联网
router.get('/10000link/news/:category?', lazyloadRouteHandler(require.resolve('./routes/10000link/news')));

// 站酷
router.get('/zcool/discover/:query?/:subCate?/:hasVideo?/:city?/:collage?/:recommendLevel?/:sort?', lazyloadRouteHandler(require.resolve('./routes/zcool/discover')));
router.get('/zcool/recommend/:query?/:subCate?/:hasVideo?/:city?/:collage?/:recommendLevel?/:sort?', lazyloadRouteHandler(require.resolve('./routes/zcool/discover'))); // 兼容老版本
router.get('/zcool/top/:type', lazyloadRouteHandler(require.resolve('./routes/zcool/top')));
router.get('/zcool/top', lazyloadRouteHandler(require.resolve('./routes/zcool/top'))); // 兼容老版本
router.get('/zcool/user/:uid', lazyloadRouteHandler(require.resolve('./routes/zcool/user')));

// 第一财经
// router.get('/yicai/brief', lazyloadRouteHandler(require.resolve('./routes/yicai/brief.js')));

// 一兜糖
router.get('/yidoutang/index', lazyloadRouteHandler(require.resolve('./routes/yidoutang/index.js')));
router.get('/yidoutang/guide', lazyloadRouteHandler(require.resolve('./routes/yidoutang/guide.js')));
router.get('/yidoutang/mtest', lazyloadRouteHandler(require.resolve('./routes/yidoutang/mtest.js')));
router.get('/yidoutang/case/:type', lazyloadRouteHandler(require.resolve('./routes/yidoutang/case.js')));

// 开眼
router.get('/kaiyan/index', lazyloadRouteHandler(require.resolve('./routes/kaiyan/index')));

// 龙空
// router.get('/lkong/forum/:id/:digest?', lazyloadRouteHandler(require.resolve('./routes/lkong/forum')));
// router.get('/lkong/thread/:id', lazyloadRouteHandler(require.resolve('./routes/lkong/thread')));
// router.get('/lkong/user/:id', lazyloadRouteHandler(require.resolve('./routes/lkong/user')));

// 坂道系列资讯
// 坂道系列官网新闻
router.get('/keyakizaka46/news', lazyloadRouteHandler(require.resolve('./routes/keyakizaka46/news')));
router.get('/hinatazaka46/news', lazyloadRouteHandler(require.resolve('./routes/hinatazaka46/news')));
router.get('/keyakizaka46/blog', lazyloadRouteHandler(require.resolve('./routes/keyakizaka46/blog')));
router.get('/hinatazaka46/blog', lazyloadRouteHandler(require.resolve('./routes/hinatazaka46/blog')));
// router.get('/sakurazaka46/blog', lazyloadRouteHandler(require.resolve('./routes/sakurazaka46/blog')));

// 酷安
router.get('/coolapk/tuwen/:type?', lazyloadRouteHandler(require.resolve('./routes/coolapk/tuwen')));
router.get('/coolapk/tuwen-xinxian', lazyloadRouteHandler(require.resolve('./routes/coolapk/tuwen')));
router.get('/coolapk/toutiao/:type?', lazyloadRouteHandler(require.resolve('./routes/coolapk/toutiao')));
router.get('/coolapk/huati/:tag', lazyloadRouteHandler(require.resolve('./routes/coolapk/huati')));
router.get('/coolapk/user/:uid/dynamic', lazyloadRouteHandler(require.resolve('./routes/coolapk/userDynamic')));
router.get('/coolapk/dyh/:dyhId', lazyloadRouteHandler(require.resolve('./routes/coolapk/dyh')));
router.get('/coolapk/hot/:type?/:period?', lazyloadRouteHandler(require.resolve('./routes/coolapk/hot')));

// 模型网
router.get('/moxingnet', lazyloadRouteHandler(require.resolve('./routes/moxingnet')));

// 湖北大学
router.get('/hubu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/hubu/news')));

// 大连海事大学
router.get('/dlmu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/dlmu/news')));
router.get('/dlmu/grs/zsgz/:type', lazyloadRouteHandler(require.resolve('./routes/universities/dlmu/grs/zsgz')));

// Rockstar Games Social Club
router.get('/socialclub/events/:game?', lazyloadRouteHandler(require.resolve('./routes/socialclub/events')));

// CTFHub Event Calendar
router.get('/ctfhub/upcoming/:limit?', lazyloadRouteHandler(require.resolve('./routes/ctfhub/upcoming')));
router.get('/ctfhub/search/:limit?/:form?/:class?/:title?', lazyloadRouteHandler(require.resolve('./routes/ctfhub/search')));

// 阿里云 migrated to v2
// router.get('/aliyun/database_month', lazyloadRouteHandler(require.resolve('./routes/aliyun/database_month')));
// router.get('/aliyun/notice/:type?', lazyloadRouteHandler(require.resolve('./routes/aliyun/notice')));
// router.get('/aliyun/developer/group/:type', lazyloadRouteHandler(require.resolve('./routes/aliyun/developer/group')));

// 礼物说
router.get('/liwushuo/index', lazyloadRouteHandler(require.resolve('./routes/liwushuo/index.js')));

// 故事fm
router.get('/storyfm/index', lazyloadRouteHandler(require.resolve('./routes/storyfm/index.js')));

// 中国日报
router.get('/chinadaily/english/:category', lazyloadRouteHandler(require.resolve('./routes/chinadaily/english.js')));

// leboncoin
router.get('/leboncoin/ad/:query', lazyloadRouteHandler(require.resolve('./routes/leboncoin/ad.js')));

// DHL
router.get('/dhl/:id', lazyloadRouteHandler(require.resolve('./routes/dhl/shipment-tracking')));

// Japanpost
router.get('/japanpost/track/:reqCode/:locale?', lazyloadRouteHandler(require.resolve('./routes/japanpost/track')));

// 中华人民共和国商务部 migrated to v2
// router.get('/mofcom/article/:suffix', lazyloadRouteHandler(require.resolve('./routes/mofcom/article')));

// 品玩
router.get('/pingwest/status', lazyloadRouteHandler(require.resolve('./routes/pingwest/status')));
router.get('/pingwest/tag/:tag/:type', lazyloadRouteHandler(require.resolve('./routes/pingwest/tag')));
router.get('/pingwest/user/:uid/:type?', lazyloadRouteHandler(require.resolve('./routes/pingwest/user')));

// Hanime
router.get('/hanime/video', lazyloadRouteHandler(require.resolve('./routes/hanime/video')));

// Soul
router.get('/soul/:id', lazyloadRouteHandler(require.resolve('./routes/soul')));
router.get('/soul/posts/hot/:pid*', lazyloadRouteHandler(require.resolve('./routes/soul/hot')));

// 单向空间
router.get('/owspace/read/:type?', lazyloadRouteHandler(require.resolve('./routes/owspace/read')));

// 天涯论坛
router.get('/tianya/index/:type', lazyloadRouteHandler(require.resolve('./routes/tianya/index')));
router.get('/tianya/user/:userid', lazyloadRouteHandler(require.resolve('./routes/tianya/user')));
router.get('/tianya/comments/:userid', lazyloadRouteHandler(require.resolve('./routes/tianya/comments')));

// eleme
router.get('/eleme/open/announce', lazyloadRouteHandler(require.resolve('./routes/eleme/open/announce')));
router.get('/eleme/open-be/announce', lazyloadRouteHandler(require.resolve('./routes/eleme/open-be/announce')));

// 美团开放平台
router.get('/meituan/open/announce', lazyloadRouteHandler(require.resolve('./routes/meituan/open/announce')));

// 微信开放社区
router.get('/wechat-open/community/:type', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/wechat-open/community/announce')));
// 微信支付 - 商户平台公告
router.get('/wechat-open/pay/announce', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/wechat-open/pay/announce')));
router.get('/wechat-open/community/:type/:category', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/wechat-open/community/question')));

// 微店
router.get('/weidian/goods/:id', lazyloadRouteHandler(require.resolve('./routes/weidian/goods')));

// 有赞
router.get('/youzan/goods/:id', lazyloadRouteHandler(require.resolve('./routes/youzan/goods')));

// 币世界快讯
router.get('/bishijie/kuaixun', lazyloadRouteHandler(require.resolve('./routes/bishijie/kuaixun')));

// 顺丰丰桥
router.get('/sf/sffq-announce', lazyloadRouteHandler(require.resolve('./routes/sf/sffq-announce')));

// 缺书网
router.get('/queshu/sale', lazyloadRouteHandler(require.resolve('./routes/queshu/sale')));
router.get('/queshu/book/:bookid', lazyloadRouteHandler(require.resolve('./routes/queshu/book')));

// MITRE
router.get('/mitre/publications', lazyloadRouteHandler(require.resolve('./routes/mitre/publications')));

// SANS
router.get('/sans/summit_archive', lazyloadRouteHandler(require.resolve('./routes/sans/summit_archive')));

// LaTeX 开源小屋
router.get('/latexstudio/home', lazyloadRouteHandler(require.resolve('./routes/latexstudio/home')));

// 上证债券信息网 - 可转换公司债券公告
router.get('/sse/convert/:query?', lazyloadRouteHandler(require.resolve('./routes/sse/convert')));
router.get('/sse/renewal', lazyloadRouteHandler(require.resolve('./routes/sse/renewal')));
router.get('/sse/inquire', lazyloadRouteHandler(require.resolve('./routes/sse/inquire')));

// 上海证券交易所
router.get('/sse/disclosure/:query?', lazyloadRouteHandler(require.resolve('./routes/sse/disclosure')));

// 深圳证券交易所
// router.get('/szse/notice', lazyloadRouteHandler(require.resolve('./routes/szse/notice')));
// router.get('/szse/inquire/:type', lazyloadRouteHandler(require.resolve('./routes/szse/inquire')));
// router.get('/szse/projectdynamic/:type?/:stage?/:status?', lazyloadRouteHandler(require.resolve('./routes/szse/projectdynamic')));

// 前端艺术家每日整理&&飞冰早报
router.get('/jskou/:type?', lazyloadRouteHandler(require.resolve('./routes/jskou/index')));

// 国家应急广播
router.get('/cneb/yjxx', lazyloadRouteHandler(require.resolve('./routes/cneb/yjxx')));
router.get('/cneb/guoneinews', lazyloadRouteHandler(require.resolve('./routes/cneb/guoneinews')));

// 邮箱
router.get('/mail/imap/:email', lazyloadRouteHandler(require.resolve('./routes/mail/imap')));

// 好队友
router.get('/network360/jobs', lazyloadRouteHandler(require.resolve('./routes/network360/jobs')));

// 智联招聘
router.get('/zhilian/:city/:keyword', lazyloadRouteHandler(require.resolve('./routes/zhilian/index')));

// 电鸭社区
router.get('/eleduck/jobs', lazyloadRouteHandler(require.resolve('./routes/eleduck/jobs')));

// 北华航天工业学院 - 新闻
router.get('/nciae/news', lazyloadRouteHandler(require.resolve('./routes/universities/nciae/news')));

// 北华航天工业学院 - 通知公告
router.get('/nciae/tzgg', lazyloadRouteHandler(require.resolve('./routes/universities/nciae/tzgg')));

// 北华航天工业学院 - 学术信息
router.get('/nciae/xsxx', lazyloadRouteHandler(require.resolve('./routes/universities/nciae/xsxx')));

// cfan
router.get('/cfan/news', lazyloadRouteHandler(require.resolve('./routes/cfan/news')));

// 腾讯企鹅号
router.get('/tencent/news/author/:mid', lazyloadRouteHandler(require.resolve('./routes/tencent/news/author')));

// 奈菲影视
router.get('/nfmovies/:id?', lazyloadRouteHandler(require.resolve('./routes/nfmovies/index')));

// 书友社区
router.get('/andyt/:view?', lazyloadRouteHandler(require.resolve('./routes/andyt/index')));

// 品途商业评论
router.get('/pintu360/:type?', lazyloadRouteHandler(require.resolve('./routes/pintu360/index')));

// engadget中国版
router.get('/engadget-cn', lazyloadRouteHandler(require.resolve('./routes/engadget/home')));

// engadget
router.get('/engadget/:lang?', lazyloadRouteHandler(require.resolve('./routes/engadget/home')));

// 吹牛部落
router.get('/chuiniu/column/:id', lazyloadRouteHandler(require.resolve('./routes/chuiniu/column')));
router.get('/chuiniu/column_list', lazyloadRouteHandler(require.resolve('./routes/chuiniu/column_list')));

// leemeng
router.get('/leemeng', lazyloadRouteHandler(require.resolve('./routes/blogs/leemeng')));

// 中国地质大学（武汉）
router.get('/cug/graduate', lazyloadRouteHandler(require.resolve('./routes/universities/cug/graduate')));
router.get('/cug/undergraduate', lazyloadRouteHandler(require.resolve('./routes/universities/cug/undergraduate')));
router.get('/cug/xgxy', lazyloadRouteHandler(require.resolve('./routes/universities/cug/xgxy')));
router.get('/cug/news', lazyloadRouteHandler(require.resolve('./routes/universities/cug/news')));
router.get('/cug/gcxy/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/cug/gcxy/index')));

// 海猫吧
router.get('/haimaoba/:id?', lazyloadRouteHandler(require.resolve('./routes/haimaoba/comics')));

// 蒲公英
router.get('/pgyer/:app?', lazyloadRouteHandler(require.resolve('./routes/pgyer/app')));

// 微博个人时间线
router.get('/weibo/timeline/:uid/:feature?/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/weibo/timeline')));

// TAPTAP migrated to v2
// router.get('/taptap/topic/:id/:label?', lazyloadRouteHandler(require.resolve('./routes/taptap/topic')));
// router.get('/taptap/changelog/:id', lazyloadRouteHandler(require.resolve('./routes/taptap/changelog')));
// router.get('/taptap/review/:id/:order?/:lang?', lazyloadRouteHandler(require.resolve('./routes/taptap/review')));

// lofter migrated to v2
// router.get('/lofter/tag/:name?/:type?', lazyloadRouteHandler(require.resolve('./routes/lofter/tag')));
// router.get('/lofter/user/:name?', lazyloadRouteHandler(require.resolve('./routes/lofter/user')));

// 米坛社区表盘
router.get('/watchface/:watch_type?/:list_type?', lazyloadRouteHandler(require.resolve('./routes/watchface/update')));

// CNU视觉联盟
router.get('/cnu/selected', lazyloadRouteHandler(require.resolve('./routes/cnu/selected')));
router.get('/cnu/discovery/:type?/:category?', lazyloadRouteHandler(require.resolve('./routes/cnu/discovery')));

// 战旗直播
router.get('/zhanqi/room/:id', lazyloadRouteHandler(require.resolve('./routes/zhanqi/room')));

// 酒云网
router.get('/wineyun/:category', lazyloadRouteHandler(require.resolve('./routes/wineyun')));

// 小红书 migrated to v2
// router.get('/xiaohongshu/user/:user_id/:category', lazyloadRouteHandler(require.resolve('./routes/xiaohongshu/user')));
// router.get('/xiaohongshu/board/:board_id', lazyloadRouteHandler(require.resolve('./routes/xiaohongshu/board')));

// 每经网
// router.get('/nbd/daily', lazyloadRouteHandler(require.resolve('./routes/nbd/article')));
// router.get('/nbd/:id?', lazyloadRouteHandler(require.resolve('./routes/nbd/index')));

// 快知
router.get('/kzfeed/topic/:id', lazyloadRouteHandler(require.resolve('./routes/kzfeed/topic')));

// 腾讯新闻较真查证平台
router.get('/factcheck', lazyloadRouteHandler(require.resolve('./routes/tencent/factcheck')));

// X-MOL化学资讯平台
router.get('/x-mol/news/:tag?', lazyloadRouteHandler(require.resolve('./routes/x-mol/news.js')));
router.get('/x-mol/paper/:type/:magazine', lazyloadRouteHandler(require.resolve('./routes/x-mol/paper')));

// 知识分子
router.get('/zhishifenzi/news/:type?', lazyloadRouteHandler(require.resolve('./routes/zhishifenzi/news')));
router.get('/zhishifenzi/depth', lazyloadRouteHandler(require.resolve('./routes/zhishifenzi/depth')));
router.get('/zhishifenzi/innovation/:type?', lazyloadRouteHandler(require.resolve('./routes/zhishifenzi/innovation')));

// 電撃Online
router.get('/dengekionline/:type?', lazyloadRouteHandler(require.resolve('./routes/dengekionline/new')));

// 4Gamers
router.get('/4gamers/category/:category', lazyloadRouteHandler(require.resolve('./routes/4gamers/category')));
router.get('/4gamers/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/4gamers/tag')));
router.get('/4gamers/topic/:topic', lazyloadRouteHandler(require.resolve('./routes/4gamers/topic')));

// 大麦网
router.get('/damai/activity/:city/:category/:subcategory/:keyword?', lazyloadRouteHandler(require.resolve('./routes/damai/activity')));

// 桂林电子科技大学新闻资讯
router.get('/guet/xwzx/:type?', lazyloadRouteHandler(require.resolve('./routes/guet/news')));

// はてな匿名ダイアリー
router.get('/hatena/anonymous_diary/archive', lazyloadRouteHandler(require.resolve('./routes/hatena/anonymous_diary/archive')));

// kaggle
router.get('/kaggle/discussion/:forumId/:sort?', lazyloadRouteHandler(require.resolve('./routes/kaggle/discussion')));
router.get('/kaggle/competitions/:category?', lazyloadRouteHandler(require.resolve('./routes/kaggle/competitions')));
router.get('/kaggle/user/:user', lazyloadRouteHandler(require.resolve('./routes/kaggle/user')));

// PubMed Trending
// router.get('/pubmed/trending', lazyloadRouteHandler(require.resolve('./routes/pubmed/trending')));

// 领科 (linkresearcher.com)
router.get('/linkresearcher/:params', lazyloadRouteHandler(require.resolve('./routes/linkresearcher/index')));

// eLife [Sci Journal]
router.get('/elife/:tid', lazyloadRouteHandler(require.resolve('./routes/elife/index')));

// IEEE Xplore [Sci Journal]
router.get('/ieee/author/:aid/:sortType/:count?', lazyloadRouteHandler(require.resolve('./routes/ieee/author')));

// PNAS [Sci Journal]
router.get('/pnas/:topic?', lazyloadRouteHandler(require.resolve('./routes/pnas/index')));

// cell [Sci Journal]
router.get('/cell/cell/:category', lazyloadRouteHandler(require.resolve('./routes/cell/cell/index')));
router.get('/cell/cover', lazyloadRouteHandler(require.resolve('./routes/cell/cover')));

// nature + nature 子刊 [Sci Journal] migrated to v2
// router.get('/nature/research/:journal?', lazyloadRouteHandler(require.resolve('./routes/nature/research')));
// router.get('/nature/news-and-comment/:journal?', lazyloadRouteHandler(require.resolve('./routes/nature/news-and-comment')));
// router.get('/nature/cover', lazyloadRouteHandler(require.resolve('./routes/nature/cover')));
// router.get('/nature/news', lazyloadRouteHandler(require.resolve('./routes/nature/news')));
// router.get('/nature/highlight/:year?', lazyloadRouteHandler(require.resolve('./routes/nature/highlight')));

// science [Sci Journal]
router.get('/sciencemag/current/:journal?', lazyloadRouteHandler(require.resolve('./routes/sciencemag/current')));
router.get('/sciencemag/cover', lazyloadRouteHandler(require.resolve('./routes/sciencemag/cover')));
router.get('/sciencemag/early/science', lazyloadRouteHandler(require.resolve('./routes/sciencemag/early')));

// dlsite
router.get('/dlsite/new/:type', lazyloadRouteHandler(require.resolve('./routes/dlsite/new')));
router.get('/dlsite/campaign/:type/:free?', lazyloadRouteHandler(require.resolve('./routes/dlsite/campaign')));

// mcbbs
router.get('/mcbbs/forum/:type', lazyloadRouteHandler(require.resolve('./routes/mcbbs/forum')));
router.get('/mcbbs/post/:tid/:authorid?', lazyloadRouteHandler(require.resolve('./routes/mcbbs/post')));

// Pocket
router.get('/pocket/trending', lazyloadRouteHandler(require.resolve('./routes/pocket/trending')));

// HK01
// router.get('/hk01/zone/:id', lazyloadRouteHandler(require.resolve('./routes/hk01/zone')));
// router.get('/hk01/channel/:id', lazyloadRouteHandler(require.resolve('./routes/hk01/channel')));
// router.get('/hk01/issue/:id', lazyloadRouteHandler(require.resolve('./routes/hk01/issue')));
// router.get('/hk01/tag/:id', lazyloadRouteHandler(require.resolve('./routes/hk01/tag')));
// router.get('/hk01/hot', lazyloadRouteHandler(require.resolve('./routes/hk01/hot')));

// 码农周刊
router.get('/manong-weekly', lazyloadRouteHandler(require.resolve('./routes/manong-weekly/issues')));

// 每日猪价
router.get('/pork-price', lazyloadRouteHandler(require.resolve('./routes/pork-price')));

// NOI 全国青少年信息学奥林匹克竞赛
router.get('/noi', lazyloadRouteHandler(require.resolve('./routes/noi')));
router.get('/noi/winners-list', lazyloadRouteHandler(require.resolve('./routes/noi/winners-list')));
router.get('/noi/province-news', lazyloadRouteHandler(require.resolve('./routes/noi/province-news')));
router.get('/noi/rg-news', lazyloadRouteHandler(require.resolve('./routes/noi/rg-news')));

// 中国国家认证认可监管管理员会
router.get('/gov/cnca/jgdt', lazyloadRouteHandler(require.resolve('./routes/gov/cnca/jgdt')));
router.get('/gov/cnca/hydt', lazyloadRouteHandler(require.resolve('./routes/gov/cnca/hydt')));

router.get('/gov/cnca/zxtz', lazyloadRouteHandler(require.resolve('./routes/gov/cnca/zxtz')));

// clickme
router.get('/clickme/:site/:grouping/:name', lazyloadRouteHandler(require.resolve('./routes/clickme')));

// 文汇报
router.get('/whb/:category', lazyloadRouteHandler(require.resolve('./routes/whb/zhuzhan')));

// 三界异次元
router.get('/3ycy/home', lazyloadRouteHandler(require.resolve('./routes/3ycy/home.js')));

// Emi Nitta official website
router.get('/emi-nitta/:type', lazyloadRouteHandler(require.resolve('./routes/emi-nitta/home')));

// Alter China
router.get('/alter-cn/news', lazyloadRouteHandler(require.resolve('./routes/alter-cn/news')));

// Visual Studio Code Marketplace
router.get('/vscode/marketplace/:type?', lazyloadRouteHandler(require.resolve('./routes/vscode/marketplace')));

// 饭否
router.get('/fanfou/user_timeline/:uid', lazyloadRouteHandler(require.resolve('./routes/fanfou/user_timeline')));
router.get('/fanfou/home_timeline', lazyloadRouteHandler(require.resolve('./routes/fanfou/home_timeline')));
router.get('/fanfou/favorites/:uid', lazyloadRouteHandler(require.resolve('./routes/fanfou/favorites')));
router.get('/fanfou/trends', lazyloadRouteHandler(require.resolve('./routes/fanfou/trends')));
router.get('/fanfou/public_timeline/:keyword', lazyloadRouteHandler(require.resolve('./routes/fanfou/public_timeline')));

// ITSlide
router.get('/itslide/new', lazyloadRouteHandler(require.resolve('./routes/itslide/new')));

// Remote Work
router.get('/remote-work/:caty?', lazyloadRouteHandler(require.resolve('./routes/remote-work/index')));

// China Times
router.get('/chinatimes/:caty', lazyloadRouteHandler(require.resolve('./routes/chinatimes/index')));

// TransferWise
router.get('/transferwise/pair/:source/:target', lazyloadRouteHandler(require.resolve('./routes/transferwise/pair')));

// chocolatey
router.get('/chocolatey/software/:name?', lazyloadRouteHandler(require.resolve('./routes/chocolatey/software')));

// Nyaa migrated to v2
// router.get('/nyaa/search/:query?', lazyloadRouteHandler(require.resolve('./routes/nyaa/search')));

// 片源网 migrated to v2
// router.get('/pianyuan/index/:media?', lazyloadRouteHandler(require.resolve('./routes/pianyuan/app')));
// router.get('/pianyuan/indexers/pianyuan/results/search/api', lazyloadRouteHandler(require.resolve('./routes/pianyuan/search')));

// 巴哈姆特
router.get('/bahamut/creation/:author/:category?', lazyloadRouteHandler(require.resolve('./routes/bahamut/creation')));
router.get('/bahamut/creation_index/:category?/:subcategory?/:type?', lazyloadRouteHandler(require.resolve('./routes/bahamut/creation_index')));

// CentBrowser
router.get('/centbrowser/history', lazyloadRouteHandler(require.resolve('./routes/centbrowser/history')));

// 755
router.get('/755/user/:username', lazyloadRouteHandler(require.resolve('./routes/755/user')));

// IKEA
router.get('/ikea/uk/new', lazyloadRouteHandler(require.resolve('./routes/ikea/uk/new')));
router.get('/ikea/uk/offer', lazyloadRouteHandler(require.resolve('./routes/ikea/uk/offer')));

// Mastodon
router.get('/mastodon/timeline/:site/:only_media?', lazyloadRouteHandler(require.resolve('./routes/mastodon/timeline_local')));
router.get('/mastodon/remote/:site/:only_media?', lazyloadRouteHandler(require.resolve('./routes/mastodon/timeline_remote')));
router.get('/mastodon/account_id/:site/:account_id/statuses/:only_media?', lazyloadRouteHandler(require.resolve('./routes/mastodon/account_id')));
router.get('/mastodon/acct/:acct/statuses/:only_media?', lazyloadRouteHandler(require.resolve('./routes/mastodon/acct')));

// Kernel Aliyun
router.get('/aliyun-kernel/index', lazyloadRouteHandler(require.resolve('./routes/aliyun-kernel/index')));

// Vulture
router.get('/vulture/:tag/:excludetags?', lazyloadRouteHandler(require.resolve('./routes/vulture/index')));

// xinwenlianbo
router.get('/xinwenlianbo/index', lazyloadRouteHandler(require.resolve('./routes/xinwenlianbo/index')));

// Paul Graham - Essays
router.get('/blogs/paulgraham', lazyloadRouteHandler(require.resolve('./routes/blogs/paulgraham')));

// invisionapp
router.get('/invisionapp/inside-design', lazyloadRouteHandler(require.resolve('./routes/invisionapp/inside-design')));

// mlog.club
router.get('/mlog-club/topics/:node', lazyloadRouteHandler(require.resolve('./routes/mlog-club/topics')));
router.get('/mlog-club/projects', lazyloadRouteHandler(require.resolve('./routes/mlog-club/projects')));

// Chrome 网上应用店
router.get('/chrome/webstore/extensions/:id', lazyloadRouteHandler(require.resolve('./routes/chrome/extensions')));

// RTHK
router.get('/rthk-news/:lang/:category', lazyloadRouteHandler(require.resolve('./routes/rthk-news/index')));

// yahoo
router.get('/yahoo-news/:region/:category?', lazyloadRouteHandler(require.resolve('./routes/yahoo-news/index')));

// Yahoo!テレビ
router.get('/yahoo-jp-tv/:query', lazyloadRouteHandler(require.resolve('./routes/yahoo-jp-tv/index')));

// Yahoo! by Author
router.get('/yahoo-author/:author', lazyloadRouteHandler(require.resolve('./routes/yahoo-author/index')));

// 白鲸出海
// router.get('/baijing', lazyloadRouteHandler(require.resolve('./routes/baijing')));

// 低端影视
router.get('/ddrk/update/:name/:season?', lazyloadRouteHandler(require.resolve('./routes/ddrk/index')));
router.get('/ddrk/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/ddrk/list')));
router.get('/ddrk/category/:category', lazyloadRouteHandler(require.resolve('./routes/ddrk/list')));
router.get('/ddrk/index', lazyloadRouteHandler(require.resolve('./routes/ddrk/list')));

// avgle
router.get('/avgle/videos/:order?/:time?/:top?', lazyloadRouteHandler(require.resolve('./routes/avgle/videos.js')));
router.get('/avgle/search/:keyword/:order?/:time?/:top?', lazyloadRouteHandler(require.resolve('./routes/avgle/videos.js')));

// 公主链接公告
router.get('/pcr/news', lazyloadRouteHandler(require.resolve('./routes/pcr/news')));
router.get('/pcr/news-tw', lazyloadRouteHandler(require.resolve('./routes/pcr/news-tw')));
router.get('/pcr/news-cn', lazyloadRouteHandler(require.resolve('./routes/pcr/news-cn')));

// project-zero issues
router.get('/project-zero-issues', lazyloadRouteHandler(require.resolve('./routes/project-zero-issues/index')));

// 平安银河实验室
router.get('/galaxylab', lazyloadRouteHandler(require.resolve('./routes/galaxylab/index')));

// NOSEC 安全讯息平台
router.get('/nosec/:keykind?', lazyloadRouteHandler(require.resolve('./routes/nosec/index')));

// Hex-Rays News migrated to v2
// router.get('/hex-rays/news', lazyloadRouteHandler(require.resolve('./routes/hex-rays/index')));

// 新趣集
router.get('/xinquji/today', lazyloadRouteHandler(require.resolve('./routes/xinquji/today')));
router.get('/xinquji/today/internal', lazyloadRouteHandler(require.resolve('./routes/xinquji/internal')));

// 英中协会
router.get('/gbcc/trust', lazyloadRouteHandler(require.resolve('./routes/gbcc/trust')));

// Associated Press
// router.get('/apnews/topics/:topic', lazyloadRouteHandler(require.resolve('./routes/apnews/topics')));

// CBC
router.get('/cbc/topics/:topic?', lazyloadRouteHandler(require.resolve('./routes/cbc/topics')));

// discuz
router.get('/discuz/:ver([7|x])/:cid([0-9]{2})/:link(.*)', lazyloadRouteHandler(require.resolve('./routes/discuz/discuz')));
router.get('/discuz/:ver([7|x])/:link(.*)', lazyloadRouteHandler(require.resolve('./routes/discuz/discuz')));
router.get('/discuz/:link(.*)', lazyloadRouteHandler(require.resolve('./routes/discuz/discuz')));

// China Dialogue 中外对话
router.get('/chinadialogue/topics/:topic', lazyloadRouteHandler(require.resolve('./routes/chinadialogue/topics')));
router.get('/chinadialogue/:column', lazyloadRouteHandler(require.resolve('./routes/chinadialogue/column')));

// 人民日报社 国际金融报
router.get('/ifnews/:cid', lazyloadRouteHandler(require.resolve('./routes/ifnews/column')));

// Scala Blog
router.get('/scala/blog/:part?', lazyloadRouteHandler(require.resolve('./routes/scala-blog/scala-blog')));

// Minecraft Java版游戏更新
router.get('/minecraft/version', lazyloadRouteHandler(require.resolve('./routes/minecraft/version')));

// 微信更新日志
router.get('/weixin/miniprogram/release', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/miniprogram/framework'))); // 基础库更新日志
router.get('/weixin/miniprogram/framework', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/miniprogram/framework'))); // 基础库更新日志
router.get('/weixin/miniprogram/devtools', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/miniprogram/devtools'))); // 开发者工具更新日志
router.get('/weixin/miniprogram/wxcloud/:caty?', lazyloadRouteHandler(require.resolve('./routes/tencent/wechat/miniprogram/wxcloud'))); // 云开发更新日志

// 新冠肺炎疫情动态
router.get('/coronavirus/caixin', lazyloadRouteHandler(require.resolve('./routes/coronavirus/caixin')));
router.get('/coronavirus/dxy/data/:province?/:city?', lazyloadRouteHandler(require.resolve('./routes/coronavirus/dxy-data')));
router.get('/coronavirus/dxy', lazyloadRouteHandler(require.resolve('./routes/coronavirus/dxy')));
router.get('/coronavirus/scmp', lazyloadRouteHandler(require.resolve('./routes/coronavirus/scmp')));
router.get('/coronavirus/nhc', lazyloadRouteHandler(require.resolve('./routes/coronavirus/nhc')));
router.get('/coronavirus/mogov-2019ncov/:lang', lazyloadRouteHandler(require.resolve('./routes/coronavirus/mogov-2019ncov')));
router.get('/coronavirus/qq/fact', lazyloadRouteHandler(require.resolve('./routes/tencent/factcheck')));
router.get('/coronavirus/sg-moh', lazyloadRouteHandler(require.resolve('./routes/coronavirus/sg-moh')));
router.get('/coronavirus/yahoo-japan/:tdfk?', lazyloadRouteHandler(require.resolve('./routes/coronavirus/yahoo-japan')));

// 南京林业大学教务处
router.get('/njfu/jwc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/njfu/jwc')));

// 日本経済新聞
router.get('/nikkei/index', lazyloadRouteHandler(require.resolve('./routes/nikkei/index')));
router.get('/nikkei/:category/:article_type?', lazyloadRouteHandler(require.resolve('./routes/nikkei/news')));

// MQube
router.get('/mqube/user/:user', lazyloadRouteHandler(require.resolve('./routes/mqube/user')));
router.get('/mqube/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/mqube/tag')));
router.get('/mqube/latest', lazyloadRouteHandler(require.resolve('./routes/mqube/latest')));
router.get('/mqube/top', lazyloadRouteHandler(require.resolve('./routes/mqube/top')));

// Letterboxd
router.get('/letterboxd/user/diary/:username', lazyloadRouteHandler(require.resolve('./routes/letterboxd/userdiary')));
router.get('/letterboxd/user/followingdiary/:username', lazyloadRouteHandler(require.resolve('./routes/letterboxd/followingdiary')));

// javlibrary
// router.get('/javlibrary/users/:uid/:utype', lazyloadRouteHandler(require.resolve('./routes/javlibrary/users')));
// router.get('/javlibrary/videos/:vtype', lazyloadRouteHandler(require.resolve('./routes/javlibrary/videos')));
// router.get('/javlibrary/stars/:sid', lazyloadRouteHandler(require.resolve('./routes/javlibrary/stars')));
// router.get('/javlibrary/bestreviews', lazyloadRouteHandler(require.resolve('./routes/javlibrary/bestreviews')));

// Last.FM
router.get('/lastfm/recent/:user', lazyloadRouteHandler(require.resolve('./routes/lastfm/recent')));
router.get('/lastfm/loved/:user', lazyloadRouteHandler(require.resolve('./routes/lastfm/loved')));
router.get('/lastfm/top/:country?', lazyloadRouteHandler(require.resolve('./routes/lastfm/top')));

// piapro
router.get('/piapro/user/:pid', lazyloadRouteHandler(require.resolve('./routes/piapro/user')));
router.get('/piapro/public/:type/:tag?/:category?', lazyloadRouteHandler(require.resolve('./routes/piapro/public')));

// 凤凰网 migrated to v2
// router.get('/ifeng/feng/:id/:type', lazyloadRouteHandler(require.resolve('./routes/ifeng/feng')));

// 第一版主
router.get('/novel/d1bz/:category/:id', lazyloadRouteHandler(require.resolve('./routes/d1bz/novel')));

// 爱下电子书
router.get('/axdzs/:novel', lazyloadRouteHandler(require.resolve('./routes/novel/axdzs')));
// deprecated
router.get('/axdzs/:id1/:id2', lazyloadRouteHandler(require.resolve('./routes/novel/axdzs')));

// HackerOne
router.get('/hackerone/hacktivity', lazyloadRouteHandler(require.resolve('./routes/hackerone/hacktivity')));
router.get('/hackerone/search/:search', lazyloadRouteHandler(require.resolve('./routes/hackerone/search')));

// 奶牛关
router.get('/cowlevel/element/:id', lazyloadRouteHandler(require.resolve('./routes/cowlevel/element')));

// 2048
// router.get('/2048/bbs/:fid', lazyloadRouteHandler(require.resolve('./routes/2048/bbs')));

// Google News
// router.get('/google/news/:category/:locale', lazyloadRouteHandler(require.resolve('./routes/google/news')));

// 虛詞
router.get('/p-articles/section/:section', lazyloadRouteHandler(require.resolve('./routes/p-articles/section')));
router.get('/p-articles/contributors/:author', lazyloadRouteHandler(require.resolve('./routes/p-articles/contributors')));

// finviz

router.get('/finviz/news/:ticker', lazyloadRouteHandler(require.resolve('./routes/finviz/news')));

// 好好住
router.get('/haohaozhu/whole-house/:keyword?', lazyloadRouteHandler(require.resolve('./routes/haohaozhu/whole-house')));
router.get('/haohaozhu/discover/:keyword?', lazyloadRouteHandler(require.resolve('./routes/haohaozhu/discover')));

// 东北大学
// router.get('/neu/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/neu/news')));

// 快递100
router.get('/kuaidi100/track/:number/:id/:phone?', lazyloadRouteHandler(require.resolve('./routes/kuaidi100/index')));
router.get('/kuaidi100/company', lazyloadRouteHandler(require.resolve('./routes/kuaidi100/supported_company')));

// 稻草人书屋
router.get('/dcrsw/:name/:count?', lazyloadRouteHandler(require.resolve('./routes/novel/dcrsw')));

// 魔法纪录
router.get('/magireco/announcements', lazyloadRouteHandler(require.resolve('./routes/magireco/announcements')));
router.get('/magireco/event_banner', lazyloadRouteHandler(require.resolve('./routes/magireco/event_banner')));

// wolley
router.get('/wolley', lazyloadRouteHandler(require.resolve('./routes/wolley/index')));
router.get('/wolley/user/:id', lazyloadRouteHandler(require.resolve('./routes/wolley/user')));
router.get('/wolley/host/:host', lazyloadRouteHandler(require.resolve('./routes/wolley/host')));

// 西安交大
// router.get('/xjtu/gs/tzgg', lazyloadRouteHandler(require.resolve('./routes/universities/xjtu/gs/tzgg')));
// router.get('/xjtu/dean/:subpath+', lazyloadRouteHandler(require.resolve('./routes/universities/xjtu/dean')));
// router.get('/xjtu/international/:subpath+', lazyloadRouteHandler(require.resolve('./routes/universities/xjtu/international')));
// router.get('/xjtu/job/:subpath?', lazyloadRouteHandler(require.resolve('./routes/universities/xjtu/job')));
// router.get('/xjtu/ee/:id?', lazyloadRouteHandler(require.resolve('./routes/universities/xjtu/ee')));

// booksource
router.get('/booksource', lazyloadRouteHandler(require.resolve('./routes/booksource/index')));

// ku
router.get('/ku/:name?', lazyloadRouteHandler(require.resolve('./routes/ku/index')));

// 我有一片芝麻地
router.get('/blogs/hedwig/:type', lazyloadRouteHandler(require.resolve('./routes/blogs/hedwig')));

// LoveHeaven
router.get('/loveheaven/update/:slug', lazyloadRouteHandler(require.resolve('./routes/loveheaven/update')));

// 拉勾
router.get('/lagou/jobs/:position/:city', lazyloadRouteHandler(require.resolve('./routes/lagou/jobs')));

// 扬州大学
router.get('/yzu/home/:type', lazyloadRouteHandler(require.resolve('./routes/universities/yzu/home')));
router.get('/yzu/yjszs/:type', lazyloadRouteHandler(require.resolve('./routes/universities/yzu/yjszs')));

// 德国新闻社卫健新闻
router.get('/krankenkassen', lazyloadRouteHandler(require.resolve('./routes/krankenkassen')));

// 桂林航天工业学院
router.get('/guat/news/:type?', lazyloadRouteHandler(require.resolve('./routes/guat/news')));

// NEEA
// router.get('/neea/:type', lazyloadRouteHandler(require.resolve('./routes/neea')));

// 中国农业大学
router.get('/cauyjs', lazyloadRouteHandler(require.resolve('./routes/universities/cauyjs/cauyjs')));

// 南方科技大学
router.get('/sustyjs', lazyloadRouteHandler(require.resolve('./routes/universities/sustyjs/sustyjs')));
router.get('/sustech/newshub-zh', lazyloadRouteHandler(require.resolve('./routes/universities/sustech/newshub-zh')));
router.get('/sustech/bidding', lazyloadRouteHandler(require.resolve('./routes/universities/sustech/bidding')));

// 广州航海学院
router.get('/gzmtu/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/gzmtu/jwc')));
router.get('/gzmtu/tsg', lazyloadRouteHandler(require.resolve('./routes/universities/gzmtu/tsg')));

// 广州大学
router.get('/gzyjs', lazyloadRouteHandler(require.resolve('./routes/universities/gzyjs/gzyjs')));

// 暨南大学
router.get('/jnu/xysx/:type', lazyloadRouteHandler(require.resolve('./routes/universities/jnu/xysx/index')));
router.get('/jnu/yw/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/jnu/yw/index')));

// 深圳大学
router.get('/szuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/szuyjs/szuyjs')));

// 中国传媒大学
router.get('/cucyjs', lazyloadRouteHandler(require.resolve('./routes/universities/cucyjs/cucyjs')));

// 中国农业大学信电学院
router.get('/cauele', lazyloadRouteHandler(require.resolve('./routes/universities/cauyjs/cauyjs')));

// moxingfans
router.get('/moxingfans', lazyloadRouteHandler(require.resolve('./routes/moxingfans')));

// Chiphell
router.get('/chiphell/forum/:forumId?', lazyloadRouteHandler(require.resolve('./routes/chiphell/forum')));

// 华东理工大学研究生院
router.get('/ecustyjs', lazyloadRouteHandler(require.resolve('./routes/universities/ecustyjs/ecustyjs')));

// 同济大学研究生院
router.get('/tjuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/tjuyjs/tjuyjs')));

// 中国石油大学研究生院
router.get('/upcyjs', lazyloadRouteHandler(require.resolve('./routes/universities/upcyjs/upcyjs')));

// 中国海洋大学研究生院
router.get('/outyjs', lazyloadRouteHandler(require.resolve('./routes/universities/outyjs/outyjs')));

// 中科院人工智能所
router.get('/zkyai', lazyloadRouteHandler(require.resolve('./routes/universities/zkyai/zkyai')));

// 中科院自动化所
router.get('/zkyyjs', lazyloadRouteHandler(require.resolve('./routes/universities/zkyyjs/zkyyjs')));

// 中国海洋大学信电学院
router.get('/outele', lazyloadRouteHandler(require.resolve('./routes/universities/outele/outele')));

// 华东师范大学研究生院
router.get('/ecnuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/ecnuyjs/ecnuyjs')));

// 考研帮调剂信息
router.get('/kaoyan', lazyloadRouteHandler(require.resolve('./routes/kaoyan/kaoyan')));

// 华中科技大学研究生院
router.get('/hustyjs', lazyloadRouteHandler(require.resolve('./routes/universities/hustyjs/hustyjs')));

// 华中师范大学研究生院
router.get('/ccnuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/ccnu/ccnuyjs')));

// 华中师范大学计算机学院
router.get('/ccnucs', lazyloadRouteHandler(require.resolve('./routes/universities/ccnu/ccnucs')));

// 华中师范大学伍论贡学院
router.get('/ccnuwu', lazyloadRouteHandler(require.resolve('./routes/universities/ccnu/ccnuwu')));

// WEEX
router.get('/weexcn/news/:typeid', lazyloadRouteHandler(require.resolve('./routes/weexcn/index')));

// 天天基金 migrated to v2
// router.get('/eastmoney/ttjj/user/:uid', lazyloadRouteHandler(require.resolve('./routes/eastmoney/ttjj/user')));

// 紳士漫畫
router.get('/ssmh', lazyloadRouteHandler(require.resolve('./routes/ssmh')));
router.get('/ssmh/category/:cid', lazyloadRouteHandler(require.resolve('./routes/ssmh/category')));

// 华南师范大学研究生学院
router.get('/scnuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/scnu/scnuyjs')));

// 华南师范大学软件学院
router.get('/scnucs', lazyloadRouteHandler(require.resolve('./routes/universities/scnu/scnucs')));

// 华南理工大学研究生院
router.get('/scutyjs', lazyloadRouteHandler(require.resolve('./routes/universities/scut/scutyjs')));

// 华南农业大学研究生院通知公告
router.get('/scauyjs', lazyloadRouteHandler(require.resolve('./routes/universities/scauyjs/scauyjs')));

// 北京大学研究生招生网通知公告 migrated to v2
// router.get('/pkuyjs', lazyloadRouteHandler(require.resolve('./routes/universities/pku/pkuyjs')));

// 北京理工大学研究生通知公告
router.get('/bityjs', lazyloadRouteHandler(require.resolve('./routes/universities/bit/bityjs')));

// 湖南科技大学教务处
router.get('/hnust/jwc', lazyloadRouteHandler(require.resolve('./routes/universities/hnust/jwc/index')));
router.get('/hnust/computer', lazyloadRouteHandler(require.resolve('./routes/universities/hnust/computer/index')));
router.get('/hnust/art', lazyloadRouteHandler(require.resolve('./routes/universities/hnust/art/index')));
router.get('/hnust/chem', lazyloadRouteHandler(require.resolve('./routes/universities/hnust/chem/index')));
router.get('/hnust/graduate/:type?', lazyloadRouteHandler(require.resolve('./routes/universities/hnust/graduate/index')));

// 西南交通大学
router.get('/swjtu/tl/news', lazyloadRouteHandler(require.resolve('./routes/swjtu/tl/news')));

// AGE动漫
// router.get('/agefans/detail/:id', lazyloadRouteHandler(require.resolve('./routes/agefans/detail')));
// router.get('/agefans/update', lazyloadRouteHandler(require.resolve('./routes/agefans/update')));

// Checkra1n
router.get('/checkra1n/releases', lazyloadRouteHandler(require.resolve('./routes/checkra1n/releases')));

// 四川省科学技术厅
router.get('/sckjt/news/:type?', lazyloadRouteHandler(require.resolve('./routes/sckjt/news')));

// 绝对领域
router.get('/jdlingyu/:type', lazyloadRouteHandler(require.resolve('./routes/jdlingyu/index')));

// Hi, DIYgod
router.get('/blogs/diygod/animal-crossing', lazyloadRouteHandler(require.resolve('./routes/blogs/diygod/animal-crossing')));
router.get('/blogs/diygod/gk', lazyloadRouteHandler(require.resolve('./routes/blogs/diygod/gk')));

// 湖北工业大学
router.get('/hbut/news/:type', lazyloadRouteHandler(require.resolve('./routes/universities/hbut/news')));
router.get('/hbut/cs/:type', lazyloadRouteHandler(require.resolve('./routes/universities/hbut/cs')));

// acwifi
router.get('/acwifi', lazyloadRouteHandler(require.resolve('./routes/acwifi')));

// a岛匿名版
router.get('/adnmb/:pid', lazyloadRouteHandler(require.resolve('./routes/adnmb/index')));

// MIT科技评论
router.get('/mittrchina/:type', lazyloadRouteHandler(require.resolve('./routes/mittrchina')));

// iYouPort
router.get('/iyouport/article', lazyloadRouteHandler(require.resolve('./routes/iyouport')));
router.get('/iyouport/:category?', lazyloadRouteHandler(require.resolve('./routes/iyouport')));

// girlimg
router.get('/girlimg/album/:tag?/:mode?', lazyloadRouteHandler(require.resolve('./routes/girlimg/album')));

// etoland
router.get('/etoland/:bo_table', lazyloadRouteHandler(require.resolve('./routes/etoland/board')));

// 辽宁工程技术大学教务在线公告
router.get('/lntu/jwnews', lazyloadRouteHandler(require.resolve('./routes/universities/lntu/jwnews')));

// 51voa
router.get('/51voa/:channel', lazyloadRouteHandler(require.resolve('./routes/51voa/channel')));

// 追新番
router.get('/fanxinzhui', lazyloadRouteHandler(require.resolve('./routes/fanxinzhui/latest')));
router.get('/zhuixinfan/list', lazyloadRouteHandler(require.resolve('./routes/fanxinzhui/latest')));

// scoresaber
router.get('/scoresaber/user/:id', lazyloadRouteHandler(require.resolve('./routes/scoresaber/user')));

// blur-studio
router.get('/blur-studio', lazyloadRouteHandler(require.resolve('./routes/blur-studio/index')));

// method-studios
router.get('/method-studios/:menu?', lazyloadRouteHandler(require.resolve('./routes/method-studios/index')));

// blow-studio
router.get('/blow-studio', lazyloadRouteHandler(require.resolve('./routes/blow-studio/work')));

// axis-studios
router.get('/axis-studios/:type/:tag?', lazyloadRouteHandler(require.resolve('./routes/axis-studios/work')));

// 人民邮电出版社
router.get('/ptpress/book/:type?', lazyloadRouteHandler(require.resolve('./routes/ptpress/book')));

// uniqlo styling book
router.get('/uniqlo/stylingbook/:category?', lazyloadRouteHandler(require.resolve('./routes/uniqlo/stylingbook')));

// 本地宝焦点资讯
// router.get('/bendibao/news/:city', lazyloadRouteHandler(require.resolve('./routes/bendibao/news')));

// unit-image
router.get('/unit-image/films/:type?', lazyloadRouteHandler(require.resolve('./routes/unit-image/films')));

// digic-picture
router.get('/digic-pictures/:menu/:tags?', lazyloadRouteHandler(require.resolve('./routes/digic-pictures/index')));

// cve.mitre.org
router.get('/cve/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/cve/search')));

// Xposed Module Repository
router.get('/xposed/module/:mod', lazyloadRouteHandler(require.resolve('./routes/xposed/module')));

// Microsoft Edge
router.get('/edge/addon/:crxid', lazyloadRouteHandler(require.resolve('./routes/edge/addon')));

// Microsoft Store
router.get('/microsoft-store/updates/:productid/:market?', lazyloadRouteHandler(require.resolve('./routes/microsoft-store/updates')));

// 上海立信会计金融学院
router.get('/slu/tzgg/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/tzgg')));
router.get('/slu/jwc/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/jwc')));
router.get('/slu/tyyjkxy/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/tyyjkxy')));
router.get('/slu/kjxy/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/kjxy')));
router.get('/slu/xsc/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/xsc')));
router.get('/slu/csggxy/:id', lazyloadRouteHandler(require.resolve('./routes/universities/slu/csggxy')));

// Ruby China
router.get('/ruby-china/topics/:type?', lazyloadRouteHandler(require.resolve('./routes/ruby-china/topics')));
router.get('/ruby-china/jobs', lazyloadRouteHandler(require.resolve('./routes/ruby-china/jobs')));

// 中国人事考试网
router.get('/cpta/notice', lazyloadRouteHandler(require.resolve('./routes/cpta/notice')));

// 广告网
router.get('/adquan/:type?', lazyloadRouteHandler(require.resolve('./routes/adquan/index')));

// 齐鲁晚报
router.get('/qlwb/news', lazyloadRouteHandler(require.resolve('./routes/qlwb/news')));
router.get('/qlwb/city/:city', lazyloadRouteHandler(require.resolve('./routes/qlwb/city')));

// 蜻蜓FM
router.get('/qingting/channel/:id', lazyloadRouteHandler(require.resolve('./routes/qingting/channel')));

// 金色财经
router.get('/jinse/lives', lazyloadRouteHandler(require.resolve('./routes/jinse/lives')));
router.get('/jinse/timeline', lazyloadRouteHandler(require.resolve('./routes/jinse/timeline')));
router.get('/jinse/catalogue/:caty', lazyloadRouteHandler(require.resolve('./routes/jinse/catalogue')));

// deeplearning.ai
router.get('/deeplearningai/thebatch', lazyloadRouteHandler(require.resolve('./routes/deeplearningai/thebatch')));

// Fate Grand Order
router.get('/fgo/news', lazyloadRouteHandler(require.resolve('./routes/fgo/news')));

// RF技术社区
router.get('/rf/article', lazyloadRouteHandler(require.resolve('./routes/rf/article')));

// University of Massachusetts Amherst
router.get('/umass/amherst/ecenews', lazyloadRouteHandler(require.resolve('./routes/umass/amherst/ecenews')));
router.get('/umass/amherst/eceseminar', lazyloadRouteHandler(require.resolve('./routes/umass/amherst/eceseminar')));
router.get('/umass/amherst/csnews', lazyloadRouteHandler(require.resolve('./routes/umass/amherst/csnews')));
router.get('/umass/amherst/ipoevents', lazyloadRouteHandler(require.resolve('./routes/umass/amherst/ipoevents')));
router.get('/umass/amherst/ipostories', lazyloadRouteHandler(require.resolve('./routes/umass/amherst/ipostories')));

// 飘花电影网
router.get('/piaohua/hot', lazyloadRouteHandler(require.resolve('./routes/piaohua/hot')));

// 快媒体
router.get('/kuai', lazyloadRouteHandler(require.resolve('./routes/kuai/index')));
router.get('/kuai/:id', lazyloadRouteHandler(require.resolve('./routes/kuai/id')));

// 生物帮
router.get('/biobio/:id', lazyloadRouteHandler(require.resolve('./routes/biobio/index')));
router.get('/biobio/:column/:id', lazyloadRouteHandler(require.resolve('./routes/biobio/others')));

// 199it
router.get('/199it', lazyloadRouteHandler(require.resolve('./routes/199it/index')));
router.get('/199it/category/:caty', lazyloadRouteHandler(require.resolve('./routes/199it/category')));
router.get('/199it/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/199it/tag')));

// 唧唧堂
router.get('/jijitang/article/:id', lazyloadRouteHandler(require.resolve('./routes/jijitang/article')));
router.get('/jijitang/publication', lazyloadRouteHandler(require.resolve('./routes/jijitang/publication')));

// 新闻联播
router.get('/xwlb', lazyloadRouteHandler(require.resolve('./routes/xwlb/index')));

// 端传媒
router.get('/initium/:type?/:language?', lazyloadRouteHandler(require.resolve('./routes/initium/full')));
router.get('/theinitium/:model/:type?/:language?', lazyloadRouteHandler(require.resolve('./routes/initium/full')));

// Grub Street
router.get('/grubstreet', lazyloadRouteHandler(require.resolve('./routes/grubstreet/index')));

// 漫画堆
router.get('/manhuadui/manhua/:name/:serial?', lazyloadRouteHandler(require.resolve('./routes/manhuadui/manhua')));

// 风之漫画
router.get('/fzdm/manhua/:id', lazyloadRouteHandler(require.resolve('./routes/fzdm/manhua')));

// Aljazeera 半岛网
router.get('/aljazeera/news', lazyloadRouteHandler(require.resolve('./routes/aljazeera/news')));

// CFD indices dividend adjustment
router.get('/cfd/gbp_div', lazyloadRouteHandler(require.resolve('./routes/cfd/gbp_div')));

// Monotype
router.get('/monotype/article', lazyloadRouteHandler(require.resolve('./routes/monotype/article')));

// Stork
router.get('/stork/keyword/:trackID/:displayKey', lazyloadRouteHandler(require.resolve('./routes/stork/keyword')));

// 致美化
router.get('/zhutix/latest', lazyloadRouteHandler(require.resolve('./routes/zhutix/latest')));

// arXiv
router.get('/arxiv/:query', lazyloadRouteHandler(require.resolve('./routes/arxiv/query')));

// 生物谷
router.get('/shengwugu/:uid?', lazyloadRouteHandler(require.resolve('./routes/shengwugu/index')));

// 环球律师事务所文章
router.get('/law/hq', lazyloadRouteHandler(require.resolve('./routes/law/hq')));

// 海问律师事务所文章
router.get('/law/hw', lazyloadRouteHandler(require.resolve('./routes/law/hw')));

// 国枫律师事务所文章
router.get('/law/gf', lazyloadRouteHandler(require.resolve('./routes/law/gf')));

// 通商律师事务所文章
router.get('/law/ts', lazyloadRouteHandler(require.resolve('./routes/law/ts')));

// 锦天城律师事务所文章
router.get('/law/jtc', lazyloadRouteHandler(require.resolve('./routes/law/jtc')));

// 中伦律师事务所文章
router.get('/law/zl', lazyloadRouteHandler(require.resolve('./routes/law/zl')));

// 君合律师事务所文章
router.get('/law/jh', lazyloadRouteHandler(require.resolve('./routes/law/jh')));

// 德恒律师事务所文章
router.get('/law/dh', lazyloadRouteHandler(require.resolve('./routes/law/dh')));

// 金诚同达律师事务所文章
router.get('/law/jctd', lazyloadRouteHandler(require.resolve('./routes/law/jctd')));

// 三星盖乐世社区
router.get('/samsungmembers/latest', lazyloadRouteHandler(require.resolve('./routes/samsungmembers/latest')));

// 东莞教研网
// router.get('/dgjyw/:type', lazyloadRouteHandler(require.resolve('./routes/dgjyw/index')));

// 中国信息通信研究院
router.get('/gov/caict/bps', lazyloadRouteHandler(require.resolve('./routes/gov/caict/bps')));
router.get('/gov/caict/qwsj', lazyloadRouteHandler(require.resolve('./routes/gov/caict/qwsj')));
router.get('/gov/caict/caictgd', lazyloadRouteHandler(require.resolve('./routes/gov/caict/caictgd')));

// 中证网
router.get('/cs/news/:caty', lazyloadRouteHandler(require.resolve('./routes/cs/news')));

// 财联社
router.get('/cls/depth/:category?', lazyloadRouteHandler(require.resolve('./routes/cls/depth')));
router.get('/cls/telegraph/:category?', lazyloadRouteHandler(require.resolve('./routes/cls/telegraph')));

// hentai-cosplays
router.get('/hentai-cosplays/:type?/:name?', lazyloadRouteHandler(require.resolve('./routes/hentai-cosplays/hentai-cosplays')));
router.get('/porn-images-xxx/:type?/:name?', lazyloadRouteHandler(require.resolve('./routes/hentai-cosplays/porn-images-xxx')));

// dcinside
router.get('/dcinside/board/:id', lazyloadRouteHandler(require.resolve('./routes/dcinside/board')));

// 企鹅电竞
router.get('/egameqq/room/:id', lazyloadRouteHandler(require.resolve('./routes/tencent/egame/room')));

// 国家税务总局
router.get('/gov/chinatax/latest', lazyloadRouteHandler(require.resolve('./routes/gov/chinatax/latest')));

// 荔枝FM
router.get('/lizhi/user/:id', lazyloadRouteHandler(require.resolve('./routes/lizhi/user')));

// 富途牛牛
router.get('/futunn/highlights', lazyloadRouteHandler(require.resolve('./routes/futunn/highlights')));

// 即刻 migrated to v2
// router.get('/jike/topic/:id', lazyloadRouteHandler(require.resolve('./routes/jike/topic')));
// router.get('/jike/topic/text/:id', lazyloadRouteHandler(require.resolve('./routes/jike/topicText')));
// router.get('/jike/user/:id', lazyloadRouteHandler(require.resolve('./routes/jike/user')));

// 网易新闻
// router.get('/netease/news/rank/:category?/:type?/:time?', lazyloadRouteHandler(require.resolve('./routes/netease/news/rank')));
router.get('/netease/news/special/:type?', lazyloadRouteHandler(require.resolve('./routes/netease/news/special')));

// 网易 - 网易号
router.get('/netease/dy/:id', lazyloadRouteHandler(require.resolve('./routes/netease/dy')));
router.get('/netease/dy2/:id', lazyloadRouteHandler(require.resolve('./routes/netease/dy2')));

// 网易大神
router.get('/netease/ds/:id', lazyloadRouteHandler(require.resolve('./routes/netease/ds')));

// 网易公开课
router.get('/open163/vip', lazyloadRouteHandler(require.resolve('./routes/netease/open/vip')));
router.get('/open163/latest', lazyloadRouteHandler(require.resolve('./routes/netease/open/latest')));

// Boston.com
router.get('/boston/:tag?', lazyloadRouteHandler(require.resolve('./routes/boston/index')));

// 场库
router.get('/changku', lazyloadRouteHandler(require.resolve('./routes/changku/index')));
router.get('/changku/cate/:postid', lazyloadRouteHandler(require.resolve('./routes/changku/index')));

// SCMP
router.get('/scmp/:category_id', lazyloadRouteHandler(require.resolve('./routes/scmp/index')));

// 上海市生态环境局
router.get('/gov/shanghai/sthj', lazyloadRouteHandler(require.resolve('./routes/gov/shanghai/sthj')));

// 才符
router.get('/91ddcc/user/:user', lazyloadRouteHandler(require.resolve('./routes/91ddcc/user')));
router.get('/91ddcc/stage/:stage', lazyloadRouteHandler(require.resolve('./routes/91ddcc/stage')));

// BookwalkerTW热门新书
router.get('/bookwalkertw/news', lazyloadRouteHandler(require.resolve('./routes/bookwalkertw/news')));

// Chicago Tribune
router.get('/chicagotribune/:category/:subcategory?', lazyloadRouteHandler(require.resolve('./routes/chicagotribune/index')));

// Amazfit Watch Faces
router.get('/amazfitwatchfaces/fresh/:model/:type?/:lang?', lazyloadRouteHandler(require.resolve('./routes/amazfitwatchfaces/fresh')));
router.get('/amazfitwatchfaces/updated/:model/:type?/:lang?', lazyloadRouteHandler(require.resolve('./routes/amazfitwatchfaces/updated')));
router.get('/amazfitwatchfaces/top/:model/:type?/:time?/:sortBy?/:lang?', lazyloadRouteHandler(require.resolve('./routes/amazfitwatchfaces/top')));
router.get('/amazfitwatchfaces/search/:model/:keyword?/:sortBy?', lazyloadRouteHandler(require.resolve('./routes/amazfitwatchfaces/search')));

// 猫耳FM
router.get('/missevan/drama/latest', lazyloadRouteHandler(require.resolve('./routes/missevan/latest')));
router.get('/missevan/drama/:id', lazyloadRouteHandler(require.resolve('./routes/missevan/drama')));

// Go语言爱好者周刊
router.get('/go-weekly', lazyloadRouteHandler(require.resolve('./routes/go-weekly')));

// popiask提问箱
router.get('/popiask/:sharecode/:pagesize?', lazyloadRouteHandler(require.resolve('./routes/popiask/questions')));

// Tapechat提问箱
router.get('/tapechat/questionbox/:sharecode/:pagesize?', lazyloadRouteHandler(require.resolve('./routes/popiask/tapechat_questions')));

// AMD
router.get('/amd/graphicsdrivers/:id/:rid?', lazyloadRouteHandler(require.resolve('./routes/amd/graphicsdrivers')));

// 二柄APP
// router.get('/erbingapp/news', lazyloadRouteHandler(require.resolve('./routes/erbingapp/news')));

// 电商报
router.get('/dsb/area/:area', lazyloadRouteHandler(require.resolve('./routes/dsb/area')));

// 靠谱新闻
router.get('/kaopunews/:language?', lazyloadRouteHandler(require.resolve('./routes/kaopunews')));

// 格隆汇
router.get('/gelonghui/user/:id', lazyloadRouteHandler(require.resolve('./routes/gelonghui/user')));
router.get('/gelonghui/subject/:id', lazyloadRouteHandler(require.resolve('./routes/gelonghui/subject')));
router.get('/gelonghui/keyword/:keyword', lazyloadRouteHandler(require.resolve('./routes/gelonghui/keyword')));

// 光谷社区
router.get('/guanggoo/:category?', lazyloadRouteHandler(require.resolve('./routes/guanggoo/index')));

// 万维读者
router.get('/creaders/headline', lazyloadRouteHandler(require.resolve('./routes/creaders/headline')));

// 金山词霸
router.get('/iciba/:days?/:img_type?', lazyloadRouteHandler(require.resolve('./routes/iciba/index')));

// 重庆市两江新区信息公开网
router.get('/gov/chongqing/ljxq/dwgk', lazyloadRouteHandler(require.resolve('./routes/gov/chongqing/ljxq/dwgk')));
router.get('/gov/chongqing/ljxq/zwgk/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/chongqing/ljxq/zwgk')));

// 国家突发事件预警信息发布网
router.get('/12379', lazyloadRouteHandler(require.resolve('./routes/12379/index')));

// 鸟哥笔记
router.get('/ngbj', lazyloadRouteHandler(require.resolve('./routes/niaogebiji/index')));
router.get('/ngbj/today', lazyloadRouteHandler(require.resolve('./routes/niaogebiji/today')));
router.get('/ngbj/cat/:cat', lazyloadRouteHandler(require.resolve('./routes/niaogebiji/cat')));

// 梅花网
router.get('/meihua/shots/:caty', lazyloadRouteHandler(require.resolve('./routes/meihua/shots')));
router.get('/meihua/article/:caty', lazyloadRouteHandler(require.resolve('./routes/meihua/article')));

// 看点快报
router.get('/kuaibao', lazyloadRouteHandler(require.resolve('./routes/kuaibao/index')));

// SocialBeta
router.get('/socialbeta/home', lazyloadRouteHandler(require.resolve('./routes/socialbeta/home')));
router.get('/socialbeta/hunt', lazyloadRouteHandler(require.resolve('./routes/socialbeta/hunt')));

// 东方我乐多丛志
router.get('/touhougarakuta/:language/:type', lazyloadRouteHandler(require.resolve('./routes/touhougarakuta')));

// 猎趣TV
router.get('/liequtv/room/:id', lazyloadRouteHandler(require.resolve('./routes/liequtv/room')));

// 北京物资学院
router.get('/bwu/news', lazyloadRouteHandler(require.resolve('./routes/universities/bwu/news')));

// 新榜
router.get('/newrank/wechat/:wxid', lazyloadRouteHandler(require.resolve('./routes/newrank/wechat')));
router.get('/newrank/douyin/:dyid', lazyloadRouteHandler(require.resolve('./routes/newrank/douyin')));

// 漫小肆
router.get('/manxiaosi/book/:id', lazyloadRouteHandler(require.resolve('./routes/manxiaosi/book')));

// 吉林大学校内通知
router.get('/jlu/oa', lazyloadRouteHandler(require.resolve('./routes/universities/jlu/oa')));

// 小宇宙 migrated to v2
// router.get('/xiaoyuzhou', lazyloadRouteHandler(require.resolve('./routes/xiaoyuzhou/pickup')));
// router.get('/xiaoyuzhou/podcast/:id', lazyloadRouteHandler(require.resolve('./routes/xiaoyuzhou/podcast')));

// 合肥工业大学
router.get('/hfut/tzgg', lazyloadRouteHandler(require.resolve('./routes/universities/hfut/tzgg')));

// Darwin Awards
// router.get('/darwinawards/all', lazyloadRouteHandler(require.resolve('./routes/darwinawards/articles')));

// 四川职业技术学院
// router.get('/scvtc/xygg', lazyloadRouteHandler(require.resolve('./routes/universities/scvtc/xygg')));

// 华南理工大学土木与交通学院
router.get('/scut/scet/notice', lazyloadRouteHandler(require.resolve('./routes/universities/scut/scet/notice')));

// 华南理工大学电子与信息学院
router.get('/scut/seie/news_center', lazyloadRouteHandler(require.resolve('./routes/universities/scut/seie/news_center')));

// OneJAV
router.get('/onejav/:type/:key?', lazyloadRouteHandler(require.resolve('./routes/onejav/one')));

// 141jav
router.get('/141jav/:type/:key?', lazyloadRouteHandler(require.resolve('./routes/141jav/141jav')));

// 141ppv
router.get('/141ppv/:type/:key?', lazyloadRouteHandler(require.resolve('./routes/141ppv/141ppv')));

// CuriousCat
router.get('/curiouscat/user/:id', lazyloadRouteHandler(require.resolve('./routes/curiouscat/user')));

// Telecompaper
router.get('/telecompaper/news/:caty/:year?/:country?/:type?', lazyloadRouteHandler(require.resolve('./routes/telecompaper/news')));
router.get('/telecompaper/search/:keyword?/:company?/:sort?/:period?', lazyloadRouteHandler(require.resolve('./routes/telecompaper/search')));

// 水木社区
router.get('/newsmth/account/:id', lazyloadRouteHandler(require.resolve('./routes/newsmth/account')));
router.get('/newsmth/section/:section', lazyloadRouteHandler(require.resolve('./routes/newsmth/section')));

// Kotaku
router.get('/kotaku/story/:type', lazyloadRouteHandler(require.resolve('./routes/kotaku/story')));

// 梅斯医学
// router.get('/medsci/recommend', lazyloadRouteHandler(require.resolve('./routes/medsci/recommend')));

// Wallpaperhub migrated to v2
// router.get('/wallpaperhub', lazyloadRouteHandler(require.resolve('./routes/wallpaperhub/index')));

// 悟空问答
router.get('/wukong/user/:id/:type?', lazyloadRouteHandler(require.resolve('./routes/wukong/user')));

// 腾讯大数据
router.get('/tencent/bigdata', lazyloadRouteHandler(require.resolve('./routes/tencent/bigdata/index')));

// 搜韵网
router.get('/souyun/today', lazyloadRouteHandler(require.resolve('./routes/souyun/today')));

// 生物谷
router.get('/bioon/latest', lazyloadRouteHandler(require.resolve('./routes/bioon/latest')));

// soomal
router.get('/soomal/topics/:category/:language?', lazyloadRouteHandler(require.resolve('./routes/soomal/topics')));

// NASA
router.get('/nasa/apod', lazyloadRouteHandler(require.resolve('./routes/nasa/apod')));
router.get('/nasa/apod-ncku', lazyloadRouteHandler(require.resolve('./routes/nasa/apod-ncku')));
router.get('/nasa/apod-cn', lazyloadRouteHandler(require.resolve('./routes/nasa/apod-cn')));

// 爱Q生活网
router.get('/iqshw/latest', lazyloadRouteHandler(require.resolve('./routes/3k8/latest')));
router.get('/3k8/latest', lazyloadRouteHandler(require.resolve('./routes/3k8/latest')));

// JustRun
router.get('/justrun', lazyloadRouteHandler(require.resolve('./routes/justrun/index')));

// 上海电力大学
router.get('/shiep/:type', lazyloadRouteHandler(require.resolve('./routes/universities/shiep/index')));

// 福建新闻
router.get('/fjnews/:city/:limit', lazyloadRouteHandler(require.resolve('./routes/fjnews/fznews')));
router.get('/fjnews/jjnews', lazyloadRouteHandler(require.resolve('./routes/fjnews/jjnews')));

// 中山网新闻
router.get('/zsnews/index/:cateid', lazyloadRouteHandler(require.resolve('./routes/zsnews/index')));

// 孔夫子旧书网
router.get('/kongfz/people/:id', lazyloadRouteHandler(require.resolve('./routes/kongfz/people')));
router.get('/kongfz/shop/:id/:cat?', lazyloadRouteHandler(require.resolve('./routes/kongfz/shop')));

// XMind
router.get('/xmind/mindmap/:lang?', lazyloadRouteHandler(require.resolve('./routes/xmind/mindmap')));

// 小刀娱乐网
router.get('/x6d/:id?', lazyloadRouteHandler(require.resolve('./routes/x6d/index')));

// 思维导图社区
router.get('/edrawsoft/mindmap/:classId?/:order?/:sort?/:lang?/:price?/:search?', lazyloadRouteHandler(require.resolve('./routes/edrawsoft/mindmap')));

// 它惠网
router.get('/tahui/rptlist', lazyloadRouteHandler(require.resolve('./routes/tahui/rptlist')));

// Guiltfree
router.get('/guiltfree/onsale', lazyloadRouteHandler(require.resolve('./routes/guiltfree/onsale')));

// 消费明鉴
router.get('/mingjian', lazyloadRouteHandler(require.resolve('./routes/mingjian/index')));

// hentaimama
router.get('/hentaimama/videos', lazyloadRouteHandler(require.resolve('./routes/hentaimama/videos')));

// 无讼
router.get('/itslaw/judgements/:conditions', lazyloadRouteHandler(require.resolve('./routes/itslaw/judgements')));

// 文学城
router.get('/wenxuecity/blog/:id', lazyloadRouteHandler(require.resolve('./routes/wenxuecity/blog')));
router.get('/wenxuecity/bbs/:cat/:elite?', lazyloadRouteHandler(require.resolve('./routes/wenxuecity/bbs')));
router.get('/wenxuecity/hot/:cid', lazyloadRouteHandler(require.resolve('./routes/wenxuecity/hot')));
router.get('/wenxuecity/news', lazyloadRouteHandler(require.resolve('./routes/wenxuecity/news')));

// 不安全
router.get('/buaq', lazyloadRouteHandler(require.resolve('./routes/buaq/index')));

// 快出海
router.get('/kchuhai', lazyloadRouteHandler(require.resolve('./routes/kchuhai/index')));

// i春秋资讯
router.get('/ichunqiu', lazyloadRouteHandler(require.resolve('./routes/ichunqiu/index')));

// 冰山博客
router.get('/bsblog123', lazyloadRouteHandler(require.resolve('./routes/bsblog123/index')));

// 纳威安全导航
router.get('/navisec', lazyloadRouteHandler(require.resolve('./routes/navisec/index')));

// 安全师
router.get('/secshi', lazyloadRouteHandler(require.resolve('./routes/secshi/index')));

// 出海笔记
router.get('/chuhaibiji', lazyloadRouteHandler(require.resolve('./routes/chuhaibiji/index')));

// 建宁闲谈
router.get('/blogs/jianning', lazyloadRouteHandler(require.resolve('./routes/blogs/jianning')));

// 妖火网
// router.get('/yaohuo/:type?', lazyloadRouteHandler(require.resolve('./routes/yaohuo/index')));

// 互动吧
router.get('/hudongba/:city/:id', lazyloadRouteHandler(require.resolve('./routes/hudongba/index')));

// 飞雪娱乐网
router.get('/feixuew/:id?', lazyloadRouteHandler(require.resolve('./routes/feixuew/index')));

// 1X
router.get('/1x/:category?', lazyloadRouteHandler(require.resolve('./routes/1x/index')));

// 剑网3
router.get('/jx3/:caty?', lazyloadRouteHandler(require.resolve('./routes/jx3/news')));

// GQ
router.get('/gq/tw/:caty?/:subcaty?', lazyloadRouteHandler(require.resolve('./routes/gq/tw/index')));

// 泉州市跨境电子商务协会
router.get('/qzcea/:caty?', lazyloadRouteHandler(require.resolve('./routes/qzcea/index')));

// 福利年
router.get('/fulinian/:caty?', lazyloadRouteHandler(require.resolve('./routes/fulinian/index')));

// CGTN
router.get('/cgtn/top', lazyloadRouteHandler(require.resolve('./routes/cgtn/top')));
router.get('/cgtn/most/:type?/:time?', lazyloadRouteHandler(require.resolve('./routes/cgtn/most')));

router.get('/cgtn/pick', lazyloadRouteHandler(require.resolve('./routes/cgtn/pick')));

router.get('/cgtn/opinions', lazyloadRouteHandler(require.resolve('./routes/cgtn/opinions')));

// AppSales
router.get('/appsales/:caty?/:time?', lazyloadRouteHandler(require.resolve('./routes/appsales/index')));

// Academy of Management
router.get('/aom/journal/:id', lazyloadRouteHandler(require.resolve('./routes/aom/journal')));

// 巴哈姆特電玩資訊站 migrated to v2
// router.get('/gamer/hot/:bsn', lazyloadRouteHandler(require.resolve('./routes/gamer/hot')));

// iCity
router.get('/icity/:id', lazyloadRouteHandler(require.resolve('./routes/icity/index')));

// Anki
router.get('/anki/changes', lazyloadRouteHandler(require.resolve('./routes/anki/changes')));

// ABC News
router.get('/abc/:id?', lazyloadRouteHandler(require.resolve('./routes/abc')));

// 台湾中央通讯社
router.get('/cna/:id?', lazyloadRouteHandler(require.resolve('./routes/cna/index')));

// 华为心声社区
router.get('/huawei/xinsheng/:caty?/:order?/:keyword?', lazyloadRouteHandler(require.resolve('./routes/huawei/xinsheng/index')));

// 守望先锋
router.get('/ow/patch', lazyloadRouteHandler(require.resolve('./routes/ow/patch')));

// MM范
// router.get('/95mm/tab/:tab?', lazyloadRouteHandler(require.resolve('./routes/95mm/tab')));
// router.get('/95mm/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/95mm/tag')));
// router.get('/95mm/category/:category', lazyloadRouteHandler(require.resolve('./routes/95mm/category')));

// 中国工程科技知识中心
router.get('/cktest/app/:ctgroup?/:domain?', lazyloadRouteHandler(require.resolve('./routes/cktest/app')));
router.get('/cktest/policy', lazyloadRouteHandler(require.resolve('./routes/cktest/policy')));

// 妈咪帮
router.get('/mamibuy/:caty?/:age?/:sort?', lazyloadRouteHandler(require.resolve('./routes/mamibuy/index')));

// Mercari
router.get('/mercari/:type/:id', lazyloadRouteHandler(require.resolve('./routes/mercari/index')));

// notefolio
router.get('/notefolio/:caty?/:order?/:time?/:query?', lazyloadRouteHandler(require.resolve('./routes/notefolio/index')));

// JavDB
// router.get('/javdb/home/:category?/:sort?/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb')));
// router.get('/javdb/search/:keyword?/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb/search')));
// router.get('/javdb/tags/:query?/:caty?', lazyloadRouteHandler(require.resolve('./routes/javdb/tags')));
// router.get('/javdb/actors/:id/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb/actors')));
// router.get('/javdb/makers/:id/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb/makers')));
// router.get('/javdb/series/:id/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb/series')));
// router.get('/javdb/rankings/:caty?/:time?', lazyloadRouteHandler(require.resolve('./routes/javdb/rankings')));
// router.get('/javdb/:category?/:sort?/:filter?', lazyloadRouteHandler(require.resolve('./routes/javdb')));

// World Economic Forum
router.get('/weforum/report/:lang?/:year?/:platform?', lazyloadRouteHandler(require.resolve('./routes/weforum/report')));

// Nobel Prize
router.get('/nobelprize/:caty?', lazyloadRouteHandler(require.resolve('./routes/nobelprize/index')));

// 中華民國國防部
router.get('/gov/taiwan/mnd', lazyloadRouteHandler(require.resolve('./routes/gov/taiwan/mnd')));

// 読売新聞 to v2
// router.get('/yomiuri/:category', lazyloadRouteHandler(require.resolve('./routes/yomiuri/news')));

// 巴哈姆特
// GNN新闻 migrated to v2
// router.get('/gamer/gnn/:category?', lazyloadRouteHandler(require.resolve('./routes/gamer/gnn_index')));

// 中国人大网
router.get('/npc/:caty', lazyloadRouteHandler(require.resolve('./routes/npc/index')));

// 高科技行业门户
router.get('/ofweek/news', lazyloadRouteHandler(require.resolve('./routes/ofweek/news')));

// 八阕
router.get('/popyard/:caty?', lazyloadRouteHandler(require.resolve('./routes/popyard/index')));

// 原神
router.get('/yuanshen/:location?/:category?', lazyloadRouteHandler(require.resolve('./routes/yuanshen/index')));

// World Trade Organization
router.get('/wto/dispute-settlement/:year?', lazyloadRouteHandler(require.resolve('./routes/wto/dispute-settlement')));

// 4399论坛
router.get('/forum4399/:mtag', lazyloadRouteHandler(require.resolve('./routes/game4399/forum')));

// 国防科技大学
router.get('/nudt/yjszs/:id?', lazyloadRouteHandler(require.resolve('./routes/universities/nudt/yjszs')));

// 全现在
router.get('/allnow/column/:id', lazyloadRouteHandler(require.resolve('./routes/allnow/column')));
router.get('/allnow/tag/:id', lazyloadRouteHandler(require.resolve('./routes/allnow/tag')));
router.get('/allnow/user/:id', lazyloadRouteHandler(require.resolve('./routes/allnow/user')));
router.get('/allnow', lazyloadRouteHandler(require.resolve('./routes/allnow/index')));

// 证券时报网
// router.get('/stcn/news/:id?', lazyloadRouteHandler(require.resolve('./routes/stcn/news')));
// router.get('/stcn/data/:id?', lazyloadRouteHandler(require.resolve('./routes/stcn/data')));
// router.get('/stcn/kuaixun/:id?', lazyloadRouteHandler(require.resolve('./routes/stcn/kuaixun')));

// dev.to
router.get('/dev.to/top/:period', lazyloadRouteHandler(require.resolve('./routes/dev.to/top')));

// GameRes 游资网
router.get('/gameres/hot', lazyloadRouteHandler(require.resolve('./routes/gameres/hot')));
router.get('/gameres/list/:id', lazyloadRouteHandler(require.resolve('./routes/gameres/list')));

// ManicTime
router.get('/manictime/releases', lazyloadRouteHandler(require.resolve('./routes/manictime/releases')));

// Deutsche Welle 德国之声
router.get('/dw/:lang?/:caty?', lazyloadRouteHandler(require.resolve('./routes/dw/index')));

// Amazon
router.get('/amazon/ku/:type?', lazyloadRouteHandler(require.resolve('./routes/amazon/ku')));

// Citavi 中文网站论坛
router.get('/citavi/:caty?', lazyloadRouteHandler(require.resolve('./routes/citavi/index')));

// Sesame
router.get('/sesame/release_notes', lazyloadRouteHandler(require.resolve('./routes/sesame/release_notes')));

// 佐川急便
router.get('/sagawa/:id', lazyloadRouteHandler(require.resolve('./routes/sagawa/index')));

// QNAP
router.get('/qnap/release-notes/:id', lazyloadRouteHandler(require.resolve('./routes/qnap/release-notes')));

// Liquipedia
router.get('/liquipedia/dota2/matches/:id', lazyloadRouteHandler(require.resolve('./routes/liquipedia/dota2_matches.js')));

// 哈尔滨市科技局
router.get('/gov/harbin/kjj', lazyloadRouteHandler(require.resolve('./routes/gov/harbin/kjj')));

// WSJ migrated to v2
// router.get('/wsj/:lang/:category?', lazyloadRouteHandler(require.resolve('./routes/wsj/index')));

// China File
router.get('/chinafile/:category?', lazyloadRouteHandler(require.resolve('./routes/chinafile/index')));

// 科技島讀
router.get('/daodu/:caty?', lazyloadRouteHandler(require.resolve('./routes/daodu/index')));

// Grand-Challenge
router.get('/grandchallenge/user/:id', lazyloadRouteHandler(require.resolve('./routes/grandchallenge/user')));
router.get('/grandchallenge/challenges', lazyloadRouteHandler(require.resolve('./routes/grandchallenge/challenges')));

// 西北工业大学
router.get('/nwpu/:column', lazyloadRouteHandler(require.resolve('./routes/nwpu/index')));

// 美国联邦最高法院
router.get('/us/supremecourt/argument_audio/:year?', lazyloadRouteHandler(require.resolve('./routes/us/supremecourt/argument_audio')));

// 得到
router.get('/dedao/list/:caty?', lazyloadRouteHandler(require.resolve('./routes/dedao/list')));
router.get('/dedao/knowledge/:topic?/:type?', lazyloadRouteHandler(require.resolve('./routes/dedao/knowledge')));
router.get('/dedao/:caty?', lazyloadRouteHandler(require.resolve('./routes/dedao/index')));

// 未名新闻
router.get('/mitbbs/:caty?', lazyloadRouteHandler(require.resolve('./routes/mitbbs/index')));

// 8kcos migrated to v2
// router.get('/8kcos/', lazyloadRouteHandler(require.resolve('./routes/8kcos/latest')));
// router.get('/8kcos/cat/:cat*', lazyloadRouteHandler(require.resolve('./routes/8kcos/cat')));
// router.get('/8kcos/tag/:tag', lazyloadRouteHandler(require.resolve('./routes/8kcos/tag')));

// 贾真的电商108将
router.get('/jiazhen108', lazyloadRouteHandler(require.resolve('./routes/jiazhen108/index')));

// Instagram
router.get('/instagram/:category/:key', lazyloadRouteHandler(require.resolve('./routes/instagram/index')));

// 优设网
router.get('/uisdc/talk/:sort?', lazyloadRouteHandler(require.resolve('./routes/uisdc/talk')));
router.get('/uisdc/hangye/:caty?', lazyloadRouteHandler(require.resolve('./routes/uisdc/hangye')));
router.get('/uisdc/news', lazyloadRouteHandler(require.resolve('./routes/uisdc/news')));
router.get('/uisdc/zt/:title?', lazyloadRouteHandler(require.resolve('./routes/uisdc/zt')));
router.get('/uisdc/topic/:title?/:sort?', lazyloadRouteHandler(require.resolve('./routes/uisdc/topic')));

// 中国劳工观察
router.get('/chinalaborwatch/reports/:lang?/:industry?', lazyloadRouteHandler(require.resolve('./routes/chinalaborwatch/reports')));

// Phoronix
router.get('/phoronix/:page/:queryOrItem?', lazyloadRouteHandler(require.resolve('./routes/phoronix/index')));

// 美国中央情报局
router.get('/cia/foia-annual-report', lazyloadRouteHandler(require.resolve('./routes/us/cia/foia-annual-report')));

// Everything
router.get('/everything/changes', lazyloadRouteHandler(require.resolve('./routes/everything/changes')));

// 中国劳工通讯
router.get('/clb/commentary/:lang?', lazyloadRouteHandler(require.resolve('./routes/clb/commentary')));

// 国际教育研究所
router.get('/iie/blog', lazyloadRouteHandler(require.resolve('./routes/iie/blog')));

// McKinsey Greater China
router.get('/mckinsey/:category?', lazyloadRouteHandler(require.resolve('./routes/mckinsey/index')));

// 超理论坛
router.get('/chaoli/:channel?', lazyloadRouteHandler(require.resolve('./routes/chaoli/index')));

// Polar
router.get('/polar/blog', lazyloadRouteHandler(require.resolve('./routes/polar/blog')));

// XYplorer
router.get('/xyplorer/whatsnew', lazyloadRouteHandler(require.resolve('./routes/xyplorer/whatsnew')));

// RescueTime
router.get('/rescuetime/release-notes/:os?', lazyloadRouteHandler(require.resolve('./routes/rescuetime/release-notes')));

// Total Commander
router.get('/totalcommander/whatsnew', lazyloadRouteHandler(require.resolve('./routes/totalcommander/whatsnew')));

// Blizzard
router.get('/blizzard/news/:language?/:category?', lazyloadRouteHandler(require.resolve('./routes/blizzard/news')));

// DeepMind
router.get('/deepmind/blog/:category?', lazyloadRouteHandler(require.resolve('./routes/deepmind/blog')));

// 东西智库
// router.get('/dx2025/:type?/:category?', lazyloadRouteHandler(require.resolve('./routes/dx2025/index')));

// DeepL
router.get('/deepl/blog/:lang?', lazyloadRouteHandler(require.resolve('./routes/deepl/blog')));

// OpenAI
router.get('/openai/blog/:tag?', lazyloadRouteHandler(require.resolve('./routes/openai/blog')));

// 小木虫
router.get('/muchong/journal/:type?', lazyloadRouteHandler(require.resolve('./routes/muchong/journal')));
router.get('/muchong/:id/:type?/:sort?', lazyloadRouteHandler(require.resolve('./routes/muchong/index')));

// 求是网
router.get('/qstheory/:category?', lazyloadRouteHandler(require.resolve('./routes/qstheory/index')));

// 生命时报
router.get('/lifetimes/:category?', lazyloadRouteHandler(require.resolve('./routes/lifetimes/index')));

// MakeUseOf
router.get('/makeuseof/:category?', lazyloadRouteHandler(require.resolve('./routes/makeuseof/index')));

// 瞬Matataki
// 热门作品
router.get('/matataki/posts/hot/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/scoreranking')));
// 最新作品
router.get('/matataki/posts/latest/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/timeranking')));
// 作者创作
router.get('/matataki/users/:authorId/posts/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/author')));
// Fan票关联作品
router.get('/matataki/tokens/:id/posts/:filterCode/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/token')));
// 标签关联作品
router.get('/matataki/tags/:tagId/:tagName/posts/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/tag')));
// 收藏夹
router.get('/matataki/users/:userId/favorites/:favoriteListId/posts/:ipfsFlag?', lazyloadRouteHandler(require.resolve('./routes/matataki/site/posts/favorite')));

// SoBooks
// router.get('/sobooks/tag/:id?', lazyloadRouteHandler(require.resolve('./routes/sobooks/tag')));
// router.get('/sobooks/date/:date?', lazyloadRouteHandler(require.resolve('./routes/sobooks/date')));
// router.get('/sobooks/:category?', lazyloadRouteHandler(require.resolve('./routes/sobooks/index')));

// Zhimap 知识导图社区
router.get('/zhimap/:categoryUuid?/:recommend?', lazyloadRouteHandler(require.resolve('./routes/zhimap/index')));

// Fantia
router.get('/fantia/search/:type?/:caty?/:peroid?/:order?/:rating?/:keyword?', lazyloadRouteHandler(require.resolve('./routes/fantia/search')));
router.get('/fantia/user/:id', lazyloadRouteHandler(require.resolve('./routes/fantia/user')));

// i-Cable
router.get('/icable/:category/:option?', lazyloadRouteHandler(require.resolve('./routes/icable/category')));

// ProcessOn
router.get('/processon/popular/:cate?/:sort?', lazyloadRouteHandler(require.resolve('./routes/processon/popular')));

// Mathpix
router.get('/mathpix/blog', lazyloadRouteHandler(require.resolve('./routes/mathpix/blog')));

// OneNote Gem Add-Ins
router.get('/onenotegem/release', lazyloadRouteHandler(require.resolve('./routes/onenotegem/release')));

// Mind42
router.get('/mind42/tag/:id', lazyloadRouteHandler(require.resolve('./routes/mind42/tag')));
router.get('/mind42/search/:keyword', lazyloadRouteHandler(require.resolve('./routes/mind42/search')));
router.get('/mind42/:caty?', lazyloadRouteHandler(require.resolve('./routes/mind42/index')));

// 幕布网
router.get('/mubu/explore/:category?/:title?', lazyloadRouteHandler(require.resolve('./routes/mubu/explore')));

// Esquirehk
router.get('/esquirehk/tag/:id', lazyloadRouteHandler(require.resolve('./routes/esquirehk/tag')));

// 国家普通话测试 杭州市
router.get('/putonghua', lazyloadRouteHandler(require.resolve('./routes/putonghua/hangzhou')));

// 国家自学考试 上海市 migrated to v2 /shmeea/self-study
// router.get('/self-study/shanghai', require('./routes/self-study/shanghai'));

// 有道云笔记
router.get('/youdao/xueba', lazyloadRouteHandler(require.resolve('./routes/youdao/xueba')));
router.get('/youdao/latest', lazyloadRouteHandler(require.resolve('./routes/youdao/latest')));

// 印象识堂
router.get('/yinxiang/note', lazyloadRouteHandler(require.resolve('./routes/yinxiang/note')));
router.get('/yinxiang/tag/:id', lazyloadRouteHandler(require.resolve('./routes/yinxiang/tag')));
router.get('/yinxiang/card/:id', lazyloadRouteHandler(require.resolve('./routes/yinxiang/card')));
router.get('/yinxiang/personal/:id', lazyloadRouteHandler(require.resolve('./routes/yinxiang/personal')));
router.get('/yinxiang/category/:id', lazyloadRouteHandler(require.resolve('./routes/yinxiang/category')));

// 晚点LatePost
// router.get('/latepost/:proma?', lazyloadRouteHandler(require.resolve('./routes/latepost/index')));

// 遠見 gvm.com.tw
router.get('/gvm/index/:category?', lazyloadRouteHandler(require.resolve('./routes/gvm/index')));

// 触乐
router.get('/chuapp/index/:category?', lazyloadRouteHandler(require.resolve('./routes/chuapp/index')));

// Deloitte
router.get('/deloitte/industries/:category?', lazyloadRouteHandler(require.resolve('./routes/deloitte/industries')));

// 特斯拉系统更新
router.get('/tesla', lazyloadRouteHandler(require.resolve('./routes/tesla/update')));

// 复旦大学继续教育学院
router.get('/fudan/cce', lazyloadRouteHandler(require.resolve('./routes/universities/fudan/cce')));

// LowEndTalk
router.get('/lowendtalk/discussion/:id?', lazyloadRouteHandler(require.resolve('./routes/lowendtalk/discussion')));

// 无产者评论
router.get('/proletar/:type?/:id?', lazyloadRouteHandler(require.resolve('./routes/proletar/index')));

// QTTabBar
router.get('/qttabbar/change-log', lazyloadRouteHandler(require.resolve('./routes/qttabbar/change-log')));

// 酷18
// router.get('/cool18/:id?/:type?/:keyword?', lazyloadRouteHandler(require.resolve('./routes/cool18/index')));

// 美国贸易代表办公室
router.get('/ustr/press-releases/:year?/:month?', lazyloadRouteHandler(require.resolve('./routes/us/ustr/press-releases')));

// 游戏动力
router.get('/vgn/:platform?', lazyloadRouteHandler(require.resolve('./routes/vgn/index')));

// 国际能源署
router.get('/iea/:category?', lazyloadRouteHandler(require.resolve('./routes/iea/index')));

// 中国计算机学会
router.get('/ccf/news/:category?', lazyloadRouteHandler(require.resolve('./routes/ccf/news')));

// The Brain
router.get('/thebrain/:category?', lazyloadRouteHandler(require.resolve('./routes/thebrain/blog')));

// 美国财政部
router.get('/treasury/press-releases/:category?/:title?', lazyloadRouteHandler(require.resolve('./routes/us/treasury/press-releases')));

// Bandisoft
router.get('/bandisoft/:id?/:lang?', lazyloadRouteHandler(require.resolve('./routes/bandisoft/index')));

// MarginNote
router.get('/marginnote/tag/:id?', lazyloadRouteHandler(require.resolve('./routes/marginnote/tag')));

// ASML
router.get('/asml/press-releases', lazyloadRouteHandler(require.resolve('./routes/asml/press-releases')));

// 中国机械工程学会
router.get('/cmes/news/:category?', lazyloadRouteHandler(require.resolve('./routes/cmes/news')));

// Craigslist
router.get('/craigslist/:location/:type', lazyloadRouteHandler(require.resolve('./routes/craigslist/search')));

// 有趣天文奇观
router.get('/interesting-sky/astronomical_events/:year?', lazyloadRouteHandler(require.resolve('./routes/interesting-sky/astronomical_events')));
router.get('/interesting-sky/recent-interesting', lazyloadRouteHandler(require.resolve('./routes/interesting-sky/recent-interesting')));
router.get('/interesting-sky', lazyloadRouteHandler(require.resolve('./routes/interesting-sky/index')));

// 国际数学联合会
router.get('/mathunion/fields-medal', lazyloadRouteHandler(require.resolve('./routes/mathunion/fields-medal')));

// ACM
router.get('/acm/amturingaward', lazyloadRouteHandler(require.resolve('./routes/acm/amturingaward')));

// 網路天文館
router.get('/tam/forecast', lazyloadRouteHandler(require.resolve('./routes/tam/forecast')));

// Day One
router.get('/dayone/blog', lazyloadRouteHandler(require.resolve('./routes/dayone/blog')));

// 滴答清单
router.get('/dida365/habit/checkins', lazyloadRouteHandler(require.resolve('./routes/dida365/habit-checkins')));

// Ditto clipboard manager
router.get('/ditto/changes/:type?', lazyloadRouteHandler(require.resolve('./routes/ditto/changes')));

// iDaily 每日环球视野
router.get('/idaily/today', lazyloadRouteHandler(require.resolve('./routes/idaily/index')));

// 北屋
router.get('/northhouse/:category?', lazyloadRouteHandler(require.resolve('./routes/northhouse/index')));

// Oak Ridge National Laboratory
router.get('/ornl/news', lazyloadRouteHandler(require.resolve('./routes/ornl/news')));

// 信阳师范学院 自考办
router.get('/xynu/zkb/:category', lazyloadRouteHandler(require.resolve('./routes/universities/xynu/zkb')));

// Bell Labs
router.get('/bell-labs/events-news/:category?', lazyloadRouteHandler(require.resolve('./routes/bell-labs/events-news.js')));

// 中国科学院青年创新促进会
router.get('/yicas/blog', lazyloadRouteHandler(require.resolve('./routes/yicas/blog')));

// 九三学社
router.get('/93/:category?', lazyloadRouteHandler(require.resolve('./routes/93/index')));

// 科学网
// router.get('/sciencenet/blog/:type?/:time?/:sort?', lazyloadRouteHandler(require.resolve('./routes/sciencenet/blog')));

// DailyArt
router.get('/dailyart/:language?', lazyloadRouteHandler(require.resolve('./routes/dailyart/index')));

// SCBOY
router.get('/scboy/thread/:tid', lazyloadRouteHandler(require.resolve('./routes/scboy/thread')));

// 猿料
router.get('/yuanliao/:tag?/:sort?', lazyloadRouteHandler(require.resolve('./routes/yuanliao/index')));

// 中国政协网
router.get('/cppcc/:slug?', lazyloadRouteHandler(require.resolve('./routes/gov/cppcc/index')));

// National Association of Colleges and Employers
router.get('/nace/blog/:sort?', lazyloadRouteHandler(require.resolve('./routes/nace/blog')));

// Caixin Latest
router.get('/caixin/latest', lazyloadRouteHandler(require.resolve('./routes/caixin/latest')));

// Semiconductor Industry Association
router.get('/semiconductors/latest-news', lazyloadRouteHandler(require.resolve('./routes/semiconductors/latest-news')));

// VOA News
router.get('/voa/day-photos', lazyloadRouteHandler(require.resolve('./routes/voa/day-photos')));

// Voice of America
router.get('/voa/:language/:channel?', lazyloadRouteHandler(require.resolve('./routes/voa/index')));

// 留园网
router.get('/6park/:id?/:type?/:keyword?', lazyloadRouteHandler(require.resolve('./routes/6park/index')));

// 哔嘀影视
// router.get('/mp4er/:type?/:caty?/:area?/:year?/:order?', lazyloadRouteHandler(require.resolve('./routes/mp4er/index')));
// router.get('/bde4/:type?/:caty?/:area?/:year?/:order?', lazyloadRouteHandler(require.resolve('./routes/mp4er/index')));

// 上海证券交易所
router.get('/sse/sserules/:slug?', lazyloadRouteHandler(require.resolve('./routes/sse/sserules')));

// 游戏葡萄
router.get('/gamegrape/:id?', lazyloadRouteHandler(require.resolve('./routes/gamegrape/index')));

// 阳光高考
router.get('/chsi/zszcgd/:category?', lazyloadRouteHandler(require.resolve('./routes/chsi/zszcgd')));

// 眾新聞
router.get('/hkcnews/news/:category?', lazyloadRouteHandler(require.resolve('./routes/hkcnews/news')));

// AnyTXT
router.get('/anytxt/release-notes', lazyloadRouteHandler(require.resolve('./routes/anytxt/release-notes')));

// 鱼塘热榜
router.get('/mofish/:id', lazyloadRouteHandler(require.resolve('./routes/mofish/index')));

// Mcdonalds
router.get('/mcdonalds/:category', lazyloadRouteHandler(require.resolve('./routes/mcdonalds/news')));

// Pincong 品葱 migrated to v2
// router.get('/pincong/category/:category?/:sort?', lazyloadRouteHandler(require.resolve('./routes/pincong/index')));
// router.get('/pincong/hot/:category?', lazyloadRouteHandler(require.resolve('./routes/pincong/hot')));
// router.get('/pincong/topic/:topic', lazyloadRouteHandler(require.resolve('./routes/pincong/topic')));

// GoComics
router.get('/gocomics/:name', lazyloadRouteHandler(require.resolve('./routes/gocomics/index')));

// Comics Kingdom
router.get('/comicskingdom/:name', lazyloadRouteHandler(require.resolve('./routes/comicskingdom/index')));

// Media Digest
router.get('/mediadigest/:range/:category?', lazyloadRouteHandler(require.resolve('./routes/mediadigest/category')));

// 中国农工民主党
router.get('/ngd/:slug?', lazyloadRouteHandler(require.resolve('./routes/gov/ngd/index')));

// SimpRead-消息通知
router.get('/simpread/notice', lazyloadRouteHandler(require.resolve('./routes/simpread/notice')));
// SimpRead-更新日志
router.get('/simpread/changelog', lazyloadRouteHandler(require.resolve('./routes/simpread/changelog')));

// booth.pm
router.get('/booth.pm/shop/:subdomain', lazyloadRouteHandler(require.resolve('./routes/booth-pm/shop')));

// Minecraft feed the beast
router.get('/feed-the-beast/modpack/:modpackEntry', lazyloadRouteHandler(require.resolve('./routes/feed-the-beast/modpack')));

// Gab
router.get('/gab/user/:username', lazyloadRouteHandler(require.resolve('./routes/gab/user')));
router.get('/gab/popular/:sort?', lazyloadRouteHandler(require.resolve('./routes/gab/explore')));

// NEW 字幕组
router.get('/newzmz/view/:id', lazyloadRouteHandler(require.resolve('./routes/newzmz/view')));
router.get('/newzmz/:category?', lazyloadRouteHandler(require.resolve('./routes/newzmz/index')));

// Phrack Magazine
router.get('/phrack', lazyloadRouteHandler(require.resolve('./routes/phrack/index')));

// 通識·現代中國
router.get('/chiculture/topic/:category?', lazyloadRouteHandler(require.resolve('./routes/chiculture/topic')));

// CQUT News
router.get('/cqut/news', lazyloadRouteHandler(require.resolve('./routes/universities/cqut/cqut-news')));
router.get('/cqut/libnews', lazyloadRouteHandler(require.resolve('./routes/universities/cqut/cqut-libnews')));

// 城农 Growin' City
router.get('/growincity/news/:id?', lazyloadRouteHandler(require.resolve('./routes/growincity/news')));

// Thrillist
router.get('/thrillist/:tag?', lazyloadRouteHandler(require.resolve('./routes/thrillist/index')));

// 丁香园
router.get('/dxy/vaccine/:province?/:city?/:location?', lazyloadRouteHandler(require.resolve('./routes/dxy/vaccine')));

// Wtu
router.get('/wtu/:type', lazyloadRouteHandler(require.resolve('./routes/universities/wtu')));

// 中国庭审公开网
router.get('/tingshen', lazyloadRouteHandler(require.resolve('./routes/tingshen/tingshen')));

// 中华人民共和国人力资源和社会保障部
router.get('/gov/mohrss/sbjm/:category?', lazyloadRouteHandler(require.resolve('./routes/gov/mohrss/sbjm')));

// 深影译站
router.get('/shinybbs/latest', lazyloadRouteHandler(require.resolve('./routes/shinybbs/latest')));
router.get('/shinybbs/p/:id', lazyloadRouteHandler(require.resolve('./routes/shinybbs/p')));
router.get('/shinybbs/page/:id?', lazyloadRouteHandler(require.resolve('./routes/shinybbs/index')));
router.get('/shinybbs', lazyloadRouteHandler(require.resolve('./routes/shinybbs/index')));

// 天眼查
router.get('/tianyancha/hot', lazyloadRouteHandler(require.resolve('./routes/tianyancha/hot')));

// King Arthur
router.get('/kingarthur/:type', lazyloadRouteHandler(require.resolve('./routes/kingarthur/index')));

// 新华网
// router.get('/news/whxw', lazyloadRouteHandler(require.resolve('./routes/news/whxw')));

// 游讯网
router.get('/yxdown/recommend', lazyloadRouteHandler(require.resolve('./routes/yxdown/recommend')));
router.get('/yxdown/news/:category?', lazyloadRouteHandler(require.resolve('./routes/yxdown/news')));

// BabeHub
router.get('/babehub/search/:keyword?', lazyloadRouteHandler(require.resolve('./routes/babehub/search')));
router.get('/babehub/:category?', lazyloadRouteHandler(require.resolve('./routes/babehub/index')));

// 深圳新闻网
router.get('/sznews/press', lazyloadRouteHandler(require.resolve('./routes/sznews/press')));
router.get('/sznews/ranking', lazyloadRouteHandler(require.resolve('./routes/sznews/ranking')));

// Shuax
router.get('/shuax/project/:name?', lazyloadRouteHandler(require.resolve('./routes/shuax/project')));

// BioOne
// router.get('/bioone/featured', lazyloadRouteHandler(require.resolve('./routes/bioone/featured')));

// Obsidian
router.get('/obsidian/announcements', lazyloadRouteHandler(require.resolve('./routes/obsidian/announcements')));

// 吉林工商学院
router.get('/jlbtc/kyc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/jlbtc/kyc')));
router.get('/jlbtc/jwc/:id?', lazyloadRouteHandler(require.resolve('./routes/universities/jlbtc/jwc')));
router.get('/jlbtc/:category?', lazyloadRouteHandler(require.resolve('./routes/universities/jlbtc/index')));

// DT 财经 migrated to v2
// router.get('/dtcj/datahero/:category?', lazyloadRouteHandler(require.resolve('./routes/dtcj/datahero')));
// router.get('/dtcj/datainsight/:id?', lazyloadRouteHandler(require.resolve('./routes/dtcj/datainsight')));

// 劍心．回憶
router.get('/kenshin/:category?/:type?', lazyloadRouteHandler(require.resolve('./routes/kenshin/index')));

// av01
router.get('/av01/actor/:name/:type?', lazyloadRouteHandler(require.resolve('./routes/av01/actor')));
router.get('/av01/tag/:name/:type?', lazyloadRouteHandler(require.resolve('./routes/av01/tag')));

// macked
router.get('/macked/app/:name', lazyloadRouteHandler(require.resolve('./routes/macked/app')));

// 美国劳工联合会-产业工会联合会
router.get('/aflcio/blog', lazyloadRouteHandler(require.resolve('./routes/aflcio/blog')));

// Fur Affinity
router.get('/furaffinity/home/:type?/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/home')));
router.get('/furaffinity/browse/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/browse')));
router.get('/furaffinity/status', lazyloadRouteHandler(require.resolve('./routes/furaffinity/status')));
router.get('/furaffinity/search/:keyword/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/search')));
router.get('/furaffinity/user/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/user')));
router.get('/furaffinity/watching/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/watching')));
router.get('/furaffinity/watchers/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/watchers')));
router.get('/furaffinity/commissions/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/commissions')));
router.get('/furaffinity/shouts/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/shouts')));
router.get('/furaffinity/journals/:username', lazyloadRouteHandler(require.resolve('./routes/furaffinity/journals')));
router.get('/furaffinity/gallery/:username/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/gallery')));
router.get('/furaffinity/scraps/:username/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/scraps')));
router.get('/furaffinity/favorites/:username/:nsfw?', lazyloadRouteHandler(require.resolve('./routes/furaffinity/favorites')));
router.get('/furaffinity/submission_comments/:id', lazyloadRouteHandler(require.resolve('./routes/furaffinity/submission_comments')));
router.get('/furaffinity/journal_comments/:id', lazyloadRouteHandler(require.resolve('./routes/furaffinity/journal_comments')));

// Logseq
router.get('/logseq/changelog', lazyloadRouteHandler(require.resolve('./routes/logseq/changelog')));

// 亿欧网
router.get('/iyiou', lazyloadRouteHandler(require.resolve('./routes/iyiou')));

// 香港商报
router.get('/hkcd/pdf', lazyloadRouteHandler(require.resolve('./routes/hkcd/pdf')));

// 博客来
router.get('/bookscomtw/newbooks/:category', lazyloadRouteHandler(require.resolve('./routes/bookscomtw/newbooks')));

// Elite Babes
router.get('/elitebabes/videos/:sort?', lazyloadRouteHandler(require.resolve('./routes/elitebabes/videos')));
router.get('/elitebabes/search/:keyword?', lazyloadRouteHandler(require.resolve('./routes/elitebabes/search')));
router.get('/elitebabes/:category?', lazyloadRouteHandler(require.resolve('./routes/elitebabes/index')));

// Trakt.tv
router.get('/trakt/collection/:username/:type?', lazyloadRouteHandler(require.resolve('./routes/trakt/collection')));

// 全球化智库
router.get('/ccg/:category?', lazyloadRouteHandler(require.resolve('./routes/ccg/index')));

// 少女前线
// router.get('/gf-cn/news/:category?', lazyloadRouteHandler(require.resolve('./routes/gf-cn/news')));

// Eagle
// router.get('/eagle/changelog/:language?', lazyloadRouteHandler(require.resolve('./routes/eagle/changelog')));

// ezone.hk
// router.get('/ezone/:category?', lazyloadRouteHandler(require.resolve('./routes/ezone/index')));

// 中国橡胶网
router.get('/cria/news/:id?', lazyloadRouteHandler(require.resolve('./routes/cria/news')));

// 灵异网
router.get('/lingyi/:category', lazyloadRouteHandler(require.resolve('./routes/lingyi/index')));

// 歪脑读
router.get('/wainao-reads/all-articles', lazyloadRouteHandler(require.resolve('./routes/wainao/index')));

// react
router.get('/react/react-native-weekly', lazyloadRouteHandler(require.resolve('./routes/react/react-native-weekly')));

// dbaplus 社群
router.get('/dbaplus/activity/:type?', lazyloadRouteHandler(require.resolve('./routes/dbaplus/activity.js')));
router.get('/dbaplus/:tab?', lazyloadRouteHandler(require.resolve('./routes/dbaplus/tab')));

// 梨园
router.get('/liyuan-forums/threads', lazyloadRouteHandler(require.resolve('./routes/liyuan-forums/threads')));
router.get('/liyuan-forums/threads/forum/:forum_id', lazyloadRouteHandler(require.resolve('./routes/liyuan-forums/threads')));
router.get('/liyuan-forums/threads/topic/:topic_id', lazyloadRouteHandler(require.resolve('./routes/liyuan-forums/threads')));
router.get('/liyuan-forums/threads/user/:user_id', lazyloadRouteHandler(require.resolve('./routes/liyuan-forums/threads')));

// 集思录
// router.get('/jisilu/reply/:user', lazyloadRouteHandler(require.resolve('./routes/jisilu/reply')));
// router.get('/jisilu/topic/:user', lazyloadRouteHandler(require.resolve('./routes/jisilu/topic')));

// Constitutional Court of Baden-Württemberg (Germany) migrated to v2
// router.get('/verfghbw/press/:keyword?', lazyloadRouteHandler(require.resolve('./routes/verfghbw/press')));

// Topbook
router.get('/topbook/overview/:id?', lazyloadRouteHandler(require.resolve('./routes/topbook/overview')));
router.get('/topbook/today', lazyloadRouteHandler(require.resolve('./routes/topbook/today')));

// Melon
router.get('/melon/chart/:category?', lazyloadRouteHandler(require.resolve('./routes/melon/chart')));

// 弯弯字幕组
router.get('/wanwansub/info/:id', lazyloadRouteHandler(require.resolve('./routes/wanwansub/info')));
router.get('/wanwansub/:id?', lazyloadRouteHandler(require.resolve('./routes/wanwansub/index')));

// FIX 字幕侠
router.get('/zimuxia/portfolio/:id', lazyloadRouteHandler(require.resolve('./routes/zimuxia/portfolio')));
router.get('/zimuxia/:category?', lazyloadRouteHandler(require.resolve('./routes/zimuxia/index')));

// Bandcamp migrated to v2
// router.get('/bandcamp/tag/:tag?', lazyloadRouteHandler(require.resolve('./routes/bandcamp/tag')));
// router.get('/bandcamp/weekly', lazyloadRouteHandler(require.resolve('./routes/bandcamp/weekly')));

// Hugo 更新日志
router.get('/hugo/releases', lazyloadRouteHandler(require.resolve('./routes/hugo/releases')));

// 东立出版
router.get('/tongli/news/:type', lazyloadRouteHandler(require.resolve('./routes/tongli/news')));

// OR
router.get('/or/:id?', lazyloadRouteHandler(require.resolve('./routes/or')));

// e-hentai migrated to v2
// router.get('/ehentai/favorites/:favcat?/:order?/:page?/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/ehentai/favorites')));
// router.get('/ehentai/search/:params?/:page?/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/ehentai/search')));
// router.get('/ehentai/tag/:tag/:page?/:routeParams?', lazyloadRouteHandler(require.resolve('./routes/ehentai/tag')));

// 字型故事
router.get('/fontstory', lazyloadRouteHandler(require.resolve('./routes/fontstory/tw')));

// HKEPC migrated to v2
// router.get('/hkepc/:category?', lazyloadRouteHandler(require.resolve('./routes/hkepc/index')));

// 海南大学
router.get('/hainanu/ssszs', lazyloadRouteHandler(require.resolve('./routes/hainanu/ssszs')));

// 游戏年轮
router.get('/bibgame/:category?/:type?', lazyloadRouteHandler(require.resolve('./routes/bibgame/category')));

// 澳門特別行政區政府各公共部門獎助貸學金服務平台
router.get('/macau-bolsas/:lang?', lazyloadRouteHandler(require.resolve('./routes/macau-bolsas/index')));

// PotPlayer
router.get('/potplayer/update/:language?', lazyloadRouteHandler(require.resolve('./routes/potplayer/update')));

// 综艺秀
// router.get('/zyshow/:name', lazyloadRouteHandler(require.resolve('./routes/zyshow')));

// 加美财经
router.get('/caus/:category?', lazyloadRouteHandler(require.resolve('./routes/caus')));

// 摩点
router.get('/modian/zhongchou/:category?/:sort?/:status?', lazyloadRouteHandler(require.resolve('./routes/modian/zhongchou')));

// MacWk
router.get('/macwk/soft/:name', lazyloadRouteHandler(require.resolve('./routes/macwk/soft')));

// 世界计划 多彩舞台 feat.初音未来 (ProjectSekai)
router.get('/pjsk/news', lazyloadRouteHandler(require.resolve('./routes/pjsk/news')));

// 人民论坛网
router.get('/rmlt/idea/:category?', lazyloadRouteHandler(require.resolve('./routes/rmlt/idea')));

// CBNData
router.get('/cbndata/information/:category?', lazyloadRouteHandler(require.resolve('./routes/cbndata/information')));

// TANC 艺术新闻
router.get('/tanchinese/:category?', lazyloadRouteHandler(require.resolve('./routes/tanchinese')));

// Harvard
router.get('/harvard/health/blog', lazyloadRouteHandler(require.resolve('./routes/universities/harvard/health/blog')));

// yuzu emulator
router.get('/yuzu-emu/entry', lazyloadRouteHandler(require.resolve('./routes/yuzu-emu/entry')));

// Resources - The Partnership on AI
router.get('/partnershiponai/resources', lazyloadRouteHandler(require.resolve('./routes/partnershiponai/resources')));

// Common App
router.get('/commonapp/blog', lazyloadRouteHandler(require.resolve('./routes/commonapp/blog')));

// Sky Sports
router.get('/skysports/news/:team', lazyloadRouteHandler(require.resolve('./routes/skysports/news')));

// Europa Press
router.get('/europapress/:category?', lazyloadRouteHandler(require.resolve('./routes/europapress')));

// World Happiness Report
router.get('/worldhappiness/blog', lazyloadRouteHandler(require.resolve('./routes/worldhappiness/blog')));
router.get('/worldhappiness/archive', lazyloadRouteHandler(require.resolve('./routes/worldhappiness/archive')));

// 中国纺织经济信息网
router.get('/ctei/news/:id?', lazyloadRouteHandler(require.resolve('./routes/ctei/news')));

// 时事一点通
router.get('/ssydt/article/:id?', lazyloadRouteHandler(require.resolve('./routes/ssydt/article')));

// 湖北省软件行业协会
router.get('/gov/hubei/hbsia/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/hubei/hbsia')));

// 武汉东湖新技术开发区
router.get('/gov/wuhan/wehdz/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/wuhan/wehdz')));

// 武汉市科学技术局
router.get('/gov/wuhan/kjj/:caty', lazyloadRouteHandler(require.resolve('./routes/gov/wuhan/kjj')));

// 费米实验室
router.get('/fnal/news/:category?', lazyloadRouteHandler(require.resolve('./routes/fnal/news')));

// X410
router.get('/x410/news', lazyloadRouteHandler(require.resolve('./routes/x410/news')));

// 恩山无线论坛
router.get('/right/forum/:id?', lazyloadRouteHandler(require.resolve('./routes/right/forum')));

// 香港經濟日報 migrated to v2
// router.get('/hket/:category?', lazyloadRouteHandler(require.resolve('./routes/hket/index')));

// micmicidol
router.get('/micmicidol', lazyloadRouteHandler(require.resolve('./routes/micmicidol/latest')));
router.get('/micmicidol/search/:label', lazyloadRouteHandler(require.resolve('./routes/micmicidol/search')));

// 香港高登
router.get('/hkgolden/:id?/:limit?/:sort?', lazyloadRouteHandler(require.resolve('./routes/hkgolden')));

// 香港討論區
router.get('/discuss/:fid', lazyloadRouteHandler(require.resolve('./routes/discuss')));

// Uwants
router.get('/uwants/:fid', lazyloadRouteHandler(require.resolve('./routes/uwants')));

// Now新聞
router.get('/now/news/rank', lazyloadRouteHandler(require.resolve('./routes/now/rank')));

// s-hentai
router.get('/s-hentai/:id?', lazyloadRouteHandler(require.resolve('./routes/s-hentai')));

// etherscan
router.get('/etherscan/transactions/:address', lazyloadRouteHandler(require.resolve('./routes/etherscan/transactions')));

// foreverblog
router.get('/blogs/foreverblog', lazyloadRouteHandler(require.resolve('./routes/blogs/foreverblog')));

// Netflix
router.get('/netflix/newsroom/:category?/:region?', lazyloadRouteHandler(require.resolve('./routes/netflix/newsroom')));

// SBS
router.get('/sbs/chinese/:category?/:id?/:dialect?/:language?', lazyloadRouteHandler(require.resolve('./routes/sbs/chinese')));

// Asian to lick
// router.get('/asiantolick/:category?/:keyword?', lazyloadRouteHandler(require.resolve('./routes/asiantolick')));

// Research Gate
router.get('/researchgate/publications/:id', lazyloadRouteHandler(require.resolve('./routes/researchgate/publications')));

// QuestMobile
router.get('/questmobile/report/:category?/:label?', lazyloadRouteHandler(require.resolve('./routes/questmobile/report')));

// RSS3
router.get('/rss3/blog', lazyloadRouteHandler(require.resolve('./routes/rss3/blog')));

// 星球日报
// router.get('/odaily/activity', lazyloadRouteHandler(require.resolve('./routes/odaily/activity')));
// router.get('/odaily/newsflash', lazyloadRouteHandler(require.resolve('./routes/odaily/newsflash')));
// router.get('/odaily/user/:id', lazyloadRouteHandler(require.resolve('./routes/odaily/user')));
// router.get('/odaily/:id?', lazyloadRouteHandler(require.resolve('./routes/odaily/post')));

// Fashion Network
router.get('/fashionnetwork/news/:sectors?/:categories?/:language?', lazyloadRouteHandler(require.resolve('./routes/fashionnetwork/news.js')));

// dykszx
router.get('/dykszx/news/:type?', lazyloadRouteHandler(require.resolve('./routes/dykszx/news')));

// 安全内参
router.get('/secrss/category/:category?', lazyloadRouteHandler(require.resolve('./routes/secrss/category')));
router.get('/secrss/author/:author?', lazyloadRouteHandler(require.resolve('./routes/secrss/author')));

// Fashion Network
router.get('/fashionnetwork/headline/:country?', lazyloadRouteHandler(require.resolve('./routes/fashionnetwork/headline.js')));

// mirror.xyz
// router.get('/mirror/:id', lazyloadRouteHandler(require.resolve('./routes/mirror/entries')));

// KBS migrated to v2
// router.get('/kbs/today/:language?', lazyloadRouteHandler(require.resolve('./routes/kbs/today')));
// router.get('/kbs/news/:category?/:language?', lazyloadRouteHandler(require.resolve('./routes/kbs/news')));

// Deprecated: DO NOT ADD ANY NEW ROUTES HERE

module.exports = router;
