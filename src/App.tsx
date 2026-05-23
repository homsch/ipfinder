import {useState, useEffect, useRef} from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const [actualIp, setActualIp] = useState<string>();
    const [proxies, setProxies] = useState<string[]>([]);
    const [ipv4Fallback, setIpv4Fallback] = useState<string>();
    const [ipv6Fallback, setIpv6Fallback] = useState<string>();
    const firstRun = useRef(true);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            fetch("https://api.ipfinder.de/?format=json")
                .then(res => res.json())
                .then(data => {
                    const ip: string = data.ip;
                    setActualIp(ip);
                    setProxies(Array.isArray(data.proxies) ? data.proxies : []);
                    if (ip.includes(":")) {
                        fetch("https://api.ipify.org/?format=json")
                            .then(res => res.json())
                            .then(ipifyData => {
                                const ipv4: string = ipifyData.ip;
                                setIpv4Fallback(ipv4.includes(":") ? "no IPv4 available" : ipv4);
                            })
                            .catch(() => setIpv4Fallback("no IPv4 available"));
                    } else {
                        fetch("https://api6.ipify.org/?format=json")
                            .then(res => res.json())
                            .then(ipifyData => {
                                const ipv6: string = ipifyData.ip;
                                setIpv6Fallback(ipv6.includes(":") ? ipv6 : "no IPv6 available");
                            })
                            .catch(() => setIpv6Fallback("no IPv6 available"));
                    }
                })
                .catch(error => console.log(error.message));
        }
    }, []);

    return (
        <>
            <Header />
            <span className="zero-cookies">zero cookies</span>
            <h1>your public IP</h1>
            <p className="ip">{actualIp}</p>
            {ipv4Fallback && (
                <>
                    <h1>your IPv4</h1>
                    <p className={`ip${ipv4Fallback === "no IPv4 available" ? " unavailable" : ""}`}>{ipv4Fallback}</p>
                </>
            )}
            {ipv6Fallback && (
                <>
                    <h1>your IPv6</h1>
                    <p className={`ip${ipv6Fallback === "no IPv6 available" ? " unavailable" : ""}`}>{ipv6Fallback}</p>
                </>
            )}
            {actualIp && (
                <>
                    <h1>visible proxies</h1>
                    {proxies.length > 0 ? (
                        proxies.map((proxy, i) => (
                            <p key={i} className="ip">{proxy}</p>
                        ))
                    ) : (
                        <p className="ip unavailable">no visible proxy</p>
                    )}
                </>
            )}
            <Footer />
        </>
    )
}

export default App
