import React, {useState} from "react"
import {Button, Modal} from "react-bootstrap";

function Example( {handleSubmit, show, handleClose}) {
    const [newUser, setNewUser] = useState({
        id: '',
        firstName: '',
        lastName : '',
        email : '',
        phone : '',
    });
    const handleSave = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = () => {
        handleSubmit(newUser)
        handleClose()
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите данные пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'d-flex flex-column '}>
                    <input name={'id'} onChange={handleSave} placeholder={'ID'} className={'mb-1'}/>
                    <input name={'firstName'} onChange={handleSave} placeholder={'FirstName'} className={'mb-1'}/>
                    <input name={'lastName'} onChange={handleSave} placeholder={'LastName'} className={'mb-1'}/>
                    <input name={'email'} onChange={handleSave} placeholder={'Email'} className={'mb-1'}/>
                    <input name={'phone'} onChange={handleSave} placeholder={'Phone'} className={'mb-1'}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClick}>
                        Сохранить пользователя
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Example;
