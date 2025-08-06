import React from "react";

const Delete = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center font-Open-Sans bg-black bg-opacity-50 transition-all"
        >
            <div className={`bg-cardBg text-primaryText gap-[10px] p-[32px] rounded-[24px] w-[450px] h-[210px] shadow-lg flex flex-col items-center`}>
                <h2 className="text-[24px] font-[600] mb-2 ">Are you sure?</h2>
                <p className="mb-2 text-[18px] font-[600] text-center ">
                    You Won't be able to revert this!
                </p>
                <div className="flex justify-center w-[400px] h-[50px] gap-[20px]">
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 cursor-pointer border-[1px] text-[18px] font-semibold border-secondaryLite rounded-primaryRadius w-[180px] h-[55px] bg-secondaryBtn text-buttonText`}
                    >
                        Yes, Delete it!
                    </button>
                    <span></span>
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 cursor-pointer border-[1px] text-[18px] font-semibold border-secondaryLite rounded-primaryRadius w-[180px] h-[55px] bg-deleteBtn text-buttonText`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delete;
