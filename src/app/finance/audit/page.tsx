"use client";

import React from "react";
import { useState, useEffect } from "react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import { useRouter } from "next/navigation";
import {
  ArrowUpNarrowWideIcon,
  Bird,
  ExternalLinkIcon,
  ListFilterIcon,
} from "lucide-react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAudits } from "../hooks/query";
import EmptyState from "@/components/reusable/EmptyState";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import moment from "moment";

const Auditlog = () => {
  const [page, setPage] = useState<number>(1)
  const [from, setFrom] = React.useState<Date | undefined>(new Date())
  const [to, setTo] = React.useState<Date | undefined>(new Date())
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];
  const {data:audits, isPending} = useAudits({
    // from_date: from, 
    // to_date: to, 
    page,
  })

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

  return (
    <div className="h-[100vh] overflow-scroll">
      {isPending && <LoadingOverlay/>}
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Audit Trail"
        pageLink="/finance/audit"
        breadcrumbs={breadcrumbs}
      />

      <div className="p-6">
        <div className="flex justify-between my-3">
          <p className="font-medium text-lg ">Audit Trail</p>
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

        <div className="my-3">
          <section  className="w-full mx-auto overflow-x-auto no-scrollbar">
            {audits?.length > 0 ?  (
              <table className="min-w-full bg-white border border-[#EAECF0]">
                <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                  <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                    <th className="py-6 px-4 font-semibold text-nowrap text-left">
                      <p>Log ID</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>User ID</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Action</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Time</p>
                    </th>
                    <th className="py-2 px-4 font-semibold text-nowrap text-left">
                      <p>Date</p>
                    </th>
                  </tr>
                </thead>
                
                  <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                    {audits?.map((item:any, index:any) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                      >
                        <td className="px-4 py-6 whitespace-nowrap text-left">
                          {item?.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item?.user_id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                        {item?.action}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item?.time}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item?.date}
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Auditlog;
