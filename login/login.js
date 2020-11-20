

// -----------------------------切换窗口
$("#goto-register").on("click",function() {
    $("#login").hide();
    $("#register").show();
});

$("#goto-login").on("click",function() {
    $("#login").show();
    $("#register").hide();
});



// ------------------------------注册

// -----------------------------正则表达式
var form = layui.form;
form.verify({
    // 规则名:[正则、不符合正则提醒信息]
    changdu:[/^\S{6,12}$/,"不满足长度要求"],

    // 规则名 函数 必填 有return 不符合正则提现信息
    same:function(val){
        // 第一输入：直接获取；HTML结构上做一些简单类名补充，方便获取值
        // 再次输入：val
        if ($(".pwd").val() != val) {
            return "两次输入密码不一致";
        }
    }
});


$("#register .layui-form").on("submit",function(e){
    // 1.阻止默认行为
    e.prevenDefault();

    // 2.收集数据
    var data = $(this).serialize();

    // 3.接口 发出请求
    //        发送数据
    $.ajax({
        type:'POST',
        url:'http://ajax.frontend.itheima.net/api/reguser',
        data:data,
        success:function(res){
            // 弹窗 msg简单弹窗 会自动消失
            layer.msg(res.message);

            // 业务涉及
            if(res.status == 0){
                $("#register").hide();
                $("#login").show();

                // 需求 原生方式去重置
                //      需要慎重使用this
                $("#register .layui-form")[0].reset();
            }
        }
    });
});