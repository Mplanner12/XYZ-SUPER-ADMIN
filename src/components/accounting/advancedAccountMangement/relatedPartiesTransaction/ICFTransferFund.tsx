import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import { PiExportBold } from 'react-icons/pi';
import TableDropDown from '../../shared/TableDropDown/TableDropDown';
import { useState } from 'react';

// Define the type for a transaction entry
interface TransactionEntry {
    transactionDate: string;
    transferType: string;
    transferringEntity: string;
    receivingEntity: string;
    amount: string;
    currency: string;
    transferringAccountNumber: string;
    receivingAccountNumber: string;
    paymentMethod: string;
    department: string;
    approvalAuthority: string;
    supportingDocuments: string;
    taxImplications: string;
    notes: string;
}

const ICFTransferFundTab: React.FC = () => {
    const [entries, setEntries] = useState<TransactionEntry[]>([]);
    const [newEntry, setNewEntry] = useState<TransactionEntry>({
        transactionDate: "",
        transferType: "",
        transferringEntity: "",
        receivingEntity: "",
        amount: "",
        currency: "",
        transferringAccountNumber: "",
        receivingAccountNumber: "",
        paymentMethod: "",
        department: "",
        approvalAuthority: "",
        supportingDocuments: "",
        taxImplications: "",
        notes: "",
    });

    // Handle input change for the new entry form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle adding a new entry to the table
    const handleAddEntry = () => {
        setEntries(prevEntries => [...prevEntries, newEntry]);
        // Reset the form after adding the entry
        setNewEntry({
            transactionDate: '',
            transferType: '',
            transferringEntity: '',
            receivingEntity: '',
            amount: '',
            currency: '',
            transferringAccountNumber: '',
            receivingAccountNumber: '',
            paymentMethod: '',
            department: '',
            approvalAuthority: '',
            supportingDocuments: '',
            taxImplications: '',
            notes: ''
        });
    };

    return (
        <>
            <main>
                <div className='text-[#8133F1] items-center flex gap-5 justify-between'>
                    <div className='flex gap-3'>
                        <button className='flex gap-1'>Filter <ListFilterIcon size="17px" /></button>
                        <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="17px" /></button>
                    </div>
                    <div>
                        <div className='text-[#8133F1] flex gap-5 text-[15px] mb-3'>
                            <button className='flex gap-1'>Export <PiExportBold size="17px" /></button>
                            <button className='flex gap-1'>Print <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Share <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                        <div className='flex gap-3 text-[15px]'>
                            <button className='flex gap-1'>Showing all Column <ChevronDownIcon size="17px" /></button>
                            <button className='flex gap-1'>
                                Minimize Table
                                <Image className="mr-1" src="/resizeicon.svg" width={21} height={21} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="w-[280%] md:w-[128%] lg:w-[198%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 w-[11%] pl-5 gap-2 items-center">Transaction Date</td>
                                    <td className="py-5 gap-2 items-center">Transfer Type</td>
                                    <td className="py-5 gap-2 items-center">Transferring Entity</td>
                                    <td className="py-5 gap-2 items-center">Receiving Entity</td>
                                    <td className="py-5 gap-2 items-center">Amount</td>
                                    <td className="py-5 gap-2 items-center">Currency</td>
                                    <td className="py-5 gap-2 items-center">Transferring Account Number</td>
                                    <td className="py-5 gap-2 items-center">Receiving Account Number</td>
                                    <td className="py-5 gap-2 items-center">Payment Method</td>
                                    <td className="py-5 gap-2 items-center">Department</td>
                                    <td className="py-5 gap-2 items-center">Approval Authority</td>
                                    <td className="py-5 gap-2 items-center">Supporting Documents</td>
                                    <td className="py-5 gap-2 items-center">Tax Implications</td>
                                    <td className="py-5 pr-5 gap-2 items-center">Notes</td>
                                    <td className="py-5 pr-5 gap-2 items-center">Action</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {entries.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="py-4 pl-5">{entry.transactionDate}</td>
                                        <td className="py-4">{entry.transferType}</td>
                                        <td className="py-4">{entry.transferringEntity}</td>
                                        <td className="py-4">{entry.receivingEntity}</td>
                                        <td className="py-4">{entry.amount}</td>
                                        <td className="py-4">{entry.currency}</td>
                                        <td className="py-4">{entry.transferringAccountNumber}</td>
                                        <td className="py-4">{entry.receivingAccountNumber}</td>
                                        <td className="py-4">{entry.paymentMethod}</td>
                                        <td className="py-4">{entry.department}</td>
                                        <td className="py-4">{entry.approvalAuthority}</td>
                                        <td className="py-4">{entry.supportingDocuments}</td>
                                        <td className="py-4">{entry.taxImplications}</td>
                                        <td className="py-4">{entry.notes}</td>
                                        <td>
                                            <TableDropDown />
                                        </td>
                                    </tr>
                                ))}

                                {/* Data Entry Form */}
                                <tr className="bg-gray-100">
                                    <td className="py-4 pl-5">
                                        <input
                                            type="text"
                                            placeholder="Transaction Date"
                                            name="transactionDate"
                                            value={newEntry.transactionDate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Transfer Type"
                                            name="transferType"
                                            value={newEntry.transferType}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Transferring Entity"
                                            name="transferringEntity"
                                            value={newEntry.transferringEntity}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Receiving Entity"
                                            name="receivingEntity"
                                            value={newEntry.receivingEntity}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Amount"
                                            name="amount"
                                            value={newEntry.amount}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Currency"
                                            name="currency"
                                            value={newEntry.currency}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Transferring Account Number"
                                            name="transferringAccountNumber"
                                            value={newEntry.transferringAccountNumber}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Receiving Account Number"
                                            name="receivingAccountNumber"
                                            value={newEntry.receivingAccountNumber}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Payment Method"
                                            name="paymentMethod"
                                            value={newEntry.paymentMethod}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Department"
                                            name="department"
                                            value={newEntry.department}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Approval Authority"
                                            name="approvalAuthority"
                                            value={newEntry.approvalAuthority}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Supporting Documents"
                                            name="supportingDocuments"
                                            value={newEntry.supportingDocuments}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Tax Implications"
                                            name="taxImplications"
                                            value={newEntry.taxImplications}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Notes"
                                            name="notes"
                                            value={newEntry.notes}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td></td>
                                </tr>

                                {/* Add New Entry Button */}
                                <tr className="bg-secondary">
                                    <td className="text-[#8133F1] my-4 font-medium" colSpan={30}>
                                        <div className="flex items-center py-6 cursor-pointer w-[16%]" onClick={handleAddEntry}>
                                            <Image className="mr-2" src="/plus.png" width={23} height={23} alt="icon" /> Add a new entry
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ICFTransferFundTab;
