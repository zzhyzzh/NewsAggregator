$().ready(function () {

    $("#login_form").validate({
        submitHandler : function () {
            var log_type = $("input[name='loginType']:checked").val();
            $.post("/",
                {
                    username: $('#login_bond_id').val(),
                    password: $('#login_password').val()
                },
                function (result) {

                    if (result.code==0){
                        $("#login_error").html(" * 用户名或密码错误");
                        //$("#user-menu").hide();
                        //alert("done");
                    }
                    else if (result.code ==1){
                        alert("登录成功");
                        window.location.href = "/";
                    }
                }
            )
        },
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            }
        },
        messages: {
            username: {
                required: "*请输入用户名",
                minlength: jQuery.validator.format("*用户名不能小于{0}个字符"),
                maxlength: jQuery.validator.format("*用户名不能大于{0}个字符"),
                notnumber: "*用户名不能是纯数字"
            },
            password: {
                required: "*请输入密码",
                minlength: jQuery.validator.format("*密码不能小于{0}个字符"),
                maxlength: jQuery.validator.format("*密码不能大于{0}个字符")
            }
        }

    });

});