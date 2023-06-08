import { useEffect, useState } from "react";
import CreatableSelect, { useCreatable } from "react-select/creatable";

export default function LoadingDropDown() {
  return (
    <CreatableSelect isLoading={true} isDisabled={true} styles={customStyles} />
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
