const express = require("express");
const Redis = require("ioredis");
const process = require("process");

const app = express();
const client = new Redis({
	// Redis Docker Container
	host: "redis-server",
	port: 6379,
});

client.set("visits", 0);

app.get("/", (req, res) => {
	// Process exit 1 indicates process is done like uploading files (on-failure), if we specifically put 0 as status code we just check it (always)
	// process.exit(1);
	client.get("visits", (err, visits) => {
		res.send(`Number of vists ${visits}`);
		client.set("visits", parseInt(visits) + 1);
	});
});

app.listen(8080, () => {
	console.log("Server running on localhost:8080");
});
