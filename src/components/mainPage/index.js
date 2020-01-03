import * as React from "react";
import {Button} from "antd";
import {withRouter} from "react-router";

class MainPage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isAgree: false
        }
    }

    phoneLogin (){
        this.props.history.push('/signIn')
    }

    LoginLater (){
        this.props.history.push('/welcome')
    }

    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
        console.log(this.props)
    }

    render (){
        return (
            <div className={'position-absolute'} style={{textAlign:'center',width:'100%',height: 'auto',bottom:'200px'}}>
                <div className={'px-5 mx-5'}>


                    <Button block shape="round" size={'large'} onClick={()=>this.phoneLogin()}>
                        <span className={'font-size-14 px-5'}>手机号登录</span>
                    </Button>

                    <div className={'mt-1'}>&nbsp;</div>

                    <Button block shape="round" size={'large'} onClick={()=>{this.LoginLater()}}>
                        <span className={'font-size-14 px-5'}>立即体验</span>
                    </Button>


                </div>


            </div>
        )
    }
}

export default withRouter(MainPage)
