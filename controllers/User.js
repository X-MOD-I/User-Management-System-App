const userModel = require("../models/users");

// Create and Save a new user
exports.create = async (req, res) => {
  if (!req.body.Name && !req.body.Address && !req.body.Phone) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const user = new userModel({
    Name: req.body.Name,
    Address: req.body.Address,
    Phone: req.body.Phone,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  try {
    // Adding Pagination and sorting
    let { page, pageSize, sort } = req.query;

    // If the page is not applied in query.
    if (!page) {
      // Make the Default value one.
      page = 1;
    }

    if (!pageSize) {
      pageSize = 2;
    }

    //  We have to make it integer because query parameter passed is string
    const limit = parseInt(pageSize);

    // We pass 1 for sorting data in ascending order using Name
    const user = await userModel.find().sort({ Name: 1 }).limit(limit).skip((parseInt(page)-1)*parseInt(pageSize));
    res.status(200).send({
      page,
      pageSize,
      Info: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await userModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete user with the specified id in the request
exports.delete = async (req, res) => {
  await userModel
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
