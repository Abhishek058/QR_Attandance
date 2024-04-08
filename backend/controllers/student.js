const Student = require("../models/model");

exports.addStudent = async (req, res) => {
  const { name, rollNo } = req.body;

  try {
    let existingStudent = await Student.findOne({ rollNo: rollNo });

    if (existingStudent) {
      await Student.deleteOne({ _id: existingStudent._id });
      res.json({ message: "Student left the Campus" });
    } else {
      const newStudent = new Student({
        name: name,
        rollNo: rollNo,
      });

      const savedStudent = await newStudent.save();

      res.json({ student: savedStudent });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
