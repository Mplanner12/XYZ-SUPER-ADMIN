"use client";

import React from "react";
import { useState, useEffect } from "react";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import { useRouter } from "next/navigation";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWideIcon,
  Bird,
  ChevronLeftIcon,
  EllipsisVertical,
  ExternalLinkIcon,
  ListFilterIcon,
} from "lucide-react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmptyState from "@/components/reusable/EmptyState";
import { DateTime } from "@/components/reusable/DateTime";

const Auditlog = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = [
    "Receivables Management",
    "Invoice Generation",
    "Receivable Credit Control",
    "Receive Payments",
  ];

  useEffect(() => {
    if (activeTab === 1) {
      router.push("/finance/receivables/generate-invoice");
    }
    if (activeTab === 3) {
      router.push("/finance/receivables/receive-payments");
    }
    if (activeTab === 2) {
      router.push("/finance/receivables/credit-control");
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

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

  function AuditTable() {
    function createData(
      logid: number,
      userid: string,
      action: string,
      description: string,
      time: string,
      date: string,
      status: string
    ) {
      return { logid, userid, action, description, time, date, status };
    }

    const rows = [
      createData(
        55678,
        "Investment Analysis",
        "Reviewed Performance",
        "Reviewed monthly performance of securities",
        "11:39 AM",
        "06-22-2022",
        "Done"
      ),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">Log ID</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Date </TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.logid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="text-[#939292] py-6 px-4"
                >
                  {row.logid}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.userid}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.action}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.description}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.time}
                </TableCell>
                <TableCell align="right" className="text-[#939292]">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div className="h-[100vh] overflow-scroll bg-[#FAFAFA]">
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink="/finance/overview"
        page="Receivables Management"
        pageLink="/finance/receivables"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-secondary rounded-[16px] py-6 px-3 mt-4 sm:mx-6">
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

        {activeTab === 0 && (
          <>
            <div className="flex justify-between my-3">
              <p className="font-medium text-lg flex items-center">
                <ChevronLeftIcon
                  onClick={() => {
                    router.push("/finance/receivables");
                  }}
                />
                Audit Log
              </p>

              <p className="flex items-center gap-2 text-[#8133F1]">
                Export Audit Log
                <ExternalLinkIcon />
              </p>
            </div>

            <div className="text-[#8133F1] flex flex-wrap justify-between my-2">
              <div className="flex gap-2 items-center">
                <button className="flex gap-1">
                  Filter <ListFilterIcon size="16px" />
                </button>
                <button className="flex gap-1">
                  Sort <ArrowUpNarrowWideIcon size="16px" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p>Date Range</p>
                <ResponsiveDatePickers />
                <span>to</span>
                <ResponsiveDatePickers />
              </div>
            </div>

            <div className="my-2">
              {/* Audit Table */}
              <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                {audits?.length > 0 ? (
                  <table className="min-w-full bg-white border border-[#EAECF0]">
                    <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                      <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                        <th className="py-6 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Log ID</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>User ID</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Action</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Description</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Time</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Date	</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Status</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                      {audits?.map((invoice:any, index:any) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                        >
                          <td className="px-4 py-6 whitespace-nowrap text-left">
                            here
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.invoice_no}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            No data
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.amount_due?.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            No data
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap first-letter:uppercase lowercase">
                            <DateTime dateString = {invoice?.date} />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.customer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState
                    img={
                      <Bird
                        size={150}
                        className="text-primary-normal p-1 rounded-lg"
                      />
                    }
                    title={`No Record Found`}
                    text={`Oops! It seems that there is no record`}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const audits = [
  {}
]
export default Auditlog;
