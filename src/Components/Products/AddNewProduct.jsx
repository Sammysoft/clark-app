/* eslint-disable */
import axios from "axios";
import React, { useState, useContext, useRef } from "react";
import { API } from "../../string";
import { storage } from "../../firebase";
import { toast } from "react-hot-toast";
import { Loader } from "semantic-ui-react";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

import { v4 } from "uuid";
import { AuthContext } from "../../Context/AuthContext";

const AddNewProduct = ({ route, setRoute }) => {
  const [load, setLoad] = useState(Boolean);

  const { _getUser } = useContext(AuthContext);
  const [status, setUploadStatus] = useState("Upload product photos");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [includedPrice, setIncludedPrice] = useState(0);
  const [excludedPrice, setExcludedPrice] = useState(0);
  const [category, setCategory] = useState("");

  const [picture, setPicture] = useState([]);
  const [pickFile, setPickFile] = useState(null);
  const [loading, setLoading] = useState(Boolean);
  const [imageLoad, setImageLoad] = useState("");
  const [opacity, setOpacity] = useState(false);
  const [item_pictures, setItemPictures] = useState([]);

  const token = localStorage.getItem("clarktoken");

  const addProduct = () => {
    setLoad(true);
    const payload = {
      details,
      title,
      description,
      taxIncludedPrice: includedPrice,
      taxExcludedPrice: excludedPrice,
      category,
      product_gallery: item_pictures,
      userID: _getUser?.id,
    };

    axios
      .post(`${API}/product/add`, payload, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLoad(false);
        console.log(res.data.message);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error.response.data.message);
      });
  };

  const pick = useRef("");

  const uploadFile = (file) => {
    setLoading(true);
    setImageLoad(true);
    if (picture == null) {
      return null;
    } else {
      setOpacity(true);
      file.map((image) => {
        const imageRef = ref(
          getStorage(),
          `images/clark-app-${Math.random + v4()}`
        );
        let promise = [];
        const uploadTask = uploadBytesResumable(imageRef, image);
        promise.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadStatus(`${Math.round(progress)}%`);
            switch (snapshot.state) {
              case "paused":
                setUploadStatus("Paused");
                break;
              case "running":
                break;
            }
          },
          (error) => {
            alert(
              "Sorry, upload denied at the moment, Please try again later!"
            );
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log(downloadURL);
                setItemPictures((prevImages) => prevImages.concat(downloadURL));
                setOpacity(false);
              }
            );
          }
        );
        Promise.all(promise).then(() => {
          setImageLoad(false);
          setLoading(false);
          toast.success("Images uploaded successfully");
        });
      });
    }
  };

  const handlePictureChange = (e) => {
    const fileArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const uploadableFile = Array.from(e.target.files).map((files) => files);
    if (fileArray.length > 0) {
      setPicture((prevImages) => prevImages.concat(fileArray));
      uploadFile(uploadableFile);
    } else {
      toast.error("Please pick more than one Image");
    }
  };

  return (
    <>
      <main>
        <div class="container">
          {/* <!-- Title and Top Buttons Start --> */}
          <div class="page-title-container">
            <div class="row g-0">
              {/* <!-- Title Start --> */}
              <div class="col-auto mb-3 mb-md-0 me-auto">
                <div
                  class="w-auto sw-md-30"
                  onClick={() => {
                    setRoute("/dashboard?products");
                  }}
                >
                  <a
                    href="/dashboard?screen=products"
                    class="muted-link pb-1 d-inline-block breadcrumb-back"
                  >
                    <i data-acorn-icon="chevron-left" data-acorn-size="13"></i>
                    <span class="text-small align-middle">Products</span>
                  </a>
                  <h1 class="mb-0 pb-0 display-4" id="title">
                    Add New Product
                  </h1>
                </div>
              </div>
              {/* <!-- Title End -->

              <!-- Top Buttons Start --> */}
              <div class="w-100 d-md-none"></div>
              <div class="col-auto d-flex align-items-end justify-content-end">
                <button
                  onClick={() => {
                    addProduct();
                  }}
                  type="submit"
                  class="btn btn-outline-primary btn-icon btn-icon-only"
                  data-delay='{"show":"500", "hide":"0"}'
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Save"
                >
                  {load ? (
                    <>
                      <Loader active inline="centered" />
                    </>
                  ) : (
                    <>
                      <i data-acorn-icon="save"></i>
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
              <div class="col col-md-auto d-flex align-items-end justify-content-end">
                <div class="btn-group ms-1 w-100 w-md-auto">
                  <button
                    onClick={() => {
                      addProduct();
                    }}
                    type="button"
                    class="btn btn-outline-primary btn-icon btn-icon-start w-100"
                  >
                    "
                    {load ? (
                      <>
                        <Loader active inline="centered" />
                      </>
                    ) : (
                      <>
                        <i data-acorn-icon="send"></i>
                        <span>Publish</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-offset="0,3"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <div class="dropdown-menu dropdown-menu-end">
                    <button class="dropdown-item" type="button">
                      Unpublish
                    </button>
                    <button class="dropdown-item" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- Top Buttons End --> */}
            </div>
          </div>
          {/* <!-- Title and Top Buttons End --> */}

          <div class="row">
            <div class="col-xl-8">
              {/* <!-- Product Info Start --> */}
              <div class="mb-5">
                <h2 class="small-title">Product Info</h2>
                <div class="card">
                  <div class="card-body">
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input
                          type="text"
                          class="form-control"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>
                      <div class="mb-3 w-100">
                        <label class="form-label">Category</label>
                        <select
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            console.log(category);
                          }}
                          className="form-control"
                        >
                          <option label="&nbsp;"></option>
                          <option value="Electronics">Electronics</option>
                          <option value="Automobile">Automobile</option>
                          <option value="Phones">Phones</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Description</label>
                        <div
                          class="html-editor-bubble html-editor sh-13"
                          // id="quillEditorBubble"
                        >
                          <input
                            type="text"
                            style={{ height: "100%", width: "100%" }}
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                            id="quillEditorBubble"
                            class="html-editor-bubble html-editor sh-13"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Details</label>
                        <div
                          class="html-editor-bubble html-editor sh-25"
                          // id="quillEditorDetails"
                        >
                          <input
                            type="text"
                            style={{ height: "100%", width: "100%" }}
                            value={details}
                            onChange={(e) => {
                              setDetails(e.target.value);
                            }}
                            class="html-editor-bubble html-editor sh-25"
                            // class="html-editor-bubble html-editor sh-13"
                            id="quillEditorBubble"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 mb-n5">
              {/* <!-- Price Start --> */}
              <div class="mb-5">
                <h2 class="small-title">Price</h2>
                <div class="card">
                  <div class="card-body">
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Tax Excluded</label>
                        <input
                          type="text"
                          class="form-control"
                          value={excludedPrice}
                          onChange={(e) => {
                            setExcludedPrice(e.target.value);
                          }}
                        />
                      </div>
                      <div class="mb-0">
                        <label class="form-label">Tax Included</label>
                        <input
                          type="text"
                          class="form-control"
                          value={includedPrice}
                          onChange={(e) => {
                            setIncludedPrice(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <h2 class="small-title">Gallery</h2>
                <div class="card">
                  <div class="card-body">
                    <div className="imageGalleryWrapper">
                      {item_pictures.map((data, index) => (
                        <img
                          className="imageGallery"
                          key={index}
                          src={data}
                          height={"100px"}
                          width={"100px"}
                        />
                      ))}
                    </div>
                    <input
                      onChange={(e) => {
                        handlePictureChange(e);
                        setPickFile(e.target.files);
                      }}
                      ref={pick}
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      multiple
                    />
                    <div class="text-center">
                      <button
                        type="button"
                        class="btn btn-foreground hover-outline btn-icon btn-icon-start mt-2"
                        id="dropzoneProductGalleryButton"
                        onClick={() => {
                          pick.current.click();
                        }}
                      >
                        <i data-acorn-icon="plus"></i>
                        <span>
                          {loading ? (
                            <>
                              <Loader active inline="centered" />
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Gallery End --> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddNewProduct;
