import { Label } from 'flowbite-react';
import React, { useState, useEffect, useRef } from 'react';

interface OptionArrayInterface {
    value: string | number;
    label: string | number;
    selected?: boolean;
    disabled?: boolean;
}

interface Props {
    options_arr: OptionArrayInterface[];
    on_change_handle?: (e: any) => void;
    required?: boolean;
    value?: string | number;
    label?: string;
    start_empty?: boolean;
    disabled?: boolean;
    bg_color?: string;
    initialValue?: any;
}

export const Searchable_Dropdown = ({
    disabled = false,
    options_arr,
    on_change_handle,
    required,
    value = '',
    label,
    start_empty = false,
    bg_color = '#D9D9D9',
    // @ts-ignore
    initialValue = '' || 0,
}: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref to track the dropdown element

    // Filter options based on the search term
    const filteredOptions = options_arr.filter((option) =>
        option.label.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true); // Show dropdown when typing
    };

    // Handle option selection
    const handleSelectOption = (selectedValue: string | number) => {
        if (on_change_handle) {
            on_change_handle({ target: { value: selectedValue } });
        }
        setSelectedValue(selectedValue);
        setShowDropdown(false); // Close dropdown on selection
        setSearchTerm(''); // Reset search input after selection
    };

    // Update the selected value when passed value prop changes
    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            {label && <Label htmlFor="searchable-select" value={label} className="font-bold" />}
            <input
                type="text"
                value={searchTerm || options_arr.find((opt) => opt.value === selectedValue)?.label || ''}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                placeholder={label || 'Search...'}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={disabled}
                style={{ backgroundColor: bg_color }}
                required={required}
                readOnly={false} // Set to false so user can type
            />
            {showDropdown && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded max-h-48 overflow-auto text-base">
                    {start_empty && (
                        <li
                            key="empty"
                            onClick={() => handleSelectOption(initialValue)}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-gray-400"
                        >
                            {label || 'Select an option'}
                        </li>
                    )}
                    {filteredOptions.map(({ value, label, disabled }, ind) => (
                        <li
                            key={ind}
                            onClick={() => !disabled && handleSelectOption(value)}
                            className={`p-2 hover:bg-gray-100 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
