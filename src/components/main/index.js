import React from 'react'
import { NavBar, Icon, SearchBar, Drawer, ActivityIndicator, Carousel, WingBlank, Grid, Button,Tabs } from "antd-mobile";
import request from '../../api'
import './index.css'
import {tsThisType} from "@babel/types";


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
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    componentDidMount() {
        this.bannerInit()
        this.personalInit()
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
        const sidebar = (<div>
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
                    onLeftClick={() => this.onOpenChange}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>

                {/*<Drawer*/}
                {/*    className="my-drawer"*/}
                {/*    style={{ minHeight: document.documentElement.clientHeight }}*/}
                {/*    enableDragHandle*/}
                {/*    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}*/}
                {/*    sidebar={sidebar}*/}
                {/*    open={this.state.open}*/}
                {/*    onOpenChange={this.onOpenChange}*/}
                {/*>*/}
                {/*    Click upper-left corner*/}
                {/*</Drawer>*/}

                <SearchBar placeholder="Search" maxLength={8} />
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
                        {/*<Grid data={this.state.songsLists}*/}
                        {/*      columnNum={3}*/}
                        {/*      renderItem={dataItem => (*/}
                        {/*          <div style={{ overflow: 'hidden' }}>*/}
                        {/*              <img src={dataItem.picUrl} style={{ width: '108px', height: '108px', borderRadius:'4px' }} alt="" />*/}
                        {/*              <div style={{ color: '#888', fontSize: '12px', marginTop: '0px' }}>*/}
                        {/*                  <span>{dataItem.name}</span>*/}
                        {/*              </div>*/}
                        {/*          </div>*/}
                        {/*      )}*/}
                        {/*/>*/}
                        <SongMenu data={this.state.songsLists}/>
                    </WingBlank>

                </div>

                <div>
                    <WingBlank size="md">
                        <NewTabs />
                    </WingBlank>
                </div>


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

        // this.changeTab = this.changeTab.bind(this)
    }

    changeTab(){
        console.log(1)
        // this.setState({
        //     tab:val
        // })
    }



    render (){
        const tab = {
            fontSize:'12px',
            color: '#ddd'
        }
        const tabActive ={
            fontSize: '16px',
            color: '#000'
        }

        return (
            <div>
                <div>
                    <button onClick={this.changeTab.bind(this)}>实验</button>
                    <span style={this.state.tab=='新歌'?tab:tabActive} >新歌</span>
                    <span className={this.state.tab=='新碟'?tab:tabActive}>新碟</span>
                </div>
                <div>
                    <div>这里是新歌列表</div>
                    <div>这里是新碟列表</div>
                </div>
            </div>
        )
    }
}




export default Home