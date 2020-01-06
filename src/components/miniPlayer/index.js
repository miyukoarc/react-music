import * as React from "react";
import {Icon} from "antd";
import request from '../../api'

class MiniPlayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUrl: ''
        }
    }


    static getDerivedStateFromProps (next,prev){
        console.log(next, prev)
        if(next.songId){
            return {currentUrl:`https://music.163.com/song/media/outer/url?id=${next.songId}.mp3`}
        }else return null;
    }


    // componentWillReceiveProps(nextProps, nextContext) {
    //
    //     if(nextProps.songId!==this.props.songId){
    //         this.getSource(this.props.songId)
    //     }
    // }





    getSource(id){
        request.get('/song/url?id='+id)
            .then(res=>{
                return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
                // this.setState({
                //     currentUrl: `https://music.163.com/song/media/outer/url?id=${id}.mp3`
                // },()=>{console.log(this.state.currentUrl)})
            })
            .catch(err=>{
                alert(err)
            })
    }

    render (){
        const { songId } = this.props
        return (
            this.state.currentUrl?(
                <div style={{position:"sticky",bottom:'0px',backgroundColor:'#FFF',height:"80px"}}>
                    <span>{songId}</span>
                    <audio src={this.state.currentUrl} controls autoPlay/>
                </div>
                ):('')









        )
    }
}


class Drawer extends React.Component {
    constructor(props){
        super(props)
    }

    render (){
        return (
            <div />
        )
    }
}

export default MiniPlayer
