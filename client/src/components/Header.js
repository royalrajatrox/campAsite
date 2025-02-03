import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './payments';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;

            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="2" style={{ margin: '0 15px', fontSize: "1.2rem", fontWeight: "bold" }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3">
                        <a href="/api/logout" style={styles.navLink}>Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav style={styles.navbar}>
                <div className="nav-wrapper" style={styles.navWrapper}>
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        style={styles.brandLogo}
                    >
                        CampAsite
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const styles = {
    navbar: {
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",  // Gradient effect
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",  // Soft shadow
        height: "80px",  // Increased height
        display: "flex",
        alignItems: "center"
    },
    navWrapper: {
        width: "90%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    brandLogo: {
        fontSize: "2rem",  // Larger font size
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",  // Text shadow for better visibility
        letterSpacing: "1.5px",
    },
    navLink: {
        fontSize: "1.2rem",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "5px",
        transition: "0.3s ease-in-out",
    }
};

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
