import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClockLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from "../../../Firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

export default function Profile() {
  <ToastContainer />;

  const nav = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [load, setLoad] = useState(true);

  const spinnerObj = {
    margin: "120px auto",
    display: "block",
  };

  let authenticate = sessionStorage.getItem("isLogin");
  useEffect(() => {
    if (!authenticate) {
      nav("/login");
      setTimeout(() => {
        toast.error("Please Login First");
      }, 500);
    }
  }, [authenticate, nav]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; 
        if (user) {
          
          const q = query(collection(db, "Users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            
            const userDoc = querySnapshot.docs[0];
            setUserData(userDoc.data()); 
          } else {
            console.log("No such document with the current user's UID!");
          }
        } else {
          console.log("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoad(false); 
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoad(true);
    try {
      const user = auth.currentUser;
      if (user) {
      
        const q = query(collection(db, "Users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; 
          const userDocRef = userDoc.ref; 

         
          await updateDoc(userDocRef, userData);
          setEditMode(false);
          toast.success("Profile Updated Successfully", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    } finally {
      setLoad(false);
    }
  };

  const changeMode = () => {
    setEditMode(true);
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  };

  return (
    <>
      <section
        className="bg-title-page flex-column p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-02.jpg)" }}
      >
        <h2 className="tit6 t-center">Profile</h2>
        <nav>
          <ol className="main_menu d-flex justify-content-center">
            <li className="breadcrumb-item mx-0">
              <Link to="/" className="px-0 mx-0">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item px-0 mx-0">
              <Link to="/update-profile" className="text-white px-0">
                Update
              </Link>
            </li>
          </ol>
        </nav>
      </section>

      <ClockLoader
        color="red"
        loading={load}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    <div className={load && "display-none"}>
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 600 }}
          >
            <h4 className="section-title">User Profile</h4>
            <h1 className="display-5 mb-4">Manage Your Profile</h1>
          </div>
          <div className="row g-4">
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
              <div className="card p-5 w-100">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                  <button className="btn btn-secondary mb-3">
                    <img
                      src="assets/images/icons/user.png"
                      height={200}
                      width={200}
                      alt="Profile"
                    />
                  </button>
                  {editMode ? (
                    <>
                      <div>
                        <label>Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={userData?.name || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                      <div>
                        <label>Email (You cannot update Email):</label>
                        <input
                          type="email"
                          name="email"
                          value={userData?.email || ""}
                          onChange={handleInputChange}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div>
                        <label>Contact:</label>
                        <input
                          type="text"
                          name="contact"
                          value={userData?.contact || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                      <button
                        className="btn-success btn-lg mt-3"
                        onClick={handleSave}
                      >
                        Save Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>
                        Name:{" "}
                        <span className="name mt-3">
                          {userData?.name || "Name not available"}
                        </span>
                      </h3>
                      <h3 className="mt-2">
                        Email:{" "}
                        <span className="idd">
                          {userData?.email || "Email not available"}
                        </span>
                      </h3>
                      <h3 className="mt-2">
                        Contact:{" "}
                        <span className="idd">
                          {userData?.contact || "Contact not available"}
                        </span>
                      </h3>
                      <button
                        className="btn-primary btn-lg mt-4"
                        onClick={changeMode}
                      >
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
