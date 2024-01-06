import React from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Profile() {
  return (
    <div className="h-[100vh]">
      <div className="border-[1px] p-8 flex flex-col sm:p-4">
        <div>
          <div className="flex items-center gap-4 justify-between">
            <h1 className="font-bold text-[15px] sm:text-[12px]">
              Personal Information
            </h1>
            <span className="text-[#2874F0] underline text-[15px] sm:text-[12px]">
              Edit
            </span>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:flex-col sm:items-start sm:w-full">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              inputProps={{
                style: {
                  height: "10px",
                  fontSize: "20px",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              inputProps={{
                style: {
                  height: "10px",
                  fontSize: "20px",
                },
              }}
            />
          </div>
          <div className="mt-4 sm:mt-8">
            <h6 className="text-[15px] sm:text-[12px]">Your Gender</h6>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={<span style={{ fontSize: "14px" }}>Female</span>}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={<span style={{ fontSize: "14px" }}>Male</span>}
              />
            </RadioGroup>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-4 justify-between">
            <h1 className="font-bold text-[15px] sm:text-[12px]">
              Email Address
            </h1>
            <span className="text-[#2874F0] underline text-[15px] sm:text-[12px]">
              Edit
            </span>
          </div>
          <div className="flex mt-4">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              inputProps={{
                style: {
                  height: "10px",
                  fontSize: "20px",
                },
              }}
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-4 justify-between">
            <h1 className="font-bold text-[15px] sm:text-[12px]">
              Mobile Number
            </h1>
            <span className="text-[#2874F0] underline text-[15px] sm:text-[12px]">
              Edit
            </span>
          </div>
          <div className="flex mt-4">
            <TextField
              id="outlined-basic"
              label="Mobile Number"
              variant="outlined"
              inputProps={{
                style: {
                  height: "10px",
                  fontSize: "20px",
                },
              }}
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
