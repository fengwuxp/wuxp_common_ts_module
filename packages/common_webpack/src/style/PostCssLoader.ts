import * as path from "path";

/**
 * postcss-loader
 * @author wxup
 * @create 2018-09-25 11:15
 **/

const PostCssLoader= {
    loader: "postcss-loader",
    options: {
        ident: "css-loader",
        config: {
            path: path.join(__dirname, './PostCss.config.js')
        }
    }
};

export default PostCssLoader;
