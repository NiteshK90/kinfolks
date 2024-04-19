import { NextPage } from "next";
import { PageWrapper } from "@admin-common-components/PageWrapper";
import { List } from "@components/admin/visitors/list";

const Visitors: NextPage = () => {
  return (
    <PageWrapper title="Visitors">
      <List />
    </PageWrapper>
  );
};

export default Visitors;
