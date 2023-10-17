const fs = require('fs');
const http = require('http');
// release file description limitation.
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

// config
const zoomMin = 0; // 0
const zoomWhole = 7; // until 7 level, download whole world
const zoomMax = 13; // final 13
const latitudeMax = 38.85
const latitudeMin = 29.85
const longitudeMax = 132.84627495139412;
const longitudeMin = 123.56280597193731;
const timeoutInterval = 5;



function latitudeToY(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }
function longitudeToX(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }


function download(x, y, z) {
	fs.mkdirSync(`korea-openstreetmap-tiles/${z}/${x}`, { recursive: true });
	const file = fs.createWriteStream(`korea-openstreetmap-tiles/${z}/${x}/${y}.png`);
	const request = http.get(`http://localhost:8080/tile/${z}/${x}/${y}.png`, function (response) {
		response.pipe(file);

		// after download completed close filestream
		file.on("finish", () => {
			file.close();
			console.log(`Download Completed: ${z}/${x}/${y}.png`);
		});
	});
}

let timeout = 0;

for (let z = zoomMin; z <= zoomWhole; z++) {
	const maxIndex = Math.pow(2, z);

	for (let y = 0; y < maxIndex; y++) {
		for (let x = 0; x < maxIndex; x++) {
			setTimeout(() => { console.log(x, y, z); download(x, y, z) }, timeout);
			timeout += timeoutInterval;
		}
	}
}

for (let z = zoomWhole + 1; z <= zoomMax; z++) {
	const ystart = latitudeToY(latitudeMax, z);
	const yend = latitudeToY(latitudeMin, z);

	for (let y = ystart; y <= yend; y++) {
		const xstart = longitudeToX(longitudeMin, z);
		const xend = longitudeToX(longitudeMax, z);

		for (let x = xstart; x <= xend; x++) {
			setTimeout(() => { console.log(x, y, z); download(x, y, z) }, timeout);
			timeout += timeoutInterval;
		}
	}
}
