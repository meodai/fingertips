(function(){

    function loadScript(url, callback){
        var head, script;

        head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = url;

        script.onreadystatechange = callback;
        script.onload = callback;

        head.appendChild(script);
    }

    loadScript("https://raw.githubusercontent.com/meodai/fingertips/master/src/fingertips.js", function(){});

}());

//convert to URL with http://userjs.up.seesaa.net/js/bookmarklet.html
