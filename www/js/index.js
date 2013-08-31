/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // we're getting a send event
    onResume: function() {
        window.webintent.hasExtra(
            window.webintent.EXTRA_TEXT,
            function(has) {
                app.openURL();
            }, 
            function() {
                // nothing
            }
        );
    },
    openURL: function() {
        // just for testing:
        var ref = window.open("http://yahoo.com", '_blank', 'location=yes');
        
        /*
        var baseUrl = "http://advocate.io/bookmarklet";
        var title = "";
        var body = "";
        
        window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT, 
            function(text) {
                body = text;
            }, function() {
                // There was no extra supplied.
            }
        );
        window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_SUBJECT, 
            function(text) {
                title = text;
            }, function() {
                // There was no extra supplied.
            }
        );
        
        var parts = body.split(" ");
        
        for (var i=0; i<parts.length; i++) {
            if (parts[i].search(/htt/) == 0) {  FIXME re-add * to regex before uncommenting
                // this is a URL
                var url = parts[i];
                var bookmarklet_url = baseUrl + '?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&mobile=1';
            }
        }
        
        if (bookmarklet_url) {
            var ref = window.open(bookmarklet_url, '_blank', 'location=yes');
        }
        */
    }
};



