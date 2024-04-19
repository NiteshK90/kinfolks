import { useState } from "react";
import { useGetLocations } from "@hooks/locations.hooks";
import { Locations } from "@services/locations.service/types";
import { Button } from "@components/common/form-elements/Button";
import { ButtonTypes } from "@components/common/form-elements/types";

export const Row = ({ location }: { location: Locations }) => {};

export const List = () => {
  const { data: allLocations, isLoading, isError } = useGetLocations();

  const [expandedLocationId, setExpandedLocationId] = useState<string | null>(
    null
  );

  const toggleExpand = (id: string) => {
    if (expandedLocationId === id) {
      setExpandedLocationId(null); // Collapse if the same location is clicked again
    } else {
      setExpandedLocationId(id); // Expand the clicked location
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <h3>Data is loading</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-4">
        <h3>Error occurred</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allLocations?.map((location) => (
        <div key={location.id} className="p-4 shadow-md rounded-lg bg-white">
          <div className="flex justify-between items-start">
            <div className="text-lg font-semibold">{location.name}</div>
            <div className="flex flex-col">
              <Button
                type={ButtonTypes.Link}
                buttonText="View more"
                onClick={() => toggleExpand(location.id!)}
              />
              <Button
                type={ButtonTypes.Button}
                buttonText="Edit"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="text-gray-600">
            Best Time to Visit: {location.bestTime}
          </div>
          {expandedLocationId === location.id && (
            <div className="mt-4">
              <div className="font-medium">Places:</div>
              {location.places.length > 0 ? (
                location.places.map((place) => (
                  <div key={place.id} className="mt-2 ml-4">
                    <div className="font-semibold">{place.name}</div>
                    <div>Time to Visit: {place.timeToVisit}</div>
                    <div>Description: {place.description}</div>
                  </div>
                ))
              ) : (
                <div className="ml-4">No places added yet.</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
