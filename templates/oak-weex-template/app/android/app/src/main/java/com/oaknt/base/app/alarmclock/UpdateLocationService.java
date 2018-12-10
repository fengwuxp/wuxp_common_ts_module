/***
 Copyright (c) 2009-11 CommonsWare, LLC

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
import android.os.PowerManager;
import android.preference.PreferenceManager;
import android.util.Log;

import com.google.gson.Gson;
import com.oaknt.base.app.bean.AddCartTrackBody;
import com.oaknt.base.app.bean.Location;
import com.oaknt.base.app.util.AppConfig;
import com.oaknt.base.app.util.LocationHelper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class UpdateLocationService extends WakefulIntentService {
    public static final String NAME =
            "com.oaknt.jiannong.buyer.alarmclock.WakefulIntentService";
    public static final int alarmId = 0;

    public UpdateLocationService() {
        super("UpdateLocationService");
    }

    @Override
    protected void doWakefulWork(Intent intent) {
        LocationHelper.getInstance().startLocation(this, true, new LocationHelper.OnBackListener() {
            @Override
            public void onFailed(int errorCode) {

            }

            @Override
            public void onSuccess(Location location) {
                upLocation(location);
            }
        });

    }

    private void upLocation(Location location) {
        Log.e("=====",location.address);
        try {
            SimpleDateFormat format=new SimpleDateFormat("yyyy_MM-dd HH:mm:ss");
            String url = AppConfig.API_URL + "/ws/SupplyService/addCarsTrack";
            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .connectTimeout(10000L, TimeUnit.MILLISECONDS)
                    .readTimeout(10000L, TimeUnit.MILLISECONDS)
                    //其他配置
                    .build();
            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
            AddCartTrackBody trackBody = new AddCartTrackBody();
            trackBody.setCarsId(preferences.getLong(AppConfig.MAP_KEY.CART_ID, -1));
            trackBody.setRecordId(preferences.getLong(AppConfig.MAP_KEY.RECORD_ID, -1));
            trackBody.setPosition(location.address);
            trackBody.setLatitude(location.lat);
            trackBody.setLongitude(location.lng);
            trackBody.setAddTime(format.format(new Date()));
            Gson gson = new Gson();
            String body = gson.toJson(trackBody, AddCartTrackBody.class);

            MediaType MEDIA_TYPE_TEXT = MediaType.parse("application/json");
            Request request = new Request.Builder().url(url).post(RequestBody.create(MEDIA_TYPE_TEXT, body)).build();

            Call call = okHttpClient.newCall(request);

            Response response = call.execute();
            if (response.isSuccessful()) {
                String json = response.body().string();
                Log.e("=====",json);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public PowerManager.WakeLock getLock(Context context) {
        return getLock(context, NAME);
    }

    /**
     * 启动 后台 service
     *
     * @param ctxt
     * @param i
     */
    public static void sendWakefulWork(Context ctxt, Intent i) {
        sendWakefulWork(ctxt, i, NAME);
    }

    /**
     * 启动 后台 service
     *
     * @param ctxt
     * @param clsService
     */
    public static void sendWakefulWork(Context ctxt, Class<?> clsService) {
        sendWakefulWork(ctxt, clsService, NAME);
    }

    /**
     * 强制生成一个闹钟任务
     *
     * @param ctxt
     */
    public static void scheduleAlarms(Context ctxt) {
        scheduleAlarms(ctxt, true);
    }

    /**
     * 生成一个闹钟任务
     *
     * @param ctxt
     * @param force
     */
    public static void scheduleAlarms(Context ctxt, boolean force) {
        scheduleAlarms(new UpdateLocationListener(), ctxt, force, UpdateLocationAlarmReceiver.class, alarmId, NAME);
    }

    /**
     * 取消闹钟任务
     *
     * @param ctxt
     */
    public static void cancelAlarms(Context ctxt) {
        cancelAlarms(ctxt, UpdateLocationAlarmReceiver.class, alarmId, NAME);
    }
}
