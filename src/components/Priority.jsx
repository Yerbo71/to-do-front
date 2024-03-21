import {useState} from "react";

const Priority = ({changePriority}) => {
    const [priorityValue,setPriorityValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        changePriority(priorityValue);
    }
    const handlePriorityChange = (event) => {
        setPriorityValue(event.target.value);
    }
    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center flex-wrap text-center">
            <h3 className="w-full mb-4 font-bold ">Priority</h3>
            <ul className="w-80 text-sm text-start font-medium border rounded-lg bg-gray-800 border-gray-600 text-white">
                <li className="w-full border-b rounded-t-lg border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="list-radio-license"
                            type="radio"
                            value="HIGH"
                            name="list-radio"
                            checked={priorityValue === "HIGH"}
                            onChange={handlePriorityChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"/>
                            <label htmlFor="list-radio-license" className="w-full py-3 ms-2 text-sm ">HIGH</label>
                    </div>
                </li>
                <li className="w-full border-b rounded-t-lg border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="list-radio-id"
                            type="radio"
                            value="NORMAL"
                            name="list-radio"
                            checked={priorityValue === "NORMAL"}
                            onChange={handlePriorityChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"/>
                            <label htmlFor="list-radio-id" className="w-full py-3 ms-2 text-sm ">NORMAL</label>
                    </div>
                </li>
                <li className="w-full border-b rounded-t-lg border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="list-radio-military"
                            type="radio"
                            value="LOW"
                            name="list-radio"
                            checked={priorityValue === "LOW"}
                            onChange={handlePriorityChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"/>
                            <label htmlFor="list-radio-military" className="w-full py-3 ms-2 text-sm ">LOW</label>
                    </div>
                </li>
                <div className="flex w-full justify-center">
                    <button
                        type="submit"
                        className="mt-2 mb-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >Add</button>
                </div>
            </ul>
        </form>
    );
};

export default Priority;