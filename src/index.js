import React, {useState , useEffect} from "react";
import ReactDOM  from "react-dom";
import { v4 as uuid } from "uuid";
import './style.css';

const App = ()=>{

    const [todo , setTodo] = useState("");
    const [todos , setTodos] = useState([]);
    const [cate, setCate] =useState("");
    const [datte, setDatte] =useState("");

    const [ke , setKe] = useState(false);

    const [todo1 , setTodo1] = useState("");
    const [cate1, setCate1] =useState("");
    const [datte1, setDatte1] =useState("");

    const [result , setResult] = useState("");

    useEffect(() => {
      var ta = localStorage.getItem("tasks");
      if(ta)
      {
        setTodos(JSON.parse(ta));
      }
    }, [])
    

    const addTodo =()=>{
        const id = uuid();
        setTodos([...todos,
            {id:id,
            text:todo,
            status:false,
            categories:cate,
            dte:datte
            }]);
        localStorage.setItem("tasks",JSON.stringify([...todos,
            {id:id,
            text:todo,
            status:false,
            categories:cate,
            dte:datte
            }]));
        console.log(todos);

        setResult("");
        setTodo("");
        setCate("");
        setDatte("");
        setTodo1("");
        setCate1("");
        setDatte1("");
        setKe(false);
    };

    const deleteTodo =(id) =>
    {

        let arr=todos.filter((t) => t.id !== id);
        setTodos(arr);

        if(result){
            let arr1 = result.filter((t) => t.id !== id);
            setResult(arr1);
        }        

        localStorage.setItem("tasks",JSON.stringify(arr));
        console.log(todos);
    };

    const SearchTab = ()=>{

        setKe(true);
        let flag=[false,false,false];

        if(todo1.length >0)
        {
            flag[0] = true;
        }
        if(cate1.length >0)
        {
            flag[1] = true;
        }
        if(datte1.length >0)
        {
            flag[2] = true;
        }

        console.log(flag);
        var arr = flag[0]?todos.filter( t => t.text.includes(todo1)):todos;
        var arr1 = flag[1]?arr.filter( t => t.categories.includes(cate1)):arr;
        var arr2 = flag[2]?arr1.filter( t => t.dte === datte1):arr1;

        setResult(arr2);
        console.log(result);

    };

    const markAsDone = (id) =>{
        setTodos(
            todos.map((t) => {
                if(t.id === id)
                {
                    t.status = !t.status;
                }

                return t;
            })      
        );
    };

    const clearAll =() =>{
        setTodo1("");
        setCate1("");
        setDatte1("");
        setResult("");
        setKe(false);

    };


    return(
        <> 
            <div className="trp">
                <span className="title">
                    TODO APP
                </span>
            </div>
            <div className="main">
                <div>
                    <span id="texts">Add Tasks :</span>
                </div> 
                <br />
                <div className="top">
                    <input id="task" placeholder="Title.." type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
                    <input id="task" placeholder="Categories.." type="text" value={cate} onChange={(e) => setCate(e.target.value)}/>
                    <input id="dating" type="date" value={datte} onChange={(e) => setDatte(e.target.value)} />
                    <button className="button_main" onClick={addTodo}>Add</button>
                </div>

                
                <br/>
                <span id="texts">Search For Tasks :</span>
                <br/>
                <div className="top">
                    <input type="text" placeholder="Title.." id="searchbox" value={todo1} onChange={(e) => setTodo1(e.target.value)}/> 
                    <input id="searchbox" placeholder="Categories.." type="text"  value={cate1} onChange={(e) => setCate1(e.target.value)}/>
                    <input id="dating1" type="date"  value={datte1} onChange={(e) => setDatte1(e.target.value)}/>
                    <button className="button_main" onClick={SearchTab}>Search</button>          
                </div>  
                <br/>
                <hr id="gapp"/>
                <br/>
                <div id="todo_main">
                    <span id="texts">To Do List : </span>
                    <br/>
                    <button className="button_main1" onClick={clearAll}>Clear Search</button>
                    <br/>
                    <div className="todos">
                        {ke&&result.length === 0 &&                        
                                <>
                                No Results Found.....<br/>
                                Showing All ToDos...<br/><hr/>
                                </>   
                        } 
                        <ul>
                            {result.length>0&&result.map((todo) => {
                                return (
                                <>
                                    <li>
                                        <input className="chec" type="checkbox" onChange={()=>{
                                            markAsDone(todo.id)
                                        }} />
                                        <button  className="bum" onClick={() =>deleteTodo(todo.id)}> Delete</button>
                                        {todo.status === true ? 
                                        <div><s>Title : {todo.text}<br/>Category : {todo.categories}<br/>Date : {todo.dte}<br/></s></div> : 
                                        <div>Title : {todo.text} <br/>Category : {todo.categories}<br/>Date : {todo.dte}<br/></div>}
                                    </li>
                                                                       
                                </>
                                );
                            })}
                            
                            {result.length<=0&&todos.map((todo) => {
                                return (
                                <>
                                    <li>
                                        <input className="chec" type="checkbox" onChange={()=>{
                                            markAsDone(todo.id)
                                        }} />
                                        <button  className="bum" onClick={() =>deleteTodo(todo.id)}> Delete</button>
                                        {todo.status === true ? 
                                        <div><s>Title : {todo.text}<br/>Category : {todo.categories}<br/>Date : {todo.dte}<br/></s></div> : 
                                        <div>Title : {todo.text} <br/>Category : {todo.categories}<br/>Date : {todo.dte}<br/></div>}
                                    </li>
                                                               
                                </>
                                );
                            })}
                                                
                        </ul>
                    </div>
                </div>
                
            </div>
            
        </>
    )
}

ReactDOM.render(<App />,document.getElementById("root"));