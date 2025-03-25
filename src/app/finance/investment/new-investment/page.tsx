"use client";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {
  ChevronLeftIcon,
  PlusIcon,
} from "lucide-react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParams } from "next/navigation";
import Dropdown from "@/components/reusable/DropDown";
import { investmentOptions } from "@/data/dropDownOption";
import AddNewInvestmentTable from "@/components/finance/investment/AddNewInvestmentTable";
import CostTable from "@/components/finance/investment/CostTable";
import ApprovalTable from "@/components/finance/investment/ApprovalTable";
import { useAddInvestment } from "../../hooks/mutate";
import { Payment } from "@/components/finance/investment/AddNewInvestmentTable";

const NewInvestment = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [subTab, setSubTab] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);
  const [investment, setInvestment] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

  // getting table data
  const [tableData, setTableData] = useState<Payment[]>([]);
  const handleTableDataUpdate = useCallback((data: Payment[]) => {
    setTableData(data);
  }, []);

  // API CALL
  const { mutate, isPending } = useAddInvestment();

  const show = (): void => {
    action ? setAction(false) : setAction(true);
  };

  const subtabs = ["Investment Details", "Additional Details", "Approval"];

  const tabs = [
    "Investment Management ",
    "Investment Options",
    "Manage Portfolio",
    "Investment Transactions",
    "Audit Log",
  ];

  const addNewInvestment = () => {
    mutate({
      
    });
    console.log(tableData)
  };

  useEffect(() => {
    if (activeTab === 4) {
      router.push("/finance/investment/audit-log");
    }
    if (activeTab === 1) {
      router.push("/finance/investment/investment-options");
    }
    if (activeTab === 2) {
      router.push("/finance/investment/manage-portfolio");
    }
    if (activeTab === 3) {
      router.push("/finance/investment/investment-transactions");
    }
    if (searchParams.get("approval") === "true") {
      setSubTab(2);
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const [files, setFiles] = useState<File[]>([]);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    if (fileList && fileList.length > 0) {
      const newFiles: File[] = [];
      const duplicateFiles: string[] = [];

      Array.from(fileList).forEach((newFile) => {
        if (
          files.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
        ) {
          duplicateFiles.push(newFile.name);
        } else {
          newFiles.push(newFile);
        }
      });

      if (duplicateFiles.length > 0) {
        setWarningMessage(
          `This file already exist: ${duplicateFiles.join(", ")}`
        );
        setTimeout(() => setWarningMessage(""), 5000); // Clear warning after 5 seconds
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const Prev = () => {
    if (subTab === 0) {
      setSubTab(0);
    } else if (subTab != 0) {
      setSubTab(subTab - 1);
    }
  };

  const Next = () => {
    if (subTab >= 0) {
      setSubTab(subTab + 1);
    } else if (subTab === 2) {
      setSubTab(2);
    }
  };

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
          <div className="bg-[#8133F1] p-3 flex justify-between w-4/5 rounded-[8px]">
            {tabs.map((tab, index) => (
              <p
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-2 md:px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  activeTab === index ? "bg-white text-[#8133F1]" : "text-white"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {activeTab === 0 && (
            <>
              <div className="my-3">
                <div className="flex items-center mb-4">
                  <ChevronLeftIcon
                    color="#8133F1"
                    onClick={() => {
                      router.push("/finance/investment");
                    }}
                  />
                  <p className="text-xl font-medium">Add New Investment</p>
                </div>
                <p className="text-[#A4A8A7]">
                  Add an investment to your company portfolio
                </p>
              </div>

              <div className="grid grid-cols-3 md:w-3/5 justify-between border border-[#8133F1] rounded-[8px] text-[#8133F1] my-2">
                {subtabs.map((sub, index) => (
                  <button
                    key={index}
                    className={`${
                      subTab === index
                        ? "text-white bg-[#8133F1]"
                        : "text-[#8133F1]"
                    }  p-2 rounded-lg`}
                    onClick={() => setSubTab(index)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
              {subTab === 0 && (
                <>
                  <div className="my-3">
                    <p className="h2 my-3 font-medium">Investment Details</p>
                    <Dropdown
                      placeholder="Select Investment"
                      label="Select Investment"
                      options={investmentOptions}
                      value={investment}
                      onChange={(value) => setInvestment(value)}
                      className="w-[170px] text-base"
                      buttonClassName="bg-white"
                    />
                  </div>

                  <div className="my-5">
                    {/* <InvestmentTable /> */}
                    <AddNewInvestmentTable onDataUpdate={handleTableDataUpdate} />
                  </div>

                  <div className="flex justify-between my-5">
                    <button
                      disabled
                      className="px-5 py-3 border rounded-lg text-[#939292]"
                      onClick={() => Prev()}
                    >
                      Prev
                    </button>
                    <button
                      className="px-5 py-3 border rounded-lg text-white bg-[#8133F1]"
                      // onClick={() => Next()}
                      onClick={addNewInvestment}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {subTab === 1 && (
                <>
                  <div className="text-lg">
                    <p className="mb-4">Initial Investment Cost</p>
                    <CostTable />
                  </div>

                  <div>
                    <div className="flex justify-between my-5">
                      <button
                        className="px-5 py-3 border rounded-lg border-[#8133F1] text-[#8133F1]"
                        onClick={() => Prev()}
                      >
                        Prev
                      </button>
                      <button
                        className="px-5 py-3 border rounded-lg text-white bg-[#8133F1]"
                        onClick={() => Next()}
                      >
                        Send for Approval
                      </button>
                    </div>
                  </div>
                </>
              )}
              {subTab === 2 && (
                <>
                  <div className="text-lg gap-3">
                    <p className="mt-4 mb-2">Approval</p>
                    <ApprovalTable />
                  </div>

                  <div className="my-2">
                    <p className="text-[#939292] text-lg">Submission</p>
                    <div className="flex gap-3">
                      <label className="font-medium">
                        Form Completed By
                        <input
                          type="text"
                          className="block my-2 border focus:border-1 rounded-[8px] py-3 px-2 text-[#A4A8A7] focus:border-inherit outline-none"
                          placeholder="John Smith"
                        />
                      </label>
                      <label className="font-medium">
                        Date of Submission
                        <ResponsiveDatePickers />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between my-5">
                    <button
                      className="px-5 py-3 border rounded-lg border-[#8133F1] text-[#8133F1]"
                      onClick={() => Prev()}
                    >
                      Prev
                    </button>
                    <button className="px-5 py-3 border rounded-lg text-white bg-[#8133F1]">
                      Submit
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewInvestment;
