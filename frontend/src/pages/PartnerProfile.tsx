import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import PageTitle from "../components/PageTitle";

const PartnerProfile = () => {
  const { userId } = useParams();
  const { data: partnerData } = useQuery("fetchPartnerData", () =>
    apiClient.fetchPartnerData(userId as string)
  );

  return (
    <div>
      <PageTitle title="Profile" />
    </div>
  );
};

export default PartnerProfile;
