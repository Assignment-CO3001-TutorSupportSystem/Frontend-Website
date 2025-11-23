import React, { useState } from "react";
import Layout from "../../components/Layout";
import SidebarContent from "../../components/SidebarContent";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import FilterPanel from "../../components/FilterPanel";

const TutorDocumentPage = () => {
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    field1: "",
    field2: "",
  });

  const toggleFilters = () => setShowFilters(!showFilters);

  // Hardcode document data
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
      author: "Avi Silberschatz, Henry F. Korth, S. Sudarshan",
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
      title: "Automate the Boring Stuff with Python (2nd Edition)",
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

  return (
    <Layout sidebar={<SidebarContent />}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Quản lý tài liệu</h1>

        {/* Filter + Search */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={toggleFilters}>
            <i className="fa fa-filter"></i>
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 font-medium">Tên tài liệu</th>
                <th className="py-3 px-4 font-medium">Tác giả</th>
                <th className="py-3 px-4 font-medium w-32">Lĩnh vực</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{doc.title}</td>
                  <td className="py-3 px-4">{doc.author}</td>
                  <td className="py-3 px-4">{doc.field}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination />
        </div>
      </div>
    </Layout>
  );
};

export default TutorDocumentPage;
