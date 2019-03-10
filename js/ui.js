// 专门用来编写ui组件的js
$.fn.UiSearch = function () {
    let ui = $(this);
    $('.search-result', ui)//在ui里面寻找.search-result标签
        .click(function () {
            // alert($('.search-list').attr('display'));
            let $state = $('.search-list').css("display");//不能用prop和attr,这两个是获取属性名，不是样式名

            if($state !== "block"){
                $('.search-list').show();
            }
            else{
                $('.search-list').hide();
            }
            // alert($state);
            return false;
        });
    $('.search-list-item', ui).on('click', function () {
        $('.search-result').html($(this).html());
        $('.search-list').hide();
    });

    $('body').on('click', function () {
        $('.search-list').hide()
    })
};

$.fn.TagUi = function(OuterTag, InnerTag){
    let ui_2 = $(this); //ui_2 = .content-tab
    let $tag_1 = $(OuterTag, ui_2);
    // alert($tag_1.length);
    let $tag_2 = $(InnerTag, ui_2);

    $tag_1.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        //该标签对应的内容显示
        $(this).parent().siblings('.block').eq($(this).index()).show();
        //改标签对应的内容的兄弟标签消失
        $(this).parent().siblings('.block').eq(!$(this).index()).hide();
        return false;
    });

    // alert($tag_2.children().length);
    $tag_2.delegate("div", "click", function () {
        $(this).addClass('active').siblings().removeClass('active');

        $(this).parent().siblings('.block-content').eq($(this).index()).show();
        //改标签对应的内容的兄弟标签消失
        ($(this).parent().siblings('.block-content').eq($(this).index())).siblings().hide();
        $(this).parent().show();

        return false;
    })

};

$.fn.Slider = function(){
    let $Slider = $(this);

    let $Points_ul = $Slider.children('.points');
    let $Slider_ul = $Slider.children('.slider');
    let $Arrow_div = $Slider.children('.arrow_con');

    let $Points_li = $Points_ul.children('li');
    let $Slider_li = $Slider_ul.children('li');

    let $num_of_sliders = $Points_ul.children('li').length;

    for(let i=0; i<$num_of_sliders; i++){
        if(i===0){
            $Slider_li.eq(i).css({
                'position': 'absolute',
                'left': 0,
                'top': 0
            })
        }

        else{
            $Slider_li.eq(i).css({
                'position': 'absolute',
                'left': 544,
                'top': 0
            })
        }
    }

    let $cur_pointer = 0;
    let $pre_pointer = 0;
    let flag = false;

    $Points_ul.delegate('li', 'click', function () {
        $(this).addClass('active-points').siblings().removeClass('active-points');
        $cur_pointer = $(this).index();
        move();
    });


    function move() {
        flag = true;
        // 点击箭头时特殊情况处理
        if($cur_pointer<0){
            $cur_pointer = $num_of_sliders - 1;
            $Slider_li.eq($cur_pointer).css({
                'left':-544
            });

            $Slider_li.eq($cur_pointer).animate({
                'left':0
            }, 400);

            $Slider_li.eq($pre_pointer).animate({
                'left':564
            }, 400, function () {
                flag = false;
            });
            $pre_pointer = $cur_pointer;
            // 如果满足1或2，后面的就不用判断了
            return;
        }

        if($cur_pointer>$num_of_sliders - 1){
            $cur_pointer = 0;
            $Slider_li.eq($cur_pointer).css({
                'left':544
            });

            $Slider_li.eq($cur_pointer).animate({
                'left':0
            }, 400);

            $Slider_li.eq($pre_pointer).animate({
                'left':-564
            }, 400, function () {
                flag = false
            });
            $pre_pointer = $cur_pointer;
            return;
        }


        // 一般情况
        if($cur_pointer>$pre_pointer){
            $Slider_li.eq($cur_pointer).css({
                'left': 544
            });
            $Slider_li.eq($cur_pointer).animate({
                'left': 0
            }, 400);

            $Slider_li.eq($pre_pointer).animate({
                'left': -544
            }, 400, function () {
                flag = false;
            });
            $pre_pointer = $cur_pointer;
        }

        else if($cur_pointer<$pre_pointer){
            $Slider_li.eq($cur_pointer).css({
                'left': -544
            });
            $Slider_li.eq($cur_pointer).animate({
                'left': 0
            }, 400);

            $Slider_li.eq($pre_pointer).animate({
                'left': 544
            }, 400, function () {
                flag = false
            });
            $pre_pointer = $cur_pointer;
        }
        else{
            flag = false;
            return;
        }
    // 点击操作

    $Arrow_div.delegate('img', 'click', function () {
        if(flag === true){
            return;
        }

        flag = true;

        if(($(this).prop('class')) === 'arrow_left') {
            $cur_pointer--;
            move();
            $Points_li.eq($cur_pointer).addClass('active-points').siblings().removeClass('active-points');
            $pre_pointer = $cur_pointer;
        }

        if (($(this).prop('class')) === 'arrow_right') {
            $cur_pointer++;
            move();
            $Points_li.eq($cur_pointer).addClass('active-points').siblings().removeClass('active-points');
            $pre_pointer = $cur_pointer;
        }});
    }

    function autoplay(){
        $cur_pointer++;
        move();
        $Points_li.eq($cur_pointer).addClass('active-points').siblings().removeClass('active-points');
    }

    let Timer = setInterval(autoplay, 2500);

    $Slider.mouseenter(function () {
        clearInterval(Timer);
    });
    $Slider.mouseleave(function () {
        Timer = setInterval(autoplay, 2500);
    })
};

$.fn.ScrollBack = function(){
    let $Body = $(this);
    let $BackElement = $('<div class="back_element">↑</div>');
    $Body.append($BackElement);
    // let $WindowHeight = $(window).height();
    // alert($WindowHeight);
    $(window).scroll(function () {
        let top = $(document).scrollTop(); //这里不能写$('body),top一直是0！！
        console.log(top);
        // if(top>$WindowHeight){
        if(top>0){
            $BackElement.show();
            // alert('large');
    }
        else{
            $BackElement.hide();
        }
    });

    $BackElement.on('click', function () {
        $(window).scrollTop(0);
    })
};
// 函数的调用
$(function () {
    // alert($('.block').length);
    $('.search').UiSearch(); //页面加载完成后，对.search调用UiSearch函数，这个函数里面的this就变成了.search整个标签
    $('.content-tab').TagUi('.caption > a', '.block > .block-tag');
    // 这里有个坑，对x执行函数，那么参数的选择器里面不能有x
    $('.banner-slider').Slider();
    $('body').ScrollBack();
});