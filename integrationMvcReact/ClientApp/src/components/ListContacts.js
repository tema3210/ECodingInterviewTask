import React, { useState } from 'react';
import useSWR from "swr";
import { useForm } from "react-hook-form";
import _ from "lodash";
import './ListContacts.css';
import fetcherJson from "../utils/fetcher";
import { deleteContact,updateContact } from "../utils/contact";
import { Pagination } from "./Pagination";
import { RenderContactEdit } from "./RenderContactEdit";

const EmptyFilter = {
    FirstNameLike: null,
    LastNameLike: null,
    PhoneNumberLike: null,
    EmailLike: null,
    Order: `LastName`,
};


const RenderFilter = ({ setFilter, form }) => {
    const { register, handleSubmit, reset } = form;

    return (
        <div className="formContainer">
            <input className="form-control" type="text" placeholder="FirstNameLike" {...register("FirstNameLike")} /><br />
            <input className="form-control" type="text" placeholder="LastNameLike" {...register("LastNameLike")} /><br />
            <input className="form-control" type="text" placeholder="EmailLike" {...register("EmailLike")} /><br />
            <input className="form-control" type="text" placeholder="PhoneNumberLike" {...register("PhoneNumberLike")} /><br />
            Order <select className="form-select" {...register("Order")}>
                <option selected value="FirstName">First name</option>
                <option value="LastName">Last name</option>
                <option value="PhoneNumber">Phone</option>
                <option value="Email">Email</option>
            </select>
            <button className="btn btn-primary actionButton" onClick={handleSubmit(setFilter)}>Filter</button>
            <button className="btn btn-secondary actionButton" onClick={() => reset(EmptyFilter)}>Reset</button>
            <hr />
        </div>
    )
}

export const FetchData = () => { 

    const filterForm = useForm({ defaultValues: EmptyFilter }); //an actual filter form (it's here for that it doesn't reset when hidden\showed)

    const [filter, setFilter] = useState(EmptyFilter); // what is filtered against 

    const [clicked, setClicked] = useState(null); // what is selected in table

    const [showFilter, setShowFilter] = useState(false); // is filter shown?

    const [showEdit, setShowEdit] = useState(false); // do we show an edit form

    const [page, setPage] = useState(0);

    const pageSize = 10;

    const { data, isLoading, mutate } = useSWR(['/Contact', { ...filter, Page: page, PageSize: pageSize }], fetcherJson, {});

    if (isLoading || !data) return <p><em>Loading...</em></p>;

    const { contacts, count } = data;

    const afterChange = () => { mutate(_.clone(data)); setClicked(null); setShowEdit(false); };

    return (
        <div>
            <h1 id="tabelLabel">Contacts list</h1>
            <h2>Filter <sub className="smallSub link-primary" onClick={() => setShowFilter(!showFilter)}>{(showFilter)? "hide" : "show"}</sub></h2>
            {(showFilter) ? <RenderFilter setFilter={setFilter} form={filterForm} /> : null }
            <table className='table table-bordered table-hover' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts?.map(contact => {
                        const current = (clicked?.Id === contact.Id);
                        return (
                            <tr key={contact.Id} className={current ? 'table-active' : 'table-light'} onClick={() => {
                                setClicked(current ? null : contact);
                                setShowEdit(false);
                            }}>
                                <td>{contact.FirstName}</td>
                                <td>{contact.LastName}</td>
                                <td>{contact.Email}</td>
                                <td>{contact.PhoneNumber}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} maxPages={Math.ceil(count / pageSize)} />
            <br/>
            <button className="btn btn-secondary actionButton" disabled={clicked === null} onClick={() => setShowEdit(true)}>Edit</button>
            <button className="btn btn-secondary actionButton" disabled={clicked === null} onClick={() => deleteContact(clicked.Id, afterChange )}>Remove</button>
            {
                (showEdit) ? <>
                    <h2>Edit contact </h2>
                    <RenderContactEdit initialValue={clicked} callback={(data) => updateContact(clicked.Id, data, afterChange)} buttonText="Patch"/>
                </> : null
            }

        </div>
    );
}
