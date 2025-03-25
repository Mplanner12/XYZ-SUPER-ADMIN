import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import { PiExportBold } from 'react-icons/pi';
import TableDropDown from '../../shared/TableDropDown/TableDropDown';
import { useState } from 'react';


interface TransactionEntry {
    accountType: string;
    subAccountType: string;
    functionalCurrency: string;
    reportingCurrency: string;
    balanceUSD: string;
    exchangeRate: string;
    balanceReportingCurrencyUSD: string;
    exchangeDifferencePL: string;
    exchangeDifferenceEquity: string;
    openingBalanceExchangeDifferences: string;
    closingBalanceExchangeDifferences: string;
    translationMethod: string;
    dateOfTranslation: string;
    disclosureRequirements: string;
    hedgingActivities: string;
    functionalCurrencyDetermination: string;
}

const BalanceManagementTab: React.FC = () => {
    const [entries, setEntries] = useState<TransactionEntry[]>([]);
    const [newEntry, setNewEntry] = useState<TransactionEntry>({
        accountType: '',
        subAccountType: '',
        functionalCurrency: '',
        reportingCurrency: '',
        balanceUSD: '',
        exchangeRate: '',
        balanceReportingCurrencyUSD: '',
        exchangeDifferencePL: '',
        exchangeDifferenceEquity: '',
        openingBalanceExchangeDifferences: '',
        closingBalanceExchangeDifferences: '',
        translationMethod: '',
        dateOfTranslation: '',
        disclosureRequirements: '',
        hedgingActivities: '',
        functionalCurrencyDetermination: ''
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
        setNewEntry({
            accountType: '',
            subAccountType: '',
            functionalCurrency: '',
            reportingCurrency: '',
            balanceUSD: '',
            exchangeRate: '',
            balanceReportingCurrencyUSD: '',
            exchangeDifferencePL: '',
            exchangeDifferenceEquity: '',
            openingBalanceExchangeDifferences: '',
            closingBalanceExchangeDifferences: '',
            translationMethod: '',
            dateOfTranslation: '',
            disclosureRequirements: '',
            hedgingActivities: '',
            functionalCurrencyDetermination: ''
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
                        <table className="w-[280%] md:w-[128%] lg:w-[208%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 w-[11%] pl-5">Account Type</td>
                                    <td className="py-5">Sub-Account Type</td>
                                    <td className="py-5">Functional Currency</td>
                                    <td className="py-5">Reporting Currency</td>
                                    <td className="py-5">Balance (USD)</td>
                                    <td className="py-5">Exchange Rate</td>
                                    <td className="py-5">Balance (Reporting Currency) USD</td>
                                    <td className="py-5">Exchange Difference in P&L</td>
                                    <td className="py-5">Exchange Difference in Equity</td>
                                    <td className="py-5">Opening Balance of Exchange Differences</td>
                                    <td className="py-5">Closing Balance of Exchange Differences</td>
                                    <td className="py-5">Translation Method</td>
                                    <td className="py-5">Date of Translation</td>
                                    <td className="py-5">Disclosure Requirements</td>
                                    <td className="py-5">Hedging Activities</td>
                                    <td className="py-5">Functional Currency Determination</td>
                                    <td className="py-5">Actions</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {entries.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="py-4 pl-5">{entry.accountType}</td>
                                        <td className="py-4">{entry.subAccountType}</td>
                                        <td className="py-4">{entry.functionalCurrency}</td>
                                        <td className="py-4">{entry.reportingCurrency}</td>
                                        <td className="py-4">{entry.balanceUSD}</td>
                                        <td className="py-4">{entry.exchangeRate}</td>
                                        <td className="py-4">{entry.balanceReportingCurrencyUSD}</td>
                                        <td className="py-4">{entry.exchangeDifferencePL}</td>
                                        <td className="py-4">{entry.exchangeDifferenceEquity}</td>
                                        <td className="py-4">{entry.openingBalanceExchangeDifferences}</td>
                                        <td className="py-4">{entry.closingBalanceExchangeDifferences}</td>
                                        <td className="py-4">{entry.translationMethod}</td>
                                        <td className="py-4">{entry.dateOfTranslation}</td>
                                        <td className="py-4">{entry.disclosureRequirements}</td>
                                        <td className="py-4">{entry.hedgingActivities}</td>
                                        <td className="py-4">{entry.functionalCurrencyDetermination}</td>
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
                                            placeholder="Account Type"
                                            name="accountType"
                                            value={newEntry.accountType}
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
                                            placeholder="Functional Currency"
                                            name="functionalCurrency"
                                            value={newEntry.functionalCurrency}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Reporting Currency"
                                            name="reportingCurrency"
                                            value={newEntry.reportingCurrency}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Balance (USD)"
                                            name="balanceUSD"
                                            value={newEntry.balanceUSD}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Exchange Rate"
                                            name="exchangeRate"
                                            value={newEntry.exchangeRate}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Balance (Reporting Currency) USD"
                                            name="balanceReportingCurrencyUSD"
                                            value={newEntry.balanceReportingCurrencyUSD}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Exchange Difference in P&L"
                                            name="exchangeDifferencePL"
                                            value={newEntry.exchangeDifferencePL}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Exchange Difference in Equity"
                                            name="exchangeDifferenceEquity"
                                            value={newEntry.exchangeDifferenceEquity}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Opening Balance of Exchange Differences"
                                            name="openingBalanceExchangeDifferences"
                                            value={newEntry.openingBalanceExchangeDifferences}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Closing Balance of Exchange Differences"
                                            name="closingBalanceExchangeDifferences"
                                            value={newEntry.closingBalanceExchangeDifferences}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Translation Method"
                                            name="translationMethod"
                                            value={newEntry.translationMethod}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Date of Translation"
                                            name="dateOfTranslation"
                                            value={newEntry.dateOfTranslation}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Disclosure Requirements"
                                            name="disclosureRequirements"
                                            value={newEntry.disclosureRequirements}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Hedging Activities"
                                            name="hedgingActivities"
                                            value={newEntry.hedgingActivities}
                                            onChange={handleInputChange}
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            placeholder="Functional Currency Determination"
                                            name="functionalCurrencyDetermination"
                                            value={newEntry.functionalCurrencyDetermination}
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

export default BalanceManagementTab;
