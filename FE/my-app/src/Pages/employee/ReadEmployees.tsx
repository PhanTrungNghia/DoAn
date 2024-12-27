import * as React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { Employee } from "./Employee";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteEmployee, readAllEmployees } from "../../_store/reducers/employeeSlice";

export const ReadEmployee = () => {
    const { employees, pending, error, searchData } = useSelector(
        (state: any) => state.reducer,
        shallowEqual
    )

    const dispatch = useDispatch<any>();

    const [id, setId] = useState<number | undefined>(undefined);
    const [isPopup, setPopup] = useState(false);
    const [activeRadio, setActiveRadio] = useState<string | undefined>(undefined);

    React.useEffect(() => {
        dispatch(readAllEmployees());
    }, []);

    const viewEmployee = (id: number | undefined) => {
        setId(id);
        setPopup(true);
    };

    if (pending) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            {isPopup && <Employee id={id} setPopup={setPopup} />}
            <h2>Tất cả nhân viên - {employees?.length ?? 0}</h2>
            <input
                type="radio"
                className="form-check-input"
                name="active"
                value=""
                id="all"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="all">
                Tất cả
            </label>{" "}
            &nbsp;
            <input
                type="radio"
                className="form-check-input"
                name="active"
                value="1"
                id="isActive"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="isActive">
                Kích hoạt
            </label>{" "}
            &nbsp;
            <input
                type="radio"
                className="form-check-input"
                name="active"
                id="notActive"
                value="0"
                onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="notActive">
                Chưa kích hoạt
            </label>
            {employees &&
                employees
                    .filter((e: IEmployee) => {
                        if (!searchData) {
                            return e;
                        } else {
                            return e.name.toLowerCase().includes(searchData.toLowerCase());
                        }
                    })
                    .filter((e: IEmployee) => {
                        if (!activeRadio) {
                            return e;
                        } else {
                            return e.isActive.toString() === activeRadio;
                        }
                    })
                    .map((employ: IEmployee) => (
                        <div key={employ.idEmployee} className="card">
                            <h5 className="card-title">{employ.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{employ.age}</h6>
                            <p className="card-text">{employ.isActive === 1 ? "Hoạt động" : "Ngừng hoạt động"}</p>
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    viewEmployee(employ.idEmployee);
                                }}
                            >
                                Xem
                            </button>{" "}
                            &nbsp;
                            <Link to={`/edit/${employ.idEmployee}`} className="btn btn-warning">
                                Sửa
                            </Link>{" "}
                            &nbsp;
                            <button
                                onClick={() => {
                                    dispatch(deleteEmployee(employ.idEmployee));
                                    dispatch(readAllEmployees());
                                }}
                                className="btn btn-danger"
                            >
                                Xóa
                            </button>
                        </div>
                    ))
            }
        </div>
    )
}