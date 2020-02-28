import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
class Login extends Component {
    constructor() {
        super();
        this.state = {
        email: "",
        password: "",
        errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

    const userData = {
        email: this.state.email,
        password: this.state.password
        };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;
    return (
        
        <div className="login-box">
        <div className="logo">
            <Link to="/">MERN<b> Login App</b></Link>
            <small>Create your app with this login starter app</small>
        </div>
        <div className="card">
            <div className="body">
            <form noValidate onSubmit={this.onSubmit}>
                <div className="msg">Sign in to start your session</div>
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="material-icons">person</i>
                </span>
                <div className="form-line">
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                        }, "form-control")}
                        placeholder="Email"
                    />
                    <span className="col-pink"> 
                        {errors.email}
                        {errors.emailnotfound}
                    </span>
                </div>
                </div>
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                </span>
                <div className="form-line">
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                        }, "form-control")}
                        placeholder="Password"
                    />
                    <span className="col-pink">
                        {errors.password}
                        {errors.passwordincorrect}
                    </span>
                </div>
                </div>
                <div className="row">
                <div className="col-xs-8 p-t-5">
                </div>
                <div className="col-xs-4">
                    <button className="btn btn-block bg-pink waves-effect" type="submit">LOG IN</button>
                </div>
                </div>
                <div className="row m-t-15 m-b--20">
                <div className="col-xs-6">
                    <Link to="/register">Register Now!</Link>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>

        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser })(Login);