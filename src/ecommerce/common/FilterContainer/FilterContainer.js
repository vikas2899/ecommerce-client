import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "../Filter/Filter";

function FilterContainer({ criteria, onFilterSelection, onClose }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const globalQuery = getFiltersReadyForAPI();
    onFilterSelection(globalQuery.substring(0, globalQuery.length - 1));
  }, [selectedFilters]);

  const getFiltersReadyForAPI = () => {
    let globalQuery = "";

    for (let type in selectedFilters) {
      let typeQuery =
        type.toLowerCase() + "=" + selectedFilters[type].join(",");
      globalQuery += typeQuery + "&";
    }

    return globalQuery;
  };

  return (
    <div className="border-[1px] border-[lightgray]">
      <div className="flex items-center h-[50px] pl-[16px] border-b-[1px] border-[lightgray] sm:items-center sm:justify-between sm:pr-[16px]">
        <h1 className="text-[16px] font-[650]">Filters</h1>
        <span className="hidden sm:block" onClick={onClose}>
          <CloseIcon />
        </span>
      </div>
      <div>
        {criteria &&
          criteria?.[0]?.filters?.map((filter) => (
            <Filter
              title={filter.name}
              options={filter.options}
              key={filter._id}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          ))}
      </div>
    </div>
  );
}

export default FilterContainer;
