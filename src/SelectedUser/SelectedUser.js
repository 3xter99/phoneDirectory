import React from "react"

function User({user}) {
    return (
    <div className="card" >
        <div className="card-header">
            Выбран пользователь <b>{user.firstName}</b>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Описание: <b>{user.description}</b></li>
            <li className="list-group-item">Город: <b>{user.address.city}</b></li>
            <li className="list-group-item">Провинция/штат: <b>{user.address.state}</b></li>
            <li className="list-group-item">Индекс: <b>{user.address.zip}</b></li>
        </ul>
    </div>
    )
}
export default User
