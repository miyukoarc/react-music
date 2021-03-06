import React from 'react'
import request from '../../api'
import { NavBar, Icon } from 'antd-mobile';
import './index.css'
import {withRouter} from "react-router";

class songDetail extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            detail: {
                al:{}
            },
            album: {}
        }


    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.getDetail(this.props.match.params.id)

    }

    getDetail (id){
        request.get('/song/detail?ids='+id).
        then(res=>{console.log(res)}).
        catch(err=>{alert(err)})

    }



    getSongDetail (){
        return new Promise((resolve, reject)=>{
            fetch('http://localhost:4000/song/detail?ids='+this.props.match.params.id)
                .then(res => res.json())
                .then(data => {
                    if(data.songs){
                        this.setState({
                            detail: {}
                        },()=>{
                            this.setState({
                                detail:this.state.detail=data.songs[0]
                            })
                        })
                    }

                    console.log(this.state.detail)
                })
                .catch(err => {
                    alert(err)
                })
            // resolve()
        })


    }

    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
        console.log(this.props)
    }



    render (){
        const { match, location, history } = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
            </div>
        )
    }
}


class AlbumImg extends React.Component {
    render (){
        return (
            <div className={'container'}>
                <div className={'album'}></div>
            </div>
        )
    }
}

export default songDetail
