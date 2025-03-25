import ActionButton from "@/components/Buttons/ActionButton";
import TransparentButton from "@/components/Buttons/TransparentButton";
import {
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListFilterIcon,
  MessageSquareIcon,
  RotateCwIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const IncomeStatementTable: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <>
      <main>
        <div className="flex justify-between my-3">
          <div>
            <p className="text-xl font-medium mb-3">Income Statement</p>
            <p className="text-[14px] mb-3">As of May 31, 2024</p>
            <p className="text-[17px] font-medium mb-2">XYZ Corporation</p>
            <div className="flex gap-2 mb-2">
              <p className="text-[14px]">
                Location: <span className="font-medium">HQ</span>
              </p>
              <p className="text-[14px]">
                Currency: <span className="font-medium">USD</span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[6.6rem] mb-3">
          <div className="text-[15px]">
            <div className="text-[#8133F1] flex gap-2 justify-between mb-5">
              <button className="flex gap-1">
                Download{" "}
                <Image
                  className="ml-2"
                  src="/download.png"
                  width={20}
                  height={20}
                  alt="icon"
                />
              </button>
              <button className="flex gap-1">
                Print{" "}
                <Image
                  className="ml-2"
                  src="/print.png"
                  width={18}
                  height={18}
                  alt="icon"
                />
              </button>
              <button className="flex gap-1">
                Share{" "}
                <Image
                  className="ml-2"
                  src="/share.png"
                  width={18}
                  height={18}
                  alt="icon"
                />
              </button>
            </div>
            <div className="text-[#8133F1] flex gap-2 justify-end mb-2">
              <button className="flex gap-1">
                Customize{" "}
                <Image
                  className="ml-2"
                  src="/customize.png"
                  width={20}
                  height={20}
                  alt="icon"
                />
              </button>
              <button className="flex gap-1">
                Refresh <RotateCwIcon size="18px" />
              </button>
              <button className="flex gap-1">
                Comment <MessageSquareIcon size="18px" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-[#8133F1] flex gap-5 justify-between text-[15px]">
          <div className="flex gap-3">
            <button className="flex gap-1">
              Filter <ListFilterIcon size="17px" />
            </button>
            <button className="flex gap-1">
              Sort <ArrowUpNarrowWideIcon size="17px" />
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex gap-1">
              {" "}
              Showing all Column <ChevronDownIcon size="17px" />
            </button>
            <button className="flex gap-1">
              Minimize Table
              <Image
                className="mr-1"
                src="/resizeicon.svg"
                width={21}
                height={21}
                alt="icon"
              />
            </button>
          </div>
        </div>

        <div className="my-5">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
              <thead className="w-full">
                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                  <td className="py-5 pl-5 gap-2 items-center">Account Code</td>
                  <td className="py-5 gap-2 items-center">Account Name</td>
                  <td className="py-5 gap-2 items-center">Amount(USD)</td>
                </tr>
              </thead>

              <tbody className="w-full bg-white">
                <tr
                  onClick={() => toggleSection("revenue")}
                  className=" border-[#eaecf0] bg-[#F0F0F0] table-row-hover text-[14px] border-b text-[#545A5D]"
                >
                  <td className="py-6 pl-5 text-left">
                    <div className="flex items-center gap-1">
                      Revenue
                      {expandedSections.includes("revenue") ? (
                        <ChevronUpIcon size="17px" />
                      ) : (
                        <ChevronDownIcon size="17px" />
                      )}
                    </div>
                  </td>
                  <td className="py-6  text-left "></td>
                  <td className="py-6  text-left "></td>
                </tr>
                {expandedSections.includes("revenue") && (
                  <>
                    <tr className="border-[#eaecf0] hover:bg-[#F7f7f7] text-[14px] border-b text-[#545A5D]">
                      <td className="py-6 pl-5 text-left ">400101</td>
                      <td className="py-6 text-left ">Sales Revenue</td>
                      <td className="py-6 text-left ">500</td>
                    </tr>
                    <tr className="border-[#eaecf0] border-b hover:bg-[#F7f7f7] text-[14px] text-[#545A5D]">
                      <td className="py-6 pl-5 text-left"></td>
                      <td className="py-6 text-left">Total</td>
                      <td className="py-6 border-[#8A8A8A] border-t-2 text-left">
                        500
                      </td>
                    </tr>
                  </>
                )}
                <tr
                  onClick={() => toggleSection("costOfGoods")}
                  className=" border-[#eaecf0] bg-[#F0F0F0] table-row-hover text-[14px] border-b text-[#545A5D]"
                >
                  <td className="py-6 pl-5 text-left ">
                    <div className="flex items-center gap-1">
                      Cost of Goods Sold
                      {expandedSections.includes("costOfGoods") ? (
                        <ChevronUpIcon size="17px" />
                      ) : (
                        <ChevronDownIcon size="17px" />
                      )}
                    </div>
                  </td>
                  <td className="py-6  text-left "></td>
                  <td className="py-6  text-left "></td>
                </tr>
                {expandedSections.includes("costOfGoods") && (
                  <>
                    <tr className=" border-[#eaecf0] hover:bg-[#F7f7f7] text-[14px] border-b text-[#545A5D]">
                      <td className="py-6 pl-5 text-left ">400101</td>
                      <td className="py-6  text-left ">Sales Revenue</td>
                      <td className="py-6  text-left ">500</td>
                    </tr>
                    <tr className=" border-[#eaecf0] border-b hover:bg-[#F7f7f7] text-[14px]  text-[#545A5D]">
                      <td className="py-6 pl-5 text-left "></td>
                      <td className="py-6  text-left ">Total</td>
                      <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                        500
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-5  my-5 w-[60%]">
            <ActionButton
              text="Save changes"
              customPadding="py-4 px-3 w-[50%] rounded-xl"
            />
            <TransparentButton
              text="Revert"
              customPadding="py-4 px-1 w-[50%] rounded-xl"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default IncomeStatementTable;
