const DEFAULT_BASE_PATH = "/static_resources";

const DEFAULT_IMAGE_DIR = "/images";

const DEFAULT_FONT_DIR = "/images";


const genResourcesPath = (uri: string, dir: string) => {
    const is = uri.startsWith("/");

    return `${DEFAULT_BASE_PATH}${dir}${is ? uri : '/' + uri}`;
};

/**
 * 获取小程序的图片资源
 * @param uri
 */
export const getAppletImageResourceUrl = (uri: string) => {

    return genResourcesPath(uri, DEFAULT_IMAGE_DIR);

};

export const getAppletFontResourceUrl = (uri: string) => {

    return genResourcesPath(uri, DEFAULT_FONT_DIR);

};