import express from "express";
import "@controllers/UsersController";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.listen(3000, () => console.log("Server started at port 3000!"));
