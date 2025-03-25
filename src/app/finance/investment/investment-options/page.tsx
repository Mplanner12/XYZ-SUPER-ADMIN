"use client";

import React from "react";
import { useState, useEffect } from "react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  ForwardIcon,
  ListFilterIcon,
  Maximize2,
  MaximizeIcon,
  Minimize2,
  MinimizeIcon,
  PaintBucketIcon,
  PrinterIcon,
  Search,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InvestmentOptionTable from "@/components/finance/investment/InvestmentOptionsTable";

const InvestmentOptions = () => {
  const router = useRouter();
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];
  const [size, setSize] = useState<any>("medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    if (size === "medium") {
      setSize("small");
    } else if (size === "small") {
      setSize("medium");
    }
  };

  const [activeTab, setActiveTab] = useState<number>(1);
  const tabs = [
    "Investment Management ",
    "Investment Options",
    "Manage Portfolio",
    "Investment Transactions",
    // "Audit Log",
  ];

  useEffect(() => {
    if (activeTab === 0) {
      router.push("/finance/investment");
    }
    // if (activeTab === 4) {
    //   router.push("/finance/investment/audit-log");
    // }
    if (activeTab === 2) {
      router.push("/finance/investment/manage-portfolio");
    }
    if (activeTab === 3) {
      router.push("/finance/investment/investment-transactions");
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  function OptionsTable() {
    function createData(
      name: string,
      type: string,
      vehicle: string,
      risklevel: string,
      returnpot: string,
      liquidity: string,
      fees: string,
      contact: string,
      website: string
    ) {
      return {
        name,
        type,
        vehicle,
        risklevel,
        returnpot,
        liquidity,
        fees,
        contact,
        website,
      };
    }

    const rows = [
      createData(
        "T & T",
        "Stocks",
        "Individual Stocks",
        "High",
        "High",
        "High",
        "Brokerage Fees Fund fees",
        "Individual or Network",
        "Website or Contact Information"
      ),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size={size} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">Provider Name</TableCell>
              <TableCell align="right">Investment Type</TableCell>
              <TableCell align="right">Investment Vehicle</TableCell>
              <TableCell align="right">Risk Level</TableCell>
              <TableCell align="right">Return Potential</TableCell>
              <TableCell align="right">Liquidty</TableCell>
              <TableCell align="right">Fees </TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="text-[#939292] py-6 px-4"
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.type}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {" "}
                  {row.vehicle}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {" "}
                  {row.risklevel}{" "}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {" "}
                  {row.returnpot}{" "}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {" "}
                  {row.liquidity}{" "}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {" "}
                  {row.fees}{" "}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.contact}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.website}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right" className="p-5">
                Total
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">91,000</TableCell>
              <TableCell align="right">43,000</TableCell>
              <TableCell align="right">[Website]</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <div className="h-[100vh] overflow-scroll">
        <HeaderLayout
          moduleName="Finance Module"
          moduleLink="/finance/overview"
          page="Investment Management"
          pageLink="/finance/investment"
          breadcrumbs={breadcrumbs}
        />

        <div className="p-6">
          <div className="bg-[#8133F1] p-3 flex justify-between md:w-4/5 rounded-xl">
            {tabs.map((tab, index) => (
              <p
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-2 md:px-4 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer ${
                  activeTab === index ? "bg-white text-[#8133F1]" : "text-white"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {activeTab === 1 && (
            <>
              <div className="flex flex-wrap items-center justify-between my-3">
                <p className="text-xl font-medium">
                  Investment Provider Options
                </p>
                <div className="text-[#8133F1] flex flex-wrap gap-5 justify-between">
                  <button className="flex gap-1">
                    Download <SquareArrowOutUpRightIcon size="16px" />
                  </button>
                  <button className="flex gap-1">
                    Print <PrinterIcon size="16px" />
                  </button>
                  <button className="flex gap-1">
                    Share <ForwardIcon size="16px" />
                  </button>
                  <button className="flex gap-1">
                    Customize <PaintBucketIcon size="16px" />
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white w-[300px] h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]">
                  <label
                    htmlFor="search"
                    className="flex items-center gap-2 px-4"
                  >
                    <Search color="#A1A1AA" />
                  </label>
                  <input
                    type="text"
                    id="search"
                    className="h-full w-full bg-white outline-none pr-3 text-sm"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="flex justify-between my-3">
                <div className="text-[#8133F1] flex flex-wrap gap-2">
                  <button className="flex gap-1">
                    Filter <ListFilterIcon size="16px" />
                  </button>
                  <button className="flex gap-1">
                    Sort <ArrowUpNarrowWideIcon size="16px" />
                  </button>
                  <button className="flex gap-1">
                    <span className="text-black">Total By</span> Select Column{" "}
                    <ChevronDownIcon size="16px" />
                  </button>
                </div>

                <div className="text-[#8133F1] flex flex-wrap gap-2">
                <button className='flex gap-1' onClick={()=>setIsExpanded(true)}>Showing all Columns <ChevronDownIcon size="16px"/></button>
                  <button
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <div className='flex gap-1'>
                          Minimize Table  <Minimize2 size="16px"/>
                        </div>
                      ): (
                        <div className='flex gap-1'>
                          Expand Table <Maximize2 size="16px"/>
                        </div>
                      )}
                    </button>
                </div>
              </div>
              <InvestmentOptionTable
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InvestmentOptions;
