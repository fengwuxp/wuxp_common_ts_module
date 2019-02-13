// The photo model

import {CompressOptions} from "../Compress";

interface PhotoInfo {

    start: number;

    end: number;

    alt: string;

    ext: string;

    startSize: number;

    startHeight: number;

    size: number;

    endSize: number;

    endWidth: number;

    endHeight: number;

    iterations: number;

    base64prefix: string;

    // Carry out image resizing
    quality: number;

    /**
     * 最小压缩率
     */
    minQuality: number;

    resize: boolean;

    maxWidth: number;

    maxHeight: number;

    orientation: number
}

const DEFAULT_OPTIONS: CompressOptions = {
    quality: 0.5,
    minQuality: 0.3,
    size: 0.6,
    maxWidth: 1920,
    maxHeight: 1920,
    resize: false,
    minimumErrorSize: 10 * 1024
};

export const genPhoto = (options?: CompressOptions): PhotoInfo => {

    const {
        quality = 0.5,
        size = 0.6,
        maxWidth = 1920,
        maxHeight = 1920,
        resize = false,
        minQuality = 0.3
    } = {
        ...DEFAULT_OPTIONS,
        ...(options || {})
    };

    // size in MB
    const targetSize = size * 1024 * 1024;

    return {
        start: window.performance.now(),
        end: null,
        alt: null,
        ext: null,
        startSize: null,
        startHeight: null,
        // How much will the quality decrease by each compression
        // stepQuality= stepQuality
        size: targetSize,
        minQuality: minQuality >= quality ? 0.1 : minQuality,
        endSize: null,
        endWidth: null,
        endHeight: null,
        iterations: 0,
        base64prefix: null,
        // Carry out image resizing
        quality: quality === 0.1 ? quality + 0.05 : quality,
        resize,
        maxWidth,
        maxHeight,
        orientation: 1
    }
};

