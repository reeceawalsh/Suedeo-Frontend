import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
    return (
        <div>
            <div className="form-group">
                <span className={`error ${!props.error ? "hidden" : ""}`}>
                    {props.error}
                </span>
                <label>{props.label}:</label>
                <DatePicker
                    selected={props.startDate}
                    name={props.name}
                    value={props.value || ""}
                    className={`form-control ${
                        props.error ? "red-outline" : ""
                    }`}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Date of Birth (dd/mm/yy)"
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default DateInput;
