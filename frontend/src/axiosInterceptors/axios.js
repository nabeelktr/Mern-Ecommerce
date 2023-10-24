import axios from "axios";
import { base_URL } from "../components/constants/constants";

const instance = axios.create({

    baseURL: base_URL,

    // headers: {'Authorization': `Bearer ${token}`}  
});

export default instance;