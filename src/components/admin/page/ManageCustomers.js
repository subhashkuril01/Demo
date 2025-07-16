// import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { db } from "../../../Firebase";
import moment from "moment";
import { toast } from "react-toastify";
const getDate = (date) => {
  let finalDate = moment(date.toDate()).format("MMM Do YY");
  return finalDate;
};

export default function ManageCustomers() {
  var [users, setusers] = useState([]);
  var [loading, setloading] = useState(true);
  var spinnerObj = {
    margin: "60px auto",
    display: "block",
    borderColor: "red",
  };

  useEffect(() => {
    getAllusers();
  }, []);

  const getAllusers = () => {
    const userRef = collection(db, "/Users");
    const que = query(userRef, where("userType", "==", 2));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setloading(false);
      }, 700);

      setusers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };
  console.log(users);
  const blockuser = (id) => {
    let confirm = window.confirm(
      "Are you sure you wnat to block this user it?"
    );
    if (confirm) {
      setloading(true);
      try {
        let userRef = doc(db, "/Users", id);

        // deleteDoc(userRef, { status: false });
        updateDoc(userRef, { status: false });

        setloading(false);
        toast.success("blocked user Succesfully");
      } catch (err) {
        console.log("unblocked user", err);
        setloading(false);
        toast.error("Something Went Wrong");
      }
    }
  };
  const unblockuser = (id) => {
    let confirm = window.confirm(
      "Are you sure you wnat to unblock this user ?"
    );
    if (confirm) {
      setloading(true);
      try {
        let userRef = doc(db, "/Users", id);

        // deleteDoc(userRef, { status: false });
        updateDoc(userRef, { status: true });

        setloading(false);
        toast.success("unblocked user Succesfully");
      } catch (err) {
        console.log("un user", err);
        setloading(false);
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <>
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 className="tit6 t-center">Manage Customers</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link to="/admin/manage-customers" className="text-white px-0">
                Manage Customers
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
      <div className={loading && "display-none"}>
      <section className="section-welcome bg1-pattern p-t-40 p-b-20">
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <table class="table table-bordered table-secondary">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((i, index) => (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>{i?.name}</td>
                      <td>{i?.email}</td>
                      <td>{i?.contact}</td>

                      <td>{i?.address}</td>
                      <td>{getDate(i?.createdAt)}</td>

                      <td>
                        {i?.status ? (
                          <button
                            onClick={() => {
                              blockuser(i?.id);
                            }}
                            className="btn btn-danger m-r-10"
                          >
                            <i class="bi bi-person-fill-slash fs-25"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              unblockuser(i?.id);
                            }}
                            className="btn btn-success"
                          >
                            <i class="bi bi-person-fill-check fs-25"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-1"></div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
