function chunkArrayInGroups(arr, size) {
  // Break it up.
  let chunks = [];
  let step = 0;
  let chunk = [];
  for (var i in arr){
    if (step === size){step = 0;chunks = chunks.concat([chunk]);chunk = [];}
    chunk = chunk.concat(arr[i]);
    //console.log(chunk);
    step++;
  }
  chunks = chunks.concat([chunk]);
  return chunks;
}


class Arithmetic{
	constructor(display){
		this.display = display;
		this.operators = {
		"+":(x,y)=>{return x+y;},
		"-":(x,y)=>{return x-y;},
		"x":(x,y)=>{return x*y;},
		"/":(x,y)=>{return x/y;}};
		this.clear();
	}
	update(){this.display.innerHTML = this.calculation;}
	clear(){
		this.calculation = "0";
		this.update();
	}
	decimal(){
		console.log(String(this.calculation.split(" ").slice(-1)).split(""));
		if (String(this.calculation.split(" ").slice(-1)).split("").includes(".") ){console.log("h");}
		else{this.calculation = this.calculation.concat(".");}
		this.update();
	}
	number(number){
		if (this.calculation === "0"){this.calculation = number;}
		else{this.calculation = this.calculation.concat(number);}
		this.update();
	}
	operation(operator){
		if (this.calculation.slice(-2,-1) in this.operators){
			this.calculation = this.calculation.slice(0,-3).concat(operator);
		}
		else{this.calculation = this.calculation.concat(operator);}
		this.update();
	}
	evaluateImmediate(){
		let evaluation = this.calculation.split(" ");
		if (evaluation.slice(-1) in this.operators){evaluation = evaluation.slice(0,-1);}	
		let steps = chunkArrayInGroups(evaluation.slice(1,evaluation.length),2);
		console.log(steps);
		let ans = Number(evaluation[0]);
		if (evaluation.length === 1){this.calculation = String(ans);this.update();return ;}
		for (var i in steps){
			ans = this.operators[steps[i][0]](ans, Number(steps[i][1]));
		}
		this.calculation = String(ans);this.update();
	}
}


let stuff = new Arithmetic(document.getElementById("display"));

//Buttons
document.getElementById("clear").addEventListener("click", function(){stuff.clear()});
document.getElementById("equals").addEventListener("click", function(){stuff.evaluateImmediate()});
document.getElementById("zero").addEventListener("click", function(){stuff.number("0");});
document.getElementById("one").addEventListener("click", function(){stuff.number("1");});
document.getElementById("two").addEventListener("click", function(){stuff.number("2");});
document.getElementById("three").addEventListener("click", function(){stuff.number("3");});
document.getElementById("four").addEventListener("click", function(){stuff.number("4");});
document.getElementById("five").addEventListener("click", function(){stuff.number("5");});
document.getElementById("six").addEventListener("click", function(){stuff.number("6");});
document.getElementById("seven").addEventListener("click", function(){stuff.number("7");});
document.getElementById("eight").addEventListener("click", function(){stuff.number("8");});
document.getElementById("nine").addEventListener("click", function(){stuff.number("9");});
document.getElementById("add").addEventListener("click", function(){stuff.operation(" + ");});
document.getElementById("subtract").addEventListener("click", function(){stuff.operation(" - ");});
document.getElementById("multiply").addEventListener("click", function(){stuff.operation(" x ");});
document.getElementById("divide").addEventListener("click", function(){stuff.operation(" / ");});
document.getElementById("decimal").addEventListener("click", function(){stuff.decimal();});
