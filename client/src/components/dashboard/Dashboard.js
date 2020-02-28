import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center-align">
                <h4>
                    <b>Hello,</b> {user.name.split(" ")[0]}
                    <p>
                      you have successfully logged in MERN login app
                    </p>
                </h4>
            <button
              onClick={this.onLogoutClick}
              className="btn bg-primary waves-effect"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser })(Dashboard);