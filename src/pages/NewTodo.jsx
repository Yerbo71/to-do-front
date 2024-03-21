import Navbar from "../components/Navbar.jsx";
import NewCategory from "../components/NewCategory.jsx";
import NewTask from "../components/NewTask.jsx";


const NewTodo = () => {
    return (
        <>
         <Navbar/>
         <NewCategory/>
            <NewTask/>

        </>
    );
};

export default NewTodo;