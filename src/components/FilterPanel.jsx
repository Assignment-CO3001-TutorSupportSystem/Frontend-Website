import Button from "./Button";
import Select from "./Select";

const FilterPanel = ({ filters, setFilters, onApply }) => {
  const { field1, field2 } = filters;

  const fields = [
    "Networking",
    "Database",
    "Python",
    "Operating Systems",
    "Algorithms",
    "Data Science",
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6 flex items-center gap-6">
      <div className="w-1/3">
        <Select
          value={field1}
          onChange={(e) => setFilters({ ...filters, field1: e.target.value })}
          placeholder="Lĩnh vực"
          options={fields}
        />
      </div>

      <div className="w-1/3">
        <Select
          value={field2}
          onChange={(e) => setFilters({ ...filters, field2: e.target.value })}
          placeholder="Lĩnh vực"
          options={fields}
        />
      </div>

      <Button onClick={onApply}>Lọc</Button>
    </div>
  );
};

export default FilterPanel;
