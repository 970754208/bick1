import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './Admin'
import Common from './Common'
import Home from './pages/home'
import Buttons from './pages/ui/Buttons'
import Modal from './pages/ui/Modals'
import Loadings from './pages/ui/Loadings'
import Notice from './pages/ui/Notice'
import Messages from './pages/ui/Messages'
import Tabs from './pages/ui/Tabs'
import Gallery from './pages/ui/Gallery'
import Carousel from './pages/ui/Carousel'
import FormLogin from './pages/form/Login'
import Register from './pages/form/Register'
import BasicTable from './pages/table/BasicTable'
import HighTable from './pages/table/HighTable'
import City from './pages/city/City'
import Order from './pages/order'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/BikeMap'
import Bar from './pages/echarts/Bar'
import Pie from './pages/echarts/Pie'
import Line from './pages/echarts/Line'
import NoMatch from './pages/nomatch'

export default class ERouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" exact component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route path="/admin/ui/modals" component={Modal} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/reg" component={Register} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route path="/admin/user" component={User} />
                                <Route path="/admin/bikeMap" component={BikeMap} />
                                <Route path="/admin/charts/bar" component={Bar} />
                                <Route path="/admin/charts/pie" component={Pie} />
                                <Route path="/admin/charts/line" component={Line} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    } />
                </App>
            </Router>
        )
    }
}
