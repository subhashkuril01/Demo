import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  <ToastContainer />;

  const nav = useNavigate();
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [contact, setContact] = useState("");
  var [password, setPassword] = useState("");
  var [address, setaddress] = useState("");
  var [loading, setloading] = useState(false);

  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      setloading(false);

      addData(res.user.uid);
    } catch (err) {
      setloading(false);
      console.log("Error in regsiter", err);
      toast.error(err.message);
    }
  };

  const addData = (userId) => {
    setloading(true);
    let userRef = collection(db, "/Users");

    try {
      addDoc(userRef, {
        name: name,
        contact: contact,
        email: email,
        address: address,
        uid: userId,
        createdAt: Timestamp.now(),
        status: true,
        userType: 2,
      });

      setloading(false);
      nav("/login");
      setTimeout(() => {
        toast.success("Your Account has been Created");
      }, 700);
    } catch (err) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in add user", err);
    }
  };

  return (
    <>
      <section
        class="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-02.jpg)" }}
      >
        <h2 class="tit6 t-center">Register</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/" className="px-0 mx-0">
                Home
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link to="/register" className="text-white px-0">
                Register
              </Link>
            </li>
          </ol>
        </nav>
      </section>
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/* <!-- register form --> */}

      <section class="section-contact bg1-pattern p-t-0 p-b-113">
        <div className={loading && "display-none"}>
          <div className="container">
            <h3 className="fs-40 text-danger t-center p-b-12 p-t-75 fs-20">
              Create a new account
            </h3>
            <h3 className="tit7 t-center p-b-62 p-t-35">
              Already have account?
              <Link className="tit7 text-danger" to="/login">
                Login Now.
              </Link>
            </h3>

            <form
              onSubmit={registerSubmit}
              class="wrap-form-reservation size22 m-l-r-auto"
            >
              <div class="row d-flex justify-content-center">
                <div class="col-md-5">
                  {/* <!-- Name --> */}
                  <span class="txt9">Name</span>

                  <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div class="col-md-5">
                  {/* <!-- Email --> */}
                  <span class="txt9">Email</span>

                  <div class="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div class="col-md-5">
                  {/* <!-- Phone --> */}
                  <span class="txt9">Contact</span>

                  <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="number"
                      name="Contact"
                      placeholder="contact"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  {/* <!-- Phone --> */}
                  <span class="txt9">Password</span>

                  <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div class="col-10">
                  {/* <!-- Message --> */}
                  <span class="txt9">Address</span>
                  <textarea
                    class="bo-rad-10 size35 bo2 txt10 p-l-20 p-t-15 m-b-10 m-t-3"
                    name="message"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                    required
                  ></textarea>
                </div>
              </div>

              <div class="wrap-btn-booking flex-c-m m-t-13">
                {/* <!-- Button3 --> */}
                <button
                  type="submit"
                  class="btn3 flex-c-m size36 txt11 trans-0-4"
                >
                  Register
                </button>
              </div>
            </form>

            <div class="row p-t-135">
              <div class="col-sm-8 col-md-4 col-lg-4 m-l-r-auto p-t-30">
                <div class="dis-flex m-l-23">
                  <div class="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/map-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div class="flex-col-l">
                    <span class="txt5 p-b-10">Location</span>

                    <span class="txt23 size38">
                      8th floor, 379 Hudson St, New York, NY 10018
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-8 col-md-3 col-lg-4 m-l-r-auto p-t-30">
                <div class="dis-flex m-l-23">
                  <div class="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/phone-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div class="flex-col-l">
                    <span class="txt5 p-b-10">Call Us</span>

                    <span class="txt23 size38">(+1) 96 716 6879</span>
                  </div>
                </div>
              </div>

              <div class="col-sm-8 col-md-5 col-lg-4 m-l-r-auto p-t-30">
                <div class="dis-flex m-l-23">
                  <div class="p-r-40 p-t-6">
                    <img
                      src="assets/images/icons/clock-icon.png"
                      alt="IMG-ICON"
                    />
                  </div>

                  <div class="flex-col-l">
                    <span class="txt5 p-b-10">Opening Hours</span>

                    <span class="txt23 size38">
                      09:30 AM – 11:00 PM <br />
                      Every Day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
