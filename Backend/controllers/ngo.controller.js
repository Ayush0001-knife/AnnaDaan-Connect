const NgoModel = require("../models/Ngo.model");

exports.postNgoData = async (req, res) => {
  const { contact, password, name, userType ,city} = req.body;

  console.log("Data in backend: ", contact, password, name, userType ,city);

  if(userType === "ngo"){
    const ngoInfo = new NgoModel({ contact, password, name:name , userType ,city});
    ngoInfo.save().then(()=>{
      console.log("Data saved successfully in Ngo Collection")
    }).catch((error)=>{
      console.log("Error saving data: ", error)
    });
  }
};


exports.getNgoData = async (req, res) => {
  try {
    const ngos = await NgoModel.find(); // Get the data from the NGOs collection
    res.status(200).json({
      users: ngos // Send the fetched data under 'users' key
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch NGOs", // Send an error message if there's an issue fetching the data
      error: error.message, // Send the actual error message for debugging
    });
  }
};
