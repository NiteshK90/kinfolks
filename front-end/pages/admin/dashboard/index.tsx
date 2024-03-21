import { NextPage } from "next";
import { PageWrapper } from "../../../components/admin/common/PageWrapper";

const Dashboard: NextPage = () => {
  return (
    <PageWrapper title="Dashboard">
      <div className="p-10">
        <h2>Admin Home Page</h2>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
