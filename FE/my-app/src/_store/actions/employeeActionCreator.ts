import * as actionTypes from '../actionTypes';

export function addEmployee(employee: IEmployee) {
  const action: EmployeeAction = {
    type: actionTypes.ADD_EMPLOYEE,
    employee,
  }

  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: EmployeeAction) {
  if (!action || !action.type) {
    console.error("Invalid action object", action);
    return {
      type: actionTypes.INVALID_ACTION,
    };
  }
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}

// Action Creator for calling api Employee
export function fetchEmployeePending() {
    const actionPending: EmployeeAction = {
      type: actionTypes.FETCH_EMPLOYEE_PENDING
    }
    return actionPending
  }
  
  export function fetchEmployeeSuccess(employees: IEmployee[]) {
    const actionSuccess: EmployeeAction = {
      type: actionTypes.FETCH_EMPLOYEE_SUCCESS,
      employees,
  
    }
    return actionSuccess
  }
  
  export function fetchEmployeeError(error: Error) {
    const actionError: EmployeeAction = {
      type: actionTypes.FETCH_EMPLOYEE_ERROR,
      error: error
    }
    return actionError
  }

  export function saveEmployeePending() {
    const actionPending: EmployeeAction = {
      type: actionTypes.SAVE_EMPLOYEE_PENDING
    }
    return actionPending
  }
  
  export function saveEmployeeSuccess(employee: IEmployee) {
    const actionSuccess: EmployeeAction = {
      type: actionTypes.SAVE_EMPLOYEE_SUCCESS,
      employee,
  
    }
    return actionSuccess
  }
  
  export function saveEmployeeError(error: Error) {
    const actionError: EmployeeAction = {
      type: actionTypes.SAVE_EMPLOYEE_ERROR,
      error: error
    }
    return actionError
  }

  export function deleteEmployeePending() {
    const actionPending: EmployeeAction = {
      type: actionTypes.DELETE_EMPLOYEE_PENDING
    }
    return actionPending
  }
  
  export function deleteEmployeeSuccess(employee: IEmployee) {
    const actionSuccess: EmployeeAction = {
      type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
      employee,
  
    }
    return actionSuccess
  }
  
  export function deleteEmployeeError(error: Error) {
    const actionError: EmployeeAction = {
      type: actionTypes.DELETE_EMPLOYEE_ERROR,
      error: error
    }
    return actionError
  }
  