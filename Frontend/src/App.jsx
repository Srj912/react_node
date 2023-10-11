import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneno: "",
    });
    const [status, setStatus] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    }, [status]);

    const changeHandler = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = () => {
        axios
            .post("http://localhost:3000/users", user)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setStatus(!status);
        setUser({
            name: "",
            email: "",
            phoneno: "",
        });
    };

const updateHandler=(id)=>{
    console.log(id)
    axios
        .get(`http://localhost:3000/user/${id}`)
        .then((res) =>(setUser({
            name: res.data[0].name,
            email: res.data[0].email,
            phoneno: res.data[0].phoneno,
        })))
        .catch((err) => console.log(err));
    setStatus(!status)
}

    const deleteHandler = (id) => {
        console.log(id);
        axios
            .delete(`http://localhost:3000/users/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setStatus(!status);
    };

    return (
        <>
            <h2>create table</h2>
            <input
                placeholder="name"
                onChange={changeHandler}
                name="name"
                value={user.name}
            ></input>
            <input
                placeholder="email"
                onChange={changeHandler}
                name="email"
                value={user.email}
            ></input>
            <input
                placeholder="phoneno"
                onChange={changeHandler}
                name="phoneno"
                value={user.phoneno}
            ></input>
            <button onClick={submitHandler}>Submit</button>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>phoneno</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map(({ id, name, email, phoneno }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{phoneno}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteHandler(id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => updateHandler(id)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>no data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};
export default App;
