exports = async function(title, description, shared){

  var serviceName = "mongodb-atlas";
  var dbName = "Tasks";
  var collName = "Items";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    // Execute a insertOne in MongoDB 
    insertTask = await collection.insertOne(
      { "owner_id": context.user.id, "title": title, "description": description, "shared":shared},
    );
  } catch(err) {
    console.log("Error occurred while executing insertOne:", err.message);
    return { error: err.message };
  }
  return { result: insertTask };
};