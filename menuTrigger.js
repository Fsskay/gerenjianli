!function () {
    let liTags = document.getElementsByClassName('menuTrigger');
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.currentTarget.classList.add('active');
        };
        liTags[i].onmouseleave = function (y) {
            y.currentTarget.classList.remove('active');
        };
    }
}.call();



