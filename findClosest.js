!function () {
    setTimeout(function () {
        findClosest();
    }, 500);
    window.onscroll = function (mouseWheelWatcher) {
        if (window.scrollY > 0) {
            topNavBar.classList.add('sticky')
        } else {
            topNavBar.classList.remove('sticky')
        }
        findClosest()
    };

    let specialTags = document.querySelectorAll('[data-x]');
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }

    function findClosest() {
        let specialTags = document.querySelectorAll('[data-x]');
        let minIndex = 0;
        for (let i = 1; i < specialTags.length; i++) { //如果dada-x标签的y坐标的绝对值减去用户页面所在y坐标的绝对值 小于 离窗口顶部最近的元素减去用户页面所在y坐标的绝对值
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i;       //那么这个i就是离窗口顶部最近的元素
            }
        }
        // minIndex 就是离窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset');       //为就是离窗口顶部最近的元素minIndex移除classList中的offset
        let id = specialTags[minIndex].id;      //赋值id为minIndex的id
        let a = document.querySelector('a[href="#' + id + '"]');     //赋值a为选择minIndex的id的a元素
        let li = a.parentNode;      //赋值关键的li为a的父节点
        let brothersAndMe = li.parentNode.children;     //找到所有的li,
        for (let i = 0; i < brothersAndMe.length; i++) {      //遍历所有li
            brothersAndMe[i].classList.remove('highlight')      //删除highlight的li
        }
        li.classList.add('highlight')       //关键的li添加highlight
    }

}.call()

