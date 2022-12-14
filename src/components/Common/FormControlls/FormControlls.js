import style from './FormControlls.module.css';

const FormControl = ({meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={style.formControl + " " + (hasError ? style.error: "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {meta, ...restProps} = props;
    return(
        <FormControl {...props}> <textarea {...props.input} {...restProps}/></FormControl>
    )
}

export const Input = (props) => {
    const {meta, ...restProps} = props;
    return(
        <FormControl {...props}> <input {...props.input} {...restProps}/></FormControl>
    )
}


