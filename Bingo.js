if (!Array.prototype.any) {
  Array.prototype.any = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this &&
          fun.call(thisp, this[i], i, this))
        return true;
    }

    return false;
  };
}


var timerID = 0;
var numbers = new Array();
var boxes = ["#BOX1","#BOX2","#BOX3","#BOX4","#BOX5"]
var maxNumber = 75;

function isMaxNumbers () {
	return numbers.length == maxNumber;
}

function randomNumber () {
	return Math.floor(Math.random() * maxNumber)+1;
}

function nextNumber() {
	var random = randomNumber();
	if (numbers.any(function(num, index, arr) { return num == random }))
	    return nextNumber();
	else {
		numbers.push(random);
		return random;
	}
}

function searchBox (num) {
	if (0 < num && num <= 15)
		return $(boxes[0]);
	else if (15 < num && num <= 30)
		return $(boxes[1]);
	else if (30 < num && num <= 45)
		return $(boxes[2]);
	else if (45 < num && num <= 60)
		return $(boxes[3]);
	else
		return $(boxes[4]);
}

function insertToBox (num) {
	var box = searchBox(num);
	var children = box.children(".item");
	for (var i=0; i<children.length; i++){
		var child = $(children[i]);
		if ($(child).text() == ""){
			$(child).html(num);
			return;
		}
	}
}

function reset(){
	numbers.length = 0;
	clearInterval( timerID );

	$(boxes).each(function(i, elem){
		$(elem).children(".item").map(function(){
			$(this).html("");
		})
	})
}

function start () {
	var num = randomNumber();
	$("#LOT").html(num);
}


function stop () {
	clearInterval( timerID );
	var num = nextNumber();
	$("#LOT").html(num);
	insertToBox(num);
	timerID = 0;
}

function lot (event) {
	if (isMaxNumbers()) {
		alert("クリアします。");
		reset();
	}
	if (timerID != 0)
		return;

	timerID = setInterval(start, 50);
	setTimeout(stop, 2000);
}

function rainbowTitle() {
	var num = Math.floor(Math.random() * 7);
	var rainbow = ["red", "orange", "yellow", "green", "blue", "#165e83", "purple"];
	$("#TITLE").css("color", rainbow[num]);
}

$(function(){
	setInterval(rainbowTitle, 200);	
	
	$("#SWITCH button").click(lot);
})