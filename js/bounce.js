var elem = document.getElementById('two-output');
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);
var vecMax = 8
var vecMin = 3

var circle = two.makeCircle(72, 100, 50);
circle.fill = '#FF8000';
circle.stroke = 'orangered';
circle.linewidth = 5;

var motionVect = randVect()

two.bind('update', function(){
	motionVect.multiplySelf(collision(circle))
	circle.translation.addSelf(motionVect)
}).play()

function collision(element){// returns a vector representing which direction to change the movement vector
	//a zero vector means no collision
	//a vector {x: 0, y: -1} means that the element hit a vertical wall
	var returnVector = new Two.Vector(1, 1)
	for(var i = 0; i < element.vertices.length; i++){
		var vertex = element.vertices[i]
		// console.log(vertex.x, vertex.y)
		var vertexPos = new Two.Vector(vertex.x, vertex.y)
		vertexPos.addSelf(new Two.Vector(element.translation.x, element.translation.y))

		// console.log(vertexPos)

		if(vertexPos.x < 0 || vertexPos.x >= params.width){
			returnVector.x = -1
			// console.log(vertex)
		}
		if(vertexPos.y < 0 || vertexPos.y >= params.height){
			returnVector.y = -1
		}

		if(returnVector.x == -1 && returnVector.y == -1)
			return returnVector
	}

	return returnVector

}

function randVect(){
	var x = (vecMax) - 2 * ((vecMax - vecMin) * Math.random() + vecMin)
	var y = (vecMax) - 2 * ((vecMax - vecMin) * Math.random() + vecMin)
	return new Two.Vector(x, y)
}