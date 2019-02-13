/**
 * 将 File 对象装换为base64
 * @param file
 */
const load = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (evt) => {
            // @ts-ignore
            resolve(evt.target.result);
        }, false);

        fileReader.addEventListener('error', (err) => {
            reject(err)
        }, false);

        fileReader.readAsDataURL(file)
    })
};

export default {load}
