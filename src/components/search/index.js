import React from 'react'

import request from '../../api'

import { Input, List, Typography,message, PageHeader } from 'antd'

import { NavBar, Icon, SearchBar } from "antd-mobile";


const { Search } = Input

// const error = () => {
//     message.error('This is an error message')
// }

class SearchModel extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            songList: []
        }
    }

    handleSearch(value){
        request.get('/search?keywords='+value)
            .then(res=> {
                this.setState({
                    songList: []
                },() => {
                    this.setState({
                        songList: this.state.songList.concat(res.result.songs)
                    })
                })
            })
            .catch(err=>{
                alert(err)
            })

        // fetch('http://localhost:4000/search?keywords='+value)
        // .then(res => res.json())
        // .then(data => {
        //     this.setState({
        //         songList: []
        //     },() => {
        //         this.setState({
        //             songList: this.state.songList.concat(data.result.songs)
        //         })
        //     })
        //     console.log(data)
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    backPage (){
        console.log(this.props.history)
        this.props.history.goBack()
    }


    goDetail (id){
        this.props.history.push( `/songDetail/${id}`)
    }

    checkAccess (id){
        request.get(`/check/music?id=${id}`)
            .then(res => {
                if(res.success){
                    this.goDetail(id)
                }else {
                    message.error(res.message, 2)
                }
            })
    }

    render (){
        return (
            <div>

                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
                <SearchBar placeholder="Search" maxLength={8} onSubmit={value => this.handleSearch(value)}/>

                <Search placeholder="input search text" size="large" onSearch={value=>this.handleSearch(value)} enterButton />

                {
                    this.state.songList?  <List
                    bordered
                    dataSource={this.state.songList}
                    renderItem={(item,index) => (
                    <List.Item onClick={this.checkAccess.bind(this,item.id)}>
                        <Typography.Text>{index+1}.</Typography.Text> {item.name}
                    </List.Item>
                )}
                    />:<div></div>
                }
            </div>
            
        )
    }
}

export default SearchModel

