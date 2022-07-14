import { SET_TASKLIST, SET_MODAL_OPEN, SET_SELECTED_TASK, SET_LOCATION } from "./actionTypes";


const initialState = {
    taskList: [],
    selectedTask: {
        title: '',
        desc: '',
        time: '',
        date: '',
        alert: '',
    },
    modalOpen: '',
    date: '',
    time: '',
    alert: '',
    userLocation: {
        city: "",
        district: "",
        pincode: "",
    }
}


function todoListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKLIST:
            return { ...state, taskList: action.payload }
        case SET_SELECTED_TASK:
            return { ...state, selectedTask: action.payload }
        case SET_MODAL_OPEN:
            return { ...state, modalOpen: action.payload }
        case SET_LOCATION:
            return { ...state, userLocation: action.payload }
        default:
            return state;
    }
}


export default todoListReducer;