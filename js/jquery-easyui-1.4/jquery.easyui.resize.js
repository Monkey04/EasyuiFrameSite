//窗口缩放时，重绘布局控件尺寸
var g_resizeTag = null;
function LayoutResize() {
    if (window.CustomResize) {
        CustomResize(); //自定义缩放函数，页面若使用多个布局控件，需自定义缩放函数处理
    } else {
        var width = $(window).width();
        var height = $(window).height();
        $(".easyui-panel:not(.multi-image-wrapper)").panel('resize', { width: width, height: height });
        $('.easyui-layout').layout('resize', { width: width, height: height });
        $('.easyui-treegrid').treegrid('resize', { width: width, height: height });
        $('.easyui-datagrid').datagrid('resize', { width: width, height: height });
    }
}

$(function () {
    LayoutResize();
    $(window).resize(function () {
        if (g_resizeTag != null)
            clearTimeout(g_resizeTag);
        g_resizeTag = setTimeout("LayoutResize()", 100);
    });
}); 