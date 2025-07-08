import axios from "axios";
import {baseURL} from "./constant";

export default axios.create({
    baseURL: baseURL, 
});



