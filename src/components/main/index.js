import React from 'react'
import { NavBar, Icon, SearchBar, Drawer, ActivityIndicator, Carousel, WingBlank, Grid, Button,Tabs } from "antd-mobile";
import request from '../../api'
import './index.css'
import {withRouter} from "react-router";


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            banner: [],
            imgHeight: '176px',
            songsLists: []
        }

    }

    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    }

    componentDidMount() {
        this.bannerInit()
        this.personalInit()
    }

    handleSearch (val){
        return new Promise(((resolve, reject) => {
            this.props.getKeywords(val)
            resolve()

        })).then(res=>{
            this.props.history.push('/search')
        }).catch(err=>{
            alert(err)
        })


    }

    bannerInit (){
        request.get('/banner?type=1')
            .then(res => {
                if(res.banners){
                    this.setState({
                        banner: []
                    },()=>{
                        this.setState({
                            banner: [].concat(res.banners)
                        },()=>{
                            console.log(this.state.banner)
                        })

                    })
                }

            })
            .catch(err =>{
                alert(err)
            })
    }

    personalInit (){
        request.get('/personalized?limit=6')
            .then(res=>{
                this.setState({
                    songsLists: []
                },()=>{
                    this.setState({
                        songsLists: [].concat(res.result)
                    },()=>{
                        console.log(this.state.songsLists)
                    })

                })
            })
            .catch(err=>{
                alert(err)
            })
    }

    render (){

        const personalMenu = [
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                name: '每日推荐'
            },
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                name: '歌单'
            },
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                name: '排行榜'
            },
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                name: '电台'
            },
            {
                icon:'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                name: '私人FM'
            }
        ]
        const sidebar = (<div style={{width:'300px'}}>
            <ul>

                <li>登录</li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>)


        return (


            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.onOpenChange}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6' }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >

                    {/*<button onClick={()=>{this.props.getKeywords('牛逼')}}>提交</button>*/}

                    <SearchBar placeholder="Search" maxLength={8} onSubmit={value => this.handleSearch(value)}/>
                    <div>
                        <WingBlank size="md">
                            <Carousel
                                autoplay
                                infinite
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
                            >
                                {this.state.banner.map((item,index) => (
                                    <a
                                        key={index}
                                        href="http://www.alipay.com"
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={item.pic}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top',borderRadius: '5px' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div>
                        <WingBlank size="md">
                            <Grid data={personalMenu} columnNum={5}
                                  renderItem={dataItem => (<div style={{overflow:'hidden'}}>
                                      <img src={dataItem.icon} style={{ width: '36px', height: '36px',borderRadius:'50%'}} alt=""/>
                                      <div style={{color:'#888',fontSize:'12px',textAlign: 'center'}}>
                                          <span>{dataItem.name}</span>
                                      </div>
                                  </div>)}
                            />
                        </WingBlank>
                    </div>

                    <div className={'mt-1'}>
                        <WingBlank size="md">
                            <div className={'d-flex justify-content-between'}>
                                <span className={'h4'}>推荐歌单</span>
                                <div style={{height:'20px',lineHeight:'18px',padding:'0 5px',border:'1px solid #ddd',borderRadius: '10px'}}>
                                    <span style={{fontSize:'12px'}}>歌单广场</span>
                                </div>
                                {/*<Button style={{fontSize:'12px', display:'block',lineHeight:'20px',height:'24px',borderRadius:'10px',padding:'2px 5px',border:'1px solid #ddd'}}>歌单广场</Button>*/}
                            </div>
                        </WingBlank>
                    </div>

                    <div>
                        <WingBlank size="md">

                            <SongMenu data={this.state.songsLists}/>
                        </WingBlank>

                    </div>

                    <div>
                        <WingBlank size="md">
                            <NewTabs />
                        </WingBlank>
                    </div>

                </Drawer>




            </div>
        )
    }
}



class SongMenu extends React.Component {
    constructor(props){
        super(props)
    }
    render (){
        return (

            <ul style={{display:'flex',flexWrap:'wrap'}}>
                {
                    this.props.data.map((item,index)=>
                        <li key={index} style={{ width:'33.33%',position:'relative',top:'0',left:'0'}}>
                            <div style={{padding:'5px',width:'100%',}}>
                                <img style={{width:'100%',borderRadius:'4px'}} src={item.picUrl} alt=""/>
                            </div>
                            <div className={'px-1 font-size-12'} style={{width:'100%'}}>
                                {item.name}
                            </div>
                            </li>)
                }

            </ul>

        )
    }
}


class NewTabs extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            tab: '新歌'
        }

        this.changeTab = this.changeTab.bind(this)

    }

    changeTab (e){
        console.log(1,e.target.getAttribute('data-temp'))
        let src = e.target.getAttribute('data-temp');
        if(src==='normal-song'){
            this.setState({
                tab:'新歌'
            })
        }
        if(src==='normal-album'){
            this.setState({
                tab:'新碟'
            })
        }
    }





    render (){
        const tab = {
            fontSize:'12px',
            color: '#a6a6a6'
        }
        const tabActive ={
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: 700
    }

        return (
            <div>
                <div className={'mt-1'}>

                    <span data-temp="tiny-song" onClick={this.changeTab} style={tabActive} className={this.state.tab==='新歌'?'d-inline-block':'d-none'}>新歌</span>
                    <span data-temp="tiny-album" onClick={this.changeTab} style={tabActive} className={this.state.tab==='新碟'?'d-inline-block':'d-none'}>新碟</span>
                    &nbsp;|&nbsp;
                    <span data-temp="normal-song" onClick={this.changeTab} style={tab} className={this.state.tab==='新碟'?'d-inline-block':'d-none'}>新歌</span>
                    <span data-temp="normal-album" onClick={this.changeTab} style={tab} className={this.state.tab==='新歌'?'d-inline-block':'d-none'}>新碟</span>
                </div>
                <div>
                    <NewSongs tabState={this.state.tab}/>
                    <NewAlbum tabState={this.state.tab}/>
                </div>
            </div>
        )
    }
}

class NewSongs extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list: []
        }
    }

    componentWillMount() {
        this.getSongs()
    }

    getSongs (){
        request.get('/personalized/newsong')
            .then(res=>{console.log(res)
                this.setState({
                    list:[].concat(res.result)
                })
            })
            .catch(err=>{
                alert(err)
            })
    }

    render (){
        return (
            <ul className={this.props.tabState==='新歌'?'d-flex':'d-none'} style={{flexWrap:'wrap'}}>
                {
                    this.state.list.slice(0,3).map((item,index)=>
                        <li key={index} style={{ width:'33.33%',position:'relative',top:'0',left:'0'}}>
                            <div style={{padding:'5px',width:'100%',}}>
                                <img style={{width:'100%',borderRadius:'4px'}} src={item.picUrl+'?param=400y400'} alt=""/>
                            </div>
                            <div className={'px-1 font-size-12'} style={{width:'100%'}}>
                                {item.name}
                            </div>
                        </li>)
                }

            </ul>
        )
    }
}

class NewAlbum extends React.Component {
    constructor(props){
        super (props)
        this.state={
            list: []
        }
    }

    componentWillMount() {
        this.getAlbums()
    }

    getAlbums (){
        request.get('/top/album?offset=0&limit=3')
            .then(res=>{
                this.setState({
                    list:[].concat(res.albums)
                },()=>{
                    console.log(this.state.list)
                })
            })
            .catch(err=>{alert(err)})
    }

    render (){
        return (
            <ul className={this.props.tabState==='新碟'?'d-flex':'d-none'} style={{flexWrap:'wrap'}}>
        {
            this.state.list.map((item,index)=>
                <li key={index} style={{ width:'33.33%',position:'relative',top:'0',left:'0'}}>
                    <div style={{padding:'5px',width:'100%',}}>
                        <img style={{width:'100%',borderRadius:'4px'}} src={item.picUrl+'?param=400y400'} alt=""/>
                    </div>
                    <div className={'px-1 font-size-12'} style={{width:'100%'}}>
                        {item.name}
                    </div>
                </li>)
        }

    </ul>
        )
    }
}




export default withRouter(Home)