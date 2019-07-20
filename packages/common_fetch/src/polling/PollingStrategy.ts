export interface PollingCallback<T = any> {


    /**
     * 轮询一次结束
     * @param onfulfilled  传入的callback 返回false表示结束轮询
     */
    done(onfulfilled: (data: T) => boolean | Promise<boolean>): this;

    /**
     * 轮询出现异常
     * @param onrejected 传入的callback 返回false表示结束轮询
     */
    catch(onrejected: (reason: any) => boolean | Promise<boolean>): this;

    /**
     * 轮询完成了
     * @param onfinally
     */
    finally(onfinally?: () => void): this;


    /**
     * 开始轮询
     * 延迟多久开始，
     * 单位毫秒
     * 默认：0
     * @param delay
     */
    start: (delay: number) => void;
}


class DefaultPollingCallback<T = any> implements PollingCallback<T> {

    private onfulfilled: (data: T) => (boolean | Promise<boolean>);

    private onrejected: (data: T) => (boolean | Promise<boolean>);

    private onfinally: () => void;

    private execute: Function;

    constructor(execute) {
        this.execute = execute;
    }

    catch(onrejected: (reason: any) => (boolean | Promise<boolean>)): this {
        this.onrejected = onrejected;
        return this;
    }

    done(onfulfilled: (data: T) => (boolean | Promise<boolean>)): this {
        this.onfulfilled = onfulfilled;
        return this;
    }

    finally(onfinally?: () => void): this {
        this.onfinally = onfinally;
        return this;
    }

    start = (delay: number) => {
        if (delay == 0) {
            this.execute(this.onfulfilled, this.onrejected, this.onfinally)
        } else {
            setTimeout(() =>
                    this.execute(this.onfulfilled, this.onrejected, this.onfinally),
                delay);
        }

    };


}


export interface PollingStrategyOptions {


    /**
     * 轮询间隔
     * 单位毫秒
     */
    interval: number;

    /**
     * 是否已串行的方式进行轮询
     * 默认true
     */
    isSerial?: boolean;

    /**
     * 轮询处理者
     */
    handle: () => any | Promise<any>;
}


type PollingWrapper<T> = (options: PollingStrategyOptions) => PollingCallback<T>


/**
 * 执行轮询
 * @param options
 * @param pollingCallback
 */
const execute = async (options: PollingStrategyOptions, pollingCallback: {
    onfulfilled,
    onrejected,
    onfinally
}) => {

    const {isSerial, handle} = options;

    const {interval} = options;
    const onFinallyIsFn = typeof pollingCallback.onfinally === "function";

    let isNext, result;

    const nextPolling = (isNext: boolean) => {
        if (isNext === false && onFinallyIsFn) {
            pollingCallback.onfinally();
            //结束请求
        } else {
            setTimeout(() => {
                execute(options, pollingCallback)
            }, interval);
        }
    };

    if (isSerial == null || isSerial === true) {
        //串行的方式，需要等待上一次轮询结束
        try {
            result = await handle();
            isNext = await pollingCallback.onfulfilled(result);
        } catch (e) {
            isNext = await pollingCallback.onrejected(e);
        }
        nextPolling(isNext);
    } else {
        //
        handle().then(pollingCallback.onfulfilled)
            .then(nextPolling)
            .catch(pollingCallback.onrejected)
            .then(nextPolling);

    }


};


/**
 * 轮询处理
 * @param options
 */
export const polling: PollingWrapper<any> = <T = any>(options: PollingStrategyOptions): PollingCallback<T> => {

    return new DefaultPollingCallback((
        onfulfilled: (data: T) => (boolean | Promise<boolean>),
        onrejected: (data: T) => (boolean | Promise<boolean>),
        onfinally: () => void
    ) => execute(options, {
        onfulfilled,
        onrejected,
        onfinally
    }));

};
