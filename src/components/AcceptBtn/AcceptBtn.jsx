import "./AcceptBtn.scss";

const AcceptBtn = () => {
  return (
    <label className="custom-radio ">
      <input
        type="checkbox"
        name="checkbox"
        value="accept"
        id="checkbox1"
        required
        //onClick={this.handleCheckBox}
      />
      <span className="radio-btn">
        <i className="las la-check"></i>
      </span>
    </label>
  );
};

export default AcceptBtn;
