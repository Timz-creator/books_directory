import { MongoClient } from "mongodb";

export async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDb Atlas cluster...");
    await mongoClient.connect();
    console.log("Sucessfully connected to MongoDb! Lets goooo");
    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB failed!", error);
    process.exit();
  }
}

export async function createBookDocument(collection) {
  const bookDocument = {
    name: "Percy Jackson & The Olympians",
    author: "Rick Rordan",
    publish_date: new Date(11 / 10 / 2007),
    category: "fantasty",
  };
  await collection.insertOne(bookDocument);
}

export async function findBooksByName(collection, name) {
  return collection.find({ name }).toArray();
}

export async function updateBooksByName(collection, name, updatedFields) {
  await collection.updateMany({ name }, { $set: updatedFields });
}

export async function deleteBooksByName(collection, name) {
  await collection.deleteMany({name});
}

export async function executeBookCrudOperations() {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("Books");
    const collection = db.collection("books_directory");

    //console.log("CREATE Book");
    //await createBookDocument(collection);

    console.log("UPDATE Book's author ");
    await updateBooksByName(collection, "Percy Jackson & The Olympians", {
      author: "Ronald Dahl",
    });
    console.log(
      await findBooksByName(collection, "Percy Jackson & The Olympians")
    );
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}
