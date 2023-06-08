import { useState } from "react";

function CheckBox({ checked, update }) {
  const [isChecked, setChecked] = useState(checked);
  const [isBig, setBig] = useState(false);

  return (
    <td>
      <input
        onMouseEnter={() => setBig(true)}
        onMouseLeave={() => setBig(false)}
        style={{ transform: isBig ? "scale(1.5)" : "scale(1)" }}
        checked={isChecked}
        onChange={(event) => {
          setChecked(event.target.checked);
          update(event.target.checked);
        }}
        type="checkbox"
      />
    </td>
  );
}

export default CheckBox;
