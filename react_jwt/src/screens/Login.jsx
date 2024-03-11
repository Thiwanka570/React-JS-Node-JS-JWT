import React, { Component } from 'react'
import axios from 'axios'
import PostData from './PostDate'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            store: null,
            isLogin: null,
        }
        
    }

    setSessionTimeOut(){
        setTimeout(() => {
            this.logOut();
        }, 60000);
    }

    logOut(){
        localStorage.removeItem('login');
        this.setState({
            username:null,
            password:null,
            isLogin:false
        })
    }

    componentDidMount() {
        this.storeCollector();
    }

    login() {
        axios.post('http://localhost:8080/api/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response);
                localStorage.setItem('login', JSON.stringify({
                    isLogin: true,
                    userInfo: response.data.token,
                }))
                this.storeCollector();
                this.setSessionTimeOut();
            })
            .catch(error => {
                console.log(error);
            })
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'))
        if (store && store.isLogin) {
            this.setState({
                isLogin: true,
                store: store
            })
            
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.isLogin ?
                        <div>
                            <h1>Login</h1>
                            <h3>Username</h3>
                            <input type='text' name="phone" onChange={(event => { this.setState({ username: event.target.value }) })} /><br />
                            <h3>Password</h3>
                            <input type='password' name='otp' onChange={(event => { this.setState({ password: event.target.value }) })} /><br />
                            <button onClick={() => { this.login() }}>Submit</button>
                        </div> :
                        <div>
                            <PostData props={this.state.store}/>
                            <button onClick={()=>{this.logOut()}}>Logout</button>
                        </div>
                }
            </div>
        )
    }
}
export default Login;