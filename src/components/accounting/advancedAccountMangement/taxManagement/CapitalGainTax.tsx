import { useState } from 'react';
import { ChevronDownIcon, ArrowUpNarrowWideIcon, ListFilterIcon, Plus } from 'lucide-react';
import { PiExportBold } from 'react-icons/pi';
import TableDropDown from '../../shared/TableDropDown/TableDropDown';
import Image from 'next/image';

// Define the type for the entry
interface TaxEntry {
    taxCategory: string;
    subTransactionType: string;
    calculationBasis: string;
    taxBasis: string;
    rate: string;
    applicable: string;
    amountPayable: string;
    amountRemitted: string;
    balance: string;
    supportingDocuments: string;
}

const CapitalGainTab: React.FC = () => {
    const [entries, setEntries] = useState<TaxEntry[]>([]);
    const [newEntry, setNewEntry] = useState<TaxEntry>({
        taxCategory: '',
        subTransactionType: '',
        calculationBasis: '',
        taxBasis: '',
        rate: '',
        applicable: '',
        amountPayable: '',
        amountRemitted: '',
        balance: '',
        supportingDocuments: ''
    });

    const generateTableOptions = [
        { label: 'View Details' },
        { label: 'Edit' },
        { label: 'Delete' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddEntry = () => {
        setEntries(prevEntries => [...prevEntries, newEntry]);
        setNewEntry({
            taxCategory: '',
            subTransactionType: '',
            calculationBasis: '',
            taxBasis: '',
            rate: '',
            applicable: '',
            amountPayable: '',
            amountRemitted: '',
            balance: '',
            supportingDocuments: ''
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
                            <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                        <div className='flex gap-3 text-[15px]'>
                            <button className='flex gap-1'> Showing all Column <ChevronDownIcon size="17px" /></button>
                            <button className='flex gap-1'>
                                Minimize Table
                                <Image className="mr-1" src="/resizeicon.svg" width={21} height={21} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='my-5'>

                    {/* Table */}
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="w-[280%] md:w-[128%] lg:w-[320%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 w-[11%] pl-5 gap-2 items-center">Tax Category</td>
                                    <td className="py-5 gap-2 items-center">Sub-Transaction Type</td>
                                    <td className="py-5 gap-2 items-center">Calculation Basis</td>
                                    <td className="py-5 gap-2 items-center">Tax Basis</td>
                                    <td className="py-5 pl-5 gap-2 items-center">Rate</td>
                                    <td className="py-5 gap-2 items-center">Applicable</td>
                                    <td className="py-5 gap-2 items-center">Amount Payable (USD)</td>
                                    <td className="py-5 gap-2 items-center">Amount Remitted (USD)</td>
                                    <td className="py-5 gap-2 items-center">Balance (USD)</td>
                                    <td className="py-5 gap-2 items-center">Supporting Documents</td>
                                    <td className="py-5 pr-5 gap-2 items-center">Actions</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {entries.map((entry, index) => (
                                    <tr key={index} className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                        <td className="py-6 pl-5 flex gap-2 items-center">{entry.taxCategory}</td>
                                        <td className="py-6">{entry.subTransactionType}</td>
                                        <td className="py-6">{entry.calculationBasis}</td>
                                        <td className="py-6">{entry.taxBasis}</td>
                                        <td className="py-6 pl-5">{entry.rate}</td>
                                        <td className="py-6">{entry.applicable}</td>
                                        <td className="py-6">{entry.amountPayable}</td>
                                        <td className="py-6">{entry.amountRemitted}</td>
                                        <td className="py-6">{entry.balance}</td>
                                        <td className="py-6">{entry.supportingDocuments}</td>
                                        <td className="py-6">
                                            <TableDropDown options={generateTableOptions} />
                                        </td>
                                    </tr>
                                ))}

                                <tr className="bg-gray-100">
                                    {/* Data Entry Form */}
                                    <td className="py-4 pl-5">
                                        <input
                                            type="text"
                                            placeholder="Tax Category"
                                            name="taxCategory"
                                            value={newEntry.taxCategory}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Sub-Transaction Type"
                                            name="subTransactionType"
                                            value={newEntry.subTransactionType}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Calculation Basis"
                                            name="calculationBasis"
                                            value={newEntry.calculationBasis}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Tax Basis"
                                            name="taxBasis"
                                            value={newEntry.taxBasis}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Rate"
                                            name="rate"
                                            value={newEntry.rate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Applicable"
                                            name="applicable"
                                            value={newEntry.applicable}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Amount Payable (USD)"
                                            name="amountPayable"
                                            value={newEntry.amountPayable}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Amount Remitted (USD)"
                                            name="amountRemitted"
                                            value={newEntry.amountRemitted}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Balance (USD)"
                                            name="balance"
                                            value={newEntry.balance}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Supporting Documents"
                                            name="supportingDocuments"
                                            value={newEntry.supportingDocuments}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td></td>
                                </tr>
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

export default CapitalGainTab;
