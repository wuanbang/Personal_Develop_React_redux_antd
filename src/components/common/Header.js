/**
 * 组件： Header
 * 时间： 2018-05-26
 */
import React, { PropTypes, Component } from 'react'
import {browserHistory} from 'react-router'
import {is, fromJS} from 'immutable';
import '../common/style/header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.onSearchText = this.onSearchText.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.getNavDateDom = this.getNavDateDom.bind(this); 
        this.state={
            value: "",
            currentIndex: 0, // 值保存router index值
            navData: [
                {text: "首 页", href: "/"}, 
                {text: "精 选", href: "/selection"}, 
                {text: "分 类", href: "/category"},
                {text: "书 单", href: "/booklist"}, 
                {text: "排行榜", href: "/rank"}, 
                {text: "客户端", href: "/download"}
            ]
        }
    }

    // 获取当前 router index 值保存router index值。
    componentDidMount() {
        this.unlisten = browserHistory.listen(location => {
            let dataIndex = this.state.navData.findIndex((value, index, arr) => {
                return value.href == location.pathname;
            });
            console.log(dataIndex, "dataIndex")
            this.setState({currentIndex: dataIndex});
        })
    }

    // 解绑组件
    componentWillUnmount() {
        //注销路由监听
        this.unlisten();
    }

    /** 
    * 优化
    * @param nextProps props更改之后值
    * @param nextState state更改之后值 
    */
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    // 获取搜索框内容
    onSearchText(event) {
        this.setState({
            value: event.target.value
        });
    }

    // 点击搜索按钮
    handleClickSearch(type, value) {
        if (type && value) {
            browserHistory.push({
                pathname: value.href
            });
        } else {
            browserHistory.push({
                pathname: '/search',
                state: {
                    text: this.state.value
                }
            });
        }
    }

    // 获取 nav 内容的展示内容
    getNavDateDom() {
        let nav_Date = this.state.navData;
        return nav_Date.map((value, index) => {
            return <li 
                        key={index} 
                        className={index === this.state.currentIndex ? "nav-cell active" : "nav-cell"}
                    >
                        <a onClick={() => this.handleClickSearch(true, value)}>{value.text}</a>
                    </li>
        })
    }

    render() {
        return (
            <div>
                <header className="c-full-header">
                    <div className="brand">
                        <div className="container clearfix">
                            <a href="/">
                                <img 
                                    src={require('./images/icon/logo.png')} 
                                    alt="追书神器" 
                                    className="logo"
                                />
                            </a>
                            <div className="search">
                                <input 
                                    onChange={(e) => this.onSearchText(e)} 
                                    className="search-input"
                                    value={this.state.value} 
                                    type="text"
                                    placeholder="搜索书名或作者"
                                />
                                <a 
                                    id="search-btn" 
                                    className="search-btn" 
                                    onClick={this.handleClickSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="nav">
                        <div className="container">
                            <ul className="nav-cells">
                                {this.getNavDateDom()}
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;