// https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images/31273162#31273162


/**
 * 计算旋转的角度
 * @param file
 */
const orientation = (file: File) => {
    return new Promise<number>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            // @ts-ignore
            var view = new DataView(event.target.result);

            if (view.getUint16(0, false) !== 0xFFD8) {
                resolve(-2)
            }
            const length = view.byteLength;
            let offset = 2;

            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;

                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        resolve(-1)
                    }
                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;

                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            resolve(view.getUint16(offset + (i * 12) + 8, little))
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) break;
                else offset += view.getUint16(offset, false)
            }
            resolve(-1)
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024))
    })
};

export default {orientation}
