// Generic controller for pages — no external deps needed

const getPageData = (Model) => async (req, res) => {
  try {
    let pageData = await Model.findOne();
    if (!pageData) {
      pageData = await Model.create({}); // Create with schema defaults
    }
    res.json(pageData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePageData = (Model) => async (req, res) => {
  try {
    let pageData = await Model.findOne();
    if (!pageData) {
      pageData = await Model.create({});
    }

    const updatedData = await Model.findByIdAndUpdate(
      pageData._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPageData,
  updatePageData
};
