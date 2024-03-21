import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const NewTask = () => {
    const [data, setData] = useState({
        title: "",
        priority: "LOW",
        startAt:new Date().toISOString().slice(0, 16),
        endAt:"",
        category_id: 1,
        description:"",
    });
    const [error, setError] = useState(null)
    const [categoryData, setCategoryData] = useState([]);
    const [categoryError,setCategoryError] = useState(null)
    const [loading, setLoading] = useState(true);
    const getCatData = async () => {
        try{
            const token = localStorage.getItem("accessToken")
            if(!token){
                setCategoryError("Token id not defined");
                return;
            }
            const res = await fetch("http://localhost:8080/api/user/category",{
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if (!res.ok){
                setCategoryError(`Server error: ${res.status}`);
                return
            }

            const resData = await res.json();
            setCategoryData(resData);
            console.log("Category: ",resData);
        }catch (e){
            console.log("Get Category Error: ", e);
            setCategoryError("Fetching data failed.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCatData();
    }, []);
    const postTask = async (task) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("Authentication token not available.");
                return;
            }

            const res = await axios.post("http://localhost:8080/api/user/task", task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Post Success ", res);

        } catch (error) {
            console.log("Post Error: ", error);
            setError("Error adding new task");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Convert category_id to a number if it's the category_id field
        const updatedValue = name === "category_id" ? parseInt(value, 10) : value;
        console.log(`name: ${name}, value: ${value}, updatedValue: ${updatedValue}`);

        setData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));

    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (data.title.trim() !== "") {
            const formattedData = {
                ...data,
                startAt: new Date(data.startAt).toISOString().slice(0,16),
                endAt: new Date(data.endAt).toISOString().slice(0,16),
            };

            postTask(formattedData);
            console.log(formattedData);

            // Очистка полей формы
            setData({
                title: "",
                category_id: 1,
                priority: "LOW",
                startAt: new Date().toISOString().slice(0, 16),
                endAt: "",
                description: "",
            });
        } else {
            setError("Task title cannot be empty");
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center">
            <div className="border p-3 text-center mt-5 bg-white rounded-lg w-1/2">
                <h2 className="w-full font-bold font">Task</h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <form onSubmit={handleSubmit} className="mt-4 text-start" >
                    <label
                        className="ml-2"
                    >Title:</label>
                    <input
                        placeholder={"Title"}
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full border bg-amber-100 px-3 py-2 rounded-lg mb-1"
                        required
                    />
                    <label
                        className="ml-2"
                    >Description:
                    </label>
                    <textarea name="description"
                              value={data.description}
                              rows="4"
                              cols="20"
                              onChange={handleChange}
                              placeholder={"Description"}
                              className="w-full border bg-amber-100 px-3 py-2 rounded-lg mb-1"
                    >

                    </textarea>
                    {loading ? (
                        <div>Loading...</div>
                    ) : categoryError ? (
                        <div>Error: {categoryError}</div>
                    ) : (
                        <div>
                            <label
                                className="ml-2"
                            >Category:</label>
                            <select
                                name="category_id"
                                value={data.category_id}
                                onChange={handleChange}
                                className="w-full border bg-amber-100 px-5 py-2 rounded-lg mb-1"
                            >
                                {categoryData.map((category) =>(
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>

                        </div>
                    )}
                    <label
                        className="ml-2"
                    >Priority:</label>
                    <select name="priority"
                            value={data.priority || "LOW"}
                            onChange={(event)=>handleChange(event)}
                            className="w-full border bg-amber-100 px-3 py-2 rounded-lg mb-1"
                    >
                        <option value="LOW">LOW</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                    <label
                        className="ml-2"
                    >Deadline:</label>
                    <input
                        type="date"
                        name="endAt"
                        value={data.endAt}
                        onChange={handleChange}
                        className="w-full border bg-amber-100 px-5 py-2 rounded-lg mb-1"
                        required
                    />
                    <div className="flex justify-between px-1">
                        <Link to="/home">
                            <button
                                type={"submit"}
                                className="mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Back
                            </button>
                        </Link>
                        <button
                            type={"submit"}
                            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTask;
