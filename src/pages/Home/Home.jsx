import { useToast } from "~/components"

const Home = () => {
    const toast = useToast();
    const handleClick = () => {
        console.log('ss')
        toast.show("con me may");
    }
    return <>
    <button onClick={handleClick}>click me show fucking toast</button>
    </>
}

export default Home