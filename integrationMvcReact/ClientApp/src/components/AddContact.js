import React from 'react';

import { EmptyContact, addContact } from "../utils/contact";
import { RenderContactEdit } from "./RenderContactEdit";

export const AddContact = () => {

    return (
        <>
            <h1>Add contact</h1>
            <RenderContactEdit initialValue={EmptyContact()} callback={(c) => addContact(c)} formValueUpd={() => EmptyContact()} buttonText="Add contact" />
        </> 
    );
}
