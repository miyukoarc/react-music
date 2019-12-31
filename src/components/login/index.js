import React from 'react'
import { Row, Col, Button, Input,List, Typography } from 'antd'
import { connect } from 'react-redux'

const { Search } = Input

class Login extends React.Component {
    constructor(props){
        super(props)
        // this.handleApply = this.hanldeApply.bind(this)
        this.state = {
            songList: [
                {
                    name: '12'
                },
                {
                    name: '23'
                }
            ],
            albumArr: [],
            
        }
    }

    componentDidMount(){
        console.log(1)
        console.log(this.props)
    }


    handleSearch (value){
        fetch('http://localhost:4000/search?keywords='+value,
        {
            method:'GET'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                songList: []
            },()=>{
                this.setState({
                    songList:this.state.songList.concat(data.result.songs)
                })
            })
            
            console.log(this.state.songList)
        })
        .catch(err => alert(err))
    }

    goDetail (id){
        this.props.history.push({pathname: '/songDetail/'+id,state:{id:id}})
        // fetch('http://localhost:4000/song/detail?ids='+id,{method: 'GET'})
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data.songs)
        // })
        // .catch(err => {
        //     alert(err)
        // })
    }
    
     

    handleApply(){
        console.log(1)
     }   

    render (){
        const { PayIncrease, PayDecrease, PayAny } = this.props
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
                    <Row>{this.props.count}</Row>
                <Row>
                    <Button onClick={PayIncrease}>增加</Button>
                </Row>
                <Row>
                    <Button onClick={PayDecrease}>减少</Button>
                </Row>
                <Row>
                    <input type="text" ref="myInput"/>
                    <Button onClick={this.handleApply.bind(this)}>提交</Button>
                </Row>
                <Row>
                <Search placeholder="input search text" onSearch={value=>this.handleSearch(value)} enterButton />
                </Row>

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
/**
 * 
 */
    //需要渲染什么数据
    function mapStateToProps(state) {
        return {
        count: state
        }
    }
    //需要触发什么行为
    const mapDispatchToProps = (dispatch)=>{
        return {
        PayIncrease: () => dispatch({ type: 'plus' }),
        PayDecrease: () => dispatch({ type: 'minus' }),
        PayAny: (num) => dispatch({ type: 'any', num:num})
        }
    }


export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)