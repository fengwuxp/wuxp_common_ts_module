package com.oaknt.base.app.provider;

import android.net.Uri;
import android.provider.BaseColumns;

import com.oaknt.base.app.BuildConfig;

/**
 * 创建者     ky-wrg
 * 创建时间   17/10/9
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class CarLocationMeta {
    public static final String AUTHORITY = BuildConfig.APPLICATION_ID+".provider.LocationProvider";
    public static final String DATABASE_NAME = "location.db";
    public static final int DATABASE_VERSION = 1;

    //字段
    public static final class ShopCartTableMetaData implements BaseColumns {

        public static final String TABLE_NAME = "car_loc";

        public static final Uri CONTENT_URI = Uri.parse("content://"
                + AUTHORITY + "/"+TABLE_NAME);

        public static final String CONTENT_TYPE = "vnd.android.cursor.dir/vnd.caiduoduo."+TABLE_NAME;

        public static final String CONTENT_ITEM_TYPE = "vnd.android.cursor.item/vnd.caiduoduo."+TABLE_NAME;

        public static final String COLUMN_CAR_ID = "car_id";
        public static final String COLUMN_RECORD_ID = "record_id";
        public static final String COLUMN_ADDRESS = "address";
        public static final String COLUMN_LATITUDE = "latitude";
        public static final String COLUMN_LONGITUDE = "longitude";
        public static final String COLUMN_ADD_TIME = "add_time";

        public static final String SQL_CREATE_TABLE = "CREATE TABLE " + TABLE_NAME + " ("

                + _ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + COLUMN_CAR_ID + " INTEGER,"
                + COLUMN_RECORD_ID + " INTEGER,"
                + COLUMN_ADDRESS + " NTEXT,"
                + COLUMN_LATITUDE + " REAL,"
                + COLUMN_LONGITUDE + " REAL,"
                + COLUMN_ADD_TIME + " NTEXT"
                + ");";

    }
}
