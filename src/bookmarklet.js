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

    loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js", function(){
        loadScript("fingertips.js", function(){});
    });
}());
