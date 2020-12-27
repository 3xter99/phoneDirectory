import React from "react"
import Tables from "./Tables/Tables";
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from "./Loader/Loader";

export default class App extends React.Component {

    state = {
        data: [],
        data2: [],
        isLoaded: true,
        sortState: '',
        upOrDown: '',
        type: '',
        url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    }

    componentDidMount() {

        fetch(this.state.url)
            .then(r => r.json())
            .then(data => this.setState({
                data,
                data2: data,
                isLoaded: false
            }))
    }

    handleSubmit(newUser) {
        this.setState((state) => {
                return {data: [newUser, ...state.data]}
            }
        )
    }

    sortUsers(type) {
        const newData = [...this.state.data]

        type === 'id'
            ? newData.sort((a, b) => a.id - b.id)
            : newData.sort((a, b) => a[type].localeCompare(b[type]))

        this.setState({
            data: !this.state.sortState ? newData : newData.reverse(),
            sortState: !this.state.sortState,
            upOrDown: !this.state.sortState ? 'up' : 'down',
            type: type
        })
    }

    sortInput(value) {
        const newData = [...this.state.data]
        const newData2 = newData.filter(
            item =>
               String(item.id).includes(value)
            || item.firstName.toLowerCase().includes(value.toLowerCase())
            || item.lastName.toLowerCase().includes(value.toLowerCase())
            || item.email.toLowerCase().includes(value.toLowerCase())
            || String(item.phone).includes(value)
        )
        value
            ? this.setState({
                data: newData2
            })
            : this.setState({
                data: this.state.data2
            })
    }

    render() {
        return (
            <>
            <div>
                <button onClick={() => {
                    this.setState({isLoaded: true})
                    fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
                    .then(r => r.json())
                    .then(data => this.setState({
                        data,
                        data2: data,
                        isLoaded: false
                    }))}}>32 x человека</button>
                <button onClick={() => {
                    this.setState({isLoaded: true})
                    fetch('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
                    .then(r => r.json())
                    .then(data => this.setState({
                        data,
                        data2: data,
                        isLoaded: false
                    }))}}>1000 человек</button>
            </div>
                {this.state.isLoaded
                    ? <Loader/>
                    : <Tables
                        type={this.state.type}
                        upOrDown={this.state.upOrDown}
                        sortState={this.state.sortState}
                        data={this.state.data}
                        handleSubmit={this.handleSubmit.bind(this)}
                        sortUsers={this.sortUsers.bind(this)}
                        sortInput={this.sortInput.bind(this)}
                    />
                }

            </>
        )
    }
}


