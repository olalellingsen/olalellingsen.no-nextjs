import React from "react";

export default function imageInput({
  onChange,
}: {
  onChange?: (file: File) => void;
}) {
  return (
    <input
      type="file"
      accept="image/*"
      className="border border-dashed border-gray-300 rounded-md p-2 w-full hover:cursor-pointer hover:bg-gray-50 file:font-medium file:cursor-pointer"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          onChange?.(e.target.files[0]);
        }
      }}
    />
  );
}
