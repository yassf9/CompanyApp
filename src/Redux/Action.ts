import { AxiosError } from "axios"
import { ActionType } from "./ActionType"
import { CompanyInfo } from "../Component/Company"

export interface  MAKE_REQ_Action {
    type:ActionType.MAKE_REQ
}

export interface  OPEN_POPUP_Action {
    type: ActionType.OPEN_POPUP
}
export interface REQ_ADD_SUCC_Action{
    type:ActionType.REQ_ADD_SUCC,
    payload: CompanyInfo
}
export interface REQ_DELETE_SUCC_Action{
    type: ActionType.REQ_DELETE_SUCC,
    payload: number
}
export interface REQ_GETALL_FAIL_Action{
    type: ActionType.REQ_GETALL_FAIL,
   //!!!!!!array?
    payload: Array<AxiosError>
}
export interface  REQ_GETALL_SUCC_Action{
    type: ActionType.REQ_GETALL_SUCC,
    //!!!!!!array?
    payload: Array<CompanyInfo>
}
export interface REQ_GETBYCODE_SUCC_Action{
    type: ActionType.REQ_GETBYCODE_SUCC,
    payload: CompanyInfo
}
export interface REQ_UPDATE_SUCC_Action {
    type: ActionType.REQ_UPDATE_SUCC,
    payload:  CompanyInfo
}

export type Action = MAKE_REQ_Action| OPEN_POPUP_Action| REQ_ADD_SUCC_Action| REQ_DELETE_SUCC_Action| REQ_GETALL_FAIL_Action| REQ_GETALL_SUCC_Action| REQ_GETBYCODE_SUCC_Action | REQ_UPDATE_SUCC_Action



export const makeRequest=() : MAKE_REQ_Action =>{
    return{
        type:ActionType.MAKE_REQ
    }
}

export const getAllRequestSuccess=(data : Array<CompanyInfo>) : REQ_GETALL_SUCC_Action=>{
    return{
        type:ActionType.REQ_GETALL_SUCC,
        payload: data
    }
}

export const getAllRequestFail=(err : Array<AxiosError>) : REQ_GETALL_FAIL_Action=>{
    return{
        type:ActionType.REQ_GETALL_FAIL,
        payload:err
    }
}

export const OpenPopup=() : OPEN_POPUP_Action =>{
    return{
        type:ActionType.OPEN_POPUP
    }
}

export const AddRequest=(data : CompanyInfo) : REQ_ADD_SUCC_Action =>{
    return{
        type:ActionType.REQ_ADD_SUCC,
        payload:data
    }
}

export const UpdateRequest=(data :CompanyInfo) : REQ_UPDATE_SUCC_Action =>{
    return{
        type:ActionType.REQ_UPDATE_SUCC,
        payload:data
    }
}

export const RemoveRequest=(code : number) : REQ_DELETE_SUCC_Action =>{
    return{
        type:ActionType.REQ_DELETE_SUCC,
        payload:code
    }
}

export const getbycodeSuccess=(data :CompanyInfo) : REQ_GETBYCODE_SUCC_Action=>{
    return{
        type:ActionType.REQ_GETBYCODE_SUCC,
        payload:data
    }
}

