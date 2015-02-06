/**
 * @description һ����badjs��˶Խӵ�ǰ�˴����ϱ��ű�
 * @author zhuyangyang
 */
var _allowdomain=['www.hc360.com','my.b2b.hc360.com'];
alert(HC.PAGE_ID);
/**
 * @param {String}  nodeIp     �ڵ�ip
 * @param {Bool}  shutdown   �Ƿ�ر��쳣���
 * @param {String}    pageid     ҳ��Ψһ��ʶ
 * @param {String}    browser    ���������
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
     * @param {String}  errorMessage   ������Ϣ
     * @param {String}  scriptURI      ������ļ�
     * @param {Long}    lineNumber     ���������к�
     * @param {Long}    columnNumber   ���������к�
     * @param {Object}  errorObj       �������ϸ��Ϣ��Anything
     */
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        console.log("������Ϣ��" , errorMessage);
        console.log("�����ļ���" , scriptURI);
        console.log("�����кţ�" , lineNumber);
        console.log("�����кţ�" , columnNumber);
        console.log("�������飺" , errorObj);
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


