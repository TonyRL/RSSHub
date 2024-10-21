import { serve, ServerType } from '@hono/node-server';
import logger from '@/utils/logger';
import { getLocalhostAddress } from '@/utils/common-utils';
import { config } from '@/config';
import app from '@/app';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';

const port = config.connect.port;
const hostIPList = getLocalhostAddress();
const numCPUs = availableParallelism();

let server = {} as ServerType;
if (config.enableCluster && cluster.isPrimary && process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'dev') {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    logger.info(`🎉 RSSHub is running on port ${port}! Cheers!`);
    logger.info('💖 Can you help keep this open source project alive? Please sponsor 👉 https://docs.rsshub.app/sponsor');
    logger.info(`🔗 Local: 👉 http://localhost:${port}`);
    if (config.listenInaddrAny) {
        for (const ip of hostIPList) {
            logger.info(`🔗 Network: 👉 http://${ip}:${port}`);
        }
    }

    server = serve({
        fetch: app.fetch,
        hostname: config.listenInaddrAny ? '::' : '127.0.0.1',
        port,
    });
}

export default server;
