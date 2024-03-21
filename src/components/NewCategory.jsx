import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom";

const NewCategory = () => {
    const [data, setData] = useState("");
    const [error, setError] = useState(null);

    const postReq = async (categoryTitle) => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Authentication token not available.");
                return;
            }

            const res = await axios.post("http://localhost:8080/api/user/category", {
                title: categoryTitle,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Post Success ", res);
        } catch (error) {
            console.log("Post Error: ", error);
            setError("Error adding new category");
        }
    };

    const handleChange = (event) => {
        setData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (data.trim() !== "") {
            postReq(data);
            setData("");
        } else {
            setError("Category title cannot be empty");
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center ">
            <div className="border p-3 text-center mt-5 bg-white rounded-lg w-1/2">
                <h2 className="w-full font-bold font">Category</h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        placeholder={"New Category"}
                        value={data}
                        onChange={handleChange}
                        className="border bg-amber-100 px-5 py-2 rounded-lg w-full"
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

export default NewCategory;
