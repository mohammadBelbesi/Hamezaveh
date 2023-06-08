import { useEffect, useState } from "react";
import CreatableSelect, { useCreatable } from "react-select/creatable";

export default function DropDown({
  labels,
  value: initialValue,
  createLabel,
  onChange,
}) {
  console.log(initialValue);

  const initialOptions = labels.map((label) => ({
    label,
    value: label,
  }));

  const [options, setOptions] = useState(initialOptions);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState(
    options.find((option) => option.label === initialValue)
  );

  async function handleCreate(newLabel) {
    setLoading(true);

    await createLabel(newLabel);
    const newOption = { label: newLabel, value: newLabel };
    setOptions((prev) => [...prev, newOption]);

    setLoading(false);

    handleChange(newOption);
  }

  function handleChange(newOption) {
    if (newOption) {
      onChange(newOption.label);
    }
    if (!newOption) {
      onChange("");
    }
    setValue(newOption);
  }

  return (
    <CreatableSelect
      options={options}
      isLoading={isLoading}
      isDisabled={isLoading}
      value={value}
      onChange={handleChange}
      onCreateOption={handleCreate}
      isSearchable={true}
      isClearable={true}
      styles={customStyles}
    />
  );
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 300,
  }),
  menu: (provided) => ({
    ...provided,
    width: 300,
  }),
};
