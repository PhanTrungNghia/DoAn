import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createEmployee, readAllEmployees } from "../../_store/reducers/employeeSlice";

export const AddEmployee = () => {
    const [employee, setEmployee] = React.useState<IEmployee>({
        name: '',
        age: '',
        isActive: 0,
    });

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createEmployee(employee));
        dispatch(readAllEmployees());
        navigate("/readAllAdminFunction");
    }

    const handleEmployeeData = (e: React.FormEvent<HTMLInputElement>) => {
        // Destructured the id, value, checked, and type properties from e.currentTarget.
        const { id, value, checked, type } = e.currentTarget;

        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [id]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }))
    }

    return (
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="Nhập tên"
                id="name" onChange={handleEmployeeData} />
            <input type="text" className="form-control" placeholder="Nhập tuổi"
                id="age" onChange={handleEmployeeData} />
            <input type="checkbox"
                id="isActive"
                onChange={handleEmployeeData} />
            <label>Trạng thái</label>
            <button disabled={employee === undefined ? true : false}>
                Thêm nhân viên
            </button>
        </form>
    )
}


