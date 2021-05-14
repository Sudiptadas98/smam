import { useEffect, useState } from "react";


const Contact = () => {


    
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const callContactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();

            
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);

        }
        // console.log(favs);


    }
    useEffect(() => {
        callContactPage();
    }, []);



    //storing data..

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }


    //send the data to backend

    const contactForm = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/Json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not send");
        } else {
            alert("Message send");
            setUserData({ ...userData, message: "" });
        }
    }

    
    return (
        <>
            <div className="main">
                <div className="signupcard">
                    <h1>Contact</h1>
                    <form method="POST" className="signupform">
                        <div className="formdiv">
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                name="name"
                                autoComplete="off"
                                value={userData.name}
                                onChange={handleInputs}
                                placeholder="enter your name" />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name="email"
                                autoComplete="off"
                                value={userData.email}
                                onChange={handleInputs}
                                placeholder="enter your email" />
                        </div>
                        <div className="formdiv">
                            <label htmlFor="phone">Phone</label>
                            <input type="number"
                                name="phone"
                                autoComplete="off"
                                value={userData.phone}
                                onChange={handleInputs}
                                placeholder="enter your phone number" />
                        </div>
                        <div className="formdiv">
                            <textarea placeholder="write your queries.."
                                cols="60" rows="10"
                                name="message"
                                value={userData.message}
                                onChange={handleInputs}></textarea>
                        </div>
                        <div className="signupbtn">
                            <button type="submit" className="regbtn" onClick={contactForm}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Contact;