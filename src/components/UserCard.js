import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../src/firebase-config';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({

    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function UserCard({ user }) {
    const [newuserName, setnewUserName] = useState("");
    const [newEmail, setnewEmail] = useState("");
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const updateInfo = async (id, userName, emailId) => {
        const newData = {
            username: userName,
            email: emailId
        }

        const newUserDoc = doc(db, "users", id)
        await updateDoc(newUserDoc, newData);
        window.location.reload();
    }

    const deleteUser = async (id) => {
        const deleteuser = doc(db, "users", id)
        await deleteDoc(deleteuser);
        window.location.reload();

    }

  
    return (
        <div>


            <Card >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {user.username[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={() => deleteUser(user.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                    title={user.username}
                    subheader={user.email}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Hello I am {user.username}. Great to see you!
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <EditIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Form style={{}}>
                            <legend>Username</legend>
                            <Input type="text" placeholder="Username" required={true} 
                                onChange={(event) => setnewUserName(event.target.value)} />
                            <br />
                            <legend>Email</legend>
                            <Input type="email" placeholder="Email" required={true} 
                                onChange={(event) => setnewEmail(event.target.value)} />
                            <br />
                            <Button variant="raised"
                                onClick={() => {
                                    updateInfo(user.id, newuserName, newEmail);
                                }
                                }
                            >Save changes</Button>
                        </Form>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default UserCard
