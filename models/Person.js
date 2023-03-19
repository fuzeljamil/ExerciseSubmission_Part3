const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB", error));

const personSchema = mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  trasform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
