
export const EmptyContact = () => ({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
});

export const IsValid = (contact) => {
    return true;
}

export const addContact = async (contact, cb = () => { }) => {
    if (!IsValid(contact)) return;

    contact.Id = 0;

    await fetch('/Contact/Post', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(cb);
};

export const deleteContact = async (id, cb = () => {} ) => {
    await fetch(`/Contact/Delete?id=${id}`, {
        method: 'DELETE'
    }).then(cb);
};

export const updateContact = async (id, contact, cb = () => { }) => {
    await fetch(`/Contact/Patch?id=${id}`, {
        method: 'PATCH',
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(cb);
};
