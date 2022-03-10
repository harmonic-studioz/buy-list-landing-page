const App= () => {
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
        handleSubmit = async (e) => {
        // with try catch
        try{
        // if headers are needed    headers = {}
        const sendResult = await axios.post(url,input}
        console.log(sendResult)
        }catch(err){
         console.log(err)
        }

       
      )
  return (
    <div>snippet2</div>
  )
}

export default snippet2