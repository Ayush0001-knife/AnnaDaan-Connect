const DonorsModel = require("../models/Donors.model");
const DonationsModel = require("../models/donations");

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

exports.postDonations = (req,res)=>{
  const {contact,name,type,quantity,expiration,postTiming} = req.body;

  console.log("Data in backend: ", contact, name, type, quantity, expiration,postTiming);
  const donationsInfo = new DonationsModel({contact,name,type,quantity,expiration,postTiming});
  donationsInfo.save().then(()=>{
    console.log("Data saved successfully in Donations Collection")
  }).catch((error)=>{
    console.log("Error saving data: ", error)
  });
}

exports.getDonations = async (req, res) => {
  try {
    const donations = await DonationsModel.find(); // Fetch all donations
    res.status(200).json({
      donations: donations // Return the data under the key 'donations'
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations", // Message for the client
      error: error.message // Actual error for debugging
    });
  }
};

exports.deleteDonations = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting donation with ID:", id);

    const deletedDonation = await DonationsModel.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({
      message: "Donation deleted successfully",
      deletedDonation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete donation",
      error: error.message,
    });
  }
};


    