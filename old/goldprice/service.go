// Copyright 2011 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package helloworld

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
	"appengine"
    "appengine/urlfetch"
)

var t0 = time.Now()
var json = ""
var period = 300	// 5 min
/*
http://golang.org/pkg/net/http/
*/
func init() {
	http.HandleFunc("/", handle)
}

func handle(w http.ResponseWriter, r *http.Request) {
    t1 := time.Now()
	elapsed := int(t1.Sub(t0).Seconds())
	fmt.Fprint(w, "<html><body>")
/*	
*/
	fmt.Fprint(w, "<br/>")
	fmt.Fprint(w, elapsed)
	fmt.Fprint(w, "<br/>")

	if (elapsed > period || json == "") {
		t0 = t1
		fmt.Fprint(w, "<br/>READING<br/>")
	    c := appengine.NewContext(r)
	    client := urlfetch.Client(c)
		resp, err := client.Get("http://www.monex.com/data/pricefile.json")
    	if err != nil {
        	http.Error(w, err.Error(), http.StatusInternalServerError)
    	} else { 
    		//fmt.Fprintf(w, "HTTP GET returned status %v", resp.Status)
			defer resp.Body.Close()
			rsp, _ := ioutil.ReadAll(resp.Body)
			json = string(rsp)	
		}
	}
	
	fmt.Fprint(w, json)
	fmt.Fprint(w, "<br/>")
	fmt.Fprint(w, "</body></html>")
}
