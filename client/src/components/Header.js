import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
    renderContent(){
        if(this.props.data.auth === null){
            return;
        }else if(this.props.data.auth === false){
            return (

                <li>
                    <a href="/auth/google">Login With Google</a>
                </li>
            );
        }else{
            return [
                <li key="1"><Payments /></li>,
                <li key="2" style={{margin:"0 10px"}}>Credits: {this.props.data.auth.credits}</li>,
                <li key="3">
                    <a href="/api/logout">Logout</a>
                </li> 
            ];
        }
    }

    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link to={this.props.data.auth ? '/surveys' : '/'} className="left brand-logo">Emaily</Link>
                        <ul id="nav-mobile" className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(auth){
    return { data: auth };
}


export default connect(mapStateToProps)(Header);