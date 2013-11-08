(function($){
            /*
            * iFrame 操作类
            * loaded (fn) 判断iframe是否载入完成
            *           element iframe Dom对象
            *           fn 载入完成回调函数
            *           context 回调函数执行上下文
            * getDocument 获取iframe内部document对象
            *           element iframe Dom对象
            */
            var Util = {
                loaded : function(element, fn, context){
                    if(element.attachEvent){ // ie
                        element.attachEvent("onload", function(){
                            fn.call(context, element);
                        });
                    }else{
                        element.onload = function(){
                            fn.call(context, element);
                        };
                    }
                }
                ,getDocument : function(element){
                    return element.contentDocument || element.contentWindow.document;
                }
            };

            var AjaxUploader = function(obj, option){
                this.obj = obj;
                this.option = option;
                this.guid = + new Date();
                this.init();
            };

            AjaxUploader.prototype = {
                constructor: AjaxUploader,
                init: function(){
                    this.render();
                    this.upload();
                    this.fireEvent();
                },
                render: function(){

                    var pos = this.obj.getBoundingClientRect(), objH = this.obj.offsetHeight, objW = this.obj.offsetWidth;

                    var iframeObj = document.createElement('iframe');
                    iframeObj.id = iframeObj.name = "ajaxUploader_iframe_" + this.guid;
                    iframeObj.style.display = 'none';

                    var wrapper = document.createElement('div');
                    wrapper.className = 'ajaxUploader-wrapper';

                    var form = document.createElement('form');
                    form.action = this.option.url;
                    form.method = 'post';
                    form.id = 'ajaxUploader_form_'+ this.guid;
                    form.target = "ajaxUploader_iframe_" + this.guid;
                    form.enctype = "multipart/form-data";

                    var picInputWrapper = document.createElement('div');
                    picInputWrapper.className = 'ajaxUploader-img-wrapper';

                    var picInput = document.createElement('input');
                    picInput.type = 'file';
                    picInput.name = this.option.inputName;

                    var btn = document.createElement('button');
                    btn.setAttribute('type', 'submit');
                    btn.innerHTML = '上传';
                    btn.className = 'ajaxUploader-btn';

                    var closeBtn = document.createElement('a');
                    closeBtn.id = 'ajaxUploader_close_' + this.guid;
                    closeBtn.title = 'close';
                    closeBtn.innerHTML = '×';
                    closeBtn.href = 'javascript:void(0);';
                    closeBtn.className = 'ajaxUploader-close';
                    closeBtn.onfocus = function(){ this.blur(); };

                    picInputWrapper.appendChild(picInput);
                    form.appendChild(picInputWrapper);
                    form.appendChild(btn);

                    wrapper.appendChild(form);
                    wrapper.appendChild(iframeObj);
                    wrapper.appendChild(closeBtn);

                    wrapper.style.display = 'none';
                    wrapper.style.position = 'absolute';
                    wrapper.style.top = pos.top + objH+'px';
                    wrapper.style.left = pos.left + 'px';

                    document.body.appendChild(wrapper);

                    this.iframeObj = iframeObj;
                    this.formObj = form;
                    this.wrapper = wrapper;
                    this.closeObj = closeBtn;
                },
                beforeSend: function(o, w, i){
                    this.option.beforeSend && this.option.beforeSend.apply(this, arguments);
                },
                complete: function(res){
                    if(this.option.complete && typeof this.option.complete === "function"){
                        this.option.complete.apply(this, arguments);
                    }else{
                        this.obj.value = res.file;
                    }
                },
                upload: function(){
                    var that = this;
                    that.formObj.onsubmit = function(){
                        that.beforeSend(that.obj, that.wrapper, that.iframeObj);
                        Util.loaded(that.iframeObj, function(obj){
                            var doc = Util.getDocument(obj);
                            var result = doc.body || doc.documentElement;
                            var data = result.childNodes[0].nodeValue;
                            var resData = eval("("+data+")");
                            that.complete(resData);
                        })
                    };
                },
                fireEvent: function(){
                    var that = this;
                    this.closeObj.onclick = function(){
                        that.hide();
                    };
                },
                hide: function(){
                    this.wrapper.style.display = 'none';
                },
                show: function(){
                    this.wrapper.style.display = 'block';
                }
            };

            /* ajaxUploader jQuery插件 */
            $.fn.ajaxUploader = function(options){
                var defaults = { url: 'upload.php', inputName: 'img' };
                var opt = $.extend({}, defaults, options);
                return this.each(function(){
                    var $this = $(this), au = $(this).data('ajaxUploader');
                    if(!au){
                        $(this).data('ajaxUploader', (au = new AjaxUploader($this[0], opt)));
                    }

                    if(typeof options === 'string'){
                        au[options]();
                    }
                })
            };
        })(jQuery);
