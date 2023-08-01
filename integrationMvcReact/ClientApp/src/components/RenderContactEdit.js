import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as _ from "lodash";

export const RenderContactEdit = ({ initialValue, callback, formValueUpd = (v) => v, buttonText = "" } ) => {
    const {
        register,
        handleSubmit,
        reset,
        
    } = useForm({ defaulValue: initialValue, });

    useEffect(() => {
        reset(initialValue);
    },[])

    return (
        <div>
            <div>
                <label>First name</label>
                <input className="form-control" type="text" placeholder="FirstName" {...register("FirstName")} /><br />
                <label>Last name</label>
                <input className="form-control" type="text" placeholder="LastName" {...register("LastName")} /><br />
                <label>Email</label>
                <input className="form-control" type="text" placeholder="Email" {...register("Email")} /><br />
                <label>Phone number</label>
                <input className="form-control" type="text" placeholder="PhoneNumber" {...register("PhoneNumber")} /><br />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit((val) => { callback(_.clone(val)); reset(formValueUpd(val)) })}>{buttonText}</button>
        </div>
    );
}
