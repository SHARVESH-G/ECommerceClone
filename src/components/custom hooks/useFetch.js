import axios from "axios"
import { useState , useEffect} from "react"
function useFetch(URL){
    const [datas , setDatas] = useState( [] )
    const [error , setError] = useState("")
    const [isload , setisLoad] = useState( true )
    useEffect( () => {
        let fetchApi = async() => {
            try{
                let response = await axios.get(URL);
                setDatas(response.data)
            }
            catch(error){
                setError(error.message)
            }
            finally{
                setisLoad(false)
            }
        }
        fetchApi();
    },[])
    return { datas , error , isload , setDatas}
}
export default useFetch