import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({ placeholder, onChange, className }) => {
    return (
        <div className={`relative rounded-primaryRadius w-full ${className}`}>
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 rounded-primaryRadius border outline-none bg-inputBg"
            />
        </div>
    );
};

export default Search;
