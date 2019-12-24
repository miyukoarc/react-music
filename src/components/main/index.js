import React from 'react'
import { NavBar, Icon, SearchBar, ActivityIndicator, Carousel, WingBlank } from "antd-mobile";
import request from '../../api'


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            banner: [],
            imgHeight: '176px'
        }

    }

    componentDidMount() {
        this.bannerInit()
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
                        })
                        console.log(this.state.banner)
                    })
                }

            })
            .catch(err =>{
                alert(err)
            })
    }

    render (){
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
                <SearchBar placeholder="Search" maxLength={8} />
                <div>
                    {/*<ActivityIndicator*/}
                    {/*    toast*/}
                    {/*    text="Loading..."*/}
                    {/*    animating={this.state.banner}*/}
                    {/*/>*/}
                    <WingBlank>
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
            </div>
        )
    }
}

export default Home