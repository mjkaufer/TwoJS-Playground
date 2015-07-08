var elem = document.getElementById('two-output');
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);
var vecMax = 10
var vecMin = 5
Two.Resolution = 100

var circle = two.makeCircle(params.width / 2, params.height / 2, 50);
var count = 0;
var steps = 20;
circle.fill = '#FF8000';
circle.stroke = 'orangered';
circle.linewidth = 5;
makeVertexClones(circle)

var motionVect = randVect()

var mouse = {
	x: null,
	y: null,
	moving: false
}

two.bind('update', function(){

	updateVertices(circle, count, steps)
	pushVertices(circle, mouse)
	count++
	count%=(steps+1)
	mouse.moving = false
}).play()

elem.onmousemove = function(e){
	mouse.x = e.offsetX
	mouse.y = e.offsetY
	mouse.moving = true
	// circle.translation.set(e.offsetX, e.offsetY)
}

function makeVertexClones(element){
	console.log(element)
	console.log(element.vertices)
	for(var i = 0; i < element.vertices.length; i++)
		element.vertices[i].o = element.vertices[i].clone()

}

function pushVertices(element, mouseProps){
	var mouseVector = new Two.Vector(mouseProps.x, mouseProps.y)

	var d = 20
	var dd = 5

	for(var i = 0; i < element.vertices.length; i++){
		var vertex = element.vertices[i]

		var rv = relativeVector(element, vertex)

		var offset = new Two.Vector().sub(rv, mouseVector)
		// console.log(offset.lengthSquared)
		if(offset.lengthSquared() < d * d)
			element.vertices[i].addSelf(offset.divideScalar(5))
		else if(offset.lengthSquared() > (d + dd) * (d + dd))
			element.vertices[i].subSelf(element.vertices[i].clone().subSelf(element.vertices[i].o).divideScalar(20))
	}
}

function updateVertices(element, count, steps){
	var rate = Math.sin(Math.PI * count / steps) //make linear?


	for(var i = 0; i < element.vertices.length; i++){

		// element.vertices[i].rel = relativeVector(element, element.vertices[i])

		// var randOffset = element.vertices[i].r.clone().multiplyScalar(rate)

		// element.vertices[i].sub(element.vertices[i].o, randOffset)
	}
}

function relativeVector(element, vertex){
	return new Two.Vector(element.translation.x + vertex.x, element.translation.y + vertex.y)
}

function randVect(){
	var x = ((vecMax - vecMin) * Math.random() + vecMin) * (Math.random() < 0.5 ? 1 : -1)
	var y = ((vecMax - vecMin) * Math.random() + vecMin) * (Math.random() < 0.5 ? 1 : -1)
	return new Two.Vector(x, y)	
}