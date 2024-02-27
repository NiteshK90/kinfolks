import { NextPage } from "next";
import { PageWrapper } from "../../components/admin/common/PageWrapper";

const Admin: NextPage = () => {
  return (
    <PageWrapper title="Admin">
      <div className="p-10">
        <h2>Admin Home Page</h2>
      </div>
    </PageWrapper>
  );
};

export default Admin;
