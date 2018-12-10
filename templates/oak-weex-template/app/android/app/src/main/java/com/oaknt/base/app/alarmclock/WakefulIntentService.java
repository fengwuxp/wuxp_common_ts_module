/***
 Copyright (c) 2009-14 CommonsWare, LLC

 Licensed under the Apache License, Version 2.0 (the "License"); you may
 not use this file except in compliance with the License. You may obtain
 a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

package com.oaknt.base.app.alarmclock;

import android.app.AlarmManager;
import android.app.IntentService;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.PowerManager;
import android.util.Log;

abstract public class WakefulIntentService extends IntentService {
    abstract protected void doWakefulWork(Intent intent);

    abstract protected PowerManager.WakeLock getLock(Context context);

    static final String LAST_ALARM = "lastAlarm";
    private static volatile PowerManager.WakeLock lockStatic = null;

    synchronized protected static PowerManager.WakeLock getLock(Context context, String name) {
        if (lockStatic == null) {
            PowerManager mgr =
                    (PowerManager) context.getSystemService(Context.POWER_SERVICE);

            lockStatic = mgr.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, name);
            lockStatic.setReferenceCounted(true);
        }

        return (lockStatic);
    }

    /**
     * 启动 后台 service
     *
     * @param ctxt
     * @param i
     */
    protected static void sendWakefulWork(Context ctxt, Intent i, String name) {
        getLock(ctxt.getApplicationContext(), name).acquire();
        ctxt.startService(i);
    }

    /**
     * 启动 后台 service
     *
     * @param ctxt
     * @param clsService
     */
    protected static void sendWakefulWork(Context ctxt, Class<?> clsService, String name) {
        sendWakefulWork(ctxt, new Intent(ctxt, clsService), name);
    }

    /**
     * 生成一个闹钟任务
     *
     * @param listener
     * @param ctxt
     */
    protected static void scheduleAlarms(AlarmListener listener, Context ctxt,Class<?> clsReceiver, int alarmId, String name) {
        scheduleAlarms(listener, ctxt, true,clsReceiver, alarmId, name);
    }

    /**
     * 生成一个闹钟任务
     *
     * @param listener
     * @param ctxt
     * @param force
     */
    protected static void scheduleAlarms(AlarmListener listener,
                                         Context ctxt, boolean force,Class<?> clsReceiver, int alarmId, String name) {
        SharedPreferences prefs = ctxt.getSharedPreferences(name, 0);
        long lastAlarm = prefs.getLong(LAST_ALARM, 0);

        if (lastAlarm == 0
                || force
                || (System.currentTimeMillis() > lastAlarm && System.currentTimeMillis()
                - lastAlarm > listener.getMaxAge(ctxt))) {
            AlarmManager mgr =
                    (AlarmManager) ctxt.getSystemService(Context.ALARM_SERVICE);
            Intent i = new Intent(ctxt, clsReceiver);
            PendingIntent pi = PendingIntent.getBroadcast(ctxt, alarmId, i, 0);

            listener.scheduleAlarms(mgr, pi, ctxt);
        }
    }

    /**
     * 取消闹钟任务
     *
     * @param ctxt
     */
    protected static void cancelAlarms(Context ctxt,Class<?> clsReceiver, int alarmId, String name) {
        AlarmManager mgr =
                (AlarmManager) ctxt.getSystemService(Context.ALARM_SERVICE);
        Intent i = new Intent(ctxt, clsReceiver);
        PendingIntent pi = PendingIntent.getBroadcast(ctxt, alarmId, i, 0);

        mgr.cancel(pi);

        ctxt.getSharedPreferences(name, 0).edit().remove(LAST_ALARM)
                .commit();
    }

    public WakefulIntentService(String name) {
        super(name);
        setIntentRedelivery(true);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        PowerManager.WakeLock lock = getLock(this.getApplicationContext());

        if (!lock.isHeld() || (flags & START_FLAG_REDELIVERY) != 0) {
            lock.acquire();
        }

        super.onStartCommand(intent, flags, startId);

        return (START_REDELIVER_INTENT);
    }

    @Override
    final protected void onHandleIntent(Intent intent) {
        try {
            doWakefulWork(intent);
        } finally {
            PowerManager.WakeLock lock = getLock(this.getApplicationContext());

            if (lock.isHeld()) {
                try {
                    lock.release();
                } catch (Exception e) {
                    Log.e(getClass().getSimpleName(),
                            "Exception when releasing wakelock", e);
                }
            }
        }
    }

    public interface AlarmListener {
        void scheduleAlarms(AlarmManager mgr, PendingIntent pi, Context ctxt);

        void sendWakefulWork(Context ctxt);

        long getMaxAge(Context ctxt);
    }
}
