/**
 * httpGET.js - http fetch function for the browser. Respects http status
 * code, smartly handle mimetype applicatoin/json and has a function to
 * confirm CORS setting.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013
 * Released under the BSD 2-clause license.
 * See: http://opensource.org/licenses/BSD-2-Clause
 */
 /*jslint browser: true, indent: 4 */
 (function (export) {
    "use strict";
    var requestHeaders = [];

    function noOp () {};

    function httpResetRequestHeader() {
        requestHeaders = [];
    }

    function httpAddRequestHeader(header_type, header_value) {
        //FIXME: Should I allow duplicate headers? or overwrite?
        requestHeaders.push({
            ky: header_type,
            val: header_value
        });
    }
   
    function httpGET(url, callback, progress) {
        var request;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e1) {
                try {
                   request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    throw ("Unable to find http request object");
                }
            }
        }
          
        if (callback === undefined) {
            callback = noOp;
        }
        if (progress === undefined) {
            progress = noOp;
        }
        if (failure === noOp) {
            failure = noOp;
        }

        request.onreadystatechange = function () {
          
            switch (request.readyState) {
              case 0:
                  progress("uninitialized");
                  break;
              case 1:
                  progress("loading");
                  break;
              case 2:
                  progress("loaded");
                  break;
              case 3:
                  progress("interactive");
                  break;
              case 4:
                  progress("complete");
                  if (request.status === 200) {
                    // FIXME: check the request headers to see which
                    // response to send - responseText or responseXML
                      if (request.responseText) {
                          callback(null, request.responseText);
                      } else {
                          callback(null, request.responseXML);
                      }
                  } else {
                      callback({
                           status: request.status,
                           "http request error"
                      }, request.responseText);
                  }
                  break;
                
            }
        };

        for (i = 0, l = requestHeaders.length; i < l; i += 1) {
            request.setRequestHeader(requestHeaders[i].ky,
                                     requestHeaders[i].val);
        }
        request.open("GET", url, true);
        request.send();
    }

    // Export on the "http" object.
    if (export.http === undefined) {
        export.http = {};
    }
    export.http.addRequestHeader = httpAddRequestHeader;
    export.http.resetRequestHeader = httpResetRequestHeader;
    export.http.GET = httpGET;
 }(this));
