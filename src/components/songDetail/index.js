import React from 'react'
import request from '../../api'
import { NavBar, Icon } from 'antd-mobile';

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
        // this.getSongDetail()
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



    render (){
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
            </div>
        )
    }
}

export default songDetail