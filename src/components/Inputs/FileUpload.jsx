import UploadIcon from '../../assets/icons/upload.svg'
const FileUpload = (props) => {
  return (
    <div className="inputBx_v2">
      <p>{props.label}</p>
      <div className="fileBox_v1">
        {props.file ? (
          <div className="fb_v1Content">
            <img
              className="fb_fileImg"
              src={URL.createObjectURL(props.file)}
              alt="file"
            />
          </div>
        ) : (
          <div className="fb_v1Content">
            <img src={UploadIcon} alt="upload file" />
            <p>PNG, JPEG, files not more than 3MB.</p>
          </div>
        )}
        <input
          className="fb_file"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={props.fileHandler}
        />
      </div>
    </div>
  )
}

export default FileUpload
