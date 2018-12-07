package com.oaknt.base.app.util;

import java.util.List;

/**
 * Created by ky-wrg on 16/8/16.
 */
public class Strings {

    public static boolean isNullOrEmpty(String str) {
        if (str == null || str.length() == 0) {
            return true;
        }
        return false;
    }

    /**
     * 过滤字符串为空
     *
     * @param str
     * @return
     */
    public static String nullAsNil(String str) {
        if (str == null) {
            return "";
        }
        return str;
    }

    /**
     * 将集合转换成字符串，用特殊字符做分隔符
     *
     * @param srcList   转换前集合
     * @param separator 分隔符
     * @return
     */
    public static String listToString(List<String> srcList, String separator) {
        if (srcList == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder("");
        for (int i = 0; i < srcList.size(); ++i)
            if (i == srcList.size() - 1) {
                sb.append(((String) srcList.get(i)).trim());
            } else {
                sb.append(((String) srcList.get(i)).trim() + separator);
            }
        return sb.toString();
    }
}
