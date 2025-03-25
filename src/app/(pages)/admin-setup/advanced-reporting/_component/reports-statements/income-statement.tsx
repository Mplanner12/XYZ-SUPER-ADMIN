import {
  ChevronDownIcon,
} from "lucide-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


const IncomeStatement: React.FC = () => {

  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedOption: string) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <>
      <main>
        {
          <div className="my-5">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                <thead className="w-full">
                  <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                    <td className="py-5 pl-5 gap-2 items-center">
                      Account Code
                    </td>
                    <td className="py-5 gap-2 items-center">Account Name</td>
                    <td className="py-5 gap-2 items-center">Amount(USD)</td>
                  </tr>
                </thead>

                <tbody className="w-full bg-white">
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD]">
                      <div className="flex items-center gap-1">
                        Revenue <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">40000</td>
                    <td className="py-6  text-left ">Sales Revenue</td>
                    <td className="py-6  text-left ">30000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Total</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      30,000
                    </td>
                  </tr>
                  <tr className=" bg-[#F0F0F0] curor-pointer text-[14px] text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD] ">
                      <div className="flex items-center gap-1">
                        Cost of Goods Sold <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px] text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">50000</td>
                    <td className="py-6  text-left ">Cost of Goods Sold</td>
                    <td className="py-6  text-left ">10,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Total COGS</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      10,000
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Gross profit</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      20,000
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD] ">
                      <div className="flex items-center gap-1">
                        Operating Expenses <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px] text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">52010</td>
                    <td className="py-6  text-left ">Salaries and Wages</td>
                    <td className="py-6  text-left ">10,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">52020</td>
                    <td className="py-6  text-left ">Office Supplies</td>
                    <td className="py-6  text-left ">500</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">54020</td>
                    <td className="py-6  text-left ">Rent Expenses</td>
                    <td className="py-6 text-left ">2,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">
                      Total Operating Expenses
                    </td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      12,500
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Operating Income</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      7,500
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD]">
                      <div className="flex items-center gap-1">
                        Other Income <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">40120</td>
                    <td className="py-6  text-left ">Interest Income</td>
                    <td className="py-6  text-left ">1,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Total Other Income</td>
                    <td className="py-6 text-left ">1,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Income Before tax</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      8,500
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD]">
                      <div className="flex items-center gap-1">
                        Income tax Expenses <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">70010</td>
                    <td className="py-6  text-left ">Current Tax Expense</td>
                    <td className="py-6  text-left ">2,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">
                      Total Other Tax Expense
                    </td>
                    <td className="py-6 text-left ">1,000</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">Net tax</td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      6,500
                    </td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left bg-[#EFE6FD]">
                      <div className="flex items-center gap-1">
                        <span>
                          {" "}
                          Other Comprehensive <br /> Income{" "}
                        </span>{" "}
                        <ChevronDownIcon size="17px" />
                      </div>
                    </td>
                    <td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left ">90010</td>
                    <td className="py-6  text-left ">
                      Unrealize Gains/Losses on Security
                    </td>
                    <td className="py-6  text-left ">500</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-foundation-grey-grey-600">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">
                      Total Other Comprehensive Income
                    </td>
                    <td className="py-6 text-left ">500</td>
                  </tr>
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                    <td className="py-6 pl-5 text-left "></td>
                    <td className="py-6  text-left ">
                      Total Comprehensive Income
                    </td>
                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                      6,500
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
      </main>
    </>
  );
};

export default IncomeStatement;