/**
 * 分页查询
 */

export default {

    data() {
        return {
            pageInfo: null,
            queryStatus: null
        }
    },
    methods: {
        setQueryPage(queryPage = 1) {
            this.pageInfo.queryPage = queryPage;
        },
        setQuerySize(querySize = 10) {
            this.pageInfo.querySize = querySize;
        },

        /**
         * 重置查询状态
         */
        restStartPage() {
            this.pageInfo = {
                queryPage: 1,
                querySize: 10
            };
            this.queryStatus = {
                loading: false,
                end: false
            }
        },

        setQueryLoading(isLoading = false) {
            this.queryStatus.loading = isLoading;
        },
        setQueryEnd(isEnd = true) {
            this.queryStatus.end = isEnd;
        },

        /**
         * 查询动作结束
         * @param length 查询结果的长度
         */
        queryActionEnd(length = 0) {
            this.setQueryLoading(false);
            this.setQueryEnd(length < this.pageInfo.querySize);
            this.pageInfo.queryPage++;
        },
        queryIsLock() {
            return this.queryStatus.loading || this.queryStatus.end;
        },

        /**
         * 处理查询结果
         * @param resultData   结果数据
         * @param data         保存数据对象
         * @param dataHandler  数据处理函数，必须要放回数据的处理结果
         */
        handleQueryResult(resultData = [], data: Array<any>, dataHandler: (item: any) => any) {
            const list = Object.assign([], data);
            if (typeof dataHandler === "function") {
                resultData.forEach((item) => {
                    list[list.length] = dataHandler(item);
                });
            } else {
                resultData.forEach((item) => {
                    list[list.length] = item;
                });
            }
            return list;
        }

    },
    created() {
        this.restStartPage();
    }
}