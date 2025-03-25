"use client"
import { useCreateAccountingList, useUpdateAccountingList } from '@/app/accounting/hooks/mutate';
import { useGetAccountingListById } from '@/app/accounting/hooks/query';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import CustomSelect from '@/components/reusable/CustomSelect';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { ChevronLeft, Pen, Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdDragHandle, MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';


interface SubCategory {
    ID: number;
    Name: string;
}
interface Category {
    ID: number;
    Name: string;
    ListSubCategory: SubCategory[];
}

const CreateList: React.FC = () => {
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [checkedState, setCheckedState] = useState({
        subCategory: false,
    });
    const [errors, setErrors] = useState<any>({});
    const [newCategory, setNewCategory] = useState('');
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editSubCategoryId, setEditSubCategoryId] = useState<number | null>(null);
    const [editSubCategoryName, setEditSubCategoryName] = useState<string>('');


    const params = useSearchParams();
    const accountId: any = params.get("id");

    const { mutate: createMutate, isError } = useCreateAccountingList();
    const { mutate: updateMutate } = useUpdateAccountingList();
    const { data, error, isFetching } = useGetAccountingListById({ id: accountId });
    const lists = data || [];
    const [isLoading, setIsLoading] = useState(false);

    const [listFields, setListFields] = useState([
        { label: 'Item Name', value: 'Item Name', dataType: 'Text', visible: true },
        { label: 'Item Description', value: ' Item Description', dataType: 'Text', visible: true },
        { label: 'Category', value: 'Category', dataType: 'Text/Dropdown', visible: true },
        { label: 'SubCategory', value: 'SubCategory', dataType: 'Text/Dropdown', visible: true },
        { label: 'Location/Address', value: 'Location/Address', dataType: 'Text/Dropdown', visible: true },
        { label: 'Date Added', value: 'Date Added', dataType: 'Date', visible: true },
        { label: 'Status', value: 'Status', dataType: 'Text/Dropdown', visible: true },
        { label: 'Notes & Comment', value: 'Notes & Comment', dataType: 'Text', visible: true },
    ]);


    const nonRemovableFields = [
        'Item Name',
        'Item Description',
        'Category',
        'SubCategory',
    ];

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

    const handleListDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newListName = event.target.value;
        setListDescription(newListName);
    };

    const validateFields = () => {
        const newErrors: any = {};

        if (!listName) {
            newErrors.listName = "List Name is required.";
            toast.error("List Name is required.");
        }

        if (!listDescription) {
            newErrors.listDescription = "Description is required.";
            toast.error("Description is required.");
        }

        categories.forEach((category, index) => {
            if (!category || !category.Name) {
                newErrors[`category-${index}`] = `Category ${index + 1} is required.`;
                toast.error(`Category ${index + 1} is required.`);
            }
        });

        const subCategoryNeeded = checkedState.subCategory && !categories.some(category => category.ListSubCategory?.length > 0);

        if (subCategoryNeeded && !subCategory) {
            newErrors.subCategory = "Subcategory is required.";
            toast.error("Subcategory is required.");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add new field
    const addField = () => {
        setListFields([...listFields, { label: '', value: '', dataType: '', visible: true }]);
    };

    // Remove field by index
    const removeField = (index: number) => {
        const fieldToRemove = listFields[index];

        if (nonRemovableFields.includes(fieldToRemove.value)) {
            toast.warning(`${fieldToRemove.label} feild can't be removed.`);
            return;
        }

        setListFields(listFields.filter((_, i) => i !== index));
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

    const handleDropInputChange = (index: any, name: any, value: any) => {

        setListFields(prevFields =>
            prevFields.map((field, i) =>
                i === index ? { ...field, [name]: value } : field
            )
        );
    };

    const handleCheckboxChange = (field: string) => (isChecked: boolean) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [field]: isChecked,
        }));
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const newCat: Category = { ID: Date.now(), Name: newCategory, ListSubCategory: [] };
            setCategories((prevCategories) => [...prevCategories, newCat]);
            setNewCategory('');
        }
    };

    const handleAddSubCategory = () => {
        if (newCategory.trim()) {
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.Name === subCategory
                        ? {
                            ...category,
                            ListSubCategory: [
                                ...category.ListSubCategory,
                                { ID: Date.now(), Name: newCategory },
                            ],
                        }
                        : category
                )
            );
            setNewCategory(''); // Reset new category input
        }
    };

    const handleEditCategory = (id: number, name: string) => {
        // Set the category in edit mode with its name
        setEditCategoryId(id);
        setEditCategoryName(name);
    };

    const handleSaveEdit = (id: number) => {
        // Update the category's name in the categories array
        setCategories((prevCategories) =>
            prevCategories.map((cat) =>
                cat.ID === id ? { ...cat, Name: editCategoryName } : cat
            )
        );
        // Reset the edit state
        setEditCategoryId(null);
        setEditCategoryName('');
    };

    const handleEditSubCategory = (categoryId: number, subCategoryId: number) => {
        // Find the selected category and subcategory
        const category = categories.find((cat) => cat.ID === categoryId);
        const subCategory = category?.ListSubCategory?.find((sub) => sub.ID === subCategoryId);

        if (subCategory) {
            // Set the subcategory in edit mode with its name
            setEditSubCategoryId(subCategoryId);
            setEditSubCategoryName(subCategory.Name);
        }
    };

    const handleSaveEditSubCategory = (categoryId: number, subCategoryId: number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.ID === categoryId
                    ? {
                        ...category,
                        ListSubCategory: category.ListSubCategory.map((sub) =>
                            sub.ID === subCategoryId ? { ...sub, Name: editSubCategoryName } : sub
                        ),
                    }
                    : category
            )
        );
        // Reset the edit state for subcategory
        setEditSubCategoryId(null);
        setEditSubCategoryName('');
    };

    const handleDeleteSubCategory = (categoryId: number, subCategoryId: number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.ID === categoryId
                    ? {
                        ...category,
                        ListSubCategory: category.ListSubCategory.filter((sub) => sub.ID !== subCategoryId),
                    }
                    : category
            )
        );
    };

    const handleDeleteCategory = (id: any) => {
        setCategories(categories.filter((category) => category.ID !== id));
    };

    const handleSaveList = () => {
        if (!validateFields()) return;

        setIsLoading(true);

        // Filter out unique fields
        const uniqueFields = listFields.filter(
            (field, index, self) => field.value && self.findIndex(f => f.value === field.value) === index
        );

        // Map unique fields to columns
        const columns = uniqueFields.map(field => ({
            name: field.value,
            type: field.dataType,
        }));

        // Ensure categories and subcategories are correctly formatted
        const formattedCategories = categories.map(category => ({
            name: category.Name,
            sub_category: category.ListSubCategory
                ? category.ListSubCategory.map(subCat => ({ name: subCat.Name }))
                : []
        }));

        // Prepare request data
        const requestData = {
            categories: formattedCategories,
            columns,
            name: listName,
            description: listDescription,
        };

        const mutationOptions = {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (error: any) => {
                setIsLoading(false);
                const errorMessage = error?.response?.data?.message || "Error saving list.";
                toast.error(errorMessage);
            },
        };

        // Trigger mutation based on accountId presence
        if (accountId) {
            updateMutate({ id: accountId, ...requestData }, mutationOptions);
        } else {
            createMutate(requestData, mutationOptions);
        }
    };

    useEffect(() => {
        if (accountId && lists) {
            setListName((prevName) => prevName !== lists?.data?.name ? lists?.data?.name : prevName);
            setListDescription((prevDescription) => prevDescription !== lists?.data?.description ? lists?.data?.description : prevDescription);
            setCategories((prevCategories) => JSON.stringify(prevCategories) !== JSON.stringify(lists?.data?.ListCategory) ? lists?.data?.ListCategory : prevCategories);

            setListFields((prevFields) => {
                const newFields = lists?.data?.column?.map((column: any) => ({
                    label: column.name,
                    value: column.name,
                    dataType: column.type || 'Text',
                    visible: true,
                })) || [];

                // Only update if fields have changed
                return JSON.stringify(prevFields) !== JSON.stringify(newFields) ? newFields : prevFields;
            });
        }
    }, [accountId, lists]);


    const breadcrumbs = ['Admin Dashboard', 'Accounting Module'];

    if (isFetching && accountId) {
        return <LoadingOverlay />;
    }
    return (
        <>
            <HeaderLayout
                moduleName="Accounting Module"
                page="Other Lists"
                breadcrumbs={breadcrumbs}
            />
            <div className='px-9 pt-4'>
                <div className='bg-secondary px-7 py-4 rounded-2xl text-[#434343]'>
                    <div className='flex justify-between mt-3 mb-2'>
                        <p className='text-xl font-medium flex gap-2 items-center'>
                            <Link href="/accounting/other-list/">
                                <ChevronLeft color='#8133F1' size={"17px"} fontWeight={"600"} />
                            </Link>
                            {accountId ? "Edit a List" : " Create a List"}
                        </p>
                    </div>

                    <main className="w-full">
                        <div className='mb-4'>
                            <div className='flex gap-5'>
                                <div className="relative w-[40%] lg:w-[35%] mb-4 md:mb-0">
                                    <p className='text-[15px] font-medium mb-2'>List Name</p>
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
                                    {errors.listName && <p className="text-[14px] text-red-500">{errors.listName}</p>}
                                </div>
                                <div className="relative w-[40%] lg:w-[35%] mb-4 md:mb-0">
                                    <p className='text-[15px] font-medium mb-2'>List Description</p>
                                    <input
                                        type="text"
                                        name="list_description"
                                        placeholder="Description"
                                        value={listDescription}
                                        onChange={handleListDescriptionChange}
                                        className={
                                            "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-2 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        }
                                    />
                                    {errors.listDescription && <p className="text-[14px] text-red-500">{errors.listDescription}</p>}
                                </div>
                            </div>

                            {/* Add New Category and Subcategory */}
                            <div className="flex gap-8 mt-4 items-start">
                                <div className='w-[34%]'>
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="w-full">
                                            <label className="text-sm text-gray-700">Add New Category</label>
                                            <input
                                                type="text"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                placeholder="Enter category"
                                                className="block w-full rounded-[6px] border-0 h-[2.9rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={checkedState.subCategory ? handleAddSubCategory : handleAddCategory}
                                            className="px-4 py-3 bg-purple-600 text-white rounded-[16px] hover:bg-purple-700"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {/* Subcategory Selection */}
                                    <div className="flex gap-1 mt-4 items-center">
                                        <CustomCheckbox
                                            label=""
                                            checked={checkedState.subCategory}
                                            onChange={handleCheckboxChange('subCategory')}
                                        />
                                        <div className="relative w-full mb-4 md:mb-0">
                                            <p className="text-[15px] font-medium mb-2">Subcategory Of</p>
                                            <CustomSelect
                                                options={categories?.map((category) => ({
                                                    listItem: category.Name,
                                                }))}
                                                name="subcategory"
                                                placeholder="Select Subcategory"
                                                selectedValue={subCategory}
                                                isDisabled={!checkedState.subCategory}
                                                enableEffect={false}
                                                handleDropdownChange={(option) => setSubCategory(option.listItem)} className="review-filter"
                                            />
                                            {errors.subCategory && <p className="text-[14px] text-red-500">{errors.subCategory}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Display Categories and Subcategories */}
                                <div className="w-[39%] overflow-auto h-48">
                                    <div className="flex flex-col gap-2 bg-white">
                                        {categories?.map((category) => (
                                            <div key={category.ID} className="p-2 bg-gray-100 rounded-md">
                                                <div className="flex items-center justify-between">
                                                    {/* Edit Category */}
                                                    {editCategoryId === category.ID ? (
                                                        <div className="flex gap-4 items-center">
                                                            <input
                                                                type="text"
                                                                value={editCategoryName}
                                                                onChange={(e) => setEditCategoryName(e.target.value)}
                                                                className="block w-full rounded-[6px] border-0 h-[2.4rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                            />
                                                            <button
                                                                onClick={() => handleSaveEdit(category.ID)}
                                                                className="px-3 py-1 bg-purple-600 text-white rounded-[16px] hover:bg-purple-700"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="capitalize">{category.Name}</span>
                                                    )}

                                                    <div className="flex gap-4 items-center">
                                                        {editCategoryId === category.ID ? (
                                                            <span />
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditCategory(category.ID, category.Name)}
                                                                className="text-gray-600 flex items-center gap-1 hover:text-gray-800"
                                                            >
                                                                <Pen size={18} /> Edit
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteCategory(category.ID)}
                                                            className="text-red-500 flex items-center gap-1 hover:text-red-700"
                                                        >
                                                            <MdOutlineDeleteOutline size={18} /> Delete
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Render Subcategories */}
                                                {category?.ListSubCategory?.map((sub) => (
                                                    <div key={sub.ID} className="flex items-center justify-between pl-4 mt-3 text-gray-700 text-sm">
                                                        {editSubCategoryId === sub.ID ? (
                                                            <div className="flex gap-4 items-center">
                                                                <input
                                                                    type="text"
                                                                    value={editSubCategoryName}
                                                                    onChange={(e) => setEditSubCategoryName(e.target.value)}
                                                                    className="block w-full rounded-[6px] border-0 h-[2.4rem] py-1.5 pr-2 pl-4 text-[14px] bg-[#fff] text-[#242424] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                                />
                                                                <button
                                                                    onClick={() => handleSaveEditSubCategory(category.ID, sub.ID)}
                                                                    className="px-3 py-1 bg-purple-600 text-white rounded-[16px] hover:bg-purple-700"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="capitalize">{sub.Name}</span>
                                                        )}

                                                        <div className="flex gap-4 items-center">
                                                            {editSubCategoryId === sub.ID ? (
                                                                <span />
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleEditSubCategory(category.ID, sub.ID)}
                                                                    className="text-gray-600 flex items-center gap-1 hover:text-gray-800"
                                                                >
                                                                    <Pen size={18} /> Edit
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteSubCategory(category.ID, sub.ID)}
                                                                className="text-red-500 flex items-center gap-1 hover:text-red-700"
                                                            >
                                                                <MdOutlineDeleteOutline size={18} /> Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                                <div className='relative'>
                                                    <select
                                                        value={field.dataType}
                                                        onChange={e =>
                                                            handleDropInputChange(index, 'dataType', e.target.value)
                                                        }
                                                        className='text-[#242424] h-[2.9rem] cursor-pointer rounded-md appearance-none bg-white py-3 pl-4 pr-4 text-left outline-none focus:border-0 ring-1 ring-[#CFCECE] w-full focus:ring-2 ring-inset focus:ring-[#8133F1] border-0 text-[14px] custom-select'
                                                    >
                                                        <option value="Text">Text</option>
                                                        <option value="Number">Number</option>
                                                        <option value="Dropdown">Dropdown</option>
                                                        <option value="Date">Date</option>
                                                        <option value="Percentage">Percentage</option>
                                                    </select>
                                                    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                        <svg
                                                            className="w-7 h-7 text-primary-normal"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M6 9l4 4 4-4" />
                                                        </svg>
                                                    </span>
                                                </div>
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : " Save List"}
                                </button>
                                <button className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-4 cursor-pointer border border-foundation-purple-purple-400 rounded-[16px]`}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
        </>

    );
};

export default CreateList;
