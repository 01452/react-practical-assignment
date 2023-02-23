import {createAsyncThunk} from "@reduxjs/toolkit";

import {COMMENT, PAGE, POST, SEARCH, URL} from "./constants";

const postUrl = URL + POST;
const commentUrl = URL + COMMENT;

export const loadPosts = createAsyncThunk('post/loadPosts',
    async (page) => {
        const resp = await fetch(postUrl + PAGE + page);
        return resp.json();
    });

export const updatePost = async (postId, data) => {
    try {
        const resp = await fetch(postUrl + `${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return resp.json();
    } catch (err) {
        console.log(err);
    }
};

export const createPost = createAsyncThunk('post/createPost',
    async (data) => {
        const resp = await fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: data.title,
                username: data.username
            }),
        });
        return resp.json();
    });

export const deletePost = createAsyncThunk('post/deletePost',
    async (postId) => {
        const resp = await fetch(postUrl + `${postId}`, {
            method: "DELETE",
        });
        return resp.json();
    });

export const uploadPhoto = async (postId, photoPath) => {
    try {
        const formData = new FormData();
        formData.append("picture", photoPath);
        const resp = await fetch(postUrl + `${postId}/picture`, {
            method: "POST",
            body: formData,
        });
        return resp.json();
    } catch (err) {
        console.log(err);
    }
};

export const createComment = createAsyncThunk('comment/createComment',
    async (data) => {
        const resp = await fetch(commentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return resp.json();
    });

export const deleteComment = createAsyncThunk('comment/deleteComment',
    async (commentId) => {
        const resp = await fetch(commentUrl + `${commentId}`, {
            method: "DELETE",
        });
        return resp.json();
    });

export const updateComment = async (commentId, data) => {
    try {
        const resp = await fetch(commentUrl + `${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return resp.json();
    } catch (err) {
        console.log(err);
    }
};

export const filterPosts = createAsyncThunk('post/filterPosts',
    async (keyword) => {
        const resp = await fetch(postUrl + SEARCH + `${keyword}`);
        return resp.json();
    });
