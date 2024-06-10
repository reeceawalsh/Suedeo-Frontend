// text input used in most of the forms, if there is an error message in the props it will display them as a span and also outline the input in red.
const TextInput = (props) => {
    return (
        <div className="form-group">
            <span className={`error ${!props.error ? "hidden" : ""}`}>
                {props.error}
            </span>
            <div className="form-sub-group">
                <label>{props.label}</label>
                <input
                    type="text"
                    name={props.name}
                    value={props.value || ""}
                    className={`form-control ${
                        props.error ? "red-outline" : ""
                    }`}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default TextInput;
