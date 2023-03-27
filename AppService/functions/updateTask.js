exports = async function(id, field, value){
  
  var serviceName = "mongodb-atlas";
  var dbName = "Tasks";
  var collName = "Items";
  var updateStatement = { [field]:value};

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    // Execute a updateOne in MongoDB 
    updateTask = await collection.updateOne(
      { _id: id},{"$set": updateStatement}
    );
  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);
    return { error: err.message };
  }
  return updateTask;
};