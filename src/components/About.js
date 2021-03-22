import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';


const About = ({auth}) => {

    const [fact,setFact] = useState('');

    const getRandomFact = async () => {
        const fact = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        setFact(fact.data.text);
    }

    useEffect(() => {
        getRandomFact();
    },[]);

    return(
        <>
            <Header auth={auth}/>
            <section className="about">
                <div className="circle about-top"></div>
                <div className="circle about-bottom"></div>
                <div className="about-content">
                    <div className="text-box">
                        <h2>About</h2>
                        <p>
                            As I told you before, this is just a note app.<br />
                            Your can write, delete and modify notes. <br />
                            And that's basically it 😕 <br /><br />
                            BUT DON'T WORRY! <br /><br />
                            Here's something more interesting for you and an image of a dog: <br />
                            Everyone loves dogs 🐶
                        </p>
                    </div>
                    <div className="random-fact">
                        <p>
                           Random fact:<br />
                           <span>{fact}</span>
                        </p>
                        <button onClick={getRandomFact}>Tell me another random fact!</button>
                    </div>
                </div>
                <div className="dog-image">
                        <img src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?cs=srgb&dl=pexels-dominika-roseclay-2023384.jpg&fm=jpg" alt=""/>
                </div>
            </section>
        </>
    );
}

export default About;
