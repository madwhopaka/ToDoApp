import { SET_MODAL_OPEN, SET_TASKLIST, SET_SELECTED_TASK, SET_LOCATION } from "./actionTypes";


export const setModalOpen = (payload) => ({
  type: SET_MODAL_OPEN,
  payload: payload,
});

export const setSelectedTask = (payload) => ({
  type: SET_SELECTED_TASK,
  payload: payload
});

export const setTaskList = (payload) => ({
  type: SET_TASKLIST,
  payload: payload,
});

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload: payload,
});