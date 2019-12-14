import React from 'react'
import { Row, Col } from 'antd'

class Login extends React.Component {
    render (){
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <input type="text"/>
                    </Col>
                    <Col span={12}>
                        <button>登录</button>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default Login