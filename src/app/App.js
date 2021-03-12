import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tittle: '',
            description: '',
             _id:'',
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=> {
                M.toast({ html: 'Task updated' })
                this.setState({ tittle: '', description: '', _id:'' })
                this.getTasks();
            }).catch(err => console.log(err));
            e.preventDefault();
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task saved' })
                    this.setState({ tittle: '', description: '' })
                    this.getTasks();
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }
    componentDidMount() {
        this.getTasks();
    }
    getTasks() {
        fetch('api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
                // console.log(this.state.tasks);
            });
    }
    deleteTask(id){
      if(confirm('Are you sure you want delete de task?')){
        fetch(`api/tasks/${id}`,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=> {
            M.toast({ html: 'Task deleted' })
            this.getTasks();
        })
    }else{
        alert('OK');
    }
    }
    getDataToUpdate(id){
        fetch(`api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ tittle: data.tittle, description: data.description, _id:data._id })
        });
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        });
    }
    render() {
        return (

            <div>
                {/*Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href='/'>MERN Stack Kevin Jovel</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="tittle" value={this.state.tittle} onChange={this.handleChange} type="text" placeholder="Task name" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" value={this.state.description} onChange={this.handleChange} className="materialize-textarea" placeholder="Task description"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <button className="btn light-blue darken4" type="submit">Send</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tittle</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.tittle}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={()=>this.getDataToUpdate(task._id)} className='btn light-blue darken-4' style={{margin:'4px'}}> <i className="material-icons">edit</i></button>
                                                        <button onClick={()=>this.deleteTask(task._id)} className='btn light-blue darken-4'><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;