import React from 'react'
// import { Row, Col } from 'antd';
import { Button } from 'antd';

class Welcome extends React.Component {
    constructor (props){
        super(props)
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick (){
        console.log(1)
    }

    render (){
        return (
            <div>
                <Button type="primary" onClick={this.handleClick}>Primary</Button>
                <span>欢迎</span>
            </div>
        )
    }
}

export default Welcome