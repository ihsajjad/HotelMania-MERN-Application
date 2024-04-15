import { useAppContext } from "../../contexts/UseContexts";
import UserDashboard from "./user/UserDashboard";

const Dashboard = () => {
  const { user } = useAppContext();
  console.log(user);
  if (user.role === "User") {
    return <UserDashboard />;
  }
  return <div>none</div>;
};

export default Dashboard;
