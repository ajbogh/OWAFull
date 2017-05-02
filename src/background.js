var requestFilter = {
	urls: [
		"https://*/owa/*"
	]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	var headers = details.requestHeaders;
	var i;
        var ieUserAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0";
	var loggedIn = false;
	var bkg = chrome.extension.getBackgroundPage();

	////Unused for testing logon page.
	//var urlPattern = new RegExp("https:\\/\\/[0-9a-zA-Z._-]*\\/owa\\/auth\\/logon.aspx[?]?[a-zA-Z0-9%=&._-]*","g");
	//if(urlPattern.test(details.url)){
	//}
	
	for(i = 0, l = headers.length; i < l; ++i) {
		if( headers[i].name == 'User-Agent' ) {
			//if(headers[i].value != ieUserAgent && localStorage['user-agent-orig'] != headers[i].value){
			//  localStorage['user-agent-orig'] = headers[i].value;
			//}
			break;
		}
	}

	if(i < headers.length) {
		headers[i].value = ieUserAgent;
		//localStorage['user-agent'] = "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)";
	}
	return {requestHeaders: headers};
}, requestFilter, ['requestHeaders','blocking']);