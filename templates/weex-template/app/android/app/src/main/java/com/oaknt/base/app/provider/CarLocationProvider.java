package com.oaknt.base.app.provider;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import android.text.TextUtils;

import java.util.HashMap;

/**
 * 创建者     ky-wrg
 * 创建时间   17/10/9
 * 描述         ${TODO}
 * <p/>
 * 更新者     $Author$
 * 更新时间   $Date$
 * 更新描述   ${TODO}
 */
public class CarLocationProvider extends ContentProvider {
    private static final UriMatcher sUriMatcher;
    private static final int COLLECTION_INDICATOR = 1;//列表
    private static final int SINGLE_INDICATOR = 2;//单条
    private static HashMap<String, String> sNotesProjectionMap;//字段映射
    // 数据库帮助类
    private DatabaseHelper mDbHelper;

    static {
        sUriMatcher = new
                UriMatcher(UriMatcher.NO_MATCH);
        sUriMatcher.addURI(CarLocationMeta.AUTHORITY, "car_loc", COLLECTION_INDICATOR);
        sUriMatcher.addURI(CarLocationMeta.AUTHORITY, "car_loc/#", SINGLE_INDICATOR);
    }

    static {
        sNotesProjectionMap = new HashMap<String, String>();

        sNotesProjectionMap.put("_id", CarLocationMeta.ShopCartTableMetaData._ID);
        sNotesProjectionMap.put("car_id", CarLocationMeta.ShopCartTableMetaData.COLUMN_CAR_ID);
        sNotesProjectionMap.put("record_id", CarLocationMeta.ShopCartTableMetaData.COLUMN_RECORD_ID);
        sNotesProjectionMap.put("address", CarLocationMeta.ShopCartTableMetaData.COLUMN_ADDRESS);
        sNotesProjectionMap.put("latitude", CarLocationMeta.ShopCartTableMetaData.COLUMN_LATITUDE);
        sNotesProjectionMap.put("longitude", CarLocationMeta.ShopCartTableMetaData.COLUMN_LONGITUDE);
        sNotesProjectionMap.put("add_time", CarLocationMeta.ShopCartTableMetaData.COLUMN_ADD_TIME);
    }

    //创建是调用
    @Override
    public boolean onCreate() {
        // 实例化数据库帮助类
        mDbHelper = new DatabaseHelper(getContext());
        return true;
    }

    /**
     * 查询
     *
     * @param uri
     * @param projection
     * @param selection
     * @param selectionArgs
     * @param sortOrder
     * @return
     */
    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {

        SQLiteQueryBuilder queryBuilder = new SQLiteQueryBuilder();

        switch (sUriMatcher.match(uri)) {
            case COLLECTION_INDICATOR:
                // 设置查询的表
                queryBuilder.setTables(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME);

                // 设置投影映射
                queryBuilder.setProjectionMap(sNotesProjectionMap);

                break;
            case SINGLE_INDICATOR:
                queryBuilder.setTables(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME);
                queryBuilder.setProjectionMap(sNotesProjectionMap);
                queryBuilder.appendWhere(CarLocationMeta.ShopCartTableMetaData._ID + "=" + uri.getPathSegments().get(1));

                break;
            default:
                throw new IllegalArgumentException("Unknow URI: " + uri);

        }
        String orderBy = null;
        if (!TextUtils.isEmpty(sortOrder)) {
            orderBy = sortOrder;
        }
        SQLiteDatabase db = mDbHelper.getReadableDatabase();
        Cursor cursor = queryBuilder.query(db, projection, selection, selectionArgs, null, null, orderBy);

        return cursor;
    }

    /**
     * 插入
     *
     * @param uri
     * @param values
     * @return
     */
    @Override
    public Uri insert(Uri uri, ContentValues values) {
        if (sUriMatcher.match(uri) != COLLECTION_INDICATOR) {
            throw new IllegalArgumentException("Unknown URI " + uri);
        }
        SQLiteDatabase db = mDbHelper.getWritableDatabase();
        long rowID = db.insert(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME, null, values);

        if (rowID > 0) {
            Uri retUri = ContentUris.withAppendedId(CarLocationMeta.ShopCartTableMetaData.CONTENT_URI, rowID);

            return retUri;
        }

        return null;
    }

    /**
     * 更新
     *
     * @param uri
     * @param values
     * @param selection
     * @param selectionArgs
     * @return
     */
    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {

        SQLiteDatabase db = mDbHelper.getWritableDatabase();
        int count = -1;
        switch (sUriMatcher.match(uri)) {
            case COLLECTION_INDICATOR:
                count = db.update(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME, values, null, null);
                break;
            case SINGLE_INDICATOR:
                String rowID = uri.getPathSegments().get(1);
                count = db.update(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME, values, CarLocationMeta.ShopCartTableMetaData._ID + "="
                        + rowID, null);
                break;
            default:

                throw new IllegalArgumentException("Unknow URI : " + uri);
        }

        this.getContext().getContentResolver().notifyChange(uri, null);

        return count;
    }

    /**
     * 删除
     *
     * @param uri
     * @param selection
     * @param selectionArgs
     * @return
     */
    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        SQLiteDatabase db = mDbHelper.getWritableDatabase();
        int count = -1;

        switch (sUriMatcher.match(uri)) {
            case COLLECTION_INDICATOR:
                count = db.delete(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME, selection, selectionArgs);
                break;
            case SINGLE_INDICATOR:
                String rowID = uri.getPathSegments().get(1);
                count = db.delete(CarLocationMeta.ShopCartTableMetaData.TABLE_NAME, CarLocationMeta.ShopCartTableMetaData._ID + "="
                        + rowID, null);
                break;
            default:

                throw new IllegalArgumentException("Unknow URI :" + uri);
        }

        // 更新数据时，通知其他ContentObserver
        this.getContext().getContentResolver().notifyChange(uri, null);

        return count;
    }

    /**
     * 根据URI返回MIME类型
     *
     * @param uri
     * @return
     */
    @Override
    public String getType(Uri uri) {
        switch (sUriMatcher.match(uri)) {
            case COLLECTION_INDICATOR:
                return CarLocationMeta.ShopCartTableMetaData.CONTENT_TYPE;
            case SINGLE_INDICATOR:
                return CarLocationMeta.ShopCartTableMetaData.CONTENT_ITEM_TYPE;
            default:
                throw new IllegalArgumentException("Unknow URI: " + uri);
        }
    }

    private static class DatabaseHelper extends SQLiteOpenHelper {
        public DatabaseHelper(Context context) {
            super(context, CarLocationMeta.DATABASE_NAME, null, CarLocationMeta.DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL(CarLocationMeta.ShopCartTableMetaData.SQL_CREATE_TABLE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

            onCreate(db);

        }
    }
}
