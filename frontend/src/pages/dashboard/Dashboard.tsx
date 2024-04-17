import { useAppContext } from "../../contexts/UseContexts";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

const Dashboard = () => {
  const { user } = useAppContext();

  if (user.role === "User") {
    return <UserDashboard />;
  }
  if (user.role === "Admin") return <AdminDashboard />;
  return <div>none</div>;
};

export default Dashboard;
