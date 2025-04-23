const DonorsModel = require("../models/Donors.model");

exports.postDonorData = async (req, res) => {
  
    const { contact, password, name , userType} = req.body;

    console.log("Data in backend: ", contact, password, name, userType);


    if(userType === "donor"){
      const donorInfo = new DonorsModel({ contact, password, name:name , userType});
      donorInfo.save().then(()=>{
        console.log("Data saved successfully in Donor Collection")
      }).catch((error)=>{
        console.log("Error saving data: ", error)
      });
    }
}

exports.getDonorData = async (req, res) => {
  try {
    const donors = await DonorsModel.find(); // Get the data from the Donors collection
    res.status(200).json({
      users: donors // Send the fetched data under 'users' key
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donors", // Send an error message if there's an issue fetching the data
      error: error.message, // Send the actual error message for debugging
    });
  }
};

    