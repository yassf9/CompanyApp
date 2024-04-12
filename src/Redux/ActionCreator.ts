import axios, { AxiosError } from "axios";
import { Dispatch } from "redux"
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "./Action"
import { toast } from "react-toastify";
import { CompanyInfo } from "../Component/Company";
import { Action } from "./Action";

export const GetAllCompanys = () => {
    return (dispatch : Dispatch<Action>) => {
        dispatch(makeRequest());
        setTimeout(()=>{
            axios.get("http://localhost:8000/company").then(res => {
                const _list : CompanyInfo[] = res.data;
                dispatch(getAllRequestSuccess(_list));
            }).catch( (err ) => {
                dispatch(getAllRequestFail(err.message));
                //message????
            });
        },1000)
       
    }
}

export const GetCompanybycode = (code : number)  => {
    return (dispatch : Dispatch<Action>) => {
        
        axios.get("http://localhost:8000/company/"+code).then(res => {
            const _obj : CompanyInfo = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(() => {
            toast.error('Failed to fetch the data') 
            
        });
    }
}

export const CreateCompany = (data : CompanyInfo) => {
    return (dispatch : Dispatch<Action>) => {
        axios.post("http://localhost:8000/company", data).then( ()=> {
            dispatch(AddRequest(data));
            toast.success('Company created successfully.')
        }).catch((err : AxiosError) => {
            toast.error('Failed to create company due to : ' + err.message)
            
        });
    }
}

export const UpdateCompany = (data : CompanyInfo) => {
    return (dispatch : Dispatch<Action>) => {
        axios.put("http://localhost:8000/company/"+data.id, data).then(() => {
            dispatch(UpdateRequest(data));
            toast.success('Company updated successfully.')
        }).catch((err : AxiosError) => {
            toast.error('Failed to update company due to :' + err.message)
            //error type!!
        });
    }
}

export const RemoveCompany = (code : number) => {
    return (dispatch : Dispatch<Action>) => {
        axios.delete("http://localhost:8000/company/"+code).then(() => {
            dispatch(RemoveRequest(code));
            toast.success('Company Removed successfully.')
        }).catch((err : AxiosError) => {
            toast.error('Failed to remove company due to : ' + err.message)
            //error type!!
        });
    }
}

