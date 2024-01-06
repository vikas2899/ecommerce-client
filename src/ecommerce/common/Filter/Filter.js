import React, { useState } from "react";
import CustomAccordion from "../Accordion/Accordion";

function Filter({ title, options, selectedFilters, setSelectedFilters }) {
  return (
    <section>
      <CustomAccordion
        title={title}
        options={options}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </section>
  );
}

export default Filter;
