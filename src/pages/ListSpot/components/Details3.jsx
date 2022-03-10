import TextInput from '../../../components/Inputs/TextInput'
import Alert from '../../../assets/icons/alert.svg'

const Details3 = (props) => {
  return (
    <>
      <div className="connectInputs">
        <TextInput
          label="Whitelist number"
          type="text"
          PH="WL no"
          inputName="wlNumber"
          value={props.wlNumber}
          inputHandler={props.inputHandler}
        />
        <TextInput
          label="Whitelist price"
          type="text"
          PH="WL price"
          inputName="wlPrice"
          value={props.wlPrice}
          inputHandler={props.inputHandler}
        />
        {props.response.error && (
          <div className="errorDesc animate__animate animate__fadeIn">
            <img src={Alert} alt="alert" />
            <p>{props.response.error} </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Details3
