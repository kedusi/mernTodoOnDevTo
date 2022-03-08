import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TodoCard({data, handleDelete}) {
    const {_id, title, description} = data;
    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button" name={_id}>edit</button>
                <button className="button" name={_id} onClick={handleDelete}>delete</button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleDelete(e) {
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`)
        
        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        })
    }

    return (
        <section className="container">
            <section className="contents">
                <h1>TODO</h1>
                <Link to="/create-todo" className="button-new">
                    <button className="button">New</button>
                </Link>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard data={data} key={data._id} handleDelete={handleDelete} />
                        )
                    )}
                </ul>
            </section>
        </section>
    );
}