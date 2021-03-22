import { useState } from 'react';
import Header from './Header';

const Extra = ({auth}) => {

    const [res, setRes] = useState('');
    const [fortytwo, setFortytwo] = useState(false);

    const handleUserInput = (e) => {
        setRes(e.target.value);
    }

    const checkRes = () => {
        if(res === '42'){
            setFortytwo(true);
        } else {
            alert('Wrong answer! Try again! 🤖')
        }
    }

    return(
        <>
            <Header auth={auth}/>
            <section>
            <div className="circle top"></div>
            <div className="circle bottom"></div>
            <div className="about-content">
                    <div className="text-box">
                        <h2>Extra</h2>
                        {
                        fortytwo === false ? 
                        <>
                            <p>
                                Ok so you want something extra? <br />
                                What's the answer to the great question of Life, the Universe and Everything?
                            </p>
                            <input type="text" autoFocus onChange={handleUserInput}/>
                            <button onClick={() => checkRes()}>Submit the answer</button>
                        </>
                        :
                        <>
                            <p>
                                Very nice, I see you are a person of culture, but you just got rickrolled! 🙃 
                            </p>
                            <iframe 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                            frameBorder="0" 
                            autoPlay 
                            allow="autoplay"
                            title="Rick Roll"></iframe>
                        </>
                        }
                    </div>
            </div>        
            </section>
        </>    
    );
}

export default Extra; 