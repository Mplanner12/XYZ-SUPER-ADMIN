"use client";

import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import {ArrowLeftIcon, ArrowRight, ArrowRightIcon, ChevronLeftIcon, Ellipsis, EllipsisVertical, InfoIcon,
  Pencil, PencilIcon, PlusIcon} from "lucide-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdditionalDetailTable from "@/components/finance/investment/manage-portfolio/AdditionalDetailTable";
import ApprovalTable from "@/components/finance/investment/manage-portfolio/ApprovalTable";

interface ModalState {
  isCapm: boolean;
  isDividend: boolean;
  isBondDebt: boolean;
  isExpected: boolean;
}

const Rebalance = () => {
  const [rebalances, setRebalances] = useState([
    {
      id: 1,
      step: 'Initial Review by Portfolio Manager',
      name: 'Ahmed Sule',
      status: 'approved',
    },
    {
      id: 2,
      step: 'Final Approval by Investment Committee',
      name: 'Sadiq Lamido',
      status: 'approved',
    },
  ]);
  // editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const router = useRouter();
  const breadcrumbs = ["Admin Dashboard", "Finance Module"];
  const [action, setAction] = useState<boolean>(false);
  const show = (): void => {
    action ? setAction(false) : setAction(true);
  };

  const [activeTab, setActiveTab] = useState<number>(2);

  const tabs = [
    "Investment Management ",
    "Investment Options",
    "Manage Portfolio",
    "Investment Transactions",
    "Audit Log",
  ];

  const [modalState, setModalState] = useState<ModalState>({
    isCapm: false,
    isDividend: false,
    isBondDebt: false,
    isExpected: false,
  });
  const modalRefs = {
    isCapm: useRef<HTMLDivElement>(null),
    isDividend: useRef<HTMLDivElement>(null),
    isBondDebt: useRef<HTMLDivElement>(null),
    isExpected: useRef<HTMLDivElement>(null),
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(modalRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setModalState(prevState => ({ ...prevState, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleModal = (modalKey: keyof ModalState) => {
    setModalState(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(key => {
        newState[key as keyof ModalState] = key === modalKey ? !prevState[key as keyof ModalState] : false;
      });
      return newState;
    });
  };

  useEffect(() => {
    if (activeTab === 4) {
      router.push("/finance/investment/audit-log");
    }
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

  const handleEdit = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };
  const handleSave = (id: number) => {
    setRebalances(prevRebalances =>
      prevRebalances.map(item =>
        item.id === id ? { ...item, targetValue: editValue } : item
      )
    );
    setEditingId(null);
  };

  function BuySellTable() {
    function createData(
      investment: string,
      current: number,
      target: number,
      difference: any,
      actionsreq: string,
      action: string
    ) {
      return { investment, current, target, difference, actionsreq, action };
    }

    const rows = [
      createData(
        "Apple Inc.",
        600000,
        550000,
        "-50,000",
        "Sell 333 shares",
        "Sell"
      ),
      createData(
        "Apple Inc.",
        600000,
        550000,
        "+50,000",
        "Sell 333 shares",
        "Buy"
      ),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">Investment</TableCell>
              <TableCell align="left">Current Value &nbsp;(USD)</TableCell>
              <TableCell align="left">Target Value &nbsp;(USD)</TableCell>
              <TableCell align="left">Difference &nbsp;(USD)</TableCell>
              <TableCell align="left">Actions Required</TableCell>
              <TableCell align="left">Actions </TableCell>
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
                  className="text-[#A4A8A7]"
                >
                  {row.investment}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.current}
                </TableCell>
                <TableCell
                  align="left"
                  className="text-[#A4A8A7] flex items-center"
                >
                  {" "}
                  {row.target} <PencilIcon color="#8133F1" />
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {" "}
                  {row.difference}{" "}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {" "}
                  {row.actionsreq}{" "}
                </TableCell>
                <TableCell
                  align="left"
                  className={`${
                    row.action === "Sell" ? "text-[#E00B2B]" : "text-[#00A814]"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    {row.action === "Sell" ? (
                      <ArrowRightIcon />
                    ) : (
                      <ArrowLeftIcon />
                    )}{" "}
                    {row.action}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function PortReturnsTable() {
    function createData(
      computation: string,
      capm: number,
      growth: number,
      bonddebt: number,
      cashequivalent: number,
      annual: number,
      toequity: number
    ) {
      return {
        computation,
        capm,
        growth,
        bonddebt,
        cashequivalent,
        annual,
        toequity,
      };
    }

    const rows = [
      createData("Current Financial Metrics", 5.1, 0, 0.62, 0.1, 5.82, 50),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">
                Computation Calculation
              </TableCell>
              <TableCell align="left">
                <div className="relative flex items-center justify-end gap-2">
                  <input type="radio" name="method" />
                  <p className="w-[100px]">Stock - CAPM Method</p>
                  <InfoIcon className="ml-1 cursor-pointer" onClick={() => toggleModal('isCapm')} />
                  {modalState.isCapm && (
                    <div ref={modalRefs.isCapm}  className="w-[258px] h-fit bg-white absolute top-8 -right-20 shadow-custom rounded-[8px] z-20 p-4 ">
                      Stock - CAPM Method: Risk free rate + Beta * Market Risk Premiun
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="relative flex items-center justify-end gap-2">
                  <input type="radio" name="method" />
                  <p>Stock-Dividend Growth Method</p>
                  <InfoIcon className="ml-1 cursor-pointer" onClick={() => toggleModal('isDividend')} />
                  {modalState.isDividend && (
                    <div ref={modalRefs.isDividend} className="w-[258px] h-fit bg-white space-y-4 absolute top-8 -right-20 shadow-custom rounded-[8px] z-20 p-4 ">
                      Stock -Dividend Growth Method: Current Dividend/ Market Price per share + Dividend Growth rate 
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="relative flex items-center justify-end">
                  Bond Debt
                  <InfoIcon className="ml-1 cursor-pointer" onClick={() => toggleModal('isBondDebt')} />
                  {modalState.isBondDebt && (
                    <div ref={modalRefs.isBondDebt} className="w-[258px] h-fit bg-white space-y-4 absolute top-8 -right-20 shadow-custom rounded-[8px] z-20 p-4 ">
                      Bond -Debt: Weighted Average yield to maturity* (1-Tax rate)
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell align="left">Cash and Cash Equivalent</TableCell>
              <TableCell align="left">
                <div className="relative flex items-center justify-end">
                  Expected Annual Return
                  <InfoIcon className="ml-1 cursor-pointer" onClick={() => toggleModal('isExpected')} />
                  {modalState.isExpected && (
                    <div ref={modalRefs.isExpected} className="w-[258px] h-fit bg-white space-y-4 absolute top-8 -right-20 shadow-custom rounded-[8px] z-20 p-4 ">
                      Expected Annual Return: Weight* Returns
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell align="left">Debt to Equity Ratio</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.computation}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="text-[#939292] py-6 px-4"
                >
                  {row.computation}
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.capm} %
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.growth} %
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.bonddebt} %
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.cashequivalent} %
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.annual} %
                </TableCell>
                <TableCell align="left" className="text-[#939292]">
                  {row.toequity} %
                </TableCell>
                <TableCell
                  align="left"
                  className="text-[#939292]"
                  onClick={() => show()}
                >
                  <EllipsisVertical />
                  <div
                    className={` ${
                      action ? "block" : "hidden"
                    } absolute right-5 border-1 shadow-xl bg-white p-3 rounded-xl font-light leading-loose`}
                  >
                    <button className="flex gap-3 items-center">Insert</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function AdditionalTablee() {
    function createData(method: string, condition: string, conditions: string) {
      return { method, condition, conditions };
    }

    const rows = [
      createData(
        "Sell $50,000 worth of Apple Inc. stock (333 shares) Buy $50,000 worth of Government Bonds",
        "Current 10-year Treasury Yield: 2.5%, Company Credit Ratings: BBB+ (S&P), Equity Market Conditions: Neutral",
        "The rebalancing reduces exposure to high volatility stocks, potentially lowering overall portfolio risk. Increasing bond allocation may provide more stability but could limit upside potential. The Debt to Equity ratio is increasing, which may increase the portfolio's sensitivity to interest rate changes"
      ),
    ];

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#FAFAFA]">
              <TableCell className="py-6 px-4">Rebalancing Method</TableCell>
              <TableCell align="left">Market Conditions</TableCell>
              <TableCell align="left">Market Conditions</TableCell>
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
                  {row.method}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.condition}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.conditions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function ApprovalTablee() {
    function createData(
      step: string,
      name: string,
      status: string,
      date: string
    ) {
      return { step, name, status, date };
    }

    const rows = [
      createData(
        "Initial Review by Portfolio Manager",
        "Ahmed Sule",
        "Approved",
        "01-15-2024"
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
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{}}
                  className="text-[#A4A8A7] py-6 px-4"
                >
                  {row.step}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.name}
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  <select
                    name=""
                    id=""
                    className="border-none rounded outline-none py-1 pr-5 block border-[#BCBBBB] text-[#A4A8A7]"
                  >
                    <option value=""> {row.status} </option>
                  </select>
                </TableCell>
                <TableCell align="left" className="text-[#A4A8A7]">
                  {row.date}
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
                className={`px-2 md:px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  activeTab === index ? "bg-white text-[#8133F1]" : "text-white"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {activeTab === 2 && (
            <>
              <div className="my-3">
                <div className="flex items-center">
                  <ChevronLeftIcon
                    color="#8133F1"
                    onClick={() => {
                      router.push("/finance/investment/manage-portfolio");
                    }}
                  />
                  <p className="text-xl font-medium">Rebalance Actions</p>
                </div>
                <p className="text-[#A4A8A7] px-1">
                  Rebalance your portfolio allocations
                </p>
              </div>

              <div>
                <p className="text-lg my-2">Buy/Sell Instructions Table</p>
                {/* BUY?SELL Table */}
                <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                  <table className="min-w-full bg-white border border-[#EAECF0]">
                    <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                      <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                        <th className="py-6 px-4 font-semibold text-nowrap text-left">
                          <p>Investment</p>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <p>Current Value (USD)</p>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <p>Target Value (USD)</p>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <p>Difference (USD)</p>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <p>Actions Required</p>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <p>Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-[#939292] text-sm divide-y divide-[#EAECF0]">
                      {rebalances?.map((item:any, index:any) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                        >
                          <td className="px-4 py-6  text-left">
                            <p>Long-term Debt</p>
                          </td>
                          <td className="px-4 py-4 ">
                            1,000,000
                          </td>
                          <td className="px-4 py-4 text-nowrap">
                            {editingId === item.id ? (
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="border border-borderColor rounded outline-none px-2 py-1 mr-2"
                                />
                                <button onClick={() => handleSave(item.id)} className="text-primary-normal">
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p>
                                {item.targetValue || '1,155,000'}
                                <Pencil
                                  size={18}
                                  className='inline text-primary-normal ml-2 cursor-pointer'
                                  onClick={() => handleEdit(item.id, item.targetValue || '1,155,000')}
                                />
                              </p>
                            )}  
                          </td>
                          <td className="px-4 py-4 ">
                            -50,000
                          </td>
                          <td className="px-4 py-4 ">
                            <p>Buy $155,000 worth of debt</p>
                          </td>
                          <td className="px-4 py-4 text-nowrap">
                            <p className='text-[#E00B2B]'><ArrowRight size={18} className='inline'/> Sell</p>
                          </td>
                          {/* #00A814 - green color for BUY*/}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="my-5">
                <p className="text-lg my-2">Portfolio Returns</p>
                <PortReturnsTable />
              </div>

              <div>
                <p className="text-lg my-2">Additional Details</p>
                <AdditionalDetailTable />
              </div>

              <div>
                <p className="text-lg my-2">Approval </p>
                <ApprovalTable />
                <div className="my-5 flex gap-3">
                  <button className="px-5 py-3 border rounded-[16px] border-[#8133F1] text-[#8133F1]">
                    Cancel
                  </button>
                  <button
                    className="px-5 py-3 border rounded-[16px] text-white bg-[#8133F1]"
                    onClick={() =>
                      router.push("/finance/investment/manage-portfolio")
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Rebalance;
