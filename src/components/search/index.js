import React from 'react'
import { Row, Col, Button, Input } from 'antd'

const { Search } = Input

class Search extends React.Component {
    constructor(props){
        super(props)

    }

    handleSearch(value){
        console.log(value)
    }

    render (){
        return (
            <Search placeholder="input search text" onSearch={this.handleSearch.bind(this,value)} enterButton />
        )
    }
}