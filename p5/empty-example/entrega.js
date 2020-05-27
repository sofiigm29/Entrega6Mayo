let data;
let startSlider;
let stopSlider;
let maxCantidad, minCantidad;

function preload(){
	data = loadTable('assets/datosAlcohol.csv','header');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	
	let firstRow = data.getRow(0);
	let firstTiempo = firstRow.get('Tiempo');
	
	//create filter
	startSlider = createSlider(2010, 2018, 2010, 1);
  startSlider.position(10, 10);
  startSlider.style('width', '80px');
	
	stopSlider = createSlider(2010, 2018, 2018, 1);
  stopSlider.position(10, 80);
  stopSlider.style('width', '80px');
	
	maxCantidad = max(data.getColumn('cantidad'));
	minCantidad = min(data.getColumn('cantidad'));

	angleMode(DEGREES);
}

function draw() {
	colorMode(HSB);
	background(15, 11, 100);
	let index = 0;
	
	while(index < data.getRowCount()){
		let tiempo = data.get(index,'tiempo');
		let cantidad = data.get(index, 'cantidad');
		
		if( startSlider.value() <= tiempo && stopSlider.value()>= tiempo){
			
			drawCircle(tiempo,cantidad);
		}
		
		index++;
	}
}

function drawCircle(tiempo,cantidad){
	//maps
	let xValue = map(tiempo, 2010, 2018, 40, width-40);
	let yValue = map(cantidad, minCantidad, maxCantidad, 100, 280);
	let radius = map(cantidad, 0, maxCantidad, 2, 100);	
	let rotation = map(tiempo, 2010, 2020, 0, 360);
	let brightness = map(cantidad, minCantidad, maxCantidad, 0, 1);	
	
	noStroke();
	colorMode(HSB);
	fill(16, 69, 85);
	text(startSlider.value(),10,50);
	text(stopSlider.value(),10,130);

	push();
	translate(width/2, height/2);
	rotate(rotation);
	
	
	stroke( 217, 107, 67);
	strokeWeight(3);
	line(0,0,0,-yValue);
	
	
	push();
	translate(0, -yValue-70);
	rotate(-rotation);
	noStroke();
	strokeWeight(0);
	fill(16, 69, 85);
	textAlign(CENTER);
	text(tiempo,0,0);
	
	pop();
	
	colorMode(HSB);
	let from = color(45, 67, 95);
	let to = color(191, 98, 85);
	let circleColor = lerpColor(from, to, brightness);
	fill(circleColor);
	let strokeW = map(cantidad, minCantidad, maxCantidad, 1, 10);
	strokeWeight(strokeW);
	circle(0, -yValue, radius);
	
	pop();
	}

