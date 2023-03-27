exports = async function(){

  var serviceName = "mongodb-atlas";
  var dbName = "Tasks";
  var collName = "Items";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  try {
    // Execute a find in MongoDB 
    resultDocuments = await collection.find({"$or":[{"owner_id":context.user.id},{"shared":true}]});
  } catch(err) {
    console.log("Error occurred while executing find:", err.message);
    return { error: err.message };
  }
  return resultDocuments;
};