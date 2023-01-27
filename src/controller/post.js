import path from "path";
import fs from 'fs';
import PostModel from '../model/post.js';
import { fileURLToPath } from 'url'

export const createPost = (req, res, next) => {

    if (!req.file) {
        const err = new Error('Image Harus ada');
        err.errorStatus = 422;
        throw err;
    }

    const body = req.body.body;
    const image = req.file.path;

    const Posting = new PostModel({
        body, image
    })

    Posting.save()
    .then(result => {
        res.status(201).json(
            result
        );
    })
    .catch(err => {
       console.log(err);
    })
}

export const getPost = (req, res, next) => {
    PostModel.find()
    .then(result => {
        res.status(201).json(result)
    }).catch(error => {
        console.log(error);
    })
};

export const getPostById = (req, res, next) => {
    const id = req.params.id;

    PostModel.findById(id)
    .then(result => {

        if(!result) {
            const error = new Error('Blog Post Tidak Ditemukan')
            error.errorStatus = 404;
            throw error
        };

        res.status(201).json(result);
    })
};


export const updatePost = (req, res, next) => {

    if (!req.file) {
        const err = new Error('Image Harus ada')
        err.errorStatus = 422
        throw err;
    }

    const body = req.body.body;
    const image = req.file.path;
    const id = req.params.id;
    

    PostModel.findById(id)
    .then(result => {
        if(!result) {
            const err = new Error('Blog Post Tidak Ditemukan');
            err.status = 404;
            throw err
        }

        result.body = body;
        result.image = image;

        return result.save();
    })
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
    })
};


export const deletePost = (req, res, next) => {
    const id = req.params.id;

    PostModel.findById(id)
    .then(result => {
        if (!result) {
            const err = new Error('Postingan Tidak ditemukan');
            err.status = 422
            throw err
        }

        removeImage(result.image);
        return PostModel.findByIdAndRemove(id);
    })
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err))
}