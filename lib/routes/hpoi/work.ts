import { ProcessFeed } from './utils';

export default async (ctx) => ctx.set('data', await ProcessFeed('work', ctx.req.param('id'), ctx.req.param('order')));
