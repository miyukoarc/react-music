import React from 'react'
// import { Row, Col } from 'antd';
import { Button } from 'antd';

class Welcome extends React.Component {
    constructor (props){
        super(props)

        this.state = {
            list: []
        }
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick (){
        // console.log(1)
        fetch('https://10.10.10.234:8080/token?page=0&size=20')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({list:data})
        })
        .catch(err => alert(err))
    }

    render (){
        return (
            <div>
                <span>欢迎</span>
                <Button type="primary" onClick={this.handleClick}>Primary</Button>
                <List list={this.list}></List>

            </div>
        )
    }
}

class List extends React.Component {
    constructor (props){
        super (props)
    }

    render (){
        return (
            <ul>
            {
    (this.props.list||[]).map((item, index) => <li key={index}>{item.name}</li>)
            }
        </ul>
        )
        
    }
}

export default Welcome