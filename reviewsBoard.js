!function () {
    var view = document.querySelector('section.message');
    var controller = {
        view: null,
        messageList: null,
        init: (view) => {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.initAV()
            this.loadMessage()
            this.form = view.querySelector('form')
        },
        initAV: function () {
            AV.init({
                appId: "E88W3pj9P2I2WJhlIuO5gPJx-gzGzoHsz",
                appKey: "6q1iA6zNrW5GKNWmw1KSt6rb",
                serverURL: "https://e88w3pj9.lc-cn-n1-shared.com"
            });
        },
        loadMessage:function () {
            const {Query, User} = AV;
            const query = new AV.Query('Message');
            query.find().then((message) => {
                let array = message.map((item) => item.attributes);
                array.forEach((item) => {
                    let li = document.createElement('li');
                    li.innerText = `${item.name}:${item.content}`;
                    this.messageList.appendChild(li)
                });
            });
        },
        bindEvents: () => {
            let myForm = this.form
            myForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let content = myForm.querySelector('input[name=content').value;
                let name = myForm.querySelector('input[name=name').value;
                const Message = AV.Object.extend('Message');
                const message = new Message();
                message.save({'name': name, 'content': content}).then((object) => {
                    let li = document.createElement('li');
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`;
                    this.messageList.appendChild(li)
                    myForm.querySelector('input[name=content').value = '';
                })
            });
        },
    }
    controller.init(view)
}.call()