import { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const Search = ({ placeholder, onChange, className, suggestions = [] }) => {
    const [focus, setFocus] = useState(false);
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        onChange(e);
    };

    const filteredSuggestions = suggestions.filter(
        (item) =>
            item.toLowerCase().includes(input.toLowerCase()) &&
            input.length > 1
    );

    return (
        <div className={`relative rounded-primaryRadius w-full ${className}`}>
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
                type="text"
                placeholder={placeholder}
                value={input}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 100)}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-primaryRadius border outline-none bg-searchInputBg"
            />
            {focus && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border mt-1 w-full rounded shadow-lg max-h-40 overflow-hidden">
                    {filteredSuggestions.map((suggestion, i) => (
                        <li
                            key={i}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => {
                                setInput(suggestion);
                                onChange({ target: { value: suggestion } });
                            }}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
