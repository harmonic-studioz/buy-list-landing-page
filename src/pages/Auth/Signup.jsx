const Signup = () => {
  return (
    <>
      <div className="connectTop">
        <div className="coTop_txt ">
          <h1>Quickly setup your profile</h1>
          <p>Help us get back to you easily, register here:</p>
        </div>
      </div>
      <div className="connectInputs">
        <div className="connectInputBx">
          <p>Email</p>
          <input type="text" placeholder="Type email here" />
        </div>
        <div className="connectInputBx">
          <p>Username</p>
          <input type="text" placeholder="Type username here" />
        </div>
      </div>
      <div className="loginBx lbx-bg">
        <button>Save</button>
      </div>
    </>
  )
}

export default Signup
