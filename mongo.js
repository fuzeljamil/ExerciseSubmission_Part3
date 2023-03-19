const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide the password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://fullstackfj:${password}@ac-frxi3qa-shard-00-00.l5i8ahk.mongodb.net:27017,ac-frxi3qa-shard-00-01.l5i8ahk.mongodb.net:27017,ac-frxi3qa-shard-00-02.l5i8ahk.mongodb.net:27017/phoneBookApp?ssl=true&replicaSet=atlas-9t7n7n-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url).catch((error) => console.log("could not connect"));

const personSchema = mongoose.Schema({ name: String, number: String });
const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
    Person.find({}).then((results) => {
    console.log("Phonebook:");
    results.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const givenName = process.argv[3];
  const givenNumber = process.argv[4];
  const newPerson = new Person({ name: givenName, number: givenNumber });
  newPerson.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
