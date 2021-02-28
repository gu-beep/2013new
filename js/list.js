
//获取操作对象
var row = document.querySelector('.row');
var pagination1 = document.querySelector('.pagination');
(async function() {
    var dt = await promiseAjax({
            url: '../php/list.php',
            datatype: 'json'
        })
        //创建分页器对象
    new Pagination(pagination1, {
        pageInfo: {
            pagenum: 1,
            pagesize: 15,
            totalsize: dt.length,
            totalpage: Math.ceil(dt.length / 15)
        },
        textInfo: {
            first: '首页',
            prev: "上一页",
            next: "下一页",
            last: "尾页"
        },
        cb(m) {
            //获取当前页需要显示的数据
            var ar1 = dt.slice((m - 1) * 15, m * 15)
                //创建拼接所有数据的字符串
            var str = ''
                //遍历当前ar1数组中所有的数据
            ar1.forEach(item => {
                    str += `
                    <div class=opp-li>
                    <a href="#" class="a3">
                        <img src="${item.iamges1}" alt="" width="300px">
                    </a>
                    <strong>
                        <a class="a5"  href="#"><img src="${item.images2}" alt="" width="50px">&nbsp;&nbsp;&nbsp;DGQ</a>
                        <a class="a4" href="#">656 ♥</a>
                    </strong>
                    <!-- 隐藏部分 -->
                    <a class="over" href="D:/wamp/www/sahia/liangchang/xinqin.html">
                        <p class="money">￥999.00</p>
                        <p class="tle"> 智能调温的四季被|春秋、夏季都能....</p>
                        
                        
                        <p class="des">NASA航空控温技术，让被窝不闷热，整完睡<br/>
                            眠更舒适...</p>
                    </a>
                </div>
                `
                })
                //把当前拼接好的字符串，添加到row盒子中
            row.innerHTML = str
        }
    })
})()