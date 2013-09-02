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
    baseURL: "http://advocate.io/bookmarklet",
    subject: "",
    body: "",
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', this.onResume, false);
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //var ref = window.open("http://beta.usv.com", '_blank', 'location=yes');
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
        try {
            CDV.WEBINTENT.hasExtra(
                CDV.WEBINTENT.EXTRA_TEXT,
                function(has) {     
                    // there is extra text                                  
                    CDV.WEBINTENT.getExtra(CDV.WEBINTENT.EXTRA_TEXT, 
                        function(result) {
                            // we've got the extra text
                            app.body = result;
                            
                            CDV.WEBINTENT.getExtra(CDV.WEBINTENT.EXTRA_SUBJECT, 
                                function(result) {
                                    // we've got the subject too!
                                    
                                    app.subject = result;
                                    app.openForm();
                                
                                }, function() {
                                    // There was no extra supplied.
                                    alert("Error -- couldn't get the Subject to share.");
                                }
                            );
                        }, function() {
                            // There was no extra supplied.
                            alert("Error -- couldn't get the Text to share.");
                        }
                    );
                }, 
                function() {
                    // nothing yet
                    alert("hasExtra(EXTRA_TEXT) = false");
                }
            );

        }             
        catch(e) {
            alert(e.message);
        }

    },
    openForm: function() {
                
        var parts = app.body.split(" ");
        
        for (var i=0; i<parts.length; i++) {
           if (parts[i].search(/htt*/) == 0) {
              // this is a URL
                var url = parts[i];
                var bookmarklet_url = app.baseURL + '?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(app.subject) + '&mobile=1';
            }
        }
        
        if (bookmarklet_url) {
            var ref = window.open(bookmarklet_url, '_self', 'location=no');
        } else {
            alert("could not assemble bookmarklet URL");
        }        
    }
};



