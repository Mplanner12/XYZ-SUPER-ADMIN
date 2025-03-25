import Link from "next/link";
import React from "react";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import TableDropDown from "@/components/inventory/TableDropDown/TableDropDown";

interface QueryCardProps {
  items: { title: string; date: string; link: string }[];
}

const QueryCard: React.FC<QueryCardProps> = ({ items }) => {
  const generateTableOptions = (index: number) => [
    {
      label: "View Query",
      action: () => {
        console.log("edit", index);
      },
    },
    {
      label: "Delete",
      // action: () => deleteLocationMutate(index)
    },
  ];

  return (
    <div>
      <div className="w-full flex mt-2">
        <div className="flex flex-wrap justify-between gap-2 mb-4 gap-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="rounded-2xl shadow-custom bg-white md:w-56 sm:w-[45%] w-full h-auto p-3"
            >
              <div className="flex justify-between mb-3 w-full">
                <Image
                  src="/query-img.svg"
                  width={22}
                  height={22}
                  alt="icons"
                />
                <TableDropDown options={generateTableOptions(index)} />
              </div>
              <p className="text-sm text-foundation-black-black-400 mb-3">
                {item.title}
              </p>
              <p className="text-xl text-foundation-grey-grey-800 font-medium">
                {item.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryCard;
