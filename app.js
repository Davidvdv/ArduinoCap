// Load some stuff we need
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(9999);

// Init de serialport object for the rfidReader
var rfidReader = new SerialPort("/dev/cu.usbserial-A700e5V1", {
	baudrate: 9600, // Bautrate of de RFID reader
	parser: serialport.parsers.readline('\n')
});

var cap1 = new SerialPort("/dev/cu.usbmodem24111", { 
	baudrate: 19200, // Bautrate of de Arduino
	parser: serialport.parsers.readline('\n')
});
var cap2 = new SerialPort("/dev/cu.usbmodem24141", { 
	baudrate: 19200, // Bautrate of de Arduino
	parser: serialport.parsers.readline('\n')
});
var cap3 = new SerialPort("/dev/cu.usbmodem24121", { 
	baudrate: 19200, // Bautrate of de Arduino
	parser: serialport.parsers.readline('\n')
});

io.sockets.on('connection', function(socket) {
	rfidReader.on('data', function(rfid) {
		console.log(rfid);
		socket.emit('rfid', rfid);
	});

	cap1.on('data', function(raw) {
		if(raw.indexOf('#') == 0) {
			raw = raw.replace('#', '');
			socket.emit('cap1SoundChanged', raw);
		} else {
			socket.emit('cap1ViewAngleChanged', raw);
		}
	});

	cap2.on('data', function(raw) {
		console.log('cap2');
		if(raw.indexOf('#') == 0) {
			raw = raw.replace('#', '');
			socket.emit('cap2SoundChanged', raw);
		} else {
			socket.emit('cap2ViewAngleChanged', raw);
		}
	});
	cap3.on('data', function(raw) {
		console.log('cap3');
		if(raw.indexOf('#') == 0) {
			raw = raw.replace('#', '');
			socket.emit('cap3SoundChanged', raw);
		} else {
			socket.emit('cap3ViewAngleChanged', raw);
		}
	});
});

app.use(express.static(__dirname + "/"));

// Create a root URI for showing the HTML-page
app.get('/', function(req, res) {
	res.sendfile('index.html');
});