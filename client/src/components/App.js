import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import CampgroundList from "./campgrounds/CampgroundList";
import CampgroundDetails from "./campgrounds/CampgroundDetails";
import ReservationForm from "./reservations/ReservationForm";
import AddCampground from "./campgrounds/AddCampground";
import Landing from "./Landing";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
                <BrowserRouter>
                    <div style={{ width: "100%", minHeight: "100vh" }}>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/campgrounds" component={CampgroundList} />
                        <Route path="/campgrounds/:id" component={CampgroundDetails} />
                        <Route path="/reserve/:campgroundId" component={ReservationForm} />
                        <Route path="/campgrounds/new" component={AddCampground} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);