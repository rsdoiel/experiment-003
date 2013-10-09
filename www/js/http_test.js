/**
 * http_test.js - tests for the http object.
 */
/*jslint browser: true, indent: 4 */
(function (global) {
    "use strict";
    var http = global.http,
        test_http = document.getElementById("http-test-results");

    function print(elem, msg) {
        elem.textContent += msg + "\n";
    }

    function httpTests() {
        if (typeof http === "object") {
            print(test_http, "OK, http object found");
        } else {
            print(test_http, "ERROR: http object missing");
            return;
        }
        print(test_http,
            "ERROR http.addRequestHeader() tests not implemented");
        print(test_http,
            "ERROR http.resetRequestHeader() tests not implemented");
        print(test_http,
            "ERROR http.GET() tests not implemented");
    }
    httpTests();
}(this));
