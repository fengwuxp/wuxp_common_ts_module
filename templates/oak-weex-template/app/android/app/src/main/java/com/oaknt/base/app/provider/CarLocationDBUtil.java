package com.oaknt.base.app.provider;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;

import com.oaknt.base.app.bean.AddCartTrackBody;
import com.oaknt.base.app.bean.CarLocationCache;

import java.util.ArrayList;
import java.util.List;

/**
 * 创建者     ky-wrg
 * 创建时间   17/10/9
 * 描述       位置缓存
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class CarLocationDBUtil {
    /**
     * 插入
     * @param context
     * @param body
     * @return
     */
    public static boolean insert(Context context, AddCartTrackBody body) {
        try {
            // 声明Uri
            Uri uri = CarLocationMeta.ShopCartTableMetaData.CONTENT_URI;
            // 实例化ContentValues
            ContentValues values = new ContentValues();
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_CAR_ID, body.getCarsId());
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_RECORD_ID, body.getRecordId());
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_ADDRESS, body.getPosition());
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_LATITUDE, body.getLatitude());
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_LONGITUDE, body.getLongitude());
            values.put(CarLocationMeta.ShopCartTableMetaData.COLUMN_ADD_TIME, body.getAddTime());
            uri = context.getContentResolver().insert(uri, values);
            return uri != null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 删除一条
     *
     * @param context
     * @param _id
     * @return
     */
    public static boolean delete(Context context, long _id) {
        try {
            // 声明Uri
            Uri uri = CarLocationMeta.ShopCartTableMetaData.CONTENT_URI;
            int rows = context.getContentResolver().delete(uri, CarLocationMeta.ShopCartTableMetaData._ID + "=?", new String[]{"" + _id});
            return rows > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 清除
     *
     * @param context
     * @return
     */
    public static boolean clear(Context context) {
        try {
            // 声明Uri
            Uri uri = CarLocationMeta.ShopCartTableMetaData.CONTENT_URI;
            int rows = context.getContentResolver().delete(uri, null, null);
            return rows >= 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 查询
     *
     * @param context
     * @return
     */
    public static List<CarLocationCache> query(Context context) {
        List<CarLocationCache> list = new ArrayList<CarLocationCache>();
        Cursor cursor = null;
        try {
            Uri uri = CarLocationMeta.ShopCartTableMetaData.CONTENT_URI;
            cursor = context.getContentResolver().query(uri, new String[]{
                    CarLocationMeta.ShopCartTableMetaData._ID,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_CAR_ID,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_RECORD_ID,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_LATITUDE,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_LONGITUDE,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_ADDRESS,
                    CarLocationMeta.ShopCartTableMetaData.COLUMN_ADD_TIME
            }, null, null, null);
            if (cursor!=null && cursor.getCount()>0) {
                int _idIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData._ID);
                int _carIdIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_CAR_ID);
                int _recordIdIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_RECORD_ID);
                int _latitudeIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_LATITUDE);
                int _longitudeIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_LONGITUDE);
                int _addressIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_ADDRESS);
                int _timeIndex = cursor.getColumnIndex(CarLocationMeta.ShopCartTableMetaData.COLUMN_ADD_TIME);
                CarLocationCache cache=null;
                AddCartTrackBody body=null;
                for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
                    cache=new CarLocationCache();
                    body=new AddCartTrackBody();
                    cache.setId(cursor.getInt(_idIndex));
                    cache.setBody(body);
                    body.setCarsId(cursor.getLong(_carIdIndex));
                    body.setRecordId(cursor.getLong(_recordIdIndex));
                    body.setLatitude(cursor.getDouble(_latitudeIndex));
                    body.setLongitude(cursor.getDouble(_longitudeIndex));
                    body.setPosition(cursor.getString(_addressIndex));
                    body.setAddTime(cursor.getString(_timeIndex));

                    list.add(cache);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            list.clear();
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return list;
    }
}
