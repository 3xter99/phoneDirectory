import React, {useState} from "react"
import ModalAdd from "../ModalAdd/ModalAdd";
import SelectedUser from "../SelectedUser/SelectedUser";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import './/Table.css'

function Table ({data, handleSubmit, sortUsers, sortInput, upOrDown, type}) {

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
                <tr className={'header_line'}>
                    <th className={'column'} onClick={() => sortUsers('id')}>ID {type=== 'id' && upOrDown} </th>
                    <th className={'column'} onClick={() => sortUsers('firstName')}>FirstName {type=== 'firstName' && upOrDown}</th>
                    <th className={'column'} onClick={() => sortUsers('lastName')}>LastName {type=== 'lastName' && upOrDown}</th>
                    <th className={'column'} onClick={() => sortUsers('email')}>Email {type=== 'email' && upOrDown}</th>
                    <th className={'column'} onClick={() => sortUsers('phone')}>Phone {type=== 'phone' && upOrDown}</th>
                </tr>
                </thead>
                <tbody >
                {data.map(item => (
                    <tr key={item.id + item.firstName} onClick={handleClick.bind(null, item)}>
                        <th id={'id'}>{item.id}</th>
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

export default Table
