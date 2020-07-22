import React from "react";
import {Link , NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {signin, signout} from "./redux/actions";

class NavBar extends React.Component{
    state = {
        searchKey: "",
    }
    componentDidMount() {
        if(localStorage.getItem("token"))
            this.props.login();
    }

    logout = () => {
        localStorage.clear();
        this.props.logout();
    }
    handleChange = (e) => {
        this.setState({
            searchKey : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.searchKey) {
            alert("Search Key:\n" + this.state.searchKey);
            this.setState({ searchKey : '' })
        }
    }
    render() {
        console.log(this.props);
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-warning">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand text-white" href="/"><i>Adrinsoft</i></a>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#">Authorized: {this.props.auth ? 'true' : 'false'}</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                        <input className="form-control mr-sm-2" id="search"
                               onChange={this.handleChange} value={this.state.searchKey} type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{display : this.props.auth ? 'none' : 'block'}}>
                            <Link className="nav-link" to="/login">
                                <i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
                        </li>
                        <li className="nav-item" style={{display : this.props.auth ? 'block' : 'none'}}>
                            <Link className="nav-link" to="" onClick={this.logout}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        auth: state.Auth.auth,
        // SS: state.Exmp
    }
}
const mapDispachtoProps = (dispatch) => {
    return({
        logout : () => dispatch(signout),
        login : () => dispatch(signin)
        })
}
export default connect(mapStatetoProps , mapDispachtoProps)(NavBar);