import { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

export const CustomDropdown = ({ groups, selectedGroup, setSelectedGroup }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (group) => {
        setSelectedGroup(group.id);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col text-lg font-montserrat font-bold gap-y-3">
            <div>Group: </div>
            <div className="relative w-52 font-medium">
                <div 
                    className="flex  justify-between w-full border-2 py-1 px-1 rounded-lg h-10 border-zinc-300 cursor-pointer bg-white"
                    onClick={() => setIsOpen(!isOpen)}
                >    
                        <div className='ml-1'>
                        {groups.find(g => g.id === selectedGroup)?.name || "Select Group"}
                        </div>
                       <div>
                        <RiArrowDropDownLine size={25}></RiArrowDropDownLine>
                       </div>
                </div>

                {isOpen && (
                    <ul className="absolute z-10 w-full border-2 rounded-lg border-zinc-300 bg-white max-h-48 overflow-y-auto mt-1 shadow-lg">
                        {groups.map((group, index) => (
                            <li 
                                key={index} 
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect(group)}
                            >
                                {group.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
