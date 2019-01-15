// Highere Order Component (HOC)
// Renders other components enabling reusability, render hijacking, prop 
// manipulation and abstract state.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    // use the spread operator to pass props on to wrapped component
    return (props) => (
        <div>
            { props.isAdmin && <p><b>MEDICAL IN-CONFIDENCE</b></p> }
            <WrappedComponent {...props}/>
        </div>
    );
};

// requireAuthentication - false = challenge, true = display info
const requireAuthentication = (WrappedComponent) => {
    // use the spread operator to pass props on to wrapped component
    return (props) => (
        <div>
            { (props.isAuthenticated) ? <WrappedComponent {...props}/> : <h3>Please Logon</h3> }
        </div>
    );
};


const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="This is the detail"/>, document.ge
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the detail"/>, document.getElementById('app'));