import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
import { textShortner } from "@/ecommerce/utils/utils";
import { useQuery } from "react-query";
import { service } from "@/ecommerce/axios/axios";
import useSearch from "@/ecommerce/hooks/useSearch";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const debouncedSearchTerm = useSearch(searchTerm, 300);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => {
      if (searchTerm === "") return;
      return service.get(`search/${searchTerm}`);
    },
  });

  const handleProductClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
    });
  });

  return (
    <div className="border-[1px] border-[#D3D3D3] bg-[#f5f5f6] w-[85%] sm:w-full m-auto h-[40px] sm:h-[50px] rounded-[4px] flex items-center sm:border-none sm:rounded-none sm:gap-[12px] relative">
      <span className="px-2 w-[10%]">
        <SearchOutlinedIcon />
      </span>
      <input
        type="text"
        className="h-[100%] w-[90%] bg-transparent focus:outline-none placeholder:text-[13px] sm:placeholder:text-[12px]"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setIsOpen(true);
          setSearchTerm(e.target.value);
        }}
      />

      {isOpen && data && data?.data?.length > 0 ? (
        <div className="w-[100%] absolute border-[1px] border-[lightgray] shadow-lg top-[40px] z-[500] sm:z-[10000] bg-white max-h-[212px] min-h-auto overflow-y-auto rounded-b-[8px]">
          <ul className="w-[100%] list-none">
            {data?.data.map((item) => (
              <Link
                className="my-[10px] hover:bg-[#e4e4e4] px-[15px] h-[30px] flex items-center text-[14px] cursor-pointer gap-[8px]"
                key={item._id}
                href={`/product/${item._id}`}
                onClick={handleProductClick}
              >
                <p className="text-[12px]">
                  {textShortner(item.brand + " - " + item.name, 70) +
                    " - " +
                    item.categoryId.name}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBox;
