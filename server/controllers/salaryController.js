import Employee from '../models/Employee.js';
import Salary from '../models/Salary.js';
import multer from 'multer';

// ✅ Multer middleware (used for parsing formData without file upload)
const storage = multer.memoryStorage(); // Using memoryStorage since no files are uploaded
const upload = multer({ storage });

// ✅ Add Salary Controller
export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const totalSalary =
      parseInt(basicSalary) +
      parseInt(allowances) -
      parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error:", error.message); // For debugging
    return res.status(500).json({ success: false, error: "salary add server error" });
  }
};

// ✅ Get Salary Controller
export const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;

    let salary 
    if(role === 'admin') {
      salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
    } else {
      const employee = await Employee.findOne({userId: id})
      salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId');
  }

    return res.status(200).json({ success: true, salary});
  } catch (error) {
    return res.status(500).json({ success: false, error: "salary get server error" });
  }
};

// ✅ Export both
export { upload };
