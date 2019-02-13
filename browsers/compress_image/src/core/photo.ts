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

    resize: boolean;

    maxWidth: number;

    maxHeight: number;

    orientation: number
}




export const genPhoto = ({quality = 0.75, size = 2, maxWidth = 1920, maxHeight = 1920, resize = false}:CompressOptions): PhotoInfo => {
    // size in MB
    size = size * 1024 * 1024;

    return {
        start: window.performance.now(),
        end: null,
        alt: null,
        ext: null,
        startSize: null,
        startHeight: null,
        // How much will the quality decrease by each compression
        // stepQuality= stepQuality
        size,
        endSize: null,
        endWidth: null,
        endHeight: null,
        iterations: 0,
        base64prefix: null,
        // Carry out image resizing
        quality,
        resize,
        maxWidth,
        maxHeight,
        orientation: 1
    }
};

