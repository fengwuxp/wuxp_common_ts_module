/***
 Copyright (c) 2011 CommonsWare, LLC

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

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

public class UpdateLocationAlarmReceiver extends WakeFullAlarmReceiver {

    public void doWorkFromAlarm(Context ctxt, Intent intent) {
        WakefulIntentService.AlarmListener listener = getListener(ctxt);

        if (listener != null) {
            if (intent.getAction() == null) { //闹钟任务唤醒
                SharedPreferences prefs = ctxt.getSharedPreferences(UpdateLocationService.NAME, 0);

                prefs
                        .edit()
                        .putLong(WakefulIntentService.LAST_ALARM, System.currentTimeMillis())
                        .commit();

                listener.sendWakefulWork(ctxt);//启动后台任务
            } else { //有action，则是重启手机BOOT_COMPLETED广播。这时重新生成闹钟任务
                UpdateLocationService.scheduleAlarms(ctxt, true);
            }
        }
    }
}