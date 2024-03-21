import {useEffect, useState} from "react";
import axios from "axios";
import useDebounce from "../hooks/debounce.js";
import Priority from "./Priority.jsx";
import FilterCategory from "./FilterCategory.jsx";
import Pagination from "./Pagination.jsx";
import StatsPriority from "./StatsPriority.jsx";
import StatsCategory from "./StatsCategory.jsx";
import {Link} from "react-router-dom";
const TodoList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [delState,setDelState] = useState(false);
    const [search,setSearch] = useState("");
    const debouncedSearch = useDebounce(search,500);
    const [priorityValue, setPriorityValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [pageValue,setPageValue] = useState(0);
    const [pageLen,setPageLen] = useState("");
    const getData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("Token id not defined");
                return;
            }
            console.log("pageValue ",pageValue)

            const res = await fetch(`http://localhost:8080/api/user/?title=${search}&priority=${priorityValue}&categoryId=${categoryValue}&page=${pageValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setError(`Server error: ${res.status}`);
                return;
            }

            const resData = await res.json();
            console.log(resData)
            setData(resData.tasks);
            setPageLen(resData.total_pages);
        } catch (error) {
            console.log("Fetching Error ", error);
            setError("Fetching data failed.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        try{
            const token = localStorage.getItem("accessToken");
            if(!token){
                console.log("!TOKEN")
            }
            const del = await axios.delete(`http://localhost:8080/api/user/task/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            setDelState(!delState);
        }catch (e){
            console.log("Delete Error ", e)
        }
    }

    useEffect(() => {
        console.log("useEffect triggered");
        getData();
    }, [delState, debouncedSearch, priorityValue, categoryValue,pageValue]);

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    }
    const handlePriority = (priority) => {
        setPriorityValue(priority);
    }
    const handleCategory = (category) => {
        setCategoryValue(category);
    }
    const handlePagination = (page) => {
        setPageValue(page);
        console.log("handle function", pageValue+1)
    }

    return (
        <div className="grid grid-cols-4 gap-3 mt-1">
            <div className="col-start-1 col-end-2">
                <StatsPriority/>
                <StatsCategory/>
            </div>
            <div className="col-start-2  col-span-2">
                {loading ? (
                    <div><div role="status">
                        <svg aria-hidden="true" className="w-8 h-8  animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div></div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className=" flex flex-wrap gap-2 text-center justify-center">
                        <h2 className="w-full font-bold ">TODO</h2>

                        <form className="w-full mx-3"  >
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    onChange={handleOnChange}
                                    value={search}
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 border-gray-600 placeholder-white " placeholder="Search Tasks" required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
                            </div>
                        </form>

                        {data.map(task=>(
                            <div key={task.id}
                                 className="p-3 bg-gray-800 rounded-lg text-white"
                            >
                                <div className="w-full flex gap-1 justify-center flex-wrap">
                                    <div className={`w-full  rounded-lg text-white ${task.priority === 'HIGH' ? 'bg-red-800' :
                                        task.priority === 'NORMAL' ? 'bg-yellow-600' :
                                            'bg-green-600'}`}>{task.priority}</div>
                                    <div className="">{task.category.title}</div>
                                </div>
                                <div className="w-full flex gap-1 justify-center flex-wrap">
                                    <div className="w-full">{task.title}</div>
                                    <div className="w-full">{task.description}</div>
                                </div>
                                <div className="w-full flex gap-1 justify-center">
                                    <div className="">{task.end_at}</div>
                                    <div className="">{task.start_at}</div>
                                </div>
                                <div className="w-full flex gap-1 justify-between">
                                    <button className="mt-4 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                                    onClick={() => deleteTask(task.id)}
                                    >Delete</button>
                                    <Link to={`/home/${task.id}`}><button className="mt-4 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Update</button></Link>
                                </div>
                            </div>
                        ))}
                        <div className="w-full">
                            <Pagination pageLength={pageLen} changePagination={handlePagination}/>
                        </div>
                    </div>

                )}

            </div>
            <div className="col-start-4 col-end-5 ">
                <Priority changePriority={handlePriority}/>
                <FilterCategory changeCategory={handleCategory}/>
            </div>
        </div>
    );
};

export default TodoList;
