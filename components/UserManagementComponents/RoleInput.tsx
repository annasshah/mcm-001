import React from 'react';

interface RoleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const RoleInput: React.FC<RoleInputProps> = ({ value, onChange, onSave }) => {
  return (
    <div className="mt-4 flex items-center border-2 border-gray-100 rounded focus:outline-none" >
      <input
        type="text"
        value={value}
        placeholder="Enter role name"
        onChange={onChange}
        className="w-full px-3 py-2 border rounded focus:outline-none flex-1"
      />
      <div className="flex gap-3 py-1 px-1">
        <button className="px-4 py-2 rounded">Cancel</button>
        <button
          onClick={() => onSave()}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RoleInput;
