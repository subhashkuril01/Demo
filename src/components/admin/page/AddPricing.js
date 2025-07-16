// import { Link } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase";
import { ClockLoader } from "react-spinners";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddPricing() {
  var nav = useNavigate("");

  var [name, setname] = useState("");
  var [duration, setduration] = useState("");
  var [price, setprice] = useState("");
  var [description, setdescription] = useState("");
  var [loading, setloading] = useState("");

  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };

  const handleForm = (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let pricingsref = collection(db, "/Pricings");
      addDoc(pricingsref, {
        name: name,
        duration: duration,
        description: description,
        price: price,
        createdat: Timestamp.now(),
        status: true,
      });
      setloading(false);
      setTimeout(() => {
        toast.success("New pricings details are added");
      }, 500);
      nav("/admin/manage-pricings");
    } catch (err) {
      setloading(false);
      toast.success("Something went wrong");
      toast.success("Error in add pricings", err);
    }
  };

  return (
    <>
      {/* banner starts */}
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 className="tit6 t-center">ADD PRICING</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/manage-pricings" className="px-0 mx-0">
                Manage Pricing
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link className="text-white px-0">Add Pricing</Link>
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
        <section class="section-contact bg1-pattern p-t-2 p-b-70">
          {/* banner ends */}

          {/* add pricing starts */}
          <div class="container">
            <h3 class="tit7 t-center p-b-52 p-t-50 text-danger">ADD PRICING</h3>

            <form
              onSubmit={handleForm}
              class="wrap-form-reservation size22 m-l-r-auto"
            >
              <div class="row">
                <div class="col-md-4">
                  <span class="txt9">Name</span>

                  <div class="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <span class="txt9">Duration(In Months)</span>

                  <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="number"
                      name="Duration"
                      placeholder="Duration"
                      value={duration}
                      onChange={(e) => {
                        setduration(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <span class="txt9">Price</span>

                  <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                    <input
                      class="bo-rad-10 sizefull txt10 p-l-20"
                      type="number"
                      name="Price"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="col-12">
                  <span class="txt9">Description</span>
                  <textarea
                    class="bo-rad-10 size35 bo2 txt10 p-l-20 p-t-15 m-b-10 m-t-3"
                    name="message"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="wrap-btn-booking flex-c-m m-t-13">
                {/* <!-- Button3 --> */}
                <button
                  type="submit"
                  className="btn3 flex-c-m size36 txt11 trans-0-4"
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* add pricing ends  */}
    </>
  );
}
