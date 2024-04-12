
import {  Button, Checkbox, Dialog, DialogContent, DialogTitle , FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { ChangeEvent,  FC, FormEvent, useEffect, useState } from "react";
import { CreateCompany, GetAllCompanys, GetCompanybycode, RemoveCompany, UpdateCompany } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import CloseIcon from "@mui/icons-material/Close" ; 
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/Store";

export interface CompanyInfo{
    id : number  ,
    name: string , 
    email : string ,
    phone:string ,
    address:string ,
    type:string 
}

export interface CompanyProps{
        isloading : boolean ,
        errormessage : string  ,
        companystate : {
            companylist : Array<CompanyInfo>  ,
            companyobj: CompanyInfo 
        },
    //loadcompany() type !!!
    loadcompany : () => {}
}


const Company : FC<CompanyProps> = (props) => {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'address', name: 'Address' },
        { id: 'type', name: 'Company Type' },
        { id: 'action', name: 'Action' }
    ]
    
    //fix dispatch type
    const dispatch= useAppDispatch();

    const [id, idchange] = useState<number>(0);
    const [name, namechange] = useState<string>('');
    const [email, emailchange] = useState<string>('');
    const [phone, phonechange] = useState<string>('');
    const [address, addresschange] = useState<string>('');
    const [type, typechange] = useState<string>('MNC');
    const [open, openchange] = useState<boolean>(false);
    const [agreeterm, agreetermchange] = useState<boolean>(true);

    const [rowperpage, rowperpagechange] = useState<number>(5);
    const [page, pagechange] = useState<number>(0);

    const [isedit, iseditchange] = useState<boolean>(false);
    const [title, titlechange] = useState<string>('Create company');

   
//fix this error {}
    const editobj : CompanyInfo  = useAppSelector((state ) => state.company.companyobj);

    useEffect(() => {
        if (Object.keys(editobj).length > 0) {
            //fix this id , always 0 
            idchange(editobj.id );
            namechange(editobj.name);
            emailchange(editobj.email);
            phonechange(editobj.phone);
            addresschange(editobj.address);
            typechange(editobj.type);
        } else {
            clearstate();
        }

    }, [editobj])

    //fix this
    const handlepagechange = (event : any , newpage :number) => {
        pagechange(newpage);
    }
//fix this
    const handlerowperpagechange = (event : ChangeEvent<HTMLInputElement> ) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    }

    const functionadd = () => {
        iseditchange(false);
        titlechange('Create company');
        openpopup();
    }
    const closepopup = () => {
        openchange(false);
    }
    const openpopup = () => {
        openchange(true);
        clearstate();
        dispatch(OpenPopup())
    }
    const handlesubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _obj = { id, name, email, phone, address, type };
        if (isedit) {
            dispatch(UpdateCompany(_obj));
        } else {
            dispatch(CreateCompany(_obj));
        }
        closepopup();
    }

    const handleEdit = (code :number) => {
        iseditchange(true);
        titlechange('Update company');
        openchange(true);
        dispatch(GetCompanybycode(code))
    }

    const handleRemove = (code :number) => {
        if (window.confirm('Do you want to remove?')) {
            dispatch(RemoveCompany(code));
        }
    }


    const clearstate = () => {
        idchange(0);
        namechange('');
        emailchange('');
        phonechange('');
        addresschange('');
        typechange('MNC');
    }
    useEffect(() => {
        props.loadcompany();
    }, [])
    return (
        props.isloading ? <div><h2>Loading.....</h2> </div> :
        props.errormessage ? <div><h2>{props.errormessage}</h2></div> :
            <div>
                <Paper sx={{ margin: '1%' }}>
                    <div style={{ margin: '1%' }}>
                        <Button onClick={functionadd} variant="contained">Add New (+)</Button>
                    </div>
                    <div style={{ margin: '1%' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                        {columns.map((column) =>
                                            <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                        )}
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {props.companystate.companylist &&
                                        props.companystate.companylist
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.phone}</TableCell>
                                                        <TableCell>{row.address}</TableCell>
                                                        <TableCell>{row.type}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => { handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                            <Button onClick={() => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[2,5, 10, 20]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={props.companystate.companylist.length}
                            component={'div'}
                            onPageChange={handlepagechange}
                            onRowsPerPageChange={handlerowperpagechange}
                        >
                            
                        </TablePagination>
                    </div>
                </Paper>

                <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                    <DialogTitle>
                        <span>{title}</span>
                        <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handlesubmit}>
                            <Stack spacing={2} margin={2}>
                                <TextField required error={name.length === 0} value={name} onChange={e => { namechange(e.target.value) }} variant="outlined" label="Name"></TextField>
                                <TextField required error={name.length === 0} value={email} onChange={e => { emailchange(e.target.value) }} variant="outlined" label="Email"></TextField>
                                <TextField required error={name.length === 0} value={phone} onChange={e => { phonechange(e.target.value) }} variant="outlined" label="Phone"></TextField>
                                <TextField multiline maxRows={2} minRows={2} value={address} onChange={e => { addresschange(e.target.value) }} variant="outlined" label="Address"></TextField>
                                <RadioGroup value={type} onChange={e => { typechange(e.target.value) }} row>
                                    <FormControlLabel value="MNC" control={<Radio color="success"></Radio>} label="MNC"></FormControlLabel>
                                    <FormControlLabel value="DOMESTIC" control={<Radio></Radio>} label="DOMESTIC"></FormControlLabel>
                                </RadioGroup>
                                <FormControlLabel checked={agreeterm} onChange={e  => { agreetermchange(((e.target as HTMLInputElement).checked)) }} control={<Checkbox></Checkbox>} label="Agree Terms & Conditions"></FormControlLabel>
                                <Button disabled={!agreeterm} variant="contained" type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
    );
}

const mapStatetoProps = (state : RootState) => {
    return {
        isloading: state.company.isloading,
        errormessage: state.company.errormessage ,
        companystate: {
            companylist: state.company.companylist,
            companyobj: state.company.companyobj,
        }
    }
}

const mapDispatchtoProps = (dispatch = useAppDispatch() ) => {
    return {
        loadcompany: () => dispatch(GetAllCompanys())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Company);