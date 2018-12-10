package com.oaknt.base.app.util;

import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.os.Message;
import android.os.PowerManager;
import android.util.Log;

import java.lang.ref.WeakReference;

/**
 * 创建者     ky-wrg
 * 创建时间   17/7/8
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class SipExecutorHandler extends Handler {
    private WeakReference<Object> handlerService;
    private static HandlerThread executorThread;
    private static SipWakeLock sipWakeLock;
    private static final String TAG=SipExecutorHandler.class.getSimpleName();

    public SipExecutorHandler(Context context,Object obj) {
        super(createLooper());
        handlerService = new WeakReference<Object>(obj);
        sipWakeLock = new SipWakeLock((PowerManager) context.getSystemService(Context.POWER_SERVICE));
    }

    public static void stopHandlerThread(){
        sipWakeLock.reset();
        if (executorThread!=null){
            // If we activate that we can get two concurrent executorThread
            synchronized (executorThread) {
                HandlerThread currentHandlerThread = executorThread;
                executorThread = null;
                stopHandlerThread(currentHandlerThread, false);
            }
        }
    }

    public void execute(Runnable task) {
        Object s = handlerService.get();
        if(s != null) {
            sipWakeLock.acquire(task);
        }
        Message.obtain(this, 0/* don't care */, task).sendToTarget();
    }

    @Override
    public void handleMessage(Message msg) {
        if (msg.obj instanceof Runnable) {
            executeInternal((Runnable) msg.obj);
        } else {
            Log.d(TAG, "can't handle msg: " + msg);
        }
    }

    private void executeInternal(Runnable task) {
        try {
            task.run();
        } catch (Throwable t) {
            Log.d(TAG, "run task: " + task, t);
        } finally {
            Object s = handlerService.get();
            if(s != null) {
                sipWakeLock.release(task);
            }
        }
    }

    private static Looper createLooper() {
        if(executorThread == null) {
            Log.d(TAG, "Creating new handler thread");
            // ADT gives a fake warning due to bad parse rule.
            executorThread = new HandlerThread("SipManager.Executor");
            executorThread.start();
        }
        return executorThread.getLooper();
    }

    private static void stopHandlerThread(HandlerThread handlerThread, boolean wait) {
        if(handlerThread == null) {
            //Nothing to do if already null
            return;
        }
        boolean fails = true;

        if(Build.VERSION.SDK_INT >= 5) {
            try {
                handlerThread.quit();
                fails = false;
            } catch (Exception e) {
                Log.d(TAG, "Something is wrong with api level declared use fallback method");
            }
        }
        if (fails && handlerThread.isAlive() && wait) {
            try {
                //This is needed for android 4 and lower
                handlerThread.join(500);
				/*
				if (handlerThread.isAlive()) {
					handlerThread.
				}
				*/
            } catch (Exception e) {
                Log.e(TAG, "Can t finish handler thread....", e);
            }
        }
    }
}
