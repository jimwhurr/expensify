import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// remember - when destructuring can change names, see component -> Component, rest is 'the rest'
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
    }) => (

    <Route {...rest} component={ (props) => (
        isAuthenticated ? (
            <Redirect to='/dashboard' />
        )
        : (
            <Component {...props} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid       // remember !! flips un/defined to false/true
});

export default connect(mapStateToProps)(PublicRoute);