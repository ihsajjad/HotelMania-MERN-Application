import { useAppContext } from "../../contexts/UseContexts";
import AdminDashboard from "./admin/AdminDashboard";
import PartnerDashboard from "./partner/PartnerDashboard";
import UserDashboard from "./user/UserDashboard";

const Dashboard = () => {
  const { user } = useAppContext();

  if (user.role === "User") {
    return <UserDashboard />;
  }
  if (user.role === "Admin") return <AdminDashboard />;

  if (user.role === "Hotel") return <PartnerDashboard />;
  return <div>none</div>;
};

export default Dashboard;
