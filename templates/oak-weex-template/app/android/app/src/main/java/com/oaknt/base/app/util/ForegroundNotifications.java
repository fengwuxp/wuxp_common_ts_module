/**
 * Copyright (C) 2010-2012 Regis Montoya (aka r3gis - www.r3gis.fr)
 * This file is part of CSipSimple.
 *
 *  CSipSimple is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  If you own a pjsip commercial license you can also redistribute it
 *  and/or modify it under the terms of the GNU Lesser General Public License
 *  as an android library.
 *
 *  CSipSimple is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with CSipSimple.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.oaknt.base.app.util;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat.Builder;
import android.util.Log;

import com.levin.android.weex.support.SplashActivity;
import com.oaknt.base.app.R;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ForegroundNotifications {

	private final NotificationManager notificationManager;
	private final Context context;

	public static final int REGISTER_NOTIF_ID = 1;
	public static final int CALL_NOTIF_ID = REGISTER_NOTIF_ID + 1;
	public static final int CALLLOG_NOTIF_ID = REGISTER_NOTIF_ID + 2;
	private static final String SIP_CLICK_NOTIFICATION = "android.intent.action.SIP_CLICK_NOTIFICATION";

	private static boolean isInit = false;

	public ForegroundNotifications(Context aContext) {
		context = aContext;
		notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

		if (!isInit) {
			cancelCalls();
			isInit = true;
		}
	}

	// Foreground api

	private static final Class<?>[] SET_FG_SIG = new Class[] { boolean.class };
	private static final Class<?>[] START_FG_SIG = new Class[] { int.class, Notification.class };
	private static final Class<?>[] STOP_FG_SIG = new Class[] { boolean.class };
	private static final String THIS_FILE = "Notifications";

	private Method mSetForeground;
	private Method mStartForeground;
	private Method mStopForeground;
	private Object[] mSetForegroundArgs = new Object[1];
	private Object[] mStartForegroundArgs = new Object[2];
	private Object[] mStopForegroundArgs = new Object[1];

	private void invokeMethod(Method method, Object[] args) {
		try {
			method.invoke(context, args);
		} catch (InvocationTargetException e) {
			// Should not happen.
			Log.w(THIS_FILE, "Unable to invoke method", e);
		} catch (IllegalAccessException e) {
			// Should not happen.
			Log.w(THIS_FILE, "Unable to invoke method", e);
		}
	}

	/**
	 * This is a wrapper around the new startForeground method, using the older
	 * APIs if it is not available.
	 */
	private void startForegroundCompat(int id, Notification notification) {
		// If we have the new startForeground API, then use it.
		if (mStartForeground != null) {
			mStartForegroundArgs[0] = Integer.valueOf(id);
			mStartForegroundArgs[1] = notification;
			invokeMethod(mStartForeground, mStartForegroundArgs);
			return;
		}

		// Fall back on the old API.
		mSetForegroundArgs[0] = Boolean.TRUE;
		invokeMethod(mSetForeground, mSetForegroundArgs);
		notificationManager.notify(id, notification);
	}

	/**
	 * This is a wrapper around the new stopForeground method, using the older
	 * APIs if it is not available.
	 */
	private void stopForegroundCompat(int id) {
		// If we have the new stopForeground API, then use it.
		if (mStopForeground != null) {
			mStopForegroundArgs[0] = Boolean.TRUE;
			invokeMethod(mStopForeground, mStopForegroundArgs);
			return;
		}

		// Fall back on the old API. Note to cancel BEFORE changing the
		// foreground state, since we could be killed at that point.
		notificationManager.cancel(id);
		mSetForegroundArgs[0] = Boolean.FALSE;
		invokeMethod(mSetForeground, mSetForegroundArgs);
	}

	private boolean isServiceWrapper = false;

	public void onServiceCreate() {
		try {
			mStartForeground = context.getClass().getMethod("startForeground", START_FG_SIG);
			mStopForeground = context.getClass().getMethod("stopForeground", STOP_FG_SIG);
			isServiceWrapper = true;
			return;
		} catch (NoSuchMethodException e) {
			// Running on an older platform.
			mStartForeground = mStopForeground = null;
		}
		try {
			mSetForeground = context.getClass().getMethod("setForeground", SET_FG_SIG);
		} catch (NoSuchMethodException e) {
			throw new IllegalStateException("OS doesn't have Service.startForeground OR Service.setForeground!");
		}
		isServiceWrapper = true;
	}

	public void onServiceDestroy() {
		cancelCalls();
	}

	// Register
	public synchronized void notifyRegistered() {
		if (!isServiceWrapper) {
			Log.e(THIS_FILE, "Trying to create a service notification from outside the service");
			return;
		}
		Log.d(THIS_FILE, "notify register");
		int icon = R.mipmap.notify_icon_small;
		CharSequence tickerText = context.getString(R.string.app_name);
		long when = System.currentTimeMillis();

		Builder nb = new Builder(context);
		nb.setSmallIcon(icon);
		nb.setTicker(tickerText);
		nb.setWhen(when);
		Intent notificationIntent = new Intent(context,SplashActivity.class);
		notificationIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		notificationIntent.setAction(SIP_CLICK_NOTIFICATION);
		PendingIntent contentIntent = PendingIntent.getBroadcast(context, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

		nb.setOngoing(true);
		nb.setOnlyAlertOnce(true);
		nb.setContentIntent(contentIntent);
		nb.setContentTitle(context.getString(R.string.app_name));

		CharSequence dName="启动位置服务";

		nb.setContentText(dName);
		nb.setPriority(Notification.PRIORITY_MAX);

		Notification notification = nb.build();
		notification.flags |= Notification.FLAG_FOREGROUND_SERVICE;

		startForegroundCompat(REGISTER_NOTIF_ID, notification);
	}

	public final void cancelCalls() {
		notificationManager.cancel(CALL_NOTIF_ID);
	}

}
