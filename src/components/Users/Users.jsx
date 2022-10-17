import React from "react";
import styles from "./Users.module.css"
import userImage from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {followAPI, unfollowAPI} from "../../api/usersAPI/UsersAPI";

let Users = (props) => {

    let countPage = Math.ceil(props.countUsers / props.pageSize);

    let pages =[];

    for(let i = 1; i <= countPage; i++){
        pages.push(i)
    }
    return (
        <div>
            <div className={styles.pagination}>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.selectedPage }
                                 onClick={()=>{props.onPageChanged(p);}}><span className={styles.page}>{p}</span></span>
                })}
            </div>
            <div>
                {
                    props.users.map(u => <div key={u.id}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userImage} className={styles.image} alt="photo"/>
                            </NavLink>
                        </div>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {"u.location.country"}
                        </div>
                        <div>
                            {"u.location.cityName"}
                        </div>
                        <div>
                            {u.status}
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followInProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleFollowInProgress(true, u.id)
                                    debugger
                                    unfollowAPI(u.id)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.toggleFollowInProgress(false, u.id)
                                        })
                                }
                                }>Unfollow</button>
                                : <button disabled={props.followInProgress.some(id => id === u.id)} onClick={()=>{
                                    props.toggleFollowInProgress(true, u.id)
                                    followAPI(u.id)
                                        .then(data => {
                                            if(data.resultCode === 0) {
                                                props.following(u.id)
                                            }
                                            props.toggleFollowInProgress(false, u.id)
                                        })
                                    }
                                }>Follow</button>}
                        </div>
                    </div>)
                }
            </div>
        </div>

    )
}

export default Users;