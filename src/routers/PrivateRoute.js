import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// remember - when destructuring can change names, see component -> Component, rest is 'the rest'
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
    }) => (

    <Route {...rest} component={ (props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        )
        : (
            <Redirect to='/' />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid       // remember !! flips un/defined to false/true
});

export default connect(mapStateToProps)(PrivateRoute);