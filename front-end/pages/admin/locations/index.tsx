import { NextPage } from "next";
import { PageWrapper } from "@common-components-admin/PageWrapper";
import { Button } from "@components/common/form-elements/Button";
import { ButtonTypes } from "@components/common/form-elements/types";
import { useState } from "react";
import { NewLocationForm } from "@components-admin/locations/CreateForm";
import { List } from "@components-admin/locations/List";

const Locations: NextPage = () => {
  const [newLocation, setNewLocation] = useState<boolean>(false);
  return (
    <PageWrapper title="Locations">
      <div className="p-10">
        <div className="pb-10">
          <Button
            type={ButtonTypes.Button}
            onClick={() => setNewLocation(true)}
            buttonText="Create location"
          />
        </div>
        {newLocation && (
          <div className="w-[50%]">
            <NewLocationForm />
          </div>
        )}
        <List />
      </div>
    </PageWrapper>
  );
};

export default Locations;
