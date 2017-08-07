$("#subscribeForm").ajaxForm({
	url: "https://2012.jsconf.asia/addsubscriber.php",
	dataType: "html",
	beforeSubmit: function() {
		$("#subscribeForm").removeClass("failure success").addClass("load");
		$("#subscribeForm .msg").removeClass("play");
	},
	success: function(r) {
		if(r.substr(0,6) != "Thanks") {
			$("#subscribeForm").removeClass("load").addClass("failure");
			$("#subscribeForm .msg span").text(r.substr(0,r.indexOf('<br/>')));
			$("#subscribeForm .msg").addClass("play");
			setTimeout(function() {
				$("#subscribeForm").removeClass("failure");
				$("#subscribeForm input[name='text']").focus();
			},5000);
		}
		else {
			$("#subscribeForm").removeClass("load").addClass("success");
			setTimeout(function() {
				$("#subscribeForm input").val("");
				$("#subscribeForm").removeClass("success active");
				$("#subscribeForm .msg").removeClass("play");
			},3000);
			setTimeout(function() {
				window.location = "https://facebook.com/jsconfasia";
			},10);
		}
	},
	error: function(r, s) {
		$("#subscribeForm").removeClass("load").addClass("failure");
		$("#subscribeForm .msg span").text("Something went wrong...");
		setTimeout(function() {
			$("#subscribeForm").removeClass("failure");
		},4000);
	}
});

$("#subscribeForm .msg").click(function() {
	$("#subscribeForm").removeClass("failure success");
	$("#subscribeForm input[name='email']").focus();
});

$("#subscribeForm input").focus(function(e) {
	$("#subscribeForm").addClass("selected");
}).blur(function(e) {
	$("#subscribeForm").removeClass("selected");
});

$("#subscribeForm").hover(function() {
	$("#subscribeForm").addClass("hovered");
}, function() {
	$("#subscribeForm").removeClass("hovered");
});


$("#subscribeForm input[type='email']").on("focus", function() {
    if($("#subscribeForm input[type='text']").val() === '' && $("#subscribeForm input[type='email']").val() === '') {
        setTimeout(function() {
            $("#subscribeForm input[type='text']").select();
        },1);
    }
});

var body = document.getElementById('body')
var check = function () {
	if (body.scrollTop > 10) {
		document.body.classList.add('small')
	}
	else {
		document.body.classList.remove('small')
	}
}
body.addEventListener("scroll", check)
body.addEventListener("touchstart", function () {
	body.removeEventListener("scroll", check)
})
body.addEventListener("touchmove", check)
