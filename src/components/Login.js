import React from "react";
import './CSS/Login.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {signin} from "./redux/actions";

class Login extends React.Component{
    state = {
        phone : "",
        OTP : "",
        remember : false,
        firstTime : true
    }
    check = (e) => {
        this.setState({
            remember : e.target.checked
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.serverRequset();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    refresh = () => {
        this.setState({ firstTime : true, OTP : '' })
    }
    serverRequset = async () => {
        let url = this.state.firstTime ? 'first' : 'second';
         await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/'+url,
            data: this.createFormData(),
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            this.responseHandler(response);
        }).catch( (response) => {
             this.responseHandler(response);
        });
    }
    responseHandler = (response) => {
        if(response.status === 200){
            if(this.state.firstTime) {
                alert(response.data.success.number);
                this.setState({firstTime: false});
            }
            else{
                localStorage.setItem('token', "Bearer " + response.data.success.token);
                alert('Signed in successfully');
                this.setState({firstTime: false});
                this.props.login();
                this.props.history.push('/');
            }
        }
        else{
            localStorage.setItem('token','');
            this.refresh();
            alert('Wrong OTP !!!');
        }
        console.log("response" , response);
    }
    createFormData = () => {
        let bodyFormData = new FormData();
        bodyFormData.append('phone', this.state.phone);
        bodyFormData.append('number', this.state.OTP);
        return bodyFormData;
    }
    render() {
        return(
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={this.handleSubmit} method="post">
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Phone number:</label><br/>
                                        <input type="text" onChange={this.handleChange} id="phone"
                                               value={this.state.phone} className="form-control"/>
                                    </div>
                                    <div className="form-group" style={{display:  this.state.firstTime ? 'none' : 'block' }}>
                                        <label htmlFor="password" className="text-info">OTP:</label><br/>
                                        <input type="text" onChange={this.handleChange} id="OTP"
                                               value={this.state.OTP} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        {/*<label htmlFor="remember-me" className="text-info"><span>Remember me </span>*/}
                                        {/*    <span><input id="remember-me" onChange={this.check} name="remember-me"*/}
                                        {/*                 type="checkbox"/></span></label><br/>*/}
                                        <input type="submit" name="submit" className="btn btn-info btn-md"
                                               value="submit"/> &emsp;
                                        <button type="button" onClick={this.refresh} className="btn btn-success">
                                            Refresh token</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispachtoProps = (dispatch) => {
    return({
        login : () => dispatch(signin)
    })
}
export default connect(null, mapDispachtoProps)(Login);