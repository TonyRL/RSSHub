import { HeaderGenerator, PRESETS, type HeaderGeneratorOptions } from 'header-generator';

export { PRESETS } from 'header-generator';

/**
 * Checks if a generated user agent is valid (doesn't contain unwanted strings)
 *
 * @param {string} userAgent The user agent string to validate
 * @param {string} browser The browser type (used to determine which filters to apply)
 * @returns {boolean} True if the user agent is valid, false if it contains unwanted strings
 */
const isValidUserAgent = (userAgent: string, browser: string): boolean => {
    browser = browser.toLowerCase();

    if (browser === 'chrome') {
        return !(userAgent.includes('Chrome-Lighthouse') || userAgent.includes('Gener8') || userAgent.includes('HeadlessChrome') || userAgent.includes('SMTBot') || userAgent.includes('Electron') || userAgent.includes('Code'));
    }

    if (browser === 'safari') {
        return !userAgent.includes('Applebot');
    }

    return true;
};

/**
 * Generate full headers including sec-ch-* and sec-fetch-* headers
 *
 * @param {Partial<HeaderGeneratorOptions>} preset Preset from header-generator package (defaults to PRESETS.MODERN_MACOS_CHROME)
 * @returns Headers object with user-agent and additional headers
 */
export const generateHeaders = (preset: Partial<HeaderGeneratorOptions> = PRESETS.MODERN_MACOS_CHROME) => {
    const generator = new HeaderGenerator(preset);
    let headers = generator.getHeaders();

    // Apply filtering logic for unwanted UAs
    // For preset-based approach, we'll use a generic browser detection from the user agent
    const userAgent = headers['user-agent'];
    let detectedBrowser: string;
    if (userAgent.includes('Firefox')) {
        detectedBrowser = 'firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        detectedBrowser = 'safari';
    } else {
        detectedBrowser = 'chrome';
    }

    let attempts = 0;
    while (!isValidUserAgent(headers['user-agent'], detectedBrowser) && attempts < 10) {
        headers = generator.getHeaders();
        attempts++;
    }

    return headers;
};

/** List of headers to include from header-generator output
 * excluding headers that are typically set manually or by the environment
 */
export const headers = new Set([
    // 'content-length',
    // 'cache-control',
    'sec-ch-ua',
    'sec-ch-ua-mobile',
    'sec-ch-ua-platform',
    // 'origin',
    // 'content-type',
    'upgrade-insecure-requests',
    // 'user-agent', // handle manually
    'accept',
    'sec-fetch-site',
    'sec-fetch-mode',
    'sec-fetch-user',
    'sec-fetch-dest',
    // 'referer', // handle manually
    'accept-encoding',
    'accept-language',
    // 'cookie',
    'priority',
]);
