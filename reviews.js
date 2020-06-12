!function () {
    const {Query, User} = AV;

    AV.init({
        appId: "E88W3pj9P2I2WJhlIuO5gPJx-gzGzoHsz",
        appKey: "6q1iA6zNrW5GKNWmw1KSt6rb",
        serverURL: "https://e88w3pj9.lc-cn-n1-shared.com"
    });
    const query = new AV.Query('Message');


    query.find().then((message) => {
        let array = message.map((item) => item.attributes);
        array.forEach((item) => {
            let li = document.createElement('li');
            li.innerText = `${item.name}:${item.content}`;
            let messageList = document.querySelector('#messageList');
            messageList.appendChild(li);
        });
    });

    let myForm = document.querySelector('#postMessageForm');
    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let content = myForm.querySelector('input[name=content').value;
        let name = myForm.querySelector('input[name=name').value;
        const Message = AV.Object.extend('Message');
        const message = new Message();
        message.save({'name': name, 'content': content}).then(function (object) {
            let li = document.createElement('li');
            li.innerText = `${object.attributes.name}:${object.attributes.content}`;
            let messageList = document.querySelector('#messageList');
            messageList.appendChild(li);
            myForm.querySelector('input[name=content').value = ''
        })
    });


}.call();
