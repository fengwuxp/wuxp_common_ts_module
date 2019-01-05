import AppRouter from "./AppRouter";


interface ViewParams {

    /**
     * 查询参数
     */
    queryParams?: {
        [k: string]: any
    },

    /**
     * 页面状态
     */
    state?: {
        [k: string]: any
    }
}

export default class AppRouterHelper {
    static toView(pathname: string, viewPrams?: ViewParams) {
        return AppRouter.toView({
            pathname,
            ...(viewPrams || {})
        });
    }

    static backView() {
        AppRouter.back();
    }
}