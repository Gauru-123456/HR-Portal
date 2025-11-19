import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    center: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "120px",
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action, 
    center: true,
    width: "100px",
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

 return (
  <button
    className="px-3 py-1 bg-teal-500 rounded text-white hover:bg-teal-600 transition-colors text-sm"
    onClick={() => handleView(Id)}
  >
    View
  </button>
 )
};