import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
const FilterCategory = ({changeCategory}) => {

    const [categoryData, setCategoryData] = useState([]);
    const [categoryError,setCategoryError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [choose,setChoose] = useState("")

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
    const handleSubmit = (e) => {
        e.preventDefault();
        changeCategory(choose);
    }
    const handleCategoryChange = (event) => {
        setChoose(event.target.value);
    }

    return (
        <>
            {loading ? (
                <div><div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div></div>
            ) : categoryError ? (
                <div>Error: {categoryError}</div>
            ) : (
                <form  onSubmit={handleSubmit} className="w-full flex justify-center flex-wrap text-center mt-4">
                    <h3 className="w-full mb-4 font-bold ">Category</h3>
                    <ul className="w-80 text-sm text-start font-medium border rounded-lg bg-gray-800 border-gray-600 text-white">
                        {categoryData.map((category) => (
                            <li key={category.id} className="w-full border-b rounded-t-lg border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input
                                        id={`list-radio-${category.id}`}
                                        type="radio"
                                        value={category.id}
                                        name="list-radio"
                                        checked={choose === category.id.toString()}
                                        onChange={handleCategoryChange}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                    />
                                    <label htmlFor={`list-radio-${category.id}`} className="w-full py-3 ms-2 text-sm ">{category.title}</label>
                                </div>
                            </li>
                        ))}
                        <div className="flex w-full justify-center">
                            <button
                                type="submit"
                                className="mt-2 mb-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >Add</button>
                        </div>
                    </ul>
                </form>

            )}

        </>
    );
};

export default FilterCategory;