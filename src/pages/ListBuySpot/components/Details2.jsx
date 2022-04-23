import FileUpload from '../../../components/Inputs/FileUpload'
import FileUpload2 from '../../../components/Inputs/FileUpload2'
import TextInput from '../../../components/Inputs/TextInput'

const Details2 = (props) => {
  return (
    <>
      <div className="connectInputs">
        <TextInput
          label="Users discord ID"
          type="text"
          PH="discord"
          inputName="discordId"
          value={props.discordId}
          inputHandler={props.inputHandler}
        />
        <TextInput
          label="Twitter Username"
          type="text"
          PH="twitter username"
          inputName="twitterName"
          value={props.twitterName}
          inputHandler={props.inputHandler}
        />
        <FileUpload
          label="Upload twitter screenshot"
          fileHandler={props.fileHandler}
          file={props.file}
        />
        <FileUpload2
          label="Upload discord screenshot"
          fileHandler2={props.fileHandler2}
          file2={props.file2}
        />
      </div>
    </>
  )
}

export default Details2
