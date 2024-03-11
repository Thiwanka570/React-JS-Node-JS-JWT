import axios from 'axios'
import React, { Component } from 'react'

class PostData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            store: props,
            post: null,
            
        }
    }

    createPost() {
        
        let loginData=JSON.parse(localStorage.getItem('login')); 
        let token="Bearer "+loginData.userInfo
        let config={
            headers:{
                authorization:token
            }
        }
        axios.post('http://localhost:8080/api/posts', {
            post: this.state.post
        },config).then(response => {
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>Post Data To Backend</h1>
                <textarea onChange={(event) => this.setState({ post: event.target.value })}>
                </textarea><br></br>
                <button onClick={() => { this.createPost() }}>Send</button>
            </div>
        )
    }

}

export default PostData;