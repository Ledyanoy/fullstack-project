import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom"
import SideDrawer from "./sideNavigation";
import {useDispatch, useSelector} from "react-redux";
import {showToast} from "../../utils/tools";
import {clearNotifications} from "../../store/actions";

const Header = (props) => {

    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notifications) {
            if (notifications.error) {
                const msg = notifications.msg ? notifications.msg : 'Some Error';
                showToast("ERROR", msg);
                dispatch(clearNotifications());
            }
            if (notifications.success) {
                const msg = notifications.msg ? notifications.msg : 'Success';
                showToast("SUCCESS", msg);
                dispatch(clearNotifications());
            }
        }

    }, [notifications, dispatch]);

    return (
        <>
            <nav className='navbar  fixed-top'>
                <Link style={{fontFamily: 'Fredoka One'}} to='/'
                      className='navbar-brand d-flex align-items-center'>FullStack</Link>
                <SideDrawer/>
            </nav>

        </>

    )
}

export default withRouter(Header)
