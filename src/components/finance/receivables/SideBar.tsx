import Dropdown from "@/components/reusable/DropDown";
import { SelectField } from "@/components/reusable/SelectField";
import { TextField } from "@/components/reusable/TextField";
import { customerOptions, frequencyTypeOptions } from "@/data/dropDownOption";
import { EllipsisVertical, PencilIcon, PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type sideProps = {
  side: any;
  sideTab: number;
  setSideTab: React.Dispatch<React.SetStateAction<number>>;
  more:number | null;
  setMore: React.Dispatch<React.SetStateAction<number | null>>;
  customer: any;
  setCustomer: React.Dispatch<React.SetStateAction<string>>;
  frequency:string;
  setFrequency: React.Dispatch<React.SetStateAction<string>>;
  frequencyType: string;
  setFrequencyType: React.Dispatch<React.SetStateAction<string>>;
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
  numberOfPayment: string;
  setNumberOfPayment: React.Dispatch<React.SetStateAction<string>>;
  createGroup: boolean;
  setCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
  viewGroup?: boolean;
  setViewGroup: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModal?: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  enableOnlinePayment?: boolean;
  setEnableOnlinePayment: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({
  side, sideTab, setSideTab, more, setMore, customer, setCustomer,
  frequency, setFrequency, frequencyType, setFrequencyType, list, setList,
  numberOfPayment, setNumberOfPayment, createGroup, setCreateGroup, viewGroup, setViewGroup,
  deleteModal, setDeleteModal, enableOnlinePayment, setEnableOnlinePayment

}:sideProps) => {
  const {control} = useForm()

  return (
    <div className="w-full md:w-2/6 my-3 bg-white rounded-[16px] leading-10 px-3 py-6">
      <div className="flex justify-end gap-2 items-center">
        <label>Customer</label>
        {/* <Dropdown
          placeholder="Select Customer"
          options={customerOptions}
          value={customer}
          onChange={(value) => setCustomer(value)}
          className="w-[150px] text-base"
          buttonClassName="bg-white"
        /> */}
        <TextField
          name="customer"
          value={`${customer?.firstname} ${customer?.lastname}`}
          control={control}
        />
      </div>
      <div className="flex justify-end gap-2 items-center mb-4">
        {/* <label> List</label>
        <Dropdown
          placeholder="Select Customer"
          options={customerOptions}
          value={list}
          onChange={(value) => setList(value)}
          className="w-[150px] text-base"
          buttonClassName="bg-white"
        /> */}
      </div>

      <div className="grid grid-cols-3 justify-between border border-[#8133F1] rounded-[8px] text-[#8133F1] my-2 text-sm">
        {side?.map((tab:any, index:any) => (
          <button
            key={index}
            onClick={() => setSideTab(index)}
            className={`px-2 py-2 text-wrap ${
              sideTab === index
                ? "text-white bg-[#8133F1] rounded-[4px]"
                : "text-[#8133F1]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {sideTab === 0 && (
        <>
          <div>
            <div className="">
              <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
                Summary <PencilIcon className="text-[#8133F1]" />
              </p>
              <div className="flex justify-between gap-1 lg:gap-6">
                <label>Phone</label> <p>{customer?.phone_no}</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-6">
                <label>Email</label> <p>{customer?.email}</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-6">
                <label>Delivery Method</label> <p>{customer?.delivery_method}</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-6">
                <label>Open Balance</label> <p>{customer?.credit}</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-20">
                <label>Active Estimate</label> <p>3</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-20">
                <label>Sales Order to be Invoiced</label> <p>0</p>
              </div>
              <div className="flex justify-between gap-1 lg:gap-6">
                <label>Reimbursable Expenses</label> <p>172.50</p>
              </div>
            </div>

            <div className="">
              <p className="flex justify-between font-medium text-lg text-[#575757] mt-4">
                Customer Payment <PencilIcon className="text-[#8133F1]" />
              </p>
              <div className="flex justify-between">
                <label>Customer cannot pay Online</label>
              </div>
              <label className="text-[#8133F1] flex gap-1">
              <input type="checkbox" checked={enableOnlinePayment} onChange={(e:any) => setEnableOnlinePayment(e.target.checked)} />
                Enable Online Payment
              </label>
            </div>

            <div className="">
              <p className="flex justify-between font-medium text-lg text-[#575757] mt-4">
                Recent Transaction{" "}
              </p>
              <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
                <label>
                  25-05-2024 <span className="text-[#8133F1]">Payment</span>{" "}
                </label>{" "}
                <p>$10,000</p>
              </div>
              <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
                <label>
                  25-05-2024{" "}
                  <span className="text-[#8133F1]">Invoice Paid</span>{" "}
                </label>{" "}
                <p>$10,000</p>
              </div>
            </div>

            <div className="my-3">
              <p className="flex justify-between font-medium text-lg">
                Customer Payment <PencilIcon className="text-[#8133F1]" />
              </p>
              <div className="flex justify-between">
                <label>Customer can pay Online</label> <p></p>
              </div>
            </div>
          </div>
        </>
      )}

      {sideTab === 1 && (
        <>
          <div>
            <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
              Recent Transaction{" "}
            </p>
            <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
              <label>
                25-05-2024 <span className="text-[#8133F1]">Payment</span>{" "}
              </label>{" "}
              <p>$10,000</p>
            </div>
            <div className="flex justify-between my-1 gap-1 lg:gap-6 text-xs">
              <label>
                25-05-2024 <span className="text-[#8133F1]">Invoice Paid</span>{" "}
              </label>{" "}
              <p>$10,000</p>
            </div>
          </div>
        </>
      )}

      {sideTab === 2 && (
        <>
          <div>
            <p className="flex justify-between text-lg text-[#575757] font-medium mt-4">
              Automate Invoice generation
            </p>

            <div className="flex justify-between items-center">
              <label>Frequency Type</label>
              <Dropdown
                placeholder="Frequency Type"
                options={frequencyTypeOptions}
                value={frequencyType}
                onChange={(value) => setFrequencyType(value)}
                className="w-[150px] text-base"
                buttonClassName="bg-white"
              />
            </div>

            <div className="flex justify-between my-2">
              <label>Frequency</label>
              <Dropdown
                placeholder="Select Frequency"
                options={frequencyTypeOptions}
                value={frequency}
                onChange={(value) => setFrequency(value)}
                className="w-[150px] text-base"
                buttonClassName="bg-white"
              />
            </div>

            <div className="flex justify-between items-center">
              <label>Recurring Date</label>
              <div className="w-1/2">
                <TextField
                  name="preparedBy"
                  placeholder="Customer XYZ"
                  font="medium"
                  variant="short"
                  control={control}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label>Number of Payments</label>
              <Dropdown
                placeholder="Payment"
                options={frequencyTypeOptions}
                value={numberOfPayment}
                onChange={(value) => setNumberOfPayment(value)}
                className="w-[150px] text-base"
                buttonClassName="bg-white"
              />
            </div>

            <p className="text-lg text-[#575757] font-medium mt-4">
              Groups Invoicing
            </p>
            <button
              className="flex text-[#8133F1] items-center gap-1 text-base my-2"
              onClick={() => setCreateGroup(!createGroup)}
            >
              <PlusIcon />
              Create a Group
            </button>

            <p className="text-[#727171] text-base">Groups (2)</p>
            {groups?.map((group, index) => (
              <div
                key={index}
                className="flex justify-between gap-x-4 relative"
              >
                <p>{group?.name}</p>
                <EllipsisVertical
                  onClick={() => {
                    more === group?.id ? setMore(null) : setMore(group?.id);
                  }}
                />
                {more === group?.id && (
                  <div className="w-fit h-fit bg-white absolute top-8 right-0 shadow-xl rounded-[8px] z-20 p-4 ">
                    <button
                      className="text-[#575757] block "
                      onClick={() => {
                        setMore(null);
                      }}
                    >
                      Send Invoice
                    </button>
                    <button
                      className="text-[#575757] block "
                      onClick={() => {
                        setViewGroup(true);
                        setMore(null);
                      }}
                    >
                      View Group Members
                    </button>
                    <button
                      className="text-[#C03744] cursor-pointer block "
                      onClick={() => {
                        setDeleteModal(true);
                        setMore(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const groups = [
  {
    id: 1,
    name: 'Seasoned  Customers',
  },
  {
    id: 2,
    name: 'New  Customers',
  },
]

export default SideBar;
