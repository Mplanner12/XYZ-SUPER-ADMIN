"use client";

import React from "react";
import { useState, useEffect } from "react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {
  ArrowUpFromLineIcon,
  ArrowUpNarrowWideIcon,
  ChartNoAxesCombinedIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Ellipsis,
  ForwardIcon,
  ListFilterIcon,
  MinimizeIcon,
  PaintBucketIcon,
  PlusIcon,
  PrinterIcon,
  RotateCwIcon,
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
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Pie from "@/components/investment/currentpie";
import dynamic from "next/dynamic";

const ManagePortfolio = () => {
  const Pie = dynamic(() => import("@/components/investment/currentpie"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  const AccPie = dynamic(() => import("@/components/investment/actualpie"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  const router = useRouter();
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

  const [activeTab, setActiveTab] = useState<number>(2);

  const tabs = [
    "Investment Management ",
    "Investment Options",
    "Manage Portfolio",
    "Investment Transactions",
    // "Audit Log",
  ];

  useEffect(() => {
    // if (activeTab === 4) {
    //   router.push("/finance/investment/audit-log");
    // }
    if (activeTab === 1) {
      router.push("/finance/investment/investment-options");
    }
    if (activeTab === 0) {
      router.push("/finance/investment/");
    }
    if (activeTab === 3) {
      router.push("/finance/investment/investment-transactions");
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const ResponsiveDatePickers = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            "DatePicker",
            "MobileDatePicker",
            "DesktopDatePicker",
            "StaticDatePicker",
          ]}
        >
          {/* <DemoItem label=""> */}
          <DatePicker
            sx={{
              border: "0px solid #CACACA",
              padding: "0px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "& fieldset": {
                  borderColor: "#CACACA",
                },
                "&:hover fieldset": {
                  borderColor: "#CACACA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#CACACA", // Remove border on focus
                },
                "& input": {
                  color: "#03191B99", // Set text color
                  height: "12px",
                },
              },
            }}
            className="rounded p-0 focus:outline-none"
          />
          {/* </DemoItem> */}
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  function ManageTable() {
    function createData(
      risk: string,
      stress: string,
      override: string,
      manager: string
    ) {
      return { risk, stress, override, manager };
    }

    const rows = [
      createData(
        "Adjusting portfolio to reduce exposure to high volatility stocks.",
        "Enter Results",
        "Enter Value",
        "Rebalance as per system recommendation"
      ),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">Approval Step</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{}}
                  className="text-[#A4A8A7] py-6 px-4"
                >
                  {row.risk}
                </TableCell>
                <TableCell align="left" className="text-[#8133F1]">
                  {row.stress}
                </TableCell>
                <TableCell align="left" className="text-[#8133F1]">
                  {row.override}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.manager}
                </TableCell>
              </TableRow>
            ))}
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
          <div className="bg-[#8133F1] p-3 flex justify-between md:w-4/5 rounded-[8px]">
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

          {activeTab === 2 && (
            <>
              <div className="flex flex-wrap justify-between items-center my-3">
                <div className="">
                  <p className="text-xl font-medium my-2">Manage Portfolio</p>
                  <p className="text-[#939292]">
                    {" "}
                    Current Asset Allocation Abc Limited - Fiscal Year End:
                    December 31, 2024
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#8133F1]">
                  <label>Date</label>
                  <ResponsiveDatePickers />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="leading-10 px-5 py-10 shadow-custom text-center rounded-md text-lg">
                  <div className="flex justify-center my-3">
                    <ChartNoAxesCombinedIcon />
                  </div>
                  <p>Total Portfolio Value</p>
                  <p>$100,000</p>
                  <p className="text-[#00A814]">
                    +1535.56<span>+6.89%</span>
                  </p>
                </div>

                <div className="p-5 shadow-custom rounded-md">
                  <p>Current Allocation</p>
                  <p className="text-xs text-[#939292]">
                    Based on current investment
                  </p>

                  <div className="flex flex-wrap gap-4 w-[350px] px-4 mt-4 mb-6">
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Stocks</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Bonds</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#9654F4;] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Cash</span>
                    </div>
                  </div>

                  <div className="w-full">
                    <Pie />
                  </div>
                </div>

                <div className="p-5 shadow-custom rounded-md">
                  <p>Target Allocation</p>
                  <p className="text-xs text-[#939292]">
                    Based on system recommendation
                  </p>

                  <div className="flex flex-wrap gap-4 w-[350px] px-4 mt-4 mb-6">
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Stocks</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Bonds</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="block bg-[#9654F4;] w-[12px] rounded-[50%] h-[12px] " />
                      <span className="text-[12px]">Cash</span>
                    </div>
                  </div>

                  <div className="w-full">
                    <AccPie />
                  </div>
                </div>
              </div>

              <div
                className="flex justify-center items-center my-3 text-[#8133F1] w-4/5 cursor-pointer"
                onClick={() =>
                  router.push("/finance/investment/rebalance-actions")
                }
              >
                <RotateCwIcon className="mr-2" /> Rebalance to Target Allocation
              </div>

              <div>
                {/* <ManageTable /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagePortfolio;
