import "./TextInput.scss";
const Select = (props) => {
  return (
    <div className="inputBx_v1">
      <p>{props.label}</p>
      <select name={props.inputName} onChange={props.inputHandler} required>
        <option value="">Select Token</option>
        <option value="FTM">FTM</option>
        <option value="Eth">Eth</option>
        <option value="BNB">BNB</option>
        <option value="AETH">AETH</option>
        <option value="Matic">Matic</option>
        <option value="AVAX">AVAX</option>
      </select>
    </div>
  );
};

export default Select;
