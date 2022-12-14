import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(()=>{
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    const onChangeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || '-------'}</span>
                </div>}
            {editMode &&
                <div>
                    <input autoFocus={true}
                           onBlur={deactivateEditMode}
                           onChange={onChangeStatus}
                           value={status}/>
                </div>}
        </div>

    )

}

export default ProfileStatusWithHooks;