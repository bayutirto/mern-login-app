import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history); 

    };

render() {
    const { errors } = this.state;
return (

      <div className="signup-box">
        <div className="logo">
          <Link to="/">MERN<b> Login App</b></Link>
          <small>Create your app with this login starter app</small>
        </div>
        <div className="card">
          <div className="body">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="msg">Register a new account</div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="material-icons">person</i>
                </span>
                <div className="form-line">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    }, "form-control")}
                    placeholder="Full name"
                  />
                  <span className="col-pink">{errors.name}</span>
                </div>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="material-icons">email</i>
                </span>
                <div className="form-line">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    }, "form-control")}
                    placeholder="Email Address"
                  />
                  <span className="col-pink">{errors.email}</span>
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
                      invalid: errors.password
                    }, "form-control")}
                    placeholder="Password"
                  />
                  <span className="col-pink">{errors.password}</span>
                </div>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="material-icons">lock</i>
                </span>
                <div className="form-line">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    }, "form-control")}
                    placeholder="Confirm Password"
                  />
                  <span className="col-pink">{errors.password2}</span>
                </div>
              </div>
              <div className="form-group">
                
              </div>
              <button className="btn btn-block btn-lg bg-pink waves-effect" type="submit">SIGN UP</button>
              <div className="m-t-25 m-b--5 align-center">
                <Link to="/login">You already have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser })(withRouter(Register));