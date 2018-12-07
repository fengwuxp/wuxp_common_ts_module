package com.oaknt.base.app.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Html 生成器。
 */
public class HtmlBuilder {
    private final static String DOCTYPE = "<! DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";

    public static final String NORMAL_CSS = "";

    /**
     * 生成详情的html
     *
     * @param body
     * @return
     */
    public static String createHtml(String body) {
        StringBuilder sb = new StringBuilder();
        sb.append(DOCTYPE);
        beginHtml(sb);
        createHead(sb);
        beginBody(sb);
        beginDiv(sb);
        sb.append(body);
        endDiv(sb);
        endBody(sb);
        endHtml(sb);
        return sb.toString();
    }

    private static void beginHtml(StringBuilder builder) {
        builder.append("<html>\r\n");
    }

    private static void endHtml(StringBuilder builder) {
        builder.append("</html>\r\n");
    }

    private static void beginBody(StringBuilder builder) {
        builder.append("<body>\r\n");
    }

    private static void endBody(StringBuilder builder) {
        builder.append("</body>\r\n");
    }

    private static void createHead(StringBuilder builder) {
        builder.append("<head>\r\n");
        builder.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n");
        builder.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no\"> \r\n");
        builder.append("<meta http-equive=\"Cache-Control\" content=\"no-cache\"/>\r\n");
        appendCss(builder);
        builder.append("</head>\r\n");
    }

    private static void appendCss(StringBuilder builder) {
        if (!Strings.isNullOrEmpty(NORMAL_CSS)) {
            builder.append("<link rel=\"stylesheet\" href=\""
                    + NORMAL_CSS
                    + "\" type=\"text/css\" />\r\n");
        }
    }

    private static void beginDiv(StringBuilder builder) {
        builder.append("<div>\r\n");
    }

    private static void endDiv(StringBuilder builder) {
        builder.append("</div>\r\n");
    }

    /**
     * 获取img标签中的src值
     *
     * @param content
     * @return
     */
    public static List<String> getImgSrc(String content) {

        List<String> list = new ArrayList<String>();
        //目前img标签标示有3种表达式
        //<img alt="" src="1.jpg"/>   <img alt="" src="1.jpg"></img>     <img alt="" src="1.jpg">
        //开始匹配content中的<img />标签
        Pattern p_img = Pattern.compile("<(img|IMG)(.*?)(/>|></img>|>)");
        Matcher m_img = p_img.matcher(content);
        boolean result_img = m_img.find();
        if (result_img) {
            while (result_img) {
                //获取到匹配的<img />标签中的内容
                String str_img = m_img.group(2);

                //开始匹配<img />标签中的src
                Pattern p_src = Pattern.compile("(src|SRC)=(\"|\')(.*?)(\"|\')");
                Matcher m_src = p_src.matcher(str_img);
                if (m_src.find()) {
                    String str_src = m_src.group(3);
                    list.add(str_src);
                }
                //结束匹配<img />标签中的src
                //匹配content中是否存在下一个<img />标签，有则继续以上步骤匹配<img />标签中的src
                result_img = m_img.find();
            }
        }
        return list;
    }
}
