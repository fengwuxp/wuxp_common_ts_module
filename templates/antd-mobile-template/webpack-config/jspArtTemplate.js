/**
 * 用作生成jsp 页面的头部信息
 * @type {string}
 */
let template = `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
                <%@ page contentType="text/html;charset=UTF-8" language="java" %>
                <%@ page import="com.alibaba.fastjson.JSON" %>
                <%  
                 request.setAttribute("memberJSON", JSON.toJSONString(request.getAttribute("member"))); 
                 request.setAttribute("wxMpUserJSON", JSON.toJSONString(request.getAttribute("wxMpUser")));
                %>`;

module.exports=template;
