import React, {useState} from "react"
import {Button, Modal} from "react-bootstrap";

function ModalAdd( {handleSubmit, show, handleClose}) {
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
                    <input name={'id'} onChange={handleSave} placeholder={'ID'} className={'mb-1 form-control'}/>
                    <input name={'firstName'} onChange={handleSave} placeholder={'FirstName'} className={'mb-1 form-control'}/>
                    <input name={'lastName'} onChange={handleSave} placeholder={'LastName'} className={'mb-1 form-control'}/>
                    <input name={'email'} onChange={handleSave} placeholder={'Email'} className={'mb-1 form-control'}/>
                    <input name={'phone'} onChange={handleSave} placeholder={'Phone'} className={'mb-1 form-control'}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button disabled = {!newUser.id || !newUser.lastName || !newUser.firstName || !newUser.phone || !newUser.email} variant="primary" onClick={handleClick}>
                        Сохранить пользователя
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAdd;
