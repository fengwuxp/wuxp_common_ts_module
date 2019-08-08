'use strict';
// TODO: Use the `URL` global when targeting Node.js 10
const URLParser = typeof URL === 'undefined' ? require('url').URL : URL;

const testParameter = (name, filters) => {
    return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
};


interface NormalizeUrlOptions {
    /**
     @default 'http:'
     */
     defaultProtocol?: string;

    /**
     Prepends `defaultProtocol` to the URL if it's protocol-relative.

     @default true

     @example
     ```
     normalizeUrl('//sindresorhus.com:80/');
     //=> 'http://sindresorhus.com'

     normalizeUrl('//sindresorhus.com:80/', {normalizeProtocol: false});
     //=> '//sindresorhus.com'
     ```
     */
     normalizeProtocol?: boolean;

    /**
     Normalizes `https:` URLs to `http:`.

     @default false

     @example
     ```
     normalizeUrl('https://sindresorhus.com:80/');
     //=> 'https://sindresorhus.com'

     normalizeUrl('https://sindresorhus.com:80/', {forceHttp: true});
     //=> 'http://sindresorhus.com'
     ```
     */
     forceHttp?: boolean;

    /**
     Normalizes `http:` URLs to `https:`.

     This option can't be used with the `forceHttp` option at the same time.

     @default false

     @example
     ```
     normalizeUrl('https://sindresorhus.com:80/');
     //=> 'https://sindresorhus.com'

     normalizeUrl('http://sindresorhus.com:80/', {forceHttps: true});
     //=> 'https://sindresorhus.com'
     ```
     */
     forceHttps?: boolean;

    /**
     Strip the [authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) part of a URL.

     @default true

     @example
     ```
     normalizeUrl('user:password@sindresorhus.com');
     //=> 'https://sindresorhus.com'

     normalizeUrl('user:password@sindresorhus.com', {stripAuthentication: false});
     //=> 'https://user:password@sindresorhus.com'
     ```
     */
     stripAuthentication?: boolean;

    /**
     Removes hash from the URL.

     @default false

     @example
     ```
     normalizeUrl('sindresorhus.com/about.html#contact');
     //=> 'http://sindresorhus.com/about.html#contact'

     normalizeUrl('sindresorhus.com/about.html#contact', {stripHash: true});
     //=> 'http://sindresorhus.com/about.html'
     ```
     */
     stripHash?: boolean;

    /**
     Removes HTTP(S) protocol from an URL `http://sindresorhus.com` → `sindresorhus.com`.

     @default false

     @example
     ```
     normalizeUrl('https://sindresorhus.com');
     //=> 'https://sindresorhus.com'

     normalizeUrl('sindresorhus.com', {stripProtocol: true});
     //=> 'sindresorhus.com'
     ```
     */
     stripProtocol?: boolean;

    /**
     Removes `www.` from the URL.

     @default true

     @example
     ```
     normalizeUrl('http://www.sindresorhus.com');
     //=> 'http://sindresorhus.com'

     normalizeUrl('http://www.sindresorhus.com', {stripWWW: false});
     //=> 'http://www.sindresorhus.com'
     ```
     */
     stripWWW?: boolean;

    /**
     Removes query parameters that matches any of the provided strings or regexes.

     @default [/^utm_\w+/i]

     @example
     ```
     normalizeUrl('www.sindresorhus.com?foo=bar&ref=test_ref', {
			removeQueryParameters: ['ref']
		});
     //=> 'http://sindresorhus.com/?foo=bar'
     ```
     */
     removeQueryParameters?: (RegExp | string)[];

    /**
     Removes trailing slash.

     __Note__: Trailing slash is always removed if the URL doesn't have a pathname.

     @default true

     @example
     ```
     normalizeUrl('http://sindresorhus.com/redirect/');
     //=> 'http://sindresorhus.com/redirect'

     normalizeUrl('http://sindresorhus.com/redirect/', {removeTrailingSlash: false});
     //=> 'http://sindresorhus.com/redirect/'

     normalizeUrl('http://sindresorhus.com/', {removeTrailingSlash: false});
     //=> 'http://sindresorhus.com'
     ```
     */
     removeTrailingSlash?: boolean;

    /**
     Removes the default directory index file from path that matches any of the provided strings or regexes.
     When `true`, the regex `/^index\.[a-z]+$/` is used.

     @default false

     @example
     ```
     normalizeUrl('www.sindresorhus.com/foo/default.php', {
			removeDirectoryIndex: [/^default\.[a-z]+$/]
		});
     //=> 'http://sindresorhus.com/foo'
     ```
     */
     removeDirectoryIndex?: (RegExp | string)[] | boolean;

    /**
     Sorts the query parameters alphabetically by key.

     @default true

     @example
     ```
     normalizeUrl('www.sindresorhus.com?b=two&a=one&c=three', {
			sortQueryParameters: false
		});
     //=> 'http://sindresorhus.com/?b=two&a=one&c=three'
     ```
     */
    readonly sortQueryParameters?: boolean;
}

/**
 * 标准化url
 * @param urlString
 * @param options
 */
export const normalizeUrl = (urlString:string, options?: NormalizeUrlOptions): string => {
    options = {
        defaultProtocol: 'http:',
        normalizeProtocol: true,
        forceHttp: false,
        forceHttps: false,
        stripAuthentication: true,
        stripHash: false,
        stripWWW: true,
        removeQueryParameters: [/^utm_\w+/i],
        removeTrailingSlash: true,
        removeDirectoryIndex: false,
        sortQueryParameters: true,
        ...options
    };

    // TODO: Remove this at some point in the future
    if (Reflect.has(options, 'normalizeHttps')) {
        throw new Error('options.normalizeHttps is renamed to options.forceHttp');
    }

    if (Reflect.has(options, 'normalizeHttp')) {
        throw new Error('options.normalizeHttp is renamed to options.forceHttps');
    }

    if (Reflect.has(options, 'stripFragment')) {
        throw new Error('options.stripFragment is renamed to options.stripHash');
    }

    urlString = urlString.trim();

    const hasRelativeProtocol = urlString.startsWith('//');
    const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

    // Prepend protocol
    if (!isRelativeUrl) {
        urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
    }

    const urlObj = new URLParser(urlString);

    if (options.forceHttp && options.forceHttps) {
        throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
    }

    if (options.forceHttp && urlObj.protocol === 'https:') {
        urlObj.protocol = 'http:';
    }

    if (options.forceHttps && urlObj.protocol === 'http:') {
        urlObj.protocol = 'https:';
    }

    // Remove auth
    if (options.stripAuthentication) {
        urlObj.username = '';
        urlObj.password = '';
    }

    // Remove hash
    if (options.stripHash) {
        urlObj.hash = '';
    }

    // Remove duplicate slashes if not preceded by a protocol
    if (urlObj.pathname) {
        // TODO: Use the following instead when targeting Node.js 10
        // `urlObj.pathname = urlObj.pathname.replace(/(?<!https?:)\/{2,}/g, '/');`
        urlObj.pathname = urlObj.pathname.replace(/((?!:).|^)\/{2,}/g, (_, p1) => {
            if (/^(?!\/)/g.test(p1)) {
                return `${p1}/`;
            }

            return '/';
        });
    }

    // Decode URI octets
    if (urlObj.pathname) {
        urlObj.pathname = decodeURI(urlObj.pathname);
    }

    // Remove directory index
    if (options.removeDirectoryIndex === true) {
        options.removeDirectoryIndex = [/^index\.[a-z]+$/];
    }

    if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
        let pathComponents = urlObj.pathname.split('/');
        const lastComponent = pathComponents[pathComponents.length - 1];

        if (testParameter(lastComponent, options.removeDirectoryIndex)) {
            pathComponents = pathComponents.slice(0, pathComponents.length - 1);
            urlObj.pathname = pathComponents.slice(1).join('/') + '/';
        }
    }

    if (urlObj.hostname) {
        // Remove trailing dot
        urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

        // Remove `www.`
        if (options.stripWWW && /^www\.([a-z\-\d]{2,63})\.([a-z.]{2,5})$/.test(urlObj.hostname)) {
            // Each label should be max 63 at length (min: 2).
            // The extension should be max 5 at length (min: 2).
            // Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
            urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
        }
    }

    // Remove query unwanted parameters
    if (Array.isArray(options.removeQueryParameters)) {
        for (const key of [...urlObj.searchParams.keys()]) {
            if (testParameter(key, options.removeQueryParameters)) {
                urlObj.searchParams.delete(key);
            }
        }
    }

    // Sort query parameters
    if (options.sortQueryParameters) {
        urlObj.searchParams.sort();
    }

    if (options.removeTrailingSlash) {
        urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
    }

    // Take advantage of many of the Node `url` normalizations
    urlString = urlObj.toString();

    // Remove ending `/`
    if ((options.removeTrailingSlash || urlObj.pathname === '/') && urlObj.hash === '') {
        urlString = urlString.replace(/\/$/, '');
    }

    // Restore relative protocol, if applicable
    if (hasRelativeProtocol && !options.normalizeProtocol) {
        urlString = urlString.replace(/^http:\/\//, '//');
    }

    // Remove http/https
    if (options.stripProtocol) {
        urlString = urlString.replace(/^(?:https?:)?\/\//, '');
    }

    return urlString;
};

