import Lottie from 'react-lottie-player';
import Header from './Header';
import BloggingColored from '../lotties/BloggingColored.json';
import firebase from 'firebase/app';


const Home = ({auth}) => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).catch(e => {});
    }
    return(
        <>
            <Header auth={auth}/>
            <section>
                <div className="circle top"></div>
                <div className="circle bottom"></div>
                <div className="content">
                <div className="textBox">
                        <h2>It's not just a note app<br />
                        It's <span>note<span>Space</span></span>!</h2>
                        <p>
                            This is the text part where I try to convince you that this app is
                            not a simple app to take notes but something much much more.
                        </p>
                        <button className="sign-in" onClick={signInWithGoogle}>Sign In with Google</button>
                    </div>
                    <div className="animationBox">
                        <div id="bm">
                            <Lottie animationData={BloggingColored} play loop/>
                        </div>            
                    </div>    
                </div>
            </section>
        </>    
    );
}

export default Home;