import {useSelector} from "react-redux";
import {getLastResult} from "../store/algorithms.selector";

export const ResultsComponent = () => {
    const result = useSelector(getLastResult)

    const renderResult = () => {
        return (<>
            {result?.res?.map((x, i)=><span key={i}>{x} </span>)}
            </>)
    }

    return (
    <div>
        <p>Отриманий результат: {renderResult()}</p>
        <p>Час: {(result?.time)?.toFixed(3)}</p>
    </div>
    )
}
