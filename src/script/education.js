require("../style/education.scss")

import React from "react"
import ReactDOM from "react-dom"

import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from "react-router"

import { Provider } from "react-redux"
import { store } from "./redux/store"

import layoutHome from "./components/layout/layoutHome"
import teacherHomePage from "./components/member/teacherHomePage"
import resource from "./components/resource/resource"
import teacherCourseList from "./components/teacherCourse/teacherCourseList"
import evaluateManageTea from "./components/evaluateManageTea/evaluateManageTea"
import community from "./components/community/community"
import uploadRes from "./components/resource/uploadRes"
import resDetail from "./components/resource/resDetail"

ReactDOM.render(
		<Provider store={store}>
    		<Router history={hashHistory}>
      			<Route path="/" component={layoutHome}>
        				<IndexRedirect to="/teacherHomePage"></IndexRedirect>
        				<Route path="teacherHomePage" title="教师个人主页" component={teacherHomePage}></Route>
        				<Route path="resource" title="资源列表 " component={resource}></Route>
        				<Route path="teacherCourseList" title="课程中心" component={teacherCourseList}></Route>
        				<Route path="evaluateManageTea" title="测评管理" component={evaluateManageTea}></Route>
        				<Route path="community" title="社区首页" component={community}></Route>
        				<Route path="resource/uploadRes" title="上传资源" component={uploadRes}></Route>
        				<Route path="resource/resDetail/:id" title="资源详情" component={resDetail}></Route>
      			</Route>
    		</Router>
  	</Provider>,
  	
  	document.getElementById("root")
)