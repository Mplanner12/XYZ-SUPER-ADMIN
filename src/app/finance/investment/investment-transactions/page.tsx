"use client";

import React from "react";
import { useState, useEffect } from "react";
import FinanceHeader from "@/components/finance/FinanceHeader";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PlusIcon } from "lucide-react";
import BuyTable from "@/components/finance/investment/investment-transaction/BuyTable";
import SellTable from "@/components/finance/investment/investment-transaction/SellTable";
import ValuationTable from "@/components/finance/investment/investment-transaction/ValuationTable";

const InvestmentTransactions = () => {
  const router = useRouter();
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];

  const [transactionType, setTransactionType] = useState("Buy"); // Default to 'Buy'
  const handleSelectChange = (event: any) => {
    setTransactionType(event.target.value);
  };

  const [activeTab, setActiveTab] = useState<number>(3);
  const searchParams = useSearchParams();

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
    if (activeTab === 2) {
      router.push("/finance/investment/manage-portfolio");
    }
    if (searchParams.get("transactionType") === "Buy") {
      setTransactionType("Buy");
    }
    if (searchParams.get("transactionType") === "Sell") {
      setTransactionType("Sell");
    }
    if (searchParams.get("transactionType") === "Valuation") {
      setTransactionType("Valuation");
    }
  }, [activeTab]);


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

          <div className="flex justify-between items-center mt-3">
            <p className="text-xl font-medium my-2">Investment Transactions</p>
          </div>

          <div className="leading-loose">
            <label>Select Transaction Type</label>
            <select
              name="transactionType"
              id="transactionType"
              className="border rounded outline-none py-1 pr-5 block border-[#BCBBBB] text-[#A4A8A7]"
              value={transactionType}
              onChange={handleSelectChange}
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Valuation">Valuation</option>
            </select>

            <div>
              {transactionType === "Buy" && (
                <div>
                  <p className="text-lg my-2">Buy Table</p>
                  <BuyTable />
                </div>
              )}
              {transactionType === "Sell" && (
                <div>
                  <p className="text-lg my-2">Sell Table</p>
                  <SellTable />
                </div>
              )}
              {transactionType === "Valuation" && (
                <div>
                  <p className="text-lg my-2">Valuation Table</p>
                  <ValuationTable />
                </div>
              )}
            </div>

            <p className="my-5 flex items-center text-[#8133F1]">
              <PlusIcon /> Add a New Entry
            </p>

            <div className="my-5 flex gap-3">
              <button
                className="px-5 py-2 border rounded-[16px] text-white bg-[#8133F1]"
                onClick={() =>
                  router.push("/finance/investment/manage-portfolio")
                }
              >
                Save
              </button>
              <button className="px-5 py-2 border rounded-[16px] border-[#8133F1] text-[#8133F1]">
                Save and Create New
              </button>
              <button className="text-[#8133F1]"> Cancel </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentTransactions;
