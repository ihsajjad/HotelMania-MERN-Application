import React, { Suspense } from "react";
import { useAppContext } from "../../contexts/UseContexts";

const AdminDashboard = React.lazy(() => import("./admin/AdminDashboard"));
const PartnerDashboard = React.lazy(() => import("./partner/PartnerDashboard"));
const UserDashboard = React.lazy(() => import("./user/UserDashboard"));

const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user.role === "User" && <UserDashboard />}
      {user.role === "Admin" && <AdminDashboard />}
      {user.role === "Hotel" && <PartnerDashboard />}
      {user.role !== "User" &&
        user.role !== "Admin" &&
        user.role !== "Hotel" && <div>None</div>}
    </Suspense>
  );
};

export default Dashboard;
