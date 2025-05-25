const DashboardButton = ({ label, ...props }) => (
  <button
    className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-md hover:bg-blue-200 transition"
    {...props}
  >
    {label}
  </button>
);

export default DashboardButton;
