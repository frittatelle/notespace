import { useState } from 'react';
import Header from './Header';

const Contacts = ({auth, db}) => {
    const [userMessage,setUserMessage] =  useState({
        name:'',
        email:'',
        message:'',
    });

    const messagesRef = db.collection('messages');

    const handleUserInput = (e) => {
        const name = e.target.name;
        const message = {
            ...userMessage,
            [name]: e.target.value,
        };
        setUserMessage(message);
    }

    const submitMessage = () => {
        const re = /\S+@\S+\.\S+/;
        if(re.test(userMessage.email)){
            if(userMessage.message !== ''){
                messagesRef
                    .doc()
                    .set(userMessage)
                    .catch((err) => {
                        console.error(err);
                    })
                setUserMessage({
                    name:'',
                    email:'',
                    message:'',
                });   
                alert('Thank you for submitting your message. Let`s keep in touch!😊')
            } else {
                alert('Please write something in the message!😖')
            }
        }else{
            alert('Please use a valid email!😖');
        }
    }

    return(
        <>
            <Header auth={auth}/>
            <section>
            <div className="circle about-top"></div>
            <div className="circle about-bottom"></div>
            <div className="about-content">
                <div className="contact-us">
                    <h2>Contact Us</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="John Doe" onChange={handleUserInput} value={userMessage.name}/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="john.doe@mail.com" onChange={handleUserInput} value={userMessage.email}/>
                    <label htmlFor="message">Message</label>
                    <textarea name="message"
                        placeholder="Type something here ... ✍️" 
                        onChange={handleUserInput}
                        value={userMessage.message}
                    >
                    </textarea>
                    <button onClick={() => submitMessage()}>Submit message</button>
                </div>
            </div>            
            </section>
        </>    
    );
}

export default Contacts; 