import React from "react"
import Table from "./Table/Table";
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from "./Loader/Loader";
import Pagination from "./Poginator/Poginator";

const URLSHORT = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
const URLLONG = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

export default class App extends React.Component {





    state = {
        data: [],
        initialData: [],
        isLoaded: true,
        sortState: '',
        upOrDown: '',
        type: '',
        usersPerPage: 50,
        currentUser: 1,

    }

    componentDidMount() {

        fetch(URLSHORT)
            .then(r => r.json())
            .then(data => this.setState({
                data,
                initialData: data,
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
            upOrDown: !this.state.sortState ? '∧' : '∨',
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
                data: this.state.initialData
            })
    }

    fetchToUrl(url) {
        this.setState({isLoaded: true})
        fetch(url)
            .then(r => r.json())
            .then(data => this.setState({
                data,
                data2: data,
                isLoaded: false
            }))
    }

    paginate = pageNumber => {
        this.setState({currentUser:pageNumber})
    }

    render() {
        const indexOfLastPost = this.state.currentUser * this.state.usersPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.usersPerPage;
        const currentPosts = this.state.data.slice(indexOfFirstPost, indexOfLastPost);


        return (
            <>
            <div>
                <button type="button" className="btn btn-outline-info ml-1" onClick={() => this.fetchToUrl(URLSHORT)}>32 человека</button>
                <button type="button" className="btn btn-outline-info m-1" onClick={() => this.fetchToUrl(URLLONG)}>1000 человек</button>
            </div>
                {this.state.isLoaded
                    ? <Loader/>
                    :
                    <>
                        <Pagination
                            postsPerPage={this.state.usersPerPage}
                            totalPosts={this.state.data.length}
                            paginate={this.paginate.bind(this)}
                        />
                    <Table
                        type={this.state.type}
                        upOrDown={this.state.upOrDown}
                        sortState={this.state.sortState}
                        data={currentPosts}
                        handleSubmit={this.handleSubmit.bind(this)}
                        sortUsers={this.sortUsers.bind(this)}
                        sortInput={this.sortInput.bind(this)}
                    />

                    </>
                }
            </>
        )
    }
}


