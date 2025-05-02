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
    const donors = await DonorsModel.find(); 
    res.status(200).json({
      users: donors 
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donors", 
      error: error.message, 
    });
  }
};

exports.postDonations = (req,res)=>{
  const {contact,name,type,quantity,expiration,postTiming,city} = req.body;

  console.log("Data in backend: ", contact, name, type, quantity, expiration,postTiming,city);
  const donationsInfo = new DonationsModel({contact,name,type,quantity,expiration,postTiming,city});
  donationsInfo.save().then(()=>{
    console.log("Data saved successfully in Donations Collection")
  }).catch((error)=>{
    console.log("Error saving data: ", error)
  });
}

exports.getDonations = async (req, res) => {
  try {
    const donations = await DonationsModel.find(); 
    res.status(200).json({
      donations: donations 
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations", 
      error: error.message 
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


exports.updateDonations = async (req, res) => {
  const { type, quantity, expiration, contact ,city} = req.body;

  try {
    // Find and update donation based on contact number
    const updatedDonation = await DonationsModel.findOneAndUpdate(
      { contact }, // search criteria
      {
        type,
        quantity,
        expiration,
        city
      },
      { 
        new: true, // return the updated document
        runValidators: true // run model validations
      }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: "No donation found for this contact number" });
    }

    res.status(200).json({ 
      message: "Donation updated successfully", 
      donation: updatedDonation 
    });
  } catch (error) {
    console.error("Error updating donation:", error);
    res.status(500).json({ 
      message: "Server error while updating donation",
      error: error.message 
    });
  }
};


    