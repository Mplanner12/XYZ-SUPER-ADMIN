import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import { PiExportBold } from 'react-icons/pi';
import TableDropDown from '../../shared/TableDropDown/TableDropDown';
import { useState } from 'react';

interface TransactionEntry {
    transactionDate: string;
    subAccountType: string;
    transactionDescription: string;
    baseCurrency: string;
    foreignCurrency: string;
    transactionAmount: string;
    exchangeRateTransactionDate: string;
    baseCurrencyEquivalentUSD: string;
    settlementDate: string;
    exchangeRateSettlementDate: string;
    baseCurrencyEquivalentSettlementUSD: string;
    gainLossUSD: string;
    accumulatedGainLoss: string;
}

const TransactionManagementTab: React.FC = () => {
    const [entries, setEntries] = useState<TransactionEntry[]>([]);
    const [newEntry, setNewEntry] = useState<TransactionEntry>({
        transactionDate: '',
        subAccountType: '',
        transactionDescription: '',
        baseCurrency: '',
        foreignCurrency: '',
        transactionAmount: '',
        exchangeRateTransactionDate: '',
        baseCurrencyEquivalentUSD: '',
        settlementDate: '',
        exchangeRateSettlementDate: '',
        baseCurrencyEquivalentSettlementUSD: '',
        gainLossUSD: '',
        accumulatedGainLoss: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddEntry = () => {
        setEntries(prevEntries => [...prevEntries, newEntry]);
        // Reset the form after adding the entry
        setNewEntry({
            transactionDate: '',
            subAccountType: '',
            transactionDescription: '',
            baseCurrency: '',
            foreignCurrency: '',
            transactionAmount: '',
            exchangeRateTransactionDate: '',
            baseCurrencyEquivalentUSD: '',
            settlementDate: '',
            exchangeRateSettlementDate: '',
            baseCurrencyEquivalentSettlementUSD: '',
            gainLossUSD: '',
            accumulatedGainLoss: ''
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
                            <button className='flex gap-1'> Showing all Column <ChevronDownIcon size="17px" /></button>
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
                                    <td className="py-5 w-[11%] pl-5">Transaction Date</td>
                                    <td className="py-5">Sub-Account Type</td>
                                    <td className="py-5">Transaction Description</td>
                                    <td className="py-5">Base Currency</td>
                                    <td className="py-5">Foreign Currency</td>
                                    <td className="py-5">Transaction Amount</td>
                                    <td className="py-5">Exchange Rate (Transaction Date)</td>
                                    <td className="py-5">Base Currency Equivalent USD</td>
                                    <td className="py-5">Settlement Date</td>
                                    <td className="py-5">Exchange Rate (Settlement Date)</td>
                                    <td className="py-5">Base Currency Equivalent (Settlement) USD</td>
                                    <td className="py-5">Gain/Loss (USD)</td>
                                    <td className="py-5">Accumulated Gain/Loss</td>
                                    <td className="py-5">Action</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">

                                {/* Render Entries */}
                                {entries.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="py-4 pl-5">{entry.transactionDate}</td>
                                        <td className="py-4">{entry.subAccountType}</td>
                                        <td className="py-4">{entry.transactionDescription}</td>
                                        <td className="py-4">{entry.baseCurrency}</td>
                                        <td className="py-4">{entry.foreignCurrency}</td>
                                        <td className="py-4">{entry.transactionAmount}</td>
                                        <td className="py-4">{entry.exchangeRateTransactionDate}</td>
                                        <td className="py-4">{entry.baseCurrencyEquivalentUSD}</td>
                                        <td className="py-4">{entry.settlementDate}</td>
                                        <td className="py-4">{entry.exchangeRateSettlementDate}</td>
                                        <td className="py-4">{entry.baseCurrencyEquivalentSettlementUSD}</td>
                                        <td className="py-4">{entry.gainLossUSD}</td>
                                        <td className="py-4">{entry.accumulatedGainLoss}</td>
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
                                            placeholder="Sub-Account Type"
                                            name="subAccountType"
                                            value={newEntry.subAccountType}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Transaction Description"
                                            name="transactionDescription"
                                            value={newEntry.transactionDescription}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Base Currency"
                                            name="baseCurrency"
                                            value={newEntry.baseCurrency}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Foreign Currency"
                                            name="foreignCurrency"
                                            value={newEntry.foreignCurrency}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Transaction Amount"
                                            name="transactionAmount"
                                            value={newEntry.transactionAmount}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Exchange Rate (Transaction Date)"
                                            name="exchangeRateTransactionDate"
                                            value={newEntry.exchangeRateTransactionDate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Base Currency Equivalent USD"
                                            name="baseCurrencyEquivalentUSD"
                                            value={newEntry.baseCurrencyEquivalentUSD}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Settlement Date"
                                            name="settlementDate"
                                            value={newEntry.settlementDate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Exchange Rate (Settlement Date)"
                                            name="exchangeRateSettlementDate"
                                            value={newEntry.exchangeRateSettlementDate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Base Currency Equivalent (Settlement) USD"
                                            name="baseCurrencyEquivalentSettlementUSD"
                                            value={newEntry.baseCurrencyEquivalentSettlementUSD}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Gain/Loss (USD)"
                                            name="gainLossUSD"
                                            value={newEntry.gainLossUSD}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Accumulated Gain/Loss"
                                            name="accumulatedGainLoss"
                                            value={newEntry.accumulatedGainLoss}
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

export default TransactionManagementTab;
