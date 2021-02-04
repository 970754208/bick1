import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from '../../axios/axios'

export default class BikeMap extends Component {
    state = {}
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            width: 80,
            list: [
                {id: 0, name: '全部'},
                {id: 1, name: '北京'},
                {id: 2, name: '上海'},
                {id: 3, name: '重庆'},
                {id: 4, name: '成都'},
            ]
        },
        {
            type: '起止时间',
            label: '订单时间',
            field: 'time',
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'state',
            width: 80,
            placeholder: '全部',
            list: [
                {id: 1, name: '进行中'},
                {id: 2, name: '行程结束'}
            ]
        }
    ]

    filterSubmit = (params) => {
        console.log(params)
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        axios.ajax({
            url: 'map/bikeMap',
            data: {
                params: {
                    isShowLoading: true
                }
            },
            isMock: true
        }).then(res => {
            if(res.code === 0) {
                // console.log(res.result)
                let { total_count } = res.result;
                this.setState({
                    total_count
                })
                this.renderMap(res.result)
            }
        })
    }

    renderMap = (result) => {
        this.map = new window.BMapGL.Map("container",{enableMapClick: false});
        let { bike_list, route_list, service_list } = result;

        // 绘制地图
        let start = route_list[0].split(',');
        let startPoint = new window.BMapGL.Point(start[0], start[1]);

        let end = route_list[route_list.length-1].split(',');
        let endPoint = new window.BMapGL.Point(end[0], end[1]);
        this.map.centerAndZoom(endPoint, 11);
        this.map.enableScrollWheelZoom(true);

        // 比例尺控件
        let scaleCtrl = new window.BMapGL.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        })
        this.map.addControl(scaleCtrl)

        // 缩放控件
        let zoomCtrl = new window.BMapGL.ZoomControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        })
        this.map.addControl(zoomCtrl)

        // 绘制起止位置
        let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let startMarker = new window.BMapGL.Marker(startPoint, {icon: startIcon});
        this.map.addOverlay(startMarker)

        let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let endMarker = new window.BMapGL.Marker(endPoint, {icon: endIcon});
        this.map.addOverlay(endMarker)

        // 绘制路线图
        const trackBike = [];
        route_list.forEach(item => {
            let point = item.split(',');
            trackBike.push(new window.BMapGL.Point(point[0], point[1]))
        })
        // console.log(trackBike)
        const polyline = new window.BMapGL.Polyline(trackBike, {
            strokeColor: '#09f',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyline);

        // 绘制服务区
        const serviceArea = [];
        service_list.forEach(item => {
            serviceArea.push(new window.BMapGL.Point(item.lon, item.lat));
        })
        const polyGon = new window.BMapGL.Polygon(serviceArea, {
            strokeColor: '#ee0000',
            strokeWeight: 3,
            fillColor: '#aa0000',
            fillOpacity: .3
        })
        this.map.addOverlay(polyGon);

        // 绘制单车位置
        const bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        bike_list.forEach(item => {
            let _point = item.split(',');
            let point = new window.BMapGL.Point(_point[0], _point[1]);
            // console.log(point)
            let bikeMarker = new window.BMapGL.Marker(point, {icon: bikeIcon})
            this.map.addOverlay(bikeMarker);
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit} />
                </Card>
                <Card style={{marginTop: 10}}>
                    <span>共{this.state.total_count}辆车</span>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        )
    }
}
