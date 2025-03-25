import React, { useEffect, useState } from 'react';
import { MdDragHandle, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import CustomSelect from '@/components/reusable/CustomSelect';
import { Plus } from 'lucide-react';
import { useCreateAccountingList } from '@/app/accounting/hooks/mutate';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useGetAccountingListById } from '@/app/accounting/hooks/query';


const ListDetails = () => {
    const [listName, setListName] = useState('');
    const { mutate, isError } = useCreateAccountingList();
    const params = useSearchParams();
    const accountId: any = params.get("id");


    const { data, isLoading, error } = useGetAccountingListById({ id: accountId });
    const lists = data || [];


    const [listFields, setListFields] = useState([
        { label: 'List ID', value: 'List ID', dataType: 'Text/Number', visible: true },
        { label: 'Item Name', value: 'Item Name', dataType: 'Text', visible: true },
        { label: 'Item Description', value: ' Item Description', dataType: 'Text', visible: true },
        { label: 'Category', value: 'Category', dataType: 'Text/Dropdown', visible: true },
        { label: 'SubCategory', value: 'SubCategory', dataType: 'Text/Dropdown', visible: true },
        { label: 'Location/Address', value: 'Location/Address', dataType: 'Text/Dropdown', visible: true },
        { label: 'Date Added', value: 'Date Added', dataType: 'Date', visible: true },
        { label: 'Status', value: 'Status', dataType: 'Percentage', visible: true },
        { label: 'Related Account', value: 'Related Account', dataType: 'Chart of Account List', visible: true },
        { label: 'Notes & Comment', value: 'Notes & Comment', dataType: 'Text', visible: true },
        { label: 'Enter Column Label', value: 'Enter Column Label', dataType: 'Select Data type', visible: true },
    ]);

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newListName = event.target.value;
        setListName(newListName);
    
        setListFields(listFields?.map((field) => {
            if (field.label === 'Item Name') {
                return { ...field, value: `${newListName} Name` }; 
            } else if (field.label === 'Item Description') {
                return { ...field, value: `${newListName} Description` };  
            }
            return field;
        }));
    };

    // Add new field
    const addField = () => {
        setListFields([...listFields, { label: '', value: '', dataType: '', visible: true }]);
    };

    // Remove field by index
    const removeField = (index: number) => {
        setListFields(listFields?.filter((_, i) => i !== index));
    };

    // Toggle visibility of a field
    const toggleVisibility = (index: number) => {
        setListFields(
            listFields?.map((field, i) =>
                i === index ? { ...field, visible: !field.visible } : field
            )
        );
    };

    // Handle input change (for text and select inputs)
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setListFields(
            listFields?.map((field, i) =>
                i === index ? { ...field, value: value } : field  // Update both label and value
            )
        );
    };

    const handleDropInputChange = (index: number, name: string, value: string) => {
        setListFields(
            listFields?.map((field, i) =>
                i === index ? { ...field, [name]: value } : field
            )
        );
    };

    // Function to handle saving the list
    const handleSaveList = () => {
        // Create the columns array from your listFields
        const columns = listFields?.map(field => ({
            name: field.label,  
            type: field.dataType 
        }));

        //request object
        const requestData = {
            columns,             
            name: listName,    
        };
     
        // Call the mutate function to create the accounting list
        mutate(requestData, {
            onSuccess: () => {
                toast.success("List created successfully!");
            },
            onError: (error) => {
                toast.error(error);
            },
        });
    };
    
    useEffect(() => {
        if (accountId && lists) { 
           
            setListName(lists?.name || '');

            setListFields(
                lists?.columns?.map((column: any) => ({
                    label: column.name,
                    value: column.name,
                    dataType: column.type || 'Text', 
                    visible: true  
                }))
            );
        }
    }, [accountId, lists]);

    return (
        <main className="w-full">
            <div className='mb-4'>
                <p className='text-[15px] font-medium mb-2'>List Name</p>
                <div className="relative w-[40%] lg:w-[35%] mb-4 md:mb-0">
                    <input
                        type="text"
                        name="list_name"
                        placeholder="Item List"
                        value={listName}
                        onChange={handleListNameChange}
                        className={
                            "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-2 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                        }
                    />
                </div>
            </div>
            <p className='text-xl mt-4 font-medium'>
                <span> List Details</span>
            </p>
            <div className="w-full">
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="text-[#374B58] text-[15px] font-[700]">
                            <td className="py-5 pl-5  gap-2 items-center">
                                Column Label
                            </td>
                            <td className="py-5 gap-2 items-center">
                                Data Type
                            </td>
                            <td className="py-5 gap-2 items-center">
                                Visibility
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {listFields?.map((field, index) => (
                            <tr key={index} className="text-[14px] py-5 text-[#545A5D]">
                                <td className="pl-5 flex gap-2 py-3 pr-2 items-center w-full">
                                    <MdDragHandle color='#66686B' size={"28px"} />
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            name="value"
                                            placeholder={field.label}  
                                            size={70}
                                            value={field.value}  
                                            onChange={(e) => handleInputChange(index, e)} 
                                            className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[15px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </div>
                                </td>
                                <td className="text-left px-2 w-[41%]">
                                    <CustomSelect
                                        options={[
                                            { listItem: "Text" },
                                            { listItem: "Number" },
                                            { listItem: "Dropdown" }
                                        ]}
                                        name="dataType"
                                        placeholder={field.dataType}
                                        selectedValue={field.dataType}
                                        handleDropdownChange={(selectedOption) => {
                                            handleDropInputChange(index, 'dataType', selectedOption.listItem);
                                        }}
                                        className="review-filter"
                                    />
                                </td>
                                <td className="px-2 text-left">
                                    <div className="flex gap-2 pr-2 items-center">
                                        {field.visible ? (
                                            <IoEyeOutline
                                                onClick={() => toggleVisibility(index)}
                                                color='#374B58'
                                                cursor="pointer"
                                                size={"24px"}
                                            />
                                        ) : (
                                            <IoEyeOffOutline
                                                onClick={() => toggleVisibility(index)}
                                                color='#374B58'
                                                cursor="pointer"
                                                size={"24px"}
                                            />
                                        )}
                                        <MdDeleteOutline
                                            onClick={() => removeField(index)}
                                            color='#374B58'
                                            cursor="pointer"
                                            size={"24px"}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex text-[#8133F1] items-center cursor-pointer gap-1 mb-5" onClick={addField}>
                    <Plus />  Add a Field
                </div>
                <div className="flex gap-5">
                    <button
                        className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]`}
                        onClick={handleSaveList}
                    >
                        Save List
                    </button>
                    <button className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-4 cursor-pointer border border-foundation-purple-purple-400 rounded-[16px]`}>
                        Cancel
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ListDetails;
