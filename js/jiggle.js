var elem = document.getElementById('two-output');
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);
var vecMax = 10
var vecMin = 5

var circle = two.makeCircle(params.width / 2, params.height / 2, 50);
var count = 0;
var steps = 20;
circle.fill = '#FF8000';
circle.stroke = 'orangered';
circle.linewidth = 5;
makeVertexClones(circle)

var motionVect = randVect()

two.bind('update', function(){

	moveVertices(circle, count, steps)
	count++
	count%=(steps+1)
}).play()

function makeVertexClones(element){
	console.log(element)
	console.log(element.vertices)
	for(var i = 0; i < element.vertices.length; i++)
		element.vertices[i].o = element.vertices[i].clone()

}

function moveVertices(element, count, steps){
	var rate = Math.sin(Math.PI * count / steps) //make linear?


	for(var i = 0; i < element.vertices.length; i++){

		if(count == 0)
			element.vertices[i].r = randVect()

		var randOffset = element.vertices[i].r.clone().multiplyScalar(rate)

		element.vertices[i].sub(element.vertices[i].o, randOffset)
	}
}

function randVect(){
	var x = ((vecMax - vecMin) * Math.random() + vecMin) * (Math.random() < 0.5 ? 1 : -1)
	var y = ((vecMax - vecMin) * Math.random() + vecMin) * (Math.random() < 0.5 ? 1 : -1)
	return new Two.Vector(x, y)	
}