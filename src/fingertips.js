(function($,d,w,undefined){
    "use strict";

    var $d, $w, $b, nameSpace,
        Fingertips, Dot;

    $d = $(d);
    $w = $(w);
    $b = $("body");

    nameSpace = "fingertips";

    Dot = function(size,top,left){
        this.$dotModel = $("<div />", {
            "class": nameSpace + "-wrap",
            css: {
                position: "fixed",
                top: 0, left: 0,
                height: "10px", width: "10px",
                background: "rgba(255,0,0,.5)",
                "border-radius": "100%",
                margin: "-5px 0 0 -5px",
            }
        });

        this._create();
        this.setSize(size);
        this.setPosition(top,left);
    };

    Dot.prototype = {
        _create: function(){
            this.$dot = this.$dotModel.clone();
        },
        destroy: function(){
            this.$dot.remove();
        },
        setPosition: function(top,left){
            top = top || 0;
            left = left || 0;

            this.$dot.css({
                top: top + "px",
                left: left + "px"
            });
        },
        setSize: function(size){
            size = size || 10;

            this.$dot.css({
                width: size + "px",
                height: size + "px",
                margin: -(size/2) + "px 0 0" + -(size/2) + "px"
            });
        },
        getDom: function(){
            return this.$dot;
        }
    };

    Fingertips = function(){
        this.dots = {};

        this.$wrap = $("<div />", {
            id: nameSpace + "-wrap",
            css: {
                position: "absolute",
                top: 0, right: 0, bottom: 0, left: 0,
                "pointer-events": "none",
                "user-select": "none"
            }
        });

    };


    Fingertips.prototype = {
        injectDom: function(){
            $b.append( this.$wrap );
        },
        handleDot: function(id,top,left){
            var $newDot, dot;
            if (id in this.dots) {
                //this finger is tracked already
                this.dots[id].setPosition(top,left);

            }else{
                //new finger
                dot = new Dot(50,top,left);

                $newDot = dot.getDom();
                this.$wrap.append( $newDot );

                this.dots[id] = dot;
            }
        },
        removeDot: function(id){
            if( id ){
                this.dots[id].destroy() && delete this.dots[id];
            }else{
                $.each(this.dots, function(key){
                    this.destroy();
                });
                this.dots = {};
            }

        },
        initInteraction: function(){
            var self = this;
            $d.on("touchstart." + nameSpace + " touchmove." + nameSpace, function(e){
                $.each( e.originalEvent.targetTouches, function(){
                    self.handleDot(this.identifier, this.clientY, this.clientX);
                });
            });

            $d.on("touchend." + nameSpace + " touchcancel." + nameSpace + " touchleave." + nameSpace, function(e){
                if( !e.originalEvent.length ){
                    self.removeDot();
                }else{
                    $.each( e.originalEvent.targetTouches, function(){
                        self.removeDot(this.identifier);
                    });
                }
            });
        },
        init: function(){
            this.injectDom();
            this.initInteraction();
        },
        destroy: function(){

        }
    };

    $(function(){
        var fingertips = new Fingertips();
        fingertips.init();

        var vcontent = $("head meta[name=viewport]").attr("content");
        vcontent += ",minimal-ui";
        $("head meta[name=viewport]").attr("content", vcontent);

    });




}(jQuery,document,window));
