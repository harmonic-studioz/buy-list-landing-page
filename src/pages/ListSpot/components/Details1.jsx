import TextInput from "../../../components/Inputs/TextInput";
import Select from "../../../components/Inputs/Select01";

const Details1 = (props) => {
  return (
    <>
      <div className="connectInputs">
        <TextInput
          label="Project name"
          type="text"
          PH="project name"
          inputName="projectName"
          value={props.projectName}
          inputHandler={props.inputHandler}
        />

        <TextInput
          label="Discord channel link"
          type="text"
          PH="link"
          inputName="discordLink"
          value={props.discordLink}
          inputHandler={props.inputHandler}
        />
        <TextInput
          label="Twitter page link"
          type="text"
          PH="link"
          inputName="twitterLink"
          value={props.twitterLink}
          inputHandler={props.inputHandler}
        />
        <TextInput
          label="Mint Price"
          type="text"
          PH="price"
          inputName="mintPrice"
          value={props.mintPrice}
          inputHandler={props.inputHandler}
        />
        {/* <TextInput
          label="Mint token"
          type="text"
          PH="token"
          inputName="mintToken"
          value={props.mintToken}
          inputHandler={props.inputHandler}
        /> */}
        <Select
          label="Mint token"
          inputName="mintToken"
          inputHandler={props.inputHandler}
        />
        <TextInput
          label="Mint date"
          type="date"
          PH=""
          inputName="mintDate"
          value={props.mintDate}
          inputHandler={props.inputHandler}
        />
      </div>
    </>
  );
};

export default Details1;
