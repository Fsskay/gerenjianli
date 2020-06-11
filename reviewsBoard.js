!function () {
    var view = document.querySelector('section.reviews');
    var controller ={
        view : null,
        messageList : null,
        init:(view)=> {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.initAV()
            this.loadReviews()
            this.form = view.querySelector('form')
        },
        initAV:function () {
            AV.init({
                appId: "E88W3pj9P2I2WJhlIuO5gPJx-gzGzoHsz",
                appKey: "6q1iA6zNrW5GKNWmw1KSt6rb",
                serverURL: "https://e88w3pj9.lc-cn-n1-shared.com"
            });
        },
        loadReviews:function () {
            const {Query, User} = AV;
            const query = new AV.Query('Reviews');
            query.find().then((reviews) => {
                let array = reviews.map((item) => item.attributes);
                array.forEach((item) => {
                    let li = document.createElement('li');
                    li.innerText = `${item.name}:${item.content}`;
                    this.messageList.appendChild(li)
                });
                reviews.forEach((item) => {
                    // 更新属性值
                    reviews.set('isComplete', true);
                });
                // 批量更新
                AV.Object.saveAll(reviews);
            });
        },
        bindEvents:()=>{
            let myForm = this.form
            myForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                let content = myForm.querySelector('input[name=content').value;
                let name = myForm.querySelector('input[name=name').value;
                const Reviews = AV.Object.extend('Reviews');
                const reviews = new Reviews();
                reviews.save({'name':name,'content': content}).then((object)=> {
                    let li = document.createElement('li');
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`;
                    this.messageList.appendChild(li)
                })
            });
        },
    }
    controller.init(view)
}.call()