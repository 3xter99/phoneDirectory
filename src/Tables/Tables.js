import React, {useState} from "react"
import ModalAdd from "../ModalAdd/ModalAdd";
import SelectedUser from "../SelectedUser/SelectedUser";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";

function Tables ({data, handleSubmit, sortUsers, sortInput, upOrDown, type}) {

    const [save, setSave] = useState(false)
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zip: ''
        },
        description: ''
    })
    const [value, setValue] = useState('')

    const handleClick = (item) => {

        setUser({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            address: {
                streetAddress: item.address.streetAddress,
                city: item.address.city,
                state: item.address.state,
                zip: item.address.zip
            },
            description: item.description
        })
        setSave(true)
    }

    const inputValue = (e) => {
        setValue(e.target.value)


    }
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Телефонная книга всего Мира</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={() => handleShow()} variant="outline-info">Добавить пользователя</Button>
                </Nav>
                <Form inline>
                    <FormControl value={value} onChange={(e) => inputValue(e)} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button onClick={() => sortInput(value)} variant="outline-info">Search</Button>
                </Form>
            </Navbar>

            <ModalAdd
                handleSubmit={handleSubmit}
                show={show}
                handleClose={handleClose}
            />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th onClick={() => {sortUsers('id')}} scope="col">ID {type=== 'id' ? upOrDown : null} </th>
                    <th onClick={() => sortUsers('firstName')} scope="col">FirstName {type=== 'firstName' ? upOrDown : null}</th>
                    <th onClick={() => sortUsers('lastName')} scope="col">LastName {type=== 'lastName' ? upOrDown : null}</th>
                    <th onClick={() => sortUsers('email')} scope="col">Email {type=== 'email' ? upOrDown : null}</th>
                    <th onClick={() => sortUsers('phone')} scope="col">Phone {type=== 'phone' ? upOrDown : null}</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id + item.firstName} onClick={handleClick.bind(null, item)}>
                        <th id={'id'} scope="row">{item.id}</th>
                        <td id={'firstName'}>{item.firstName}</td>
                        <td id={'lastName'}>{item.lastName}</td>
                        <td id={'email'}>{item.email}</td>
                        <td id={'phone'}>{item.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {}
            { save
                ? <div>
                    <SelectedUser
                        user={user}
                    />
                </div>
                : null
            }
        </>
    )
}

export default Tables
