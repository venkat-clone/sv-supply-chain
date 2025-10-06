import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import throttle from "lodash.throttle";
import ColumnFilterInput from "./ColumnFilterInput";

const TableComponent = ({
  tableKey,
  deleteMutation,
  getAllFn,
  headers,
  onEditRow,
  defaultFilters = {},
  redirect,
  title,
}) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({});
  const [columnFilters, setColumnFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const queryClient = useQueryClient();
  const router = useRouter();

  // Throttled search
  const updateSearch = useCallback(
    throttle((value) => setDebouncedSearch(value), 500),
    []
  );

  useEffect(() => {
    updateSearch(searchTerm);
    return () => updateSearch.cancel();
  }, [searchTerm, updateSearch]);

  // Combine filters
  const combinedFilters = {
    ...defaultFilters,
    ...filters,
    ...Object.fromEntries(
      Object.entries(columnFilters).map(([key, filter]) => {
        if (!filter) return [key, ""];
        const type = headers.find((h) => h.key === key)?.type;

        if (["integer", "date"].includes(type)) {
          if (filter.operator === "between") {
            return [key, `between:${filter.value?.start},${filter.value?.end}`];
          }
          if (filter.operator === "in") {
            return [key, `in:${filter.value}`];
          }
          return [
            key,
            filter.operator
              ? `${filter.operator}${filter.value}`
              : filter.value || "",
          ];
        }

        if (typeof filter === "object") {
          return [
            key,
            filter.operator === "contains"
              ? filter.value
              : `${filter.operator || ""}${filter.value || ""}`,
          ];
        }
        return [key, filter];
      })
    ),
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };

  // Query
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [
      `table-${tableKey}`,
      page,
      combinedFilters,
      sortBy,
      sortDirection,
    ],
    queryFn: () =>
      getAllFn({
        page,
        filters: combinedFilters,
        sortBy,
        sortOrder: sortDirection,
      }),
    keepPreviousData: true,
  });

  const deleteRowMutation = useMutation({
    mutationFn: deleteMutation,
    onSuccess: () => {
      queryClient.invalidateQueries([`table-${tableKey}`]);
    },
  });

  // Actions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      deleteRowMutation.mutate(id);
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDirection((old) => (old === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearFilter = (key) => {
    setColumnFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setActiveFilters((prev) => ({ ...prev, [key]: false }));
  };

  const renderSortIndicator = (key) => {
    if (sortBy !== key) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  const items = data?.data ?? [];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {title ? (
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        ) : (
          <div></div> // keeps layout balanced if no title
        )}
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="cursor-pointer select-none"
                      onClick={() => handleSort(header.key)}
                    >
                      {header.label}
                      {renderSortIndicator(header.key)}
                    </span>
                    <button
                      onClick={() => toggleFilter(header.key)}
                      className={`p-1 rounded-full transition ${
                        activeFilters[header.key]
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <FaFilter size={14} />
                    </button>
                  </div>
                  {activeFilters[header.key] && (
                    <ColumnFilterInput
                      header={header}
                      columnFilters={columnFilters}
                      setColumnFilters={setColumnFilters}
                      clearFilter={clearFilter}
                    />
                  )}
                </th>
              ))}
              {(deleteMutation || onEditRow) && (
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="text-center py-4 text-red-500"
                >
                  Error: {error.message}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              items.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className={`${
                    redirect ? "hover:bg-gray-50 cursor-pointer" : ""
                  }`}
                  onClick={
                    redirect
                      ? () => router.push(`${redirect}/${row.id}`)
                      : undefined
                  }
                >
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      className="px-4 py-2 text-sm text-gray-800"
                    >
                      {header.render ? header.render(row) : row[header.key]}
                    </td>
                  ))}
                  {(deleteMutation || onEditRow) && (
                    <td className="px-4 py-2 whitespace-nowrap">
                      {onEditRow && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditRow(row);
                          }}
                          className="mr-2 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                          Edit
                        </button>
                      )}
                      {deleteMutation && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row.id);
                          }}
                          className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {page}</span>
        <button
          onClick={() => {
            if ((data?.meta?.totalPages ?? 0) > page) {
              setPage((old) => old + 1);
            }
          }}
          disabled={(data?.meta?.totalPages ?? 0) <= page}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Mutation Feedback */}
      {deleteRowMutation.isLoading && (
        <p className="text-sm text-gray-500 mt-2">Deleting row...</p>
      )}
      {deleteRowMutation.isError && (
        <p className="text-red-500 mt-2">
          Error deleting row: {deleteRowMutation.error.message}
        </p>
      )}
    </div>
  );
};

export default TableComponent;
