import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

export default function MyModal({ isOpen, closeModal, onAddressSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [address, setaddess] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const submitNewAddress = () => {
    const newAddressData = {
      addressLine1: address,
      name,
      phone,
      addressType,
      pincode,
      state,
      district,
      city,
    };
    onAddressSave(newAddressData);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Address
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add details for your new address
                    </p>
                  </div>

                  <div className="mt-[20px]">
                    <div className="flex gap-5">
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        id="standard-basic"
                        label="Mobile"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-[20px] flex">
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        style={{ fontSize: "14px" }}
                      >
                        Type of Address
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={addressType}
                        name="controlled-radio-buttons-group"
                        row={true}
                        onChange={(e) => setAddressType(e.target.value)}
                      >
                        <FormControlLabel
                          value="Home"
                          control={<Radio />}
                          label="Home"
                          sx={{ fontSize: "14px" }}
                        />
                        <FormControlLabel
                          value="Office"
                          control={<Radio />}
                          label="Office"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="mt-[20px]">
                    <div className="flex gap-5">
                      <TextField
                        id="standard-basic"
                        label="Pincode"
                        variant="standard"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <TextField
                        id="standard-basic"
                        label="State"
                        variant="standard"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="mt-[10px]">
                      <TextField
                        id="standard-basic"
                        label="Address (House No, Building, Street, Area)"
                        variant="standard"
                        style={{ width: "100%" }}
                        value={address}
                        onChange={(e) => setaddess(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-5 mt-[10px]">
                      <TextField
                        id="standard-basic"
                        label="City"
                        variant="standard"
                        style={{ width: "100%" }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <TextField
                        id="standard-basic"
                        label="District"
                        variant="standard"
                        style={{ width: "100%" }}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => submitNewAddress()}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
