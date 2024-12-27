import * as actionTypes from '../actionTypes';

const initialState: EmployeeState = {
    employees: [
        {
            name: "Nguyen Van A",
            age: "31",
            isActive: 0
                
        },
        {
            name: "Nguyen Van B",
            age: "21",
            isActive: 1
                
        },
    ],
    pending: true,
}

const employeeReducer = (
    state: EmployeeState = initialState,
    action: EmployeeAction
): EmployeeState => {
    switch (action.type) {
        case actionTypes.ADD_EMPLOYEE:
            const newEmployee: IEmployee = {
                name: action.employee?.name ?? "",
                age: action.employee?.age ?? "",
                isActive: action.employee?.isActive ?? ""
            }
            return {
                ...state,
                employees: state.employees.concat(newEmployee),
                pending: false
            }
        case actionTypes.REMOVE_EMPLOYEE:
            const updatedEmployees: IEmployee[] = state.employees.filter(
                employee => employee.idEmployee !== action.employee!.idEmployee
            )
            return {
                ...state,
                employees: updatedEmployees,
            }
        case actionTypes.FETCH_EMPLOYEE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case actionTypes.FETCH_EMPLOYEE_SUCCESS:
            console.log(...action.employees ?? [])
            return {
                ...state,
                pending: false,
                employees: [...state.employees, ...action.employees ?? []]
            }
        case actionTypes.FETCH_EMPLOYEE_ERROR:
            return {
                ...state,
                pending: true,
                error: action.error
            }
    }
    return state
}

// employee slice with intial state and reducers to mutate state. They perform CRUD and also toggle todo.
// Redux-Toolkit uses Immutable.js which allows us to mutate state but on the background everything works as immutated state.


export default employeeReducer


