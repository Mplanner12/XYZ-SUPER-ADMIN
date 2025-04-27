"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, PlusIcon, Users } from "lucide-react";
import TableDropDown from "@/components/inventory/TableDropDown/TableDropDown";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useAddBusinessRow, useDeleteBusinessAccountRowById, useUpdateBusinessRowById } from "@/hooks/mutate";
import { decodeToken, getBusinessAccountRows } from "@/api";
import { useGetBusinessRowById } from "@/hooks/query";
import { useRouter } from "next/navigation";

interface CompanyFormData {
  id?: number;
	business_id?: any;
	row_id?: string
  period: string;
  start_date: string;
  end_date: string;
  accounting_basis: string;
  status: string;
  isEditing?: boolean;
	isNew?: boolean;
}

interface EditingDataState {
  [key: string]: CompanyFormData; // Changed from number to string to match row_id type
}

interface BusinessRowResponse {
  data?: {
    rows: CompanyFormData[];
  };
}

const CompanyForm = () => {
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [data, setData] = useState<CompanyFormData[]>([
    {
      id: 1,
      period: "Q1 2023",
      start_date: moment(new Date()).format("YYYY-MM-DD"),
      end_date: moment(new Date()).format("YYYY-MM-DD"),
      accounting_basis: "Accrual Basic",
      status: "Open",
      isEditing: false,
    },
    // {
    //   id: 2,
    //   period: "Q1 2023",
    //   start_date: moment(new Date()).format("YYYY-MM-DD"),
    //   end_date: moment(new Date()).format("YYYY-MM-DD"),
    //   accounting_basis: "Accrual Basic",
    //   status: "Closed",
    //   isEditing: false,
    // },
    // {
    //   id: 3,
    //   period: "Q1 2023",
    //   start_date: moment(new Date()).format("YYYY-MM-DD"),
    //   end_date: moment(new Date()).format("YYYY-MM-DD"),
    //   accounting_basis: "Cash Basic",
    //   status: "Closed",
    //   isEditing: false,
    // },
  ]);

  const [editingData, setEditingData] = useState<EditingDataState>({});
  const [tempId, setTempId] = useState(0); // For generating temporary IDs

  // api function
  const { mutate: createBusinessRow, isPending: isCreating } =
    useAddBusinessRow();
  const { mutate: updateBusinessRow, isPending: isUpdating } =
    useUpdateBusinessRowById();
  const { mutate: deleteBusinessRow, isPending: isDeleting } =
    useDeleteBusinessAccountRowById();

  const { data: fetchBusinessRow, isPending: isfetching } =
    useGetBusinessRowById({ business_id: businessId });

	const router = useRouter()

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("Business Id not found");
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchBusinessId();
  }, []);

  // Update data when fetchBusinessRow changes
  useEffect(() => {
    if (fetchBusinessRow) {
      // Type guard to check if fetchBusinessRow is in the expected format
      const rows = Array.isArray(fetchBusinessRow)
        ? fetchBusinessRow
        : (fetchBusinessRow as BusinessRowResponse)?.data?.rows || [];

      const formattedData = rows.map((row) => ({
        ...row,
        isEditing: false,
        isNew: false,
      }));

      setData(formattedData);
    }
  }, [fetchBusinessRow]);

  const handleEdit = (row_id: string) => {
    const updatedData = data.map((row) => ({
      ...row,
      isEditing: row.row_id === row_id ? true : row.isEditing,
    }));
    setData(updatedData);

    const rowToEdit = data.find((row) => row.row_id === row_id);
    if (rowToEdit) {
      setEditingData({
        ...editingData,
        [row_id]: { ...rowToEdit },
      });
    }
  };

  const handleSave = async (row_id: string) => {
    if (!row_id) return;

    try {
      const rowData = editingData[row_id];
      if (!rowData) return;

      // Check if this is a new row or an existing one
      const isNewRow = data.find((row) => row.row_id === row_id)?.isNew;

      if (isNewRow) {
        // Create new row in backend
        await createBusinessRow(
          {
            data: {
              business_id: businessId,
              period: rowData.period,
              start_date: rowData.start_date,
              end_date: rowData.end_date,
              accounting_basis: rowData.accounting_basis,
              status: rowData.status,
            },
          },
          {
            onSuccess: (response) => {
              // Replace temporary row with actual row from backend
              const updatedData = data.map((row) =>
                row.row_id === row_id
                  ? {
                      ...rowData,
                      row_id: response.row_id,
                      isEditing: false,
                      isNew: false,
                    }
                  : row
              );
              setData(updatedData);
              setEditingData((prev) => {
                const { [row_id]: _, ...rest } = prev;
                return rest;
              });
              toast.success("New row added successfully");
            },
            onError: (error: any) => {
              toast.error(error.message || "Failed to add new row");
            },
          }
        );
      } else {
        // Update existing row
        await updateBusinessRow(
          {
            row_id,
            data: {
              period: rowData.period,
              start_date: rowData.start_date,
              end_date: rowData.end_date,
              accounting_basis: rowData.accounting_basis,
              status: rowData.status,
            },
          },
          {
            onSuccess: () => {
              const updatedData = data.map((row) =>
                row.row_id === row_id
                  ? { ...row, ...rowData, isEditing: false }
                  : row
              );
              setData(updatedData);
              setEditingData((prev) => {
                const { [row_id]: _, ...rest } = prev;
                return rest;
              });
              toast.success("Row updated successfully");
            },
            onError: (error: any) => {
              toast.error(error.message || "Failed to update row");
            },
          }
        );
      }
    } catch (error) {
      console.error("Failed to save row:", error);
      toast.error("Failed to save row");
    }
  };

  const handleDelete = async (row_id: string) => {
    if (!row_id) return;

    // If it's a new row that hasn't been saved yet, just remove it from state
    const isNewRow = data.find((row) => row.row_id === row_id)?.isNew;
    if (isNewRow) {
      const updatedData = data.filter((row) => row.row_id !== row_id);
      setData(updatedData);
      setEditingData((prev) => {
        const { [row_id]: _, ...rest } = prev;
        return rest;
      });
      return;
    }

    // Otherwise, delete from backend
    try {
      await deleteBusinessRow(
        { row_id },
        {
          onSuccess: () => {
            const updatedData = data.filter((row) => row.row_id !== row_id);
            setData(updatedData);
            toast.success("Row deleted successfully");
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to delete row");
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (
    row_id: string,
    field: keyof CompanyFormData,
    value: string
  ) => {
    if (!row_id) return;

    setEditingData({
      ...editingData,
      [row_id]: {
        ...editingData[row_id],
        [field]: value,
      },
    });
  };

  const addNewRow = () => {
    // Generate a temporary row_id
    const tempRowId = `temp-${tempId}`;
    setTempId((prev) => prev + 1);

    // Create a new empty row
    const newRow: CompanyFormData = {
      row_id: tempRowId,
      period: "",
      start_date: "",
      end_date: "",
      accounting_basis: "",
      status: "Open",
      isEditing: true,
      isNew: true, // Mark as new row
    };

    // Add to data state
    setData([...data, newRow]);

    // Add to editing state
    setEditingData((prev) => ({
      ...prev,
      [tempRowId]: newRow,
    }));
  };

  const generateTableOptions = (row_id: string) => [
    {
      label: data.find((row) => row.row_id === row_id)?.isEditing
        ? "Save"
        : "Edit",
      action: () =>
        data.find((row) => row.row_id === row_id)?.isEditing
          ? handleSave(row_id)
          : handleEdit(row_id),
    },
    {
      label: "Delete",
      action: () => handleDelete(row_id),
    },
  ];

  const handleSubmit = async () => {

		try {
			const validUsers = data.filter((row) => row.accounting_basis.trim() != "").map(({isEditing, row_id, ...userData}) => ({
				period: userData.period,
				start_date: userData.start_date,
				end_date: userData.end_date,
				accounting_basis: userData.accounting_basis,
				status: userData.status,
			}));

			if (validUsers.length === 0) {
				toast.error("please add at least one user with valid information");
				return;
			}

			const hasEditingUsers = data.some((row) => row.isEditing);
			if (hasEditingUsers) {
				toast.error("Please save all editing changes before proceeding");
				return;
			}

			router.push("admin-setup/admin-dashboard")

		} catch (error) {
			toast.error("Error submitting users information");
		}
	};

  if (isfetching || isCreating || isUpdating || isDeleting) {
    return <LoadingOverlay />;
  }

  return (
    <div className="bg-foundation-grey-grey-50 rounded-2xl px-2 py-4 w-full">
      <div className="flex flex-row items-center justify-between mb-5 md:mb-4 w-full">
        <div className="flex flex-col gap-2">
          <h2 className=" font-medium text-xl">Manage Your Companies</h2>
          <p className="font-normal text-sm text-foundation-grey-grey-700">
            You can add multiple companies & financial periods.
          </p>
        </div>
        {/* <div>
          <a
            href="#"
            className="text-base text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300"
          >
            <span>+</span>Add A New Company
          </a>
        </div> */}
      </div>
      <div className="w-full px-2 py-4">
        <h3 className="font-semibold text-black text-[14px] m-0 mb-3">
          {/* {companyName} */}
          Company Name
        </h3>
        <div className="scroll overflow-x-auto border-2 border-foundation-grey-grey-300 rounded-2xl">
          <table className="w-full text-wrap bg-white text-left text-sm">
            <thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm w-full border-b-foundation-grey-grey-300 text-left rounded-2xl">
              <tr>
                <th className="py-4 px-4 font-medium text-left">Period</th>
                <th className="py-4 px-4 font-medium text-left">Start Date</th>
                <th className="py-4 px-4 font-medium text-left">End Date</th>
                <th className="py-4 px-4 font-medium text-left">
                  Accounting Basis
                </th>
                <th className="py-4 px-4 font-medium text-center">Status</th>
                <th className="py-4 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.row_id}
                  className={`${
                    index === data.length - 1 ? "border-b-none" : "border-b"
                  } border-b-foundation-grey-grey-300 hover:bg-gray-100`}
                >
                  <td className="py-4 text-left px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    {row.isEditing ? (
                      <input
                        type="text"
                        value={editingData[row.row_id!]?.period || row.period}
                        onChange={(e) =>
                          handleInputChange(
                            row.row_id!,
                            "period",
                            e.target.value
                          )
                        }
                        className="border p-1 rounded"
                      />
                    ) : (
                      row.period
                    )}
                  </td>
                  <td className="py-4 text-left px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    {row.isEditing ? (
                      <input
                        type="date"
                        value={
                          editingData[row.row_id!]?.start_date || row.start_date
                        }
                        onChange={(e) =>
                          handleInputChange(
                            row.row_id!,
                            "start_date",
                            e.target.value
                          )
                        }
                        className="border p-1 rounded"
                      />
                    ) : (
                      row.start_date
                    )}
                  </td>
                  <td className="py-4 text-left px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    {row.isEditing ? (
                      <input
                        type="date"
                        value={editingData[row.row_id!]?.end_date || row.end_date}
                        onChange={(e) =>
                          handleInputChange(
                            row.row_id!,
                            "end_date",
                            e.target.value
                          )
                        }
                        className="border p-1 rounded"
                      />
                    ) : (
                      row.end_date
                    )}
                  </td>
                  <td className="py-4 text-left px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    {row.isEditing ? (
                      <div className="relative">
                        <select
                          value={
                            editingData[row.row_id!]?.accounting_basis ||
                            row.accounting_basis
                          }
                          onChange={(e) =>
                            handleInputChange(
                              row.row_id!,
                              "accounting_basis",
                              e.target.value
                            )
                          }
                          className="appearance-none border-none active:border-none outline-none p-2 rounded w-full pr-8"
                        >
                          <option value="">Select Basis</option>
                          <option value="Accrual Basic">Accrual Basic</option>
                          <option value="Cash Basic">Cash Basic</option>
                        </select>
                        <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                          <ChevronDown className="text-[#8133F1] w-5 h-5" />
                        </span>
                      </div>
                    ) : (
                      row.accounting_basis
                    )}
                  </td>
                  <td className="py-4 text-center px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    {row.isEditing ? (
                      <div className="relative">
                        <select
                          value={editingData[row.row_id!]?.status || row.status}
                          onChange={(e) =>
                            handleInputChange(
                              row.row_id!,
                              "status",
                              e.target.value
                            )
                          }
                          className="appearance-none border-none active:border-none outline-none p-2 rounded w-full pr-8"
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                          <ChevronDown className="text-[#8133F1] w-5 h-5" />
                        </span>
                      </div>
                    ) : (
                      row.status
                    )}
                  </td>
                  <td className="py-4 text-center px-4 whitespace-nowrap text-foundation-grey-grey-700">
                    <TableDropDown
                      options={generateTableOptions(row.row_id!)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full self-stretch py-4">
            <p
              className="flex items-center justify-start  text-foundation-purple-purple-400 cursor-pointer px-4"
              onClick={addNewRow}
            >
              <PlusIcon />
              Add Row
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between mt-1 px-2">
        <button
          type="button"
          className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-foundation-purple-purple-400 shadow-sm border-solid border-foundation-purple-purple-400 border hover:bg-foundation-purple-purple-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <button
          type="submit"
					onClick={handleSubmit}
          className="rounded-xl px-4 py-3 text-sm font-normal shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Save & Proceed
        </button>
      </div>
    </div>
  );
};

export default CompanyForm;
