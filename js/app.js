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

var $pages = $('.page')
var $body = document.getElementById('body')
var check = function () {
	var page = Math.min(Math.ceil($body.scrollTop / ($body.scrollHeight / $pages.length)), $pages.length - 1)
	if (page > 0) {
		document.body.classList.add('small')
	}
	else {
		document.body.classList.remove('small')
	}
	$pages.removeClass('visible')
	$('.page' + page).addClass('visible')
}
$body.addEventListener("scroll", check)
$body.addEventListener("touchmove", check)
$('#scroll').click(function () {
	$body.scrollTop = $body.scrollHeight / $pages.length
})

var $disc = $('#disc')
var $debug = document.getElementById('debug')
var prevTransform
var props = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var inputs = []

var change = function (e) {
	var v = e.currentTarget.value
	if (!v.match(/\d+(\.\d+)?/)) {
		e.currentTarget.value = v = props[e.currentTarget.name]
	} else {
		props[e.currentTarget.name] = parseFloat(v)
		update(e)
	}
}
var keypress = function (e) {
	n = e.currentTarget.name
	if (e.key === 'Enter') {
		change(e)
	} else if (e.key === 'ArrowUp') {
		props[n] -= (n.match(/10|12|13/) ? -5 : -0.2)
		update(e)
	} else if (e.key === ' ') {
		props[n] = 0
		update(e)
	} else if (e.key === 'ArrowDown') {
		props[n] -= (n.match(/10|12|13/) ? 5 : 0.2)
		update(e)
	}
}
var update = function (e) {
	e.preventDefault()
	$disc.css('transform', 'matrix3d(' + props.join(', ') + ')')
}
setInterval(function () {
	var transform = $disc.css('transform')
	if (transform === prevTransform) {
		return
	}
	prevTransform = transform
	props = transform.substr(9, transform.length - 10).split(', ')
	var j = 0
	props.forEach(function(p) {
		inputs[j++].value = p
	})
}, 50)

var j = 0
props.forEach(function(p) {
	var i = document.createElement('input')
	i.value = p
	i.name = j++
	i.addEventListener('change', change)
	i.addEventListener('keydown', keypress)
	$debug.appendChild(i)
	inputs.push(i)
})
