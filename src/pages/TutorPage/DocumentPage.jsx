import React, { useState } from "react";
import Layout from "../../components/Layout";
import SidebarContent from "../../components/SidebarContent";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import PaginationControls from "../../components/PaginationControls";
import FilterPanel from "../../components/FilterPanel";
import { useNavigate } from "react-router-dom";

export default function DocumentListPage() {
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    field1: "",
    field2: "",
  });

  const toggleFilters = () => setShowFilters(!showFilters);

  // ⭐ Hardcode document data
  const documents = [
    {
      id: 1,
      title: "Computer Networking: A Top-Down Approach (8th Edition)",
      author: "James F. Kurose & Keith W. Ross",
      field: "Networking",
    },
    {
      id: 2,
      title: "Data and Computer Communications (10th Edition)",
      author: "William Stallings",
      field: "Networking",
    },
    {
      id: 3,
      title: "Networking All-in-One For Dummies",
      author: "Doug Lowe",
      field: "Networking",
    },
    {
      id: 4,
      title: "Database System Concepts (7th Edition)",
      author: "Avi Silberschatz",
      field: "Database",
    },
    {
      id: 5,
      title: "Fundamentals of Database Systems (7th Edition)",
      author: "Ramez Elmasri",
      field: "Database",
    },
    {
      id: 6,
      title: "Learning SQL (3rd Edition)",
      author: "Alan Beaulieu",
      field: "Database",
    },
    {
      id: 7,
      title: "Automate the Boring Stuff with Python",
      author: "Al Sweigart",
      field: "Python",
    },
    {
      id: 8,
      title: "Think Python",
      author: "Allen B. Downey",
      field: "Python",
    },
    {
      id: 9,
      title: "Operating System Concepts",
      author: "Abraham Silberschatz",
      field: "Operating Systems",
    },
  ];

  // ⭐ Apply filters
  const filteredDocuments = documents.filter((doc) => {
    const searchMatch = doc.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const fieldMatch1 = filters.field1 ? doc.field === filters.field1 : true;
    const fieldMatch2 = filters.field2 ? doc.field === filters.field2 : true;
    return searchMatch && fieldMatch1 && fieldMatch2;
  });

  // ⭐ Pagination logic
  const itemsPerPage = 5; // số lượng item mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Layout sidebar={<SidebarContent />}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Quản lý tài liệu</h1>

        {/* Filter + Search */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={toggleFilters}>
            <i className="fa fa-filter"></i> Lọc
          </Button>

          <div className="flex-1">
            <Searchbar
              placeholder="Tìm kiếm"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <Button>
            <i className="fa fa-search"></i>
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onApply={() => {}}
          />
        )}

        {/* Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-4xl">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold">Tên tài liệu</th>
                <th className="py-3 px-4 font-semibold">Tác giả</th>
                <th className="py-3 px-4 font-semibold">Lĩnh vực</th>
              </tr>
            </thead>

            <tbody>
              {paginatedDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  <td className="py-3 px-4">{doc.title}</td>
                  <td className="py-3 px-4">{doc.author}</td>
                  <td className="py-3 px-4">{doc.field}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <PaginationControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            disablePrevious={currentPage === 1}
            disableNext={currentPage === totalPages}
          />
        </div>
      </div>
    </Layout>
  );
}
