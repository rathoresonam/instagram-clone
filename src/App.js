import {useEffect, useState} from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Input } from '@mui/material';
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser);
        setUser(authUser);
     } else {
        setUser(null);
      }
     
    })
   
  }, [])

  useEffect(() => {
      db.collection("posts").onSnapshot(snapshot =>{
        setPosts(snapshot.docs.map(doc => (
         { id: doc.id,
          post: doc.data()
        })))
      })
  }, [])

  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password) 
    .then((authUser) => {
     return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false);
  }
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false);
  }

  return (
    <div className="app">
  
    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
    <Box sx={{ ...style, width: 200 }}>
        <form className = "app__signUp">
        <center>
        <div>
        <Input placeholder = "email" type = "text" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
        <Input placeholder = "password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
        <Button type = "submit" onClick = {signIn}>Sign In</Button>
        </div>
        </center>
        </form>
       
        </Box>
    </Modal>
    <Modal open={open} onClose={() => setOpen(false)}>
    <Box sx={{ ...style, width: 200 }}>
        <form className = "app__signUp">
        <center>
        <div>
        <Input placeholder = "username" type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
        <Input placeholder = "email" type = "text" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
        <Input placeholder = "password" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
        <Button type = "submit" onClick = {signUp}>Sign Up</Button>
        </div>
        </center>
        </form>
       
        </Box>
    </Modal>
    <div className = "app__header">
    <img src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = "logo" className = "app__headerImage"/>
    {user ? (<Button onClick = {() => auth.signOut()}>Sign Out</Button>) :  
    (<div>
     <Button onClick = {() => setOpenSignIn(true)}>Sign In</Button>
     <Button onClick = {() => setOpen(true)}>Sign Up</Button>

     </div>
) }
   
    </div>
    <div className= "app__posts">
    {
      posts.map(({id, post})=> (
      <Post key = {id} postId = {id} user = {user} username = {post.username} caption = {post.caption} imageurl = {post.imageurl}/>
      ))}
 
      {user?.displayName ? (<ImageUpload username = {user.displayName}/>) : (<h3>Need to login first.</h3>)
    }
    </div>
      </div>
  );
}

export default App;
