
// 导航菜单
$(function(){
   $("form .sub").click(function(){
    $('.txt').fadeIn();
  }) 
   $('ol li').stop().eq(1).hover(function(){
                $('.menu').stop().slideToggle();
        })
        $('ol li').eq(2).hover(function(){
                $('.menu2').stop().slideToggle();
        })
        $('ol li').eq(3).hover(function(){
                $('.menu3').stop().slideToggle();
        })

        //中间
$('.bvv').click(function(){
        //得到当前兄弟文本框的值
        var n=$(this).siblings('.txt').val();
        //console.log(n);
        n++;
        $(this).siblings('.txt').val(n);
})
$('.ovv').click(function(){
        //得到当前兄弟文本框的值
        var n=$(this).siblings('.txt').val();
       if(n==1){
           return false; 
       }
        n--;
        $(this).siblings('.txt').val(n); 
})
//购物车
        $('.b02').click(function(){
                //得到当前兄弟文本框的值
                var n=$(this).siblings('.te').val();
                //console.log(n);
                n++;//文本框的值
                $(this).siblings('.te').val(n);
                var p=$(this).siblings('.ong2').html();//当前兄弟的值
              // p=p.substr(1);从第一个截取字符串方法，去掉人民币符号
                    var a=(p*n).toFixed(2);
               p=$(this).siblings('.ong').html(a);//数量和单价相乘
                    //console.log($'.four').parents(".one");找出指定的父亲
                    getSum()
         })
        $('.b01').click(function(){
                //得到当前兄弟文本框的值
                var n=$(this).siblings('.te').val();
               if(n==1){
                   return false
               }
                n--;
                $(this).siblings('.te').val(n);
                var p=$(this).siblings('.ong2').html();
                p=$(this).siblings('.ong').html((p*n).toFixed(2));//数量和单价相乘,toFixed(2)保留两位小数
                getSum()
        })
            $('.te').change(function(){
                //先获得当前商品的值 乘以 当前的商品单价
                var n=$(this).val();
                //当前商品的单价
                var p=$(this).siblings('.ong2').html();
                $(this).siblings('.ong').html((p*n).toFixed(2));
                getSum()
            })
            //单个商品后面的删除按钮
            $('.str').click(function(){
                //删除当前商品
                $(this).parents('.boxzpp').remove();
            })
            //删除选中的商品
            $('.ipt').click(function(){
                //选中小的复选框删除批量商品（隐士迭代方法）
              $('.chex:checked').parents('.boxzpp').remove();
            })
            //清空购物车
            $('.kkoo').click(function(){
                $('.boxzpp').remove();//隐士迭代方法,全部删除
            })
    /*全选按钮
            把全选按钮赋值给小按钮,点击事件用change
    */
            $('.quan').change(function(){
              // console.log( $(this).prop('checked'));
              $('.chex').prop('checked', $(this).prop('checked'));//赋值给小按钮
            })
            //点了小按钮后，让全选自动打钩
            $('.chex').change(function(){
                    //被选中的小按钮的个数和整个小按钮进行对比，怎么知道都有几个小按钮被选中呢，就用到:checked(返回复选框)
                    if($('.chex:checked').length===$('.chex').length){
                            $('.quan').prop('checked',true);    
                    } else{
                            $('.quan').prop('checked',false);
                    }
            })
            getSum()
           /*  打钩后自动加价钱和商品 
              $('.chex').change(function(){
              // console.log( $(this).prop('checked'));
              $(this).('.span6').text('count');//赋值给价钱
            })
            //点了小按钮后，让全选自动打钩
            $('.chex').change(function(){
                    //被选中的小按钮的个数和整个小按钮进行对比，怎么知道都有几个小按钮被选中呢，就用到:checked(返回复选框)
                    if($('.chex:checked').length===$('.chex').length){
                            $('.quan').prop('checked',true);    
                    } else{
                            $('.quan').prop('checked',false);
                    }
            })*/
            //计算总价钱和总件数，用封装
            function getSum(){
                    var count=0;//计算总件数
                    var money=0;//计算总价钱
                    //遍历跟回调函数
                  
                    $('.te').each(function(i,ele){//i索引号 ele,每个元素
                        count +=parseInt($(ele).val());//当前元素的值相加
                    })
                    //总件数里的值
                    $('.span3 em').text(count);
                    //遍历dom用each
                   $('.ong').each(function(i,ele){
                         money +=parseFloat($(ele).text());
                   })
                   $('.span6').text('￥'+money.toFixed(2))
                
            }
//表单验证
         /*    $('.suo').click(function(){
                    alert('请输入账号和密码')
            }) */
            //分页器
function getParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //init
    $(function() {
        var totalPage = 10;
        var totalRecords = 390;
        var pageNo = getParameter('pno');
        if (!pageNo) {
            pageNo = 1;
            //原本是实现无刷新跳转，我这是根据自己需求做的有刷新时跳转
            // 如：www.baidu.com/abcd/index.jhtml
            /*	let str=window.location.pathname;
                let two; // 第二个斜杠后内容
                let first = str.indexOf("/") + 1; 
                let heng = str.indexOf("/", first);
                if (heng == -1) {
                    } else {
                      two = str.substring(heng).substring(1, str.length);
                    }
                if(two=="index.jhtml"){  
                    pageNo = 1;
                }else{
                    pageNo = num;//num是根据自己要点击第几页写的
                }*/
        }
        //生成分页
        //有些参数是可选的，比如lang，若不传有默认值
         kkpager.generPageHtml({
            pno: pageNo,
            //总页码
            total: totalPage,
            //总数据条数
            totalRecords: totalRecords,
            mode: 'click', //默认值是link，可选link或者click
            click: function(n) {
                this.selectPage(n);
    
                if (n == 1) {
                    //原本是实现无刷新跳转，我这是根据自己需求做的有刷新时跳转
                    //第一页写逻辑跳转
                    // 如：window.location.href=......;
                } else {
                    //除了第一页写逻辑跳转
                }
                return false;
            }
        }); 
    });
    
})
    