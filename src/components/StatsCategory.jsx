
import {useEffect, useState} from "react";

const StatsCategory = () => {

    const [categoryData,setCategoryData] = useState("");
    const [categoryError,setCategoryError] = useState(null)
    const [loading, setLoading] = useState(true);
    const getPrioData = async () => {
        try{
            const token = localStorage.getItem("accessToken")
            if(!token){
                setCategoryError("Token id not defined");
                return;
            }
            const res = await fetch("http://localhost:8080/api/user/category/info",{
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
            console.log("Priority Info : ",resData);
        }catch (e){
            console.log("Get Priority Info Error: ", e);
            setCategoryError("Fetching data failed.")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getPrioData();
    }, []);

    return (
        <>
            {loading ? (
                <div><div role="status">
                    <svg aria-hidden="true" className="w-8 h-8  animate-spintext-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div></div>
            ) : categoryError ? (
                <div>Error: {categoryError}</div>
            ) : (
                <div className="flex w-full p-3 flex-wrap text-center justify-center">
                    <h2 className="w-full font-bold">Statistic</h2>
                    <div className="max-w-sm w-full  rounded-lg shadow bg-gray-800 p-4 md:p-6 ">
                        <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                                <div className="flex justify-center items-center">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Priority State</h5>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                            <div className="grid grid-cols-3 gap-3 mb-2">
                                {categoryData.map((cat) =>(
                                        <dl key={cat.title} className="bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                                            <dt className="w-8 h-8 rounded-full bg-gray-500 text-white text-sm font-medium flex items-center justify-center mb-1">{cat.count}</dt>
                                            <dd className="text-white text-sm font-medium">{cat.title}</dd>
                                        </dl>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default StatsCategory;