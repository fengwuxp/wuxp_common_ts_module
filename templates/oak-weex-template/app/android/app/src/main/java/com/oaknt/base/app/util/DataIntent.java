package com.oaknt.base.app.util;

import android.content.Intent;
import android.os.Bundle;

import java.util.Hashtable;

/**
 * 创建者     ky-wrg
 * 创建时间   17/3/11
 * 描述       缓存回调接口
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class DataIntent {
    public static Hashtable<String, Object> hashtable = new Hashtable();
    private static long key = 0L;

    public DataIntent() {
    }

    public static String creatKey() {
        key = System.currentTimeMillis() + key;
        return key + "";
    }

    public static void deleteObjectByKey(String paramString) {
        hashtable.remove(paramString);
    }

    public static Object get(Intent intent, String key) {
        String str = intent.getStringExtra(key);
        Object localObject = null;
        if (!Strings.isNullOrEmpty(str)) {
            localObject = get(str);
        }
        return localObject;
    }

    public static Object get(String key) {
        Object localObject = hashtable.get(key);
        hashtable.remove(key);
        return localObject;
    }

    public static boolean isContainsKey(String key) {
        return hashtable.containsKey(key);
    }

    public static void put(Intent intent, String key, Object object) {
        String str = creatKey();
        put(str, object);
        intent.putExtra(key, str);
        hashtable.put(str, object);
    }

    public static void put(Bundle bundle, String key, Object object) {
        String str = creatKey();
        put(str, object);
        bundle.putString(key, str);
        hashtable.put(str, object);
    }

    public static void put(String key, Object object) {
        hashtable.put(key, object);
    }
}
