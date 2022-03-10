const  App = () => {

        const url= "";
        const [result, setResult] = useState("");

        const handleClick = (e) =>{
            setResult(result.concat(e.target.name));
        }

        const handleChange = (e) => {
          setResult(e.target.value);
        }

        const handleSubmit =(e) => {
            e.preventDefault();
            const input = setResult(result.concat(e.target.name)); 
            
            Axios.post(url,{input})
            .then(res => {
                console.log()
            })
        }

  return (
    <>
      <div className="container">
        <form  onSubmit={(e) => handleSubmit(e)}>
          <input onChange={handleChange} type="text" value={result} className="Screen"></input>

          <div className="Keyboard">
            <button name="1" onClick={handleClick}>
              1<span>.,!</span>
            </button>
            <button name="2" onClick={handleClick}>
              2 <span>abc</span>
            </button>
            <button name="3" onClick={handleClick}>
              3 <span>def</span>
            </button>
            <button name="4" onClick={handleClick}>
              4 <span>ghi</span>
            </button>
            <button name="5" onClick={handleClick}>
              5 <span>jkl</span>
            </button>
            <button name="6" onClick={handleClick}>
              6 <span>mno</span>
            </button>
            <button name="7" onClick={handleClick}>
              7 <span>pqrs</span>
            </button>
            <button name="8" onClick={handleClick}>
              8 <span>tuv</span>
            </button>
            <button name="9" onClick={handleClick}>
              9 <span>wxyz</span>
            </button>
            <button name="*" onClick={handleClick}>
              *
            </button>
            <button name="0" onClick={handleClick}>
              0 <span>⌴</span>
            </button>
            <button name="#" onClick={handleClick} disabled>
              #
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;