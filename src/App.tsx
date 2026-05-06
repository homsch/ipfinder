import {useState, useEffect, useRef} from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const [ip4, setIp4] = useState();
    const firstRun = useRef(true);

    useEffect(() => {
        if(firstRun.current){
            firstRun.current = false;
              fetch("https://api-ipfinder.homsch-hopper.workers.dev?format=json")
                    .then(res => res.json())
                    .then(data => setIp4(data.ip))
                    .catch(error => console.log(error.message));
        }
    }, []);

    return (
        <>
            <Header />
            <span className="zero-cookies">zero cookies</span>
            <h1>your public IP</h1>
            <p className="ip">{ip4}</p>
            <Footer />
        </>
    )
}

export default App
