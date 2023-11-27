import { ADD, DELATE, UPDATE, COMPLETE } from "./types";

export const addTodo = (input) => {
    return {
        type: ADD,
        payload: input
    };
};

export const deleteTodo = (id) => {
    return {
        type: DELATE,
        payload: id
    };
};

export const completeTodo = (id) => {
    return {
        type: COMPLETE,
        payload: id
    };
};

export const updateTodo = (id, editTask) => {
    return {
        type: UPDATE,
        payload: { id, editTask }
    };
};