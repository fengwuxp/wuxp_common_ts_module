import {WeexModule} from "weex";
import {photo} from "../../../ExpotrtWeexOAKModel";


/**
 * weex 查看大图
 */
export interface WeexViewLargerImageStandardizationModule extends WeexModule {

    /**
     * 初始化大图的ur类列表
     * @param largerImages 大图列表
     * @param smallImages  小图列表
     */
    initLargerImages: (largerImages: string[], smallImages?: string[]) => void;

    /**
     * 打开大图面板
     * @url 与大图对应的小图的url
     */
    showLargerImagePlan: (smallImageUrl: string) => Promise<void>;
}


class SimpleWeexViewLargerImageStandardizationModule implements WeexViewLargerImageStandardizationModule {

    private largerImages: string[] = [];

    private smallImages: string[] = [];

    initLargerImages = (largerImages: string[], smallImages?: string[]) => {
        this.largerImages = largerImages;
        this.smallImages = smallImages || largerImages;
    };

    showLargerImagePlan = (smallImageUrl: string): Promise<void> => {
        if (this.smallImages.length === 0) {
            return Promise.reject("not init");
        }
        const index = this.smallImages.indexOf(smallImageUrl);
        if (index < 0) {
            return Promise.reject();
        }
        return new Promise<void>((resolve, reject) => {

            photo.showAtlas(
                this.largerImages,
                index,
                resolve,
                reject
            )
        })

    };


}

export const simpleWeexViewLargerImageStandardizationModule: WeexViewLargerImageStandardizationModule = new SimpleWeexViewLargerImageStandardizationModule();
