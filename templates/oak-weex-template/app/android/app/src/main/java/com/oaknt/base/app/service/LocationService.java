package com.oaknt.base.app.service;

import android.annotation.TargetApi;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.app.job.JobInfo;
import android.app.job.JobParameters;
import android.app.job.JobScheduler;
import android.app.job.JobService;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.PowerManager;
import android.util.Log;

import com.oaknt.base.app.bean.AddCartTrackBody;
import com.oaknt.base.app.bean.Location;
import com.oaknt.base.app.provider.CarLocationDBUtil;
import com.oaknt.base.app.util.AppConfig;
import com.oaknt.base.app.util.ForegroundNotifications;
import com.oaknt.base.app.util.LocationHelper;

import net.grandcentrix.tray.AppPreferences;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 创建者     ky-wrg
 * 创建时间   17/9/30
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class LocationService extends Service {
    private static final String TAG = LocationService.class.getSimpleName();
    private ForegroundNotifications notifications;
    PowerManager.WakeLock m_wklk;
    final static int jobId=2;
    SendDataRunable runnable;
    long send_message_interval;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate");
        notifications=new ForegroundNotifications(this);
        notifications.onServiceCreate();

        PowerManager pm = (PowerManager)getSystemService(POWER_SERVICE);
        m_wklk = pm.newWakeLock(PowerManager.SCREEN_DIM_WAKE_LOCK, "cn");
        m_wklk.acquire(); //设置保持唤醒

        AppPreferences preferences=new AppPreferences(this);
        send_message_interval=preferences.getLong(AppConfig.MAP_KEY.UPLOAD_LOCATION_INTERVAL,0);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        notifications.notifyRegistered();
        if (runnable==null)
            runnable = new SendDataRunable();

        handler.removeCallbacks(runnable);
        handler.postDelayed(runnable, send_message_interval*1000);

        return Service.START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "onDestroy");
        keepLive();
        m_wklk.release(); //解除保持唤醒
        super.onDestroy();
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Log.i(TAG, "onTaskRemoved");
        super.onTaskRemoved(rootIntent);
        keepLive();
    }
    private void keepLive(){

        if (send_message_interval==0){
            return;
        }
        //定时检查 AbsWorkService 是否在运行，如果不在运行就把它拉起来
        //Android 5.0+ 使用 JobScheduler
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            JobInfo.Builder builder = new JobInfo.Builder(jobId, new ComponentName(this, JobSchedulerService.class));
            builder.setPeriodic(5*1000);
            //Android 7.0+ 增加了一项针对 JobScheduler 的新限制，最小间隔只能是下面设定的数字
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)
                builder.setPeriodic(JobInfo.getMinPeriodMillis(), JobInfo.getMinFlexMillis());
            builder.setPersisted(true);
            JobScheduler scheduler = (JobScheduler) getSystemService(JOB_SCHEDULER_SERVICE);
            scheduler.schedule(builder.build());
        } else {
            //Android 4.4- 使用 AlarmManager
            AlarmManager am = (AlarmManager) getSystemService(ALARM_SERVICE);
            Intent i = new Intent(this, LocationService.class);
            PendingIntent sPendingIntent = PendingIntent.getService(this, jobId, i, PendingIntent.FLAG_UPDATE_CURRENT);
            am.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 5*1000, sPendingIntent);
        }
    }
    private void upLocation(Location location) {
        //Log.e("=====",location.address);
        AppPreferences preferences=new AppPreferences(this);

        long carId=preferences.getLong(AppConfig.MAP_KEY.CART_ID,-1);
        long recordId=preferences.getLong(AppConfig.MAP_KEY.RECORD_ID,-1);
        if (carId==-1 || recordId==-1){
            Log.e(TAG,"参数不正确，carId="+carId+";recordId="+recordId);
            return;
        }

        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        AddCartTrackBody trackBody = new AddCartTrackBody();
        trackBody.setCarsId(carId);
        trackBody.setRecordId(recordId);
        trackBody.setPosition(location.address);
        trackBody.setLatitude(location.lat);
        trackBody.setLongitude(location.lng);
        trackBody.setAddTime(format.format(new Date()));

        boolean b=LocationHelper.getInstance().uploadLocation(trackBody);
        if (!b){
            CarLocationDBUtil.insert(this,trackBody);
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public static class JobSchedulerService extends JobService {
        public JobSchedulerService() {
        }

        @Override
        public boolean onStartJob(JobParameters params) {
            try {startService(new Intent(getApplication(), LocationService.class));} catch (Exception ignored) {}
            jobFinished(params, false);
            JobScheduler scheduler = (JobScheduler) getSystemService(JOB_SCHEDULER_SERVICE);
            scheduler.cancel(jobId);
            return false;
        }

        @Override
        public boolean onStopJob(JobParameters params) {
            return false;
        }
    }
    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 1:
                    AppPreferences preferences=new AppPreferences(LocationService.this);
                    send_message_interval=preferences.getLong(AppConfig.MAP_KEY.UPLOAD_LOCATION_INTERVAL,0);
                    if (send_message_interval>0){
                        LocationHelper.getInstance().startLocation(LocationService.this, true, new LocationHelper.OnBackListener() {
                            @Override
                            public void onFailed(int errorCode) {

                            }

                            @Override
                            public void onSuccess(final Location location) {
                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        upLocation(location);
                                    }
                                }).start();
                            }
                        });
                    }else{
                        handler.removeCallbacks(runnable);
                        notifications.cancelCalls();
                        stopForeground(true);
                        stopSelf();
                    }
                    break;
            }
        }
    };

    public class SendDataRunable implements Runnable{
        public void run() {
            // handler自带方法实现定时器
            handler.sendEmptyMessage(1);
            //定时器间隔
            if (send_message_interval>0)
                handler.postDelayed(this, send_message_interval*1000);
        }
    }
}
