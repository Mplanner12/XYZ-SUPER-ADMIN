"use client"

import ProceedPaymentModal from '@/app/(pages)/setup/price-payment/_priceComponent/PaymentModal';
import NavButton from '@/components/_landingpgComponents/navButton';
import React, { useEffect, useMemo, useState } from 'react';
import { FaAngleDown, FaAnglesUp, FaAngleUp } from 'react-icons/fa6';


interface SubSection {
	name: string;
	price: number;
}

interface MonthlyPricingProps {
  id: number;
  name: string;
  subsections?: SubSection[];
  monthlyPrice: number;
}

interface UserCount {
  [key: number]: number;
}


const moduleLists: MonthlyPricingProps[] = [
  {
    id: 1,
    name: "Account Management",
    subsections: [
      { name: "Accounting Management", price: 15 },
      { name: "Advanced Accounting Management", price: 15 },
    ],
    monthlyPrice: 15,
  },
  {
    id: 2,
    name: "Finance Management",
    subsections: [
      { name: "Banking Management", price: 15 },
      { name: "Account Receivable Management", price: 15 },
      { name: "Account Payable Management", price: 15 },
      { name: "Investment Management", price: 15 },
      { name: "Financing Management", price: 15 },
    ],
    monthlyPrice: 15,
  },
  {
    id: 3,
    name: "Client Management",
    subsections: [
      { name: "Event Management", price: 15 },
      { name: "Client Management", price: 15 },
      { name: "Project Management", price: 15 },
      { name: "Task Management", price: 15 },
    ],
    monthlyPrice: 15,
  },
  {
    id: 4,
    name: "Order Management",
    monthlyPrice: 15,
  },
  {
    id: 5,
    name: "Procurement Management",
    monthlyPrice: 15,
  },
  {
    id: 6,
    name: "Inventory Management",
    monthlyPrice: 15,
  },
  {
    id: 7,
    name: "Warehouse Management",
    monthlyPrice: 15,
  },
  {
    id: 8,
    name: "Production Management",
    monthlyPrice: 15,
  },
  {
    id: 9,
    name: "Human Resource Management",
    monthlyPrice: 15,
  },
  {
    id: 10,
    name: "Payroll Management",
    monthlyPrice: 15,
  },
  {
    id: 11,
    name: "CRM",
    monthlyPrice: 15,
  },
  {
    id: 12,
    name: "Employee Self Service",
    monthlyPrice: 15,
  },
];

const MonthlyPricing: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<number[]>([]);
  const [openSubSections, setOpenSubSections] = useState<number[]>([]);
  const [userCounts, setUserCounts] = useState<UserCount>({});
  const [productInfo, setProductInfo] = useState<any>(null);
  const [open, setOpen] = useState({});

  // useState for modal component
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Retrieve the stored data when component mounts
    const storedInfo = localStorage.getItem("productInfo");
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      setProductInfo(parsedInfo);

      // Set initial user count for all modules
      const baseCount = parseInt(parsedInfo.numberOfUsers) || 0;
      const initialUserCounts: UserCount = {};
      moduleLists.forEach((module) => {
        initialUserCounts[module.id] = baseCount;
      });
      setUserCounts(initialUserCounts);
    }
  }, []);

  // Update the price calculation to consider the payment plan
  const calculateModulePrice = (module: MonthlyPricingProps) => {
    if (!selectedApps.includes(module.id)) return 0;
    const users = userCounts[module.id] || 0;
    let price = module.monthlyPrice * users;

    // Apply payment plan multiplier if needed
    if (productInfo?.paymentPlan === "annual") {
      price = price * 12 * 0.9; // 10% discount for annual
    } else if (productInfo?.paymentPlan === "quarterly") {
      price = price * 3;
    }

    return price;
  };

  // Update handleUserCountChange to maintain consistency
  const handleUserCountChange = (id: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setUserCounts((prev) => ({
      ...prev,
      [id]: numValue,
    }));
  };

  // Add a display for the selected plan info
  const renderPlanInfo = () => {
    if (!productInfo) return null;

    return (
      <div className="mb-4 text-sm text-foundation-grey-grey-700">
        <p>Selected Plan: {productInfo.plan}</p>
        <p>Payment Schedule: {productInfo.paymentPlan}</p>
        <p>Base Users: {productInfo.numberOfUsers}</p>
        {productInfo.currency && <p>Currency: {productInfo.currency}</p>}
      </div>
    );
  };

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

  // const totalMonthlyPrice = useMemo(() => {
  //   return moduleLists
  //     .filter((app) => selectedApps.includes(app.id))
  //     .reduce((total, app) => total + app.monthlyPrice, 0);
  // }, [selectedApps]);
  const totalMonthlyPrice = useMemo(() => {
    return moduleLists.reduce(
      (total, module) => total + calculateModulePrice(module),
      0
    );
  }, [selectedApps, userCounts]);

  // calculate discount (2% of subtotal)
  const discount = -(totalMonthlyPrice * 0.02);

  // calculate tax (7.5% of subtotal)
  const vat = totalMonthlyPrice * 0.075;

  // Total amount to be charged
  const total = totalMonthlyPrice + discount + vat;

  return (
    <>
      {renderPlanInfo()}
      <div className=" pb-2 text-[14px] font-normal font-inter bg-white rounded-2xl whitespace-nowrap overflow-x-auto no-scroll min-w-full">
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
                <React.Fragment key={module.id}>
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
                        onClick={() =>
                          module.subsections && toggleSubSection(module.id)
                        }
                      >
                        {module.name}{" "}
                        {module.subsections &&
                          (openSubSections.includes(module.id) ? (
                            <FaAngleUp size={12} color="#8133F1" />
                          ) : (
                            <FaAngleDown size={12} color="#8133F1" />
                          ))}
                      </label>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={userCounts[module.id] || ""}
                        onChange={(e) =>
                          handleUserCountChange(module.id, e.target.value)
                        }
                        className="w-[80px] px-2 py-[10px] rounded-[4px] border-[#939292]/40 border bg-white"
                        disabled={!selectedApps.includes(module.id)}
                      />
                    </td>
                    <td className="py-2 px-4 text-right">
                      {calculateModulePrice(module).toFixed(0)}
                    </td>
                  </tr>
                  {module.subsections &&
                    openSubSections.includes(module.id) && (
                      <tr>
                        <td colSpan={3}>
                          <div className="pl-8 pr-4 mb-4">
                            {module.subsections.map((sub, i) => (
                              <div
                                key={i}
                                className="flex justify-between text-sm"
                              >
                                <span className="flex gap-1 mb-4 text-foundation-grey-grey-700 text-[12px] font-light">
                                  <input
                                    type="checkbox"
                                    checked={selectedApps.includes(module.id)}
                                    onChange={() => handleSelectApp(module.id)}
                                    className="custom-checkbox text-foundation-purple-purple-400"
                                  />
                                  {sub.name}
                                </span>
                                <span className="text-foundation-grey-grey-700 text-[12px] font-light">
                                  {sub.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="border border-foundation-grey-grey-300 border-solid rounded-sm my-4 min-w-max w-full"></div>
          <div className="flex flex-col gap-5 pricing-setup mt-5 whitespace-nowrap w-full">
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-900">Sub Total (USD)</p>
              <p className="px-2">{totalMonthlyPrice.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-700">Discount(@ 2%)</p>
              <p className="px-2">{discount.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-900">
                Total Before Tax (USD)
              </p>
              <p className="px-2">{totalMonthlyPrice.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-foundation-grey-grey-700">VAT (@ 7.5%)</p>
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
            <ProceedPaymentModal isOpen={isModalOpen} onClose={closeModal} />
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
    </>
  );
};

export default MonthlyPricing;