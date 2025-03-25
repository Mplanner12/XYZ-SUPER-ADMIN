import ActionButton from '@/components/Buttons/ActionButton';
import TransparentButton from '@/components/Buttons/TransparentButton';
import { Pen } from 'lucide-react';



const RatiosAndMetricsTab: React.FC = () => {

    return (
        <>
            <main>
                <div className='my-3'>
                    <p className='text-xl font-medium mb-3'>Comprehensive Financial  Ratios, Metrics & KPIs</p>
                </div>
                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Ratio/
                                        Metric
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Calculation
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Formular
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Set Benchmark
                                    </td>
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Reason for Benchmark
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Meaning
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Sector Standard
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Varlance
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Interpretation
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                <tr className=" border-[#eaecf0] bg-[#F0F0F0] text-[14px] border-b text-[#545A5D]">
                                    <td colSpan={10} className="py-6 pl-5 text-left ">
                                        Liquidity Ratios
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 hover:bg-[#F2F8FF] text-[12px] border-b text-[#545A5D]"

                                >
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        Current Ratio
                                    </td>
                                    <td className="py-6  text-left ">
                                        36500/47500 =0.77
                                    </td>
                                    <td className="py-6  text-left ">
                                        Current Liabilities/
                                    </td>
                                    <td className="py-6  text-left ">
                                        <span className='flex gap-1'> 1.5-2.0
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        <span className='flex gap-1'>
                                            Indicates sufficient
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6  text-left ">
                                        Ability to pay short term
                                        obligations
                                    </td>
                                    <td className="py-6  text-left ">
                                        Retails: 1.2-2.0,
                                        Manufacturing: 1.5-2.5
                                    </td>
                                    <td className="py-6  text-left ">
                                        -0.73
                                    </td>
                                    <td className="py-6  text-left ">
                                        Below benchmark,
                                        may indicate liquidity
                                        issues
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 hover:bg-[#F2F8FF] text-[12px] border-b text-[#545A5D]"

                                >
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        Current Ratio
                                    </td>
                                    <td className="py-6  text-left ">
                                        36500/47500 =0.77
                                    </td>
                                    <td className="py-6  text-left ">
                                        Current Liabilities/
                                    </td>
                                    <td className="py-6  text-left ">
                                        <span className='flex gap-1'> 1.5-2.0
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        <span className='flex gap-1'>
                                            Indicates sufficient
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6  text-left ">
                                        Ability to pay short term
                                        obligations
                                    </td>
                                    <td className="py-6  text-left ">
                                        Retails: 1.2-2.0,
                                        Manufacturing: 1.5-2.5
                                    </td>
                                    <td className="py-6  text-left ">
                                        -0.73
                                    </td>
                                    <td className="py-6  text-left ">
                                        Below benchmark,
                                        may indicate liquidity
                                        issues
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] bg-[#F0F0F0] text-[14px] border-b text-[#545A5D]">
                                    <td colSpan={10} className="py-6 pl-5 text-left ">
                                        Profitability Ratios
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 hover:bg-[#F2F8FF] text-[12px] border-b text-[#545A5D]"

                                >
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        Current Ratio
                                    </td>
                                    <td className="py-6  text-left ">
                                        36500/47500 =0.77
                                    </td>
                                    <td className="py-6  text-left ">
                                        Current Liabilities/
                                    </td>
                                    <td className="py-6  text-left ">
                                        <span className='flex gap-1'> 1.5-2.0
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        <span className='flex gap-1'>
                                            Indicates sufficient
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6  text-left ">
                                        Ability to pay short term
                                        obligations
                                    </td>
                                    <td className="py-6  text-left ">
                                        Retails: 1.2-2.0,
                                        Manufacturing: 1.5-2.5
                                    </td>
                                    <td className="py-6  text-left ">
                                        -0.73
                                    </td>
                                    <td className="py-6  text-left ">
                                        Below benchmark,
                                        may indicate liquidity
                                        issues
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-gray-200 hover:bg-[#F2F8FF] text-[12px] border-b text-[#545A5D]"

                                >
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        Current Ratio
                                    </td>
                                    <td className="py-6  text-left ">
                                        36500/47500 =0.77
                                    </td>
                                    <td className="py-6  text-left ">
                                        Current Liabilities/
                                    </td>
                                    <td className="py-6  text-left ">
                                        <span className='flex gap-1'> 1.5-2.0
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6 pl-5 flex gap-2 items-center">
                                        <span className='flex gap-1'>
                                            Indicates sufficient
                                            <Pen size="17px" color='#8133F1' />
                                        </span>
                                    </td>
                                    <td className="py-6  text-left ">
                                        Ability to pay short term
                                        obligations
                                    </td>
                                    <td className="py-6  text-left ">
                                        Retails: 1.2-2.0,
                                        Manufacturing: 1.5-2.5
                                    </td>
                                    <td className="py-6  text-left ">
                                        -0.73
                                    </td>
                                    <td className="py-6  text-left ">
                                        Below benchmark,
                                        may indicate liquidity
                                        issues
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex items-center gap-5  my-5 w-[60%]'>
                        <ActionButton text="Save changes" customPadding='py-4 px-3 w-[50%] rounded-xl' />
                        <TransparentButton text="Revert" customPadding='py-4 px-1 w-[50%] rounded-xl' />
                    </div>
                </div>
            </main>
        </>
    );
};

export default RatiosAndMetricsTab;
