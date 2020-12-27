import React from "react"

function User({user}) {
    return (
        <div>
            <p>Выбран пользователь <b>{user.firstName}</b></p>
            <p>Описание:
                <textarea readOnly value={user.description} /></p>
            <p>Адрес проживания: {user.address.streetAddress}</p>
            <p>Город: <b>{user.address.city}</b></p>
            <p>Провинция/штат: <b>{user.address.state}</b></p>
            <p>Индекс: <b>{user.address.zip}</b></p>
        </div>
    )
}
export default User
