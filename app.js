const express = require("express");
const ThingController = require("./controllers/thing.controller");
const app = express();

app.use(express.json());

app.post("/things", ThingController.createThing);
app.get("/things", ThingController.findAll);


app.route('/things/:id')
.get(ThingController.getThingById)
.put(ThingController.updateThingById)
.delete(ThingController.deleteThingById)

module.exports = app;
