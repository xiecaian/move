var MouseMove = (function(){
    var MouseMove = function(node){
        this.node = node;
        this.listItem;
        this.list;
        this.Idx = 0;
        console.log(this.node);
        this.init();
    }
    MouseMove.prototype = {
        init : function(){
            var dataConfig;
            dataConfig = this.getConfig();
            this.setConfig(dataConfig);
            this.bindEvent();
        },

        bindEvent : function(){
            var _self = this,
                toSlide = this.slide.bind(_self);/** 不这样做的话slide函数的this将指向ul*/
            addEvent(this.list,'mouseover',function(){
                //console.log(this);
               addEvent(this,'mousemove',toSlide);
            });
            addEvent(this.list,'mouseout',function(){
                removeEvent(this,'mousemover',toSlide);
            })
        },

        slide : function(e){          
            var e = e || window.event,
            tar = e.target || SVGCircleElement,
            Oli = this.toFindParent(tar),
            len = this.listItem.length,
            curIdx = Array.prototype.indexOf.call(this.listItem,Oli),
            item;
            console.log(len);
            console.log(this.listItem);
            if(this.Idx !== curIdx){
                this.Idx = curIdx;
                for(var i = 0; i < len;i++){
                    item = this.listItem[i];
                    item.className = 'list-item';
                }
                this.listItem[curIdx].className += ' active';
                /**现在的与原来的下标值不一样，这样可以节省当相等还在做循环 */
            }            
        },

        toFindParent : function(Elem){
            while('li' !== Elem.tagName.toLowerCase()){
                Elem = findParents(Elem,1);
            }
            return Elem ;
        },

        getConfig : function(){
            return JSON.parse(this.node.getAttribute('data-config'));
        },

        setConfig : function(Elem){
            this.listItem = document.getElementsByClassName(Elem['listItem']);
            this.list = document.getElementsByClassName(Elem['list'])[0];
            console.log(this.listItem);
            console.log(this.list);
        },

    }
    return MouseMove;
})();
new MouseMove(document.getElementsByClassName('wrap')[0]);
