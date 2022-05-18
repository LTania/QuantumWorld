import {useDispatch, useSelector} from "react-redux";
import {getSimple} from "../store/algorithms.reducer";
import {Button} from "@blueprintjs/core";

export const ResultsComponent = () => {
    const algorithms = useSelector((state)=>state)
    const dispatch = useDispatch()
    console.log(algorithms)
    return (
    <>
        <p>тут рез </p>
        <Button
            intent="success"
            text="button content"
            onClick={()=>dispatch(getSimple(15))} />
    </>
    )
}
