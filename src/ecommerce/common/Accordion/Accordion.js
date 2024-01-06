import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CustomAccordion({
  title,
  options,
  selectedFilters,
  setSelectedFilters,
}) {
  const handleFilterSelect = (option) => {
    const clone = { ...selectedFilters };
    if (clone[title]) {
      let isPresent = clone[title].includes(encodeURIComponent(option));

      if (!isPresent) {
        clone[title].push(encodeURIComponent(option));
      } else {
        let index = clone[title].indexOf(encodeURIComponent(option));
        if (index > -1) {
          clone[title].splice(index, 1);
        }
      }
    } else {
      clone[title] = [encodeURIComponent(option)];
    }
    setSelectedFilters({ ...clone });
  };

  return (
    <Accordion
      style={{
        boxShadow: "none",
        border: "1px solid lightgray",
        borderRadius: "0px",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        margin: "0px auto",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ minHeight: "50px" }}
      >
        <Typography style={{ fontSize: "13px", fontWeight: 600 }}>
          {title.toUpperCase()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ paddingTop: 0 }}>
        <div className="flex flex-col">
          {options &&
            options.map((option) => (
              <div
                className="flex items-center gap-3 select-none pb-[2px]"
                key={option._id}
              >
                <input
                  type="checkbox"
                  id={option.description}
                  className="h-[14px] w-[14px]"
                  onClick={() => handleFilterSelect(option.value)}
                />
                <label
                  htmlFor={option.description}
                  className="text-[14px] font-[540] cursor-pointer text-[#282c3f]"
                >
                  {option.description}
                </label>
              </div>
            ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
