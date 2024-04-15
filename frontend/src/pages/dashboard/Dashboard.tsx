import { useAppContext } from "../../contexts/UseContexts";
import UserDashboard from "./user/UserDashboard";

const Dashboard = () => {
  const { user } = useAppContext();

  if (user.role === "User") {
    return <UserDashboard />;
  }
  return <div>none</div>;
};

export default Dashboard;
