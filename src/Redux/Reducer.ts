import { CompanyInfo } from "../Component/Company"
import { Action } from "./Action"
import { ActionType } from "./ActionType"

export interface State{
    isloading: boolean,
    companylist: Array<CompanyInfo>,
    companyobj: CompanyInfo ,
    errormessage: string
}

export const initialstate : State = {
isloading: false,
companylist: [],
companyobj: {
    id : 0,
    name: '' , 
    email : ''  ,
    phone:''  ,
    address:''  ,
    type:''  
},
errormessage: ''
}


export const CompanyReducer = (state = initialstate, action : Action) => {
switch (action.type) {
    case ActionType.MAKE_REQ:
        return {
            ...state,
            isloading: true
        }
    case ActionType.REQ_GETALL_SUCC:
        return {
            ...state,
            isloading: false,
            companylist: action.payload
        }
    case ActionType.REQ_GETBYCODE_SUCC:
        return {
            ...state,
            companyobj: action.payload
        }
    case ActionType.REQ_GETALL_FAIL:
        return {
            ...state,
            isloading: false,
            companylist: [],
            errormessage: action.payload
        }
    case ActionType.OPEN_POPUP:
        return {
            ...state,
            companyobj: {
                id : JSON.stringify(1 + Math.max(...state.companylist.map(o => o.id))) ,
                name: '' , 
                email : ''  ,
                phone:''  ,
                address:''  ,
                type:'' }
        }
    case ActionType.REQ_ADD_SUCC:
        const _inputdata = { ...action.payload };
        const _maxid = Math.max(...state.companylist.map(o => o.id));
        _inputdata.id = _maxid + 1;
        return {
            ...state,
            companylist: [...state.companylist, _inputdata]
        }
    case ActionType.REQ_UPDATE_SUCC:
        const _data = { ...action.payload };
        const _finaldata = state.companylist.map(item => {
            return item.id === _data.id ? _data : item
        });
        return {
            ...state,
            companylist: _finaldata
        }
    case ActionType.REQ_DELETE_SUCC:
        const _filterdata = state.companylist.filter((data) => {
            return data.id !== action.payload
        })
        return {
            ...state,
            companylist: _filterdata
        }
    default: return state;
}
}