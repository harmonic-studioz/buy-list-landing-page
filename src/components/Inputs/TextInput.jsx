import './TextInput.scss'
const TextInput = (props) => {
  return (
    <div className="inputBx_v1">
      <p>{props.label}</p>
      <input
        type={props.type}
        name={props.inputName}
        value={props.value}
        placeholder={`Type ${props.PH} here`}
        onChange={props.inputHandler}
        required
      />
    </div>
  )
}

export default TextInput
