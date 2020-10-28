import React from 'react';
import AceEditor from "react-ace";

export class EditPage extends React.Component{
    constructor() {
        super();
        this.htmlEditor = React.createRef()
        this.cssEditor = React.createRef()
        this.jsEditor = React.createRef()
        this.state = {
            pageId: "",
            name: "",
            title: "",
            nameValue: "",
            titleValue: ""
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleInputUpdate = this.handleInputUpdate.bind(this)
    }

    handleUpdate(){
        //апдейтим в бд отредактированную страницу
        let formData = new FormData()
        formData.append('pageId', this.state.pageId)
        formData.append('name', this.state.name)
        formData.append('title', this.state.title)
        formData.append('html',this.htmlEditor.current.editor.getValue())
        formData.append('css',this.cssEditor.current.editor.getValue())
        formData.append('js',this.jsEditor.current.editor.getValue())
        fetch("http://o9150210.beget.tech/updatePage", {
            method: 'POST',
            body: formData
        })
            .then(response=>response.json)
            .then(result=>console.log("всё ок"))

    }
    handleInputUpdate(event){
        //апдейтим в бд отредактированные name и title
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }
    componentDidMount() {
        const pageId = window.location.pathname.split("/")[3] //получить pageId, который редактируем и...
        this.setState({ //сохранимм pageId в state
            pageId:pageId
        })
        let formData = new FormData() //получить текущее состояние страницы, name и title из бд
        formData.append("pageId", pageId)
        console.log(pageId)
        fetch("http://o9150210.beget.tech/editPage", {
            method:'POST',
            body:formData
        })
            .then(response=>response.json())
            .then(page=>{
                this.htmlEditor.current.editor.setValue(page.html)
                this.cssEditor.current.editor.setValue(page.css)
                this.jsEditor.current.editor.setValue(page.js)
                this.setState({
                    nameValue: page.name,
                    titleValue: page.title
                })
            })
    }
    render() {
        return <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-html-tab" data-toggle="tab" href="#nav-html" role="tab"
                       aria-controls="nav-html" aria-selected="true">HTML</a>
                    <a className="nav-link" id="nav-css-tab" data-toggle="tab" href="#nav-css" role="tab"
                       aria-controls="nav-css" aria-selected="false">CSS</a>
                    <a className="nav-link" id="nav-js-tab" data-toggle="tab" href="#nav-js" role="tab"
                       aria-controls="nav-js" aria-selected="false">JS</a>
                    <a className="nav-link" id="nav-extraHTML-tab" data-toggle="tab" href="#nav-extraHTML" role="tab"
                       aria-controls="nav-extraHTML" aria-selected="false">Параметры</a>
                    <button onClick={this.handleUpdate} className="btn btn-light ml-auto">[сохранить]</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-html" role="tabpanel" aria-labelledby="nav-html-tab">
                    <AceEditor
                        mode="html"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.htmlEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tab-pane fade" id="nav-css" role="tabpanel" aria-labelledby="nav-css-tab">
                    <AceEditor
                        mode="css"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.cssEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tab-pane fade" id="nav-js" role="tabpanel" aria-labelledby="nav-js-tab">
                    <AceEditor
                        mode="javascript"
                        width="100%"
                        theme="vibrant_ink"
                        ref={this.jsEditor}
                        setOptions={{
                            fontSize:18,
                            enableEmmet:true
                        }}
                    />
                </div>
                <div className="tap-pane fade" id="nav-extraHTML" role="tabpanel" aria-labeledby="nav-extraHTML-tab">
                    <div className="mb-3 my-3">
                        <input name="name" value={this.state.nameValue} onChange={this.handleInputUpdate} type="text" className="form-control" placeholder="URL страницы"/>
                    </div>
                    <div className="mb-3">
                        <input name="title" value={this.state.titleValue} onChange={this.handleInputUpdate} type="text" className="form-control" placeholder="Заголовок страницы"/>
                    </div>
                </div>
            </div>


        </div>
    }
}