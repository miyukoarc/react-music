import React from 'react'
import { Input, List, Typography } from 'antd'

const { Search } = Input

class SearchModel extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            songList: []
        }
    }

    handleSearch(value){
        console.log(value)

        fetch('http://localhost:4000/search?keywords='+value)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            alert(err)
        })
    }


    goDetail (id){
        this.props.history.push( `/songDetail/${id}`)
    }

    render (){
        return (
            <div>
                <Search placeholder="input search text" onSearch={value=>this.handleSearch(value)} enterButton />
                <List
                    bordered
                    dataSource={this.state.songList}
                    renderItem={(item,index) => (
                        <List.Item onClick={this.goDetail.bind(this,item.id)}>
                            <Typography.Text>{index+1}.</Typography.Text> {item.name}
                        </List.Item>
                    )}
                />
            </div>
            
        )
    }
}

export default SearchModel

