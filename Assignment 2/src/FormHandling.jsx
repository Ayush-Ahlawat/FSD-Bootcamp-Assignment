import { useState } from "react";

function FormHandling() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <h2>Student Form</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <hr />

      <h3>Entered Details</h3>

      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}

export default FormHandling; 