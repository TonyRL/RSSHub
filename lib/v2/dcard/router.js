module.exports = (router) => {
    router.get('/posts/:type?', require('./posts'));
    router.get('/:section/:type?', require('./section'));
};
