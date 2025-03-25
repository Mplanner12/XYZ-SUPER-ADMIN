'use client';

import LocationModal from '@/components/inventory/LocationModal';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import {
  ListFilterIcon,
  PlusIcon,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { minimize, sort } from '../../../../../../../public';
import BusinessLocationModal from '../../../_setupComponets/setup-BusinessLocationModal';
import { useGetBusinessListItemById, useGetSetupBusinessLocationList } from '@/hooks/query';
import { useDeleteBusinessLocation, useUpdateBusinessLocation } from '@/hooks/mutate';
import { useRouter } from 'next/navigation';
import SubmitButton from '@/components/Buttons/SubmitButton';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';

interface FullBusinessLocationTableUpdate {
	id: number;
	location_name: string;
	street_address: string;
	postal_code: string;
	segment: string;
	currency: string;
	isEditing?: boolean;
}

interface Props {
	handleTabChange: (tab: string) => void;
}

const SetupFullBusinessLocationTable: React.FC<Props> = ({
	handleTabChange,
}) => {
	// handle expand table tab change
	const [selectedTab, setSelectedTab] = useState('business-location');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [locations, setLocations] = useState<FullBusinessLocationTableUpdate[]>([]);
	const [editingData, setEditingData] = useState<{ [key: number]: FullBusinessLocationTableUpdate}>({});

	// get list Id
	const listId = localStorage.getItem('listId')

	const {data: listItemsData, isPending, refetch} = useGetBusinessListItemById({id: listId})
	const {mutate: updateLocation, isPending: isUpdating} = useUpdateBusinessLocation();
	const {mutate: deleteLocation, isPending: isDeleting} = useDeleteBusinessLocation();


	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleModal = () => {
		console.log('proceeding with payment');
	};

	useEffect(() => {
    if (listItemsData && listItemsData.data) {
      const formattedData = listItemsData.data.map(
        (item: any, index: number) => ({
          id: index + 1,
        	location_name: item.location_name,
        	street_address: item.street_address,
					postal_code: item.postal_code,
        	segment: item.segment,
					currency: item.currency,	
          isEditing: false,
        })
      );
      setLocations(formattedData);
    }
  }, [listItemsData]);

	const handleEdit = (index: number) => {
    const updatedLocations = locations.map((location, i) => ({
      ...location,
      isEditing: i === index ? true : location.isEditing,
    }));
    setLocations(updatedLocations);
    setEditingData({
      ...editingData,
      [index]: { ...locations[index] },
    });
  };

  const addNewLocation = () => {
    setLocations([
      ...locations,
      {
        id: locations.length + 1,
        location_name: "",
        street_address: "",
        segment: "",
        postal_code: "",
        currency: "",
        isEditing: true,
      },
    ]);
  };

	const handleSave = async (index: number) => {
    // const updatedData = editingData[index];
    try {
      await updateLocation({
        id: listId,
        data: {
          location_name: editingData[index].location_name,
          street_address: editingData[index].street_address,
          segment: editingData[index].segment,
          currency: editingData[index].currency,
          postal_code: editingData[index].postal_code,
        },
      });

      const updatedLocations = locations.map((location, i) =>
        i === index ? { ...locations[index], isEditing: false } : location
      );
      setLocations(updatedLocations);
      refetch();
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

	const handleDelete = async (index: number) => {
    try {
      await deleteLocation({
        id: listId,
        data: { locationId: locations[index].id },
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

	const handleInputChange = (index: number, field: keyof FullBusinessLocationTableUpdate, value: string) => {
    setEditingData({
      ...editingData,
      [index]: {
        ...editingData[index],
        [field]: value
      }
    });
  };

	const generateTableOptions = (index: number) => [
    {
      label: locations[index].isEditing ? "Save" : "Edit",
      action: () =>
        locations[index].isEditing ? handleSave(index) : handleEdit(index),
    },
    {
      label: "Delete",
      action: () => handleDelete(index),
    },
  ];

	const router = useRouter()

	const handleSubmit = async () => {
		router.push("/setup/price-payment")
	}

	return (
    <>
      <div className="w-full md:mt-5 mt-2 mb-5">
        {/* {isPending && <LoadingOverlay />} */}
        <div className="flex justify-between mb-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Business Locations
          </h2>
          {/* <span
            className="mt-1 text-sm leading-6 text-foundation-purple-purple-400 flex gap-1 cursor-pointer"
            onClick={openModal}
          >
            <PlusIcon /> Add More Locations
          </span> */}
        </div>
        <div className="text-[#8133F1] flex gap-5 justify-between text-[14px] mb-5">
          <div className="flex gap-3">
            <button className="flex gap-1.5">
              Filter <ListFilterIcon size="17px" />
            </button>
            <button className="flex gap-1.5">
              Sort{" "}
              <Image
                src={sort}
                alt="sort icon"
                className="w-4 h-4 object-contain"
              />
            </button>
          </div>
          <button
            className="flex gap-1.5"
            onClick={() => handleTabChange("business-location")}
          >
            Minimize Table{" "}
            <Image
              src={minimize}
              alt="minimize icon"
              className="w-4 h-4 object-contain"
            />
          </button>
        </div>
        <div className="w-full scrollbar-thin scrollbar-track-primary scrollbar-thumb-plain scrollbar-thumb-current border border-solid border-foundation-grey-grey-300 rounded-2xl">
          <div className="overflow-x-auto">
            <table
              style={{ borderSpacing: 0 }}
              className="w-full text-sm rounded-2xl text-left"
            >
              <thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm w-full border-b-foundation-grey-grey-300 text-left rounded-2xl">
                <tr>
                  <th className="py-4 px-4 font-medium w-[20%]">ID</th>
                  <th className="py-4 px-4 font-medium w-[20%]">Locations</th>
                  <th className="py-4 px-4 font-medium w-[20%]">Address</th>
                  <th className="py-4 px-4 font-medium w-[20%] whitespace-nowrap">
                    Postal Code
                  </th>
                  <th className="py-4 px-4 font-medium w-[20%]">Segment</th>
                  <th className="py-4 px-4 font-medium w-[20%] whitespace-nowrap">
                    Preferred Currency
                  </th>
                  <th className="py-4 px-4 font-medium w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr
                    key={location.id}
                    className={`${
                      index === locations.length - 1
                        ? "border-b-none"
                        : "border-b"
                    } border-b-foundation-grey-grey-300 hover:bg-gray-100`}
                  >
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-grey-grey-700 text-left">
                      {location.id}
                    </td>
                    <td className=" whitespace-nowrap py-4 px-4 text-foundation-grey-grey-700 text-left">
                      {location.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[index]?.location_name ||
                            location.location_name
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "location_name",
                              e.target.value
                            )
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        location.location_name
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-grey-grey-700 text-left">
                      {location.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[index]?.street_address ||
                            location.street_address
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "street_address",
                              e.target.value
                            )
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        location.street_address
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-purple-purple-400 text-left">
                      {location.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[index]?.postal_code ||
                            location.postal_code
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "postal_code",
                              e.target.value
                            )
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        location.postal_code
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-purple-purple-400 text-left">
                      {location.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[index]?.segment || location.segment
                          }
                          onChange={(e) =>
                            handleInputChange(index, "segment", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        location.segment
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-purple-purple-400 text-left">
                      {location.isEditing ? (
                        <input
                          type="text"
                          value={
                            editingData[index]?.currency || location.currency
                          }
                          onChange={(e) =>
                            handleInputChange(index, "currency", e.target.value)
                          }
                          className="border p-1 rounded"
                        />
                      ) : (
                        location.currency
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-foundation-grey-grey-700">
                      <TableDropDown options={generateTableOptions(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full bg-white py-1 rounded-b-2xl">
              <p
                className="flex items-center justify-start w-full self-stretch text-[#8133F1] mb-4 mt-4 cursor-pointer px-4"
                onClick={addNewLocation}
              >
                <PlusIcon />
                Add More Locations
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <SubmitButton
            text="Prev"
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="button"
            loading={isPending}
          />
          <SubmitButton
            text="Next"
            onClick={handleSubmit}
            customPadding="w-20 py-4 mt-5 mb-3"
            actionType="button"
            loading={isPending}
          />
        </div>

        {/* modal function */}
        <LocationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add A New Location"
        >
          <div className="flex flex-col justify-center items-center gap-y-2 py-4 overflow-y-auto no-scroll w-full">
            <div className="w-[60%]">
              <BusinessLocationModal />
            </div>
          </div>
        </LocationModal>
      </div>
    </>
  );
};

export default SetupFullBusinessLocationTable;
