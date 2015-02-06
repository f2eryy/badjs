/**
 * @description 一个和badjs后端对接的前端错误上报脚本
 * @author zhuyangyang
 */
var _allowdomain=['www.hc360.com','my.b2b.hc360.com'];
alert(HC.PAGE_ID);
/**
 * @param {String}  nodeIp     节点ip
 * @param {Bool}  shutdown   是否关闭异常监测
 * @param {String}    pageid     页面唯一标识
 * @param {String}    browser    浏览器类型
 */
var _config = {
    nodeIp:'',
    shutdown:false,
    url:location.href,
    pageid: HC.PAGE_ID,
    browser:window.navigator.userAgent,
    bindConsole:true
};
var isallowdomain=function(){
    var _alen=_allowdomain.length;
    for(var i=0;i<_alen;i++){
        if(_allowdomain[i]==location.hostname){
            return true;
        }
    }
};
var getpagetype=function (){
    var ifrtrue="";
    try{
        window.top.location.href;
    }
    catch(exp){
        var ifrtrue=2;
    }
    if(ifrtrue!=2){
        window.location.href==window.top.location.href?ifrtrue=0:ifrtrue=1;
        if(window.top.location.href==undefined){
            var ifrtrue=2;
        }
    }
    return ifrtrue;
}
var bad_js_report = function(config){
    if(!_config.shutdown){
        var reporturl = '/bad-bin-dev/badjs_mock/js_report';
        return jQuery.ajax({
            url: reporturl+'?callback=?',
            type: 'GET',
            dataType: 'jsonp',
            timeout: 1000,
            data:config,
            complete:function(){
                //console.log('complete');
            }
        });
    }
};
var bindOnError = function(){
    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURI      出错的文件
     * @param {Long}    lineNumber     出错代码的行号
     * @param {Long}    columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        console.log("错误信息：" , errorMessage);
        console.log("出错文件：" , scriptURI);
        console.log("出错行号：" , lineNumber);
        console.log("出错列号：" , columnNumber);
        console.log("错误详情：" , errorObj);
        _config.errorInfo={
            errorMessage:errorMessage,
            scriptURI:scriptURI,
            lineNumber:lineNumber,
            columnNumber:columnNumber,
            errorObj:errorObj
        }
        if(typeof UBA_nodeIp !=='undefined'){
            _config.nodeIp=UBA_nodeIp;
        }
        var doreport=bad_js_report(_config);
        doreport.done(function(data){
            alert(123);
        }).always(function(){
            alert(456);
        });
    }
};

init = function(){
    if(getpagetype()==0&&location.protocol=="http:"&&isallowdomain()){
        bindOnError();
    }
};
init();


