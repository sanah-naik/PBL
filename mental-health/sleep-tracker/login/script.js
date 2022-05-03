"use strict";
var $ = jQuery;
class onFocus {
    constructor() {
        var $this = this;
        $this.run = $this.init();
    }
    init() {
        var $this = this;
        $(document).ready(function () {
            $this.addFocusClass();
            $this.keyUpObserve();
            $this.clickLink();
            $this.clickLogin();
            $this.clickSignup();
        });
        return 0;
    }
    addFocusClass() {
        $(".form-control").focus(function () {
            $(this).prev().addClass("on-focus");
        }).focusout(function () {
            $(".form-label").removeClass("on-focus");
        });
    }
    keyUpObserve() {
        $(".form-control").keyup(function () {
            if ($(this).val().length > 0) {
                $(this).prev().addClass("filled");
            }
            else {
                $(this).prev().removeClass("filled");
            }
        });
    }
    clickLink() {
        $(".link").click(function () {
            var open = $(this).data("open");
            var close = $(this).data("close");
            $("#" + close).animate({
                'opacity': 0,
                'top': +100
            }, 500, function () {
                $(this).removeClass("open").addClass("close").removeAttr("style");
                $("#" + open).removeClass("close").addClass("open");
            });
        });
    }
    clickLogin() {
        $(".login").click(function() {
            const email_login = $("#email_login").val()
            const password_login = $("#password_login").val()
            var apiUrl = `http://localhost:3000/login?username=${email_login}&password=${password_login}`;
            fetch(apiUrl).then(response => {
                return response.json();
            }).then(data => {
                if(data.length!=0){
                    localStorage.setItem("userId", data[0]._id);
                    window.location.href = "../index.html";
                }
                else{
                    $('.error-msg').attr('hidden',false);
                }
            }).catch(err => {
            });
        })
    }
    clickSignup() {
        $(".signup").click(function() {
            const email_login = $("#email_signup").val()
            const password_login = $("#password_signup").val()
            const data = {
                "name": email_login,
	            "password": password_login
            }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/signup",
                data: JSON.stringify(data),// now data come in this function
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
                    window.location.href = "index.html";
                },
   
                error: function (jqXHR, status) {
                    console.log(jqXHR);
                    alert('fail' + status.code);
                }
            });
        })
    }
}
var run = new onFocus();