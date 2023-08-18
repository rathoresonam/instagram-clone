import React, {useState} from 'react'
import './ImageUpload.css'
import { Button, Input } from '@mui/material';
import {storage, db} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed", 
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadUrl()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageurl: url,
                            username: username
                        })
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div className = "imageupload">
            <progress className = "imageupload__progress" value = {progress} max = "100"/>
            <Input type = "text" placeholder = "Enter a caption..." onChange = {event => setCaption(event.target.value)} value = {caption}/>
            <Input type = "file" onChange = {handleChange}/>
            <Button onClick = {handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
