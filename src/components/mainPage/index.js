import * as React from "react";
import {Button} from "antd";

class MainPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isAgree: false
        }
    }
    render (){
        return (
            <div className={'position-absolute'} style={{textAlign:'center',width:'100%',height: 'auto',bottom:'0'}}>
                <div className={'px-5 mx-5'}>


                    <Button block shape="round" size={'large'}>
                        <span className={'font-size-14 px-5'}>手机号登录</span>
                    </Button>

                    <div className={'mt-1'}></div>

                    <Button block shape="round" size={'large'}>
                        <span className={'font-size-14 px-5'}>立即体验</span>
                    </Button>


                </div>


            </div>
        )
    }
}

export default MainPage