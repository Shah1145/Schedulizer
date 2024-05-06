import express from "express";

const app = express();

app.get("/api", (req, res) => {
	res.json({ users: ["userOne", "userTwo", "userThree"] });
});

if(process.env.NODE_ENV== "production"){
	app.use(express.static("client/dist"));
}

const PORT = 5019;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
