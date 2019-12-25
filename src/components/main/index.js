import React from 'react'
import { NavBar, Icon, SearchBar, Drawer, ActivityIndicator, Carousel, WingBlank, Grid } from "antd-mobile";
import request from '../../api'
import './index.css'


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

                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    Click upper-left corner
                </Drawer>

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
                                        style={{ width: '100%', verticalAlign: 'top' }}
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
                                  <img src={dataItem.icon} style={{ width: '48px', height: '48px'}} alt=""/>
                                  <div style={{color:'#888',fontSize:'12px'}}>
                                      <span>dataItem.name</span>
                                  </div>
                              </div>)}
                        ></Grid>
                    </WingBlank>
                </div>
                <div>
                    <WingBlank size="md">
                        <h4><span className={'bold'}>推荐歌单</span></h4>
                    </WingBlank>
                </div>
                <div>
                    <WingBlank size="md">
                        <Grid data={this.state.songsLists}
                              columnNum={3}
                              renderItem={dataItem => (
                                  <div style={{ overflow: 'hidden' }}>
                                      <img src={dataItem.picUrl} style={{ width: '75px', height: '75px' }} alt="" />
                                      <div style={{ color: '#888', fontSize: '12px', marginTop: '0px' }}>
                                          <span>{dataItem.name}</span>
                                      </div>
                                  </div>
                              )}
                        />
                    </WingBlank>





                </div>
            </div>
        )
    }
}

export default Home