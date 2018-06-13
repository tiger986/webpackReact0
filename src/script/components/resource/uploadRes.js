import React from "react"
import $ from "jquery"
import fetchData from "../../util/util.fetch.js"

class uploadRes extends React.Component {
	constructor (props) {
        super(props)
        this.state = {
        	resExpand: 1,
        	resTypeOption: [<sapn/>],
        	resGradeOption: [<sapn/>],
        	resSubjectOption: [<sapn/>],
        	resEditionOption: [<sapn/>],
			resType: "",
			resGrade: "",
			resSubject: "",
			resEdition: "",
			resChapter: "",
			chapterText: "请选择章节",
			chapterFlag: 0,
			chapterCon: [<sapn/>],
			sectionCon: [<sapn/>],
			sectionIdArr: [],
			sectionTitleArr: [],
			sectionTitle: ""
        }
    }
		
	
	resExpand = (type) => {
		this.setState({
			resExpand: type
		})
	}
	
	selectChange = (name) => {
		if(name == "type"){
			this.setState({
				resType: $(".uploadResUp_info_resType").find("option:selected").val()
			})
		}else if(name == "grade"){
			this.setState({
				resGrade: $(".uploadResUp_info_resGrade").find("option:selected").val()
			})			
			$(".uploadResUp_info_resSubject").val("0")
		}else if(name == "subject"){
			this.setState({
				resSubject: $(".uploadResUp_info_resSubject").find("option:selected").val()
			})			
			$(".uploadResUp_info_resEdition").val("0")
		}else if(name == "edition"){
			this.setState({
				resEdition: $(".uploadResUp_info_resEdition").find("option:selected").val(),
				chapterText: "请选择章节"
			})			
		}		
	}
	
	chooseChapter = () => {
		if(this.state.chapterFlag){
			this.setState({
				chapterFlag: 0
			})
		}else{
			let chapterUrl = "/api/resource/getResChapters"
			let chapterHeaders = {"Accept": "application/json", "Content-Type": "application/json"}
			let chapterBody = JSON.stringify({gradeId: this.state.resGrade, subjectId: this.state.resSubject,  editionId: 1})
		    fetchData(chapterUrl, "POST", "", chapterHeaders, chapterBody, function (res) {
		    	let chapterLis 
		    	if(res.data.length){
			      	chapterLis = res.data.map(val => {
			        	return (<div id = { val.id } className = "chooseChapter_unit_left_div"  onClick = { this.chooseUnit.bind(this, val.id, val.title) }>
	                        <span>{ val.title }</span>
	                        <b> 》</b>
	                    </div>)			        	
			      	})
		        }else{
		        	chapterLis = <div className="chooseChapter_unit_p">请选择章节</div>
		        }
		      	this.setState({
		        	chapterFlag: 1,
		        	chapterCon: chapterLis
		      	})
		    }.bind(this))
		}
	}
	
	chooseUnit = (id, title) => {
		this.setState({
			sectionCon: [<span/>]
		})
		$("#" + id).addClass("chooseChapter_unit_left_activ").siblings().removeClass("chooseChapter_unit_left_activ")
		$(".timeImg").removeClass("hide")
		$(".chooseChapter_unit_right_section").find("b").css("color", "#FFFFFF")
		let chapterUrl = "/api/resource/getResChapters"
		let chapterHeaders = {"Accept": "application/json", "Content-Type": "application/json"}
		let chapterBody = JSON.stringify({gradeId: this.state.resGrade, subjectId: this.state.resSubject,  editionId: 1})
		fetchData(chapterUrl, "POST", "", chapterHeaders, chapterBody, function (res) {
		    let sectionLis
		    res.data.forEach(function(item){
		    	if(item.id == id){
		    		if(item.node.length){
		    			$(".timeImg").addClass("hide")
		    			sectionLis = item.node.map(val => {
				        	return (<div id = { val.id } className = "chooseChapter_unit_right_section" onClick = {this.chooseSection.bind(this, val.id, val.title)}>
	                            <span>{ val.title }</span>
	                            <b> √ </b>
	                        </div>)			        	
				      	})
		    		}
		    	}
		    }.bind(this))
		    this.setState({
		        resChapter: id,
		        chapterText: title,
		        sectionCon: sectionLis,
		        sectionTitle: "",
		        sectionIdArr: [],
		    	sectionTitleArr: [],
		    })
		}.bind(this))
	}
	
	chooseSection = (id, title) => {
		let idArr = this.state.sectionIdArr
		let titleArr = this.state.sectionTitleArr
		let num = $.inArray(id, idArr)
		if(num == -1){
			idArr.push(id)
			titleArr.push(title)
			$("#" + id).find("b").css("color", "#209EEA")
		}else{
			idArr.splice(num, 1)
			titleArr.splice(num, 1)
			$("#" + id).find("b").css("color", "#FFFFFF")
		}		
		this.setState({
			sectionTitle: " " + titleArr.join(" "),
		    sectionIdArr: idArr,
		    sectionTitleArr: titleArr		    
		})
	}
	
	
  	render() {
    	return (
			<div className="uploadResBox">
			    
			    <div className = "uploadResUp">
			    	<div className = "uploadResUp_head">发布资源</div>
			    	<div className = "uploadResUp_info">
			    		<div className = "uploadResUp_info_title">拓展资源</div>
			    		<div className = "uploadResUp_info_resExpand">
			    			<input type="radio" name="isexpand" value="1" checked = { this.state.resExpand == 1 ? "checked" : "" } onClick = { this.resExpand.bind(this, 1) } />
			    			<span>NO</span>
			    			<input type="radio" name="isexpand" value="2" checked = { this.state.resExpand == 2 ? "checked" : "" } onClick = { this.resExpand.bind(this, 2) } />
			    			<span>YES</span>
			    		</div>
			    	</div>
			    	<div className = "uploadResUp_info">
			    		<div className = "uploadResUp_info_title">资源类型</div>
			    		<select className = "uploadResUp_info_resType uploadResUp_info_select" onChange = { this.selectChange.bind(this, "type") }>
			    			<option disabled value = "0">请选择类型</option>
			    			{ this.state.resTypeOption }
			    		</select>
			    	</div>
			    	<div className = "uploadResUp_info">
			    		<div className = "uploadResUp_info_title">资源标签</div>
			    		<select className = "uploadResUp_info_resGrade uploadResUp_info_select" onChange = { this.selectChange.bind(this, "grade") }>
			    			<option disabled value = "0">请选择年级</option>
			    			{ this.state.resGradeOption }
			    		</select>
			    		<select className = { this.state.resExpand == 1 ? "uploadResUp_info_resSubject uploadResUp_info_select" : "hide" } onChange = { this.selectChange.bind(this, "subject") }>
			    			<option disabled value = "0">请选择学科</option>
			    			{ this.state.resSubjectOption }
			    		</select>
			    		<select className = { this.state.resExpand == 1 ? "uploadResUp_info_resEdition uploadResUp_info_select" : "hide" } onChange = { this.selectChange.bind(this, "edition") }>
			    			<option disabled value = "0">请选择版本</option>
			    			{ this.state.resEditionOption }
			    		</select>
			    	</div>
			    	<div className = { this.state.resExpand == 1 ? "uploadResUp_info" : "hide" }>
			    		<div className = "uploadResUp_info_title chapter">章节</div>
			    		<div className = "chooseChapter_box">
	                        <div className = "chooseChapter" onClick = { this.chooseChapter.bind(this) }>
	                        	{ this.state.chapterText }
	                        	{ this.state.sectionTitle}
	                        </div>
	                        <div className = { this.state.chapterFlag ? "chooseChapter_unit" : "hide" }>
	                            <div className = "chooseChapter_unit_left">
	                            	{ this.state.chapterCon }
	                            </div>
	                            <div className = "chooseChapter_unit_right">
	                            	{ this.state.sectionCon }
	                            	<div className = "timeImg hide"></div>
	                            </div>
	                        </div>
                        </div>
			    	</div>
			    </div>
			    
			</div>
    	)
  	}
  	
  	
  	componentDidMount() {
	    let getResSelectUrl = "/api/resource/getResSelects"
	    fetchData(getResSelectUrl, "POST", "", {}, "", function (res) {
	      	let resType = res.data.type.map(val => {
	        	return (<option value = { val.id }>{ val.text }</option>)
	      	})
	      	let resGrade = res.data.grade.map(val => {
	        	return (<option value = { val.id }>{ val.gradeName }</option>)
	      	})
	      	let resSubject = res.data.subject.map(val => {
	        	return (<option value = { val.id }>{ val.subjectName }</option>)
	      	})
	      	let resEdition = res.data.edition.map(val => {
	        	return (<option value = { val.id }>{ val.editionName }</option>)
	      	})
	      	this.setState({
	      	  	resTypeOption: resType,
	      	  	resGradeOption: resGrade,
	      	  	resSubjectOption: resSubject,
	      	  	resEditionOption: resEdition,
	      	})
	    }.bind(this))
  	}
}

export default uploadRes