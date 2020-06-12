!function () {
    var model = {           //MVC 模块  (定义服务器链接与数据接收保存)
        init: function () {         //初始化 定义模块,获取服务器的钥匙
            var APP_ID = "E88W3pj9P2I2WJhlIuO5gPJx-gzGzoHsz";
            var APP_KEY = "6q1iA6zNrW5GKNWmw1KSt6rb";
            var SERVER_URL = "https://e88w3pj9.lc-cn-n1-shared.com";
            AV.init({appId: APP_ID, appKey: APP_KEY, serverURL: SERVER_URL})
        },
        fetch: function () {            //获取API提供的初始化代码
            const query = new AV.Query('Message');
            const {Query, User} = AV;
            return query.find()
        },
        save: function (name, content) {            //初始化数据保存的容器,返回数据给服务器
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({'name': name, 'content': content})
        }
    };

    var view = document.querySelector('section.message');           //MVC视图

    var controller = {          //MVC控制器
        view: null,             //给view,model,messageList一个空容器
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view;           //装填view
            this.model = model;            //装填model

            this.messageList = view.querySelector('#messageList');          //装填 messageList,form
            this.form = view.querySelector('form');
            this.model.init();              //初始化整个model
            this.loadMessages();            //运行函数loadMessages
            this.bindEvents()          //运行函数bindEvents
        },
        loadMessages: function () {
            this.model.fetch().then((message) => {
                let array = message.map((item) => item.attributes);
                array.forEach((item) => {
                    let li = document.createElement('li');
                    li.innerText = `${item.name}:${item.content}`;
                    this.messageList.appendChild(li);
                });
            });
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMessage();
            });
        },
        saveMessage: function () {
            let myForm = this.form;
            let content = myForm.querySelector('input[name=content').value;
            let name = myForm.querySelector('input[name=name').value;
            this.model.save(name, content).then((object) => {
                let li = document.createElement('li');
                li.innerText = `${object.attributes.name}:${object.attributes.content}`;
                let messageList = document.querySelector('#messageList');
                messageList.appendChild(li);
                myForm.querySelector('input[name=content').value = ''
            })
        }
    };
    controller.init(view, model)  //初始化:将view与model作为参数输入到controller
}.call();
