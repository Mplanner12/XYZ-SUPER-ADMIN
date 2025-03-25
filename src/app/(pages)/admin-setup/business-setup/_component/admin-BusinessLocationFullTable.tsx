"use client";

import LocationModal from "@/components/inventory/LocationModal";
import TableDropDown from "@/components/inventory/TableDropDown/TableDropDown";
import { ListFilterIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BusinessLocationModal from "@/app/(pages)/setup/_setupComponets/setup-BusinessLocationModal";
import { useGetSetupBusinessLocationList } from "@/hooks/query";
import {
  useDeleteBusinessLocation,
  useUpdateBusinessLocation,
} from "@/hooks/mutate";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/Buttons/SubmitButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { minimize, sort } from "../../../../../../public";

interface FullBusinessLocationTableUpdate {
  id: number;
  locations: string;
  address: string;
  postal_code: string;
  segment: string;
  preferred_currency: string;
  action: string;
}

interface ExtendProfileInfoProps {
  handleTabChange: (tab: string) => void;
}

const AdminFullBusinessLocationTable: React.FC<ExtendProfileInfoProps> = ({
  handleTabChange,
}) => {
  // handle expand table tab change
  const [selectedTab, setSelectedTab] = useState("business-location");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<FullBusinessLocationTableUpdate[]>([]);

  const listId = localStorage.getItem("");

  const { data, isPending } = useGetSetupBusinessLocationList({ id: listId });
  const { data: updateLocationMutate, isPending: isUpdateLocation } =
    useUpdateBusinessLocation();
  const { data: deleteLocationMutate, isPending: isDeleteLocation } =
    useDeleteBusinessLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    console.log("proceeding with payment");
  };

  useEffect(() => {
    if (data) {
      const fetchedRows = data.map(
        (item: FullBusinessLocationTableUpdate, index: number) => ({
          id: index + 1,
          locations: item.locations, // Adjust based on actual API response
          address: item.address,
          postal_code: item.postal_code,
          segment: item.segment,
          preferred_currency: item.preferred_currency,
          action: "",
        })
      );

      setRows(fetchedRows);
    }
  }, [data]);

  const handleAction = (id: number) => {
    // Implement action logic here
    console.log(`Action for row ${id}`);
  };

  const generateTableOptions = (index: number) => [
    {
      label: "Edit",
      action: () => {
        console.log("edit", index);
      },
    },
    { label: "Delete", action: () => deleteLocationMutate(index) },
  ];

  const router = useRouter();

  const handleSubmit = async () => {
    router.push("/setup/price-payment");
  };

  return (
    <>
      <div className="w-full md:mt-5 mt-2 mb-5">
        {isPending && <LoadingOverlay />}
        <div className="flex justify-between mb-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Business Locations
          </h2>
          <span
            className="mt-1 text-sm leading-6 text-foundation-purple-purple-400 flex gap-1 cursor-pointer"
            onClick={openModal}
          >
            <PlusIcon /> Add More Locations
          </span>
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
                  <th className="py-4 px-4 font-medium">ID</th>
                  <th className="py-4 px-4 font-medium">Locations</th>
                  <th className="py-4 px-4 font-medium">Address</th>
                  <th className="py-4 px-4 font-medium">Postal Code</th>
                  <th className="py-4 px-4 font-medium">Segment</th>
                  <th className="py-4 px-4 font-medium">Preferred Currency</th>
                  <th className="py-4 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index === rows.length - 1 ? "border-b-none" : "border-b"
                    } border-b-foundation-grey-grey-300 hover:bg-gray-100`}
                  >
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700 text-left">
                      {row.id}
                    </td>
                    <td className=" whitespace-break-spaces py-4 px-4 text-foundation-grey-grey-700 text-left">
                      <span className=" flex gap-1"> {row.locations}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700 text-left">
                      {row.address}
                    </td>
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-purple-purple-400 text-left">
                      {row.postal_code}
                    </td>
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-purple-purple-400 text-left">
                      {row.segment}
                    </td>
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-purple-purple-400 text-left">
                      {row.preferred_currency}
                    </td>
                    <td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700">
                      <TableDropDown options={generateTableOptions(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default AdminFullBusinessLocationTable;
