import React, { useState } from "react";
import { FiChevronsDown, FiChevronsUp, FiAlignCenter } from "react-icons/fi";

const SortButton = ({ onClick }) => {
    const [sortOrder, setSortOrder] = useState(null);

    const handleClick = () => {
        let newSortOrder;
        if (sortOrder === null) {
            newSortOrder = "asc";
        } else if (sortOrder === "asc") {
            newSortOrder = "desc";
        } else {
            newSortOrder = null;
        }
        setSortOrder(newSortOrder);
        onClick(newSortOrder); // Passing the new sort order to the parent component
    };

    const renderIcon = () => {
        if (sortOrder === "desc") {
            return <FiChevronsDown className="text-blue-500 w-6 h-6" />;
        } else if (sortOrder === "asc") {
            return <FiChevronsUp className="text-blue-500 w-6 h-6" />;
        } else {
            return <FiAlignCenter className="text-gray-500 w-6 h-6" />;
        }
    };

    return (
        <button
            onClick={handleClick}
            className="focus:outline-none bg-white hover:bg-gray-200  px-2 mr-2 rounded-md transition duration-300 ease-in-out"
        >
            {renderIcon()}
        </button>
    );
};

export default SortButton;
