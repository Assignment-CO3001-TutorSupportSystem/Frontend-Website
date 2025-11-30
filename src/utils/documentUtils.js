// utils/documentUtils.js

// Hàm lọc tài liệu
export const filterDocuments = (documents, search, fieldFilter) => {
  return documents.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchField = fieldFilter ? doc.field === fieldFilter : true;
    return matchSearch && matchField;
  });
};

// Hàm phân trang
export const paginate = (items, page, perPage) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const start = (page - 1) * perPage;
  const paginated = items.slice(start, start + perPage);

  return { paginated, totalPages };
};
