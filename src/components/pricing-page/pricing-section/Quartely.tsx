"use client";

import ProceedPaymentModal from "@/app/(pages)/setup/price-payment/_priceComponent/PaymentModal";
import NavButton from "@/components/_landingpgComponents/navButton";
import React, { useMemo, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface QuartelyPricingProps {
  id: number;
  name: string;
  nameSubsection: {
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;
    field5?: string;
  };
  numberOfUsers: string;
  monthlyPrice: number;
  priceSubSection: {
    field1?: string;
    field2?: string;
    field3?: string;
  };
}

const moduleLists: QuartelyPricingProps[] = [
  {
    id: 1,
    name: "Account Management ",
    nameSubsection: {
      field1: "Accounting Management",
      field2: "Advanced Accounting Management",
      field3: "Advanced Accounting Management",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "15",
      field2: "15",
      field3: "15",
    },
  },
  {
    id: 2,
    name: "Finance Management ",
    nameSubsection: {
      field1: "Banking Management",
      field2: "Account Receivable Management",
      field3: "Account Payable Management",
      field4: "Investment Management",
      field5: "Financing Management",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 3,
    name: "Client Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 4,
    name: "Order Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 5,
    name: "Procurement Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 6,
    name: "Inventory Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 7,
    name: "Warehouse Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 8,
    name: "Production Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 9,
    name: "Human Resource Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 10,
    name: "Payroll Management ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 11,
    name: "CRM ",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
  {
    id: 12,
    name: "Employee Self Service",
    nameSubsection: {
      field1: "Name Field 1",
      field2: "Name Field 2",
      field3: "Name Field 3",
    },
    monthlyPrice: 10,
    numberOfUsers: "",
    priceSubSection: {
      field1: "20",
      field2: "20",
      field3: "20",
    },
  },
];

const QuartelyPricing: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<number[]>([]);
  const [openSubSections, setOpenSubSections] = useState<number[]>([]);

  // useState for modal component
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedApps(moduleLists.map((app) => app.id));
    } else {
      setSelectedApps([]);
    }
  };

  const handleSelectApp = (id: number) => {
    setSelectedApps((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  // handle toggle
  const toggleSubSection = (id: number) => {
    setOpenSubSections((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedApps.length === moduleLists.length;

  // calculate the total montly price

  const totalMonthlyPrice = useMemo(() => {
    return moduleLists
      .filter((app) => selectedApps.includes(app.id))
      .reduce((total, app) => total + app.monthlyPrice, 0);
  }, [selectedApps]);

  // calculate discount (10% of subtotal)
  const discount = -(totalMonthlyPrice * 0.1);

  // calculate tax (20% of subtotal)
  const vat = totalMonthlyPrice * 0.2;

  // Total amount to be charged
  const total = totalMonthlyPrice + discount + vat;

  return (
    <>
      <div className="container pb-2 text-[14px] font-normal font-inter bg-white rounded-2xl whitespace-nowrap overflow-x-auto no-scroll">
        <div className="px-4 py-3">
          <table className="min-w-full border-none">
            <thead>
              <tr className=" text-foundation-grey-grey-900 font-light">
                <th className="py-2 font-[500] text-left ">
                  <p className="flex flex-col mt-6 mb-3">
                    List of Modules{" "}
                    <span className="text-sm font-light text-[#939292] mt-2">
                      Modules With Sub-Modules
                    </span>
                  </p>
                </th>
                <th className="py-2 px-4 font-[500] text-center">
                  Number Of Users
                </th>
                <th className="py-2 px-4 font-[500] text-right">
                  Monthly Price(USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {moduleLists.map((module, index) => (
                <React.Fragment key={index}>
                  <tr className=" border-none">
                    <td className="py-2 gap-1 text-left flex align-middle items-center">
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(module.id)}
                        onChange={() => handleSelectApp(module.id)}
                        className="custom-checkbox text-foundation-purple-purple-400"
                      />
                      <label
                        className="flex gap-2 items-center"
                        onClick={() => toggleSubSection(module.id)}
                      >
                        {module.name}{" "}
                        {openSubSections.includes(module.id) ? (
                          <FaAngleDown size={12} color="#8133F1" />
                        ) : (
                          <FaAngleUp size={12} color="#8133F1" />
                        )}
                      </label>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input
                        type="number"
                        id="numberOfUser"
                        placeholder=""
                        className="w-[80px] px-2 py-[10px] rounded-[4px] border-[#939292]/40 border bg-white"
                      />
                    </td>
                    <td className="py-2 px-4 text-right">
                      {module.monthlyPrice.toFixed(0)}
                    </td>
                  </tr>
                  {openSubSections.includes(module.id) && (
                    <tr>
                      <td>
                        <div className="flex flex-col gap-y-2 px-8 mb-4">
                          <p className="flex items-center gap-1 text-foundation-grey-grey-700 text-sm font-light">
                            {" "}
                            <input
                              type="checkbox"
                              checked={selectedApps.includes(module.id)}
                              onChange={() => handleSelectApp(module.id)}
                              className="custom-checkbox text-foundation-purple-purple-400"
                            />
                            <label onClick={() => toggleSubSection(module.id)}>
                              {module.nameSubsection.field1}
                            </label>
                          </p>
                          <p className="flex items-center gap-1 text-foundation-grey-grey-700 text-sm font-light">
                            {" "}
                            <input
                              type="checkbox"
                              checked={selectedApps.includes(module.id)}
                              onChange={() => handleSelectApp(module.id)}
                              className="custom-checkbox text-foundation-purple-purple-400"
                            />
                            <label onClick={() => toggleSubSection(module.id)}>
                              {module.nameSubsection.field2}
                            </label>
                          </p>
                          <p className="flex items-center gap-1 text-foundation-grey-grey-700 text-sm font-light">
                            {" "}
                            <input
                              type="checkbox"
                              checked={selectedApps.includes(module.id)}
                              onChange={() => handleSelectApp(module.id)}
                              className="custom-checkbox text-foundation-purple-purple-400"
                            />
                            <label onClick={() => toggleSubSection(module.id)}>
                              {module.nameSubsection.field3}
                            </label>
                          </p>
                        </div>
                      </td>
                      <td></td>
                      <td className="text-right">
                        <div className="flex flex-col gap-y-2 px-4">
                          <p className=" text-foundation-grey-grey-700 text-sm font-light">
                            {module.priceSubSection.field1}
                          </p>
                          <p className=" text-foundation-grey-grey-700 text-sm font-light">
                            {" "}
                            {module.priceSubSection.field2}
                          </p>
                          <p className=" text-foundation-grey-grey-700 text-sm font-light">
                            {module.priceSubSection.field3}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <p className="border border-foundation-grey-grey-300 border-solid rounded-sm my-4 w-full"></p>
          <div className="flex flex-col gap-5 pricing-setup mt-5 whitespace-nowrap">
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-900">Sub Total (USD)</p>
              <p className="px-2">{totalMonthlyPrice.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-700">Discount</p>
              <p className="px-2">{discount.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-900">
                Total Before Tax (USD)
              </p>
              <p className="px-2">{totalMonthlyPrice.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-700">VAT (@ 20%)</p>
              <p className="px-2">{vat.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-900">
                Total Amount Payable(USD)
              </p>
              <p className="px-2">{total.toFixed(1)}</p>
            </div>
          </div>
          <form className="m-0 mt-4">
            <label className="flex gap-1 items-center font-normal font-inter text-[14px] text-foundation-purple-purple-400 w-full">
              <input type="checkbox" className="custom-checkbox" />I agree to
              the terms & conditions for payment methods
            </label>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        <NavButton
          onClick={openModal}
          styles="w-fit mb-6 mt-2 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100"
        >
          Proceed to Payment
        </NavButton>
      </div>
      <ProceedPaymentModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default QuartelyPricing;
