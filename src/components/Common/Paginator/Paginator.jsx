import React, {useState} from "react";
import styles from "./Paginator.module.css"

let Paginator = ({totalItemsCount, pageSize, portionSize=10, ...props}) => {

    let countPage = Math.ceil(totalItemsCount / pageSize);

    let pages =[];

    for(let i = 1; i <= countPage; i++){
        pages.push(i)
    }

    let portionCount = Math.ceil(countPage / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.pagination}>
            {portionNumber > 1 &&
                <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Prev</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={() => {
                                 props.onPageChanged(p);
                             }}><span className={styles.page}>{p}</span></span>
            })}
            {portionCount > portionNumber &&
                <button onClick={()=>{setPortionNumber(portionNumber+1)}}>Next</button>
            }
        </div>
    )
}

export default Paginator;