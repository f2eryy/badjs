nlog.js
=====

一个和badjs后端对接的前端错误上报脚本, 支持console关联上报.

和后端约定的协议:


/**
 * @param {String}  nodeIp     节点ip
 * @param {Bool}  shutdown   是否关闭异常监测
 * @param {String}    pageid     页面唯一标识
 * @param {String}    browser    浏览器类型
 */

 /**
  * @param {String}  errorMessage   错误信息
  * @param {String}  scriptURI      出错的文件
  * @param {Long}    lineNumber     出错代码的行号
  * @param {Long}    columnNumber   出错代码的列号
  * @param {Object}  errorObj       错误的详细信息，Anything
  */