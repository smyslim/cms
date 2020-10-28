import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "emmet-core";
import "ace-builds/src-noconflict/ext-emmet";

export class AddPage extends React.Component{ //экспортируем класс, который наследует встроенному классу React
    constructor() {
        super();
        this.state = { //объявляем изначальное состояние
            name:"",
            title:""
        }
        this.htmlEditor = React.createRef(); //создаем Ref, чтобы ссылаться на них в render
        this.cssEditor = React.createRef();
        this.jsEditor = React.createRef();
        this.handleSave = this.handleSave.bind(this); //binding this of AddPage class to this of handleSave function, because every function has its own this
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSave(){
        let formData = new FormData() //создаем экземпляр объекта FormData
        formData.append('name', this.state.name) //добавляем поля к объекту formData
        formData.append('title',this.state.title)
        formData.append('html', this.htmlEditor.current.editor.getValue()) //получаем значение из editor и добавляем как поле в formData
        formData.append('css', this.cssEditor.current.editor.getValue())
        formData.append('js', this.jsEditor.current.editor.getValue())
        fetch("http://o9150210.beget.tech/addPage",{ //отправляем объект formData через страницу addPage на сервере в базу данных методом POST
            method: 'POST',
            body: formData
        })
            .then(response=>response.json()) //дождавшись получения ответа от сервера, переводим ответ в формат JSON
            .then(result=>console.log(result)) //выводим ответ в консоль
    }

    handleInputChange(event){ //функция запускается по событию onChange, которое дает event
        const target = event.target //у event получаем свойство target с инфой об event
        const value = target.value //получаем значение target
        const name = target.name //получаем ключ target, какой именно input запустился

        this.setState({ //меняем значение ключа (какой именно ключ - name или title - мы определяем выше в свойствах target)
            [name]: value //в квадратных скобках - потому что это не ключ name, а переменная name, которую мы объявили из target
        })
    }

    componentDidMount() {
        console.log("Вызвана фунция componentDidMount");
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
                <button onClick={this.handleSave} className="btn btn-light ml-auto">[сохранить]</button>
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
                    <input name="name" onChange={this.handleInputChange} type="text" className="form-control" placeholder="URL страницы"/>
                </div>
                <div className="mb-3">
                    <input name="title" onChange={this.handleInputChange} type="text" className="form-control" placeholder="Заголовок страницы"/>
                </div>
            </div>
        </div>


    </div>
    }
}