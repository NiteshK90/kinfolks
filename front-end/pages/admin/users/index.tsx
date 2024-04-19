import { NextPage } from "next";
import { PageWrapper } from "@admin-common-components/PageWrapper";
import { List } from "@components/admin/users/list";

const Visitors: NextPage = () => {
  return (
    <PageWrapper title="Users">
      <List />
    </PageWrapper>
  );
};

export default Visitors;
