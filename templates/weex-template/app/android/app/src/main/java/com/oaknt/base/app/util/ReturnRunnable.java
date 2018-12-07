package com.oaknt.base.app.util;

import android.util.Log;

import java.util.concurrent.Semaphore;

/**
 * 创建者     ky-wrg
 * 创建时间   17/7/1
 * 描述       异步执行。不可嵌套
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public abstract class ReturnRunnable implements Runnable {
    private Semaphore runSemaphore;
    private Object resultObject;

    public ReturnRunnable() {
        super();
        runSemaphore = new Semaphore(0);
    }

    public Object getResult() {
        try {
            runSemaphore.acquire();
        } catch (InterruptedException e) {
            Log.e("ReturnRunnable", "Can't acquire run semaphore... problem...");
        }
        return resultObject;
    }

    public void run() {
        doRun();
    }
    protected abstract Object runWithReturn();

    public void doRun() {
        setResult(runWithReturn());
    }

    private void setResult(Object obj) {
        resultObject = obj;
        runSemaphore.release();
    }
}
