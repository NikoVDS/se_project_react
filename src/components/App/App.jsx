import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  addItem,
  getItems,
  removeItem,
  likeItem,
  unlikeItem,
  updateProfile,
} from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import { register, authorize, checkToken } from "../../utils/auth";

// Fallback coordinates in case geolocation fails
const FALLBACK_COORDINATES = {
  latitude: 34.00001,
  longitude: 81.12336,
};

function App() {
  const [weatherData, setWeatherData] = useState({
    // One thing I have just realized is that I was using destructuring on the weatherData because I hadn't learned about
    // React context yet when I coded this part of the project, but instead of destructuring I could've just created a context for the weatherData and passed it down
    // To other components just like I did for currentTemperatureUnit.
    type: "...",
    temp: { F: "...", C: "..." },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, toggleMobileMenu] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateProfile({ name, avatar, token })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  const handleAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weather,
    };

    addItem({ ...newCardData, token })
      .then((data) => {
        setClothingItems([data, ...clothingItems]); // Here is where the back-end data base is returning the ID for each card by using the ID parameter rather than the newCardData.
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const apiCall = isLiked ? unlikeItem : likeItem;

    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMobileMenuClick = () => {
    toggleMobileMenu((isMobileMenuOpened) => !isMobileMenuOpened);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete-garment");
  };

  const deleteItemHandler = (cardID) => {
    const token = localStorage.getItem("jwt");

    removeItem(cardID, token)
      .then((data) => {
        const filteredCards = clothingItems.filter((item) => {
          return item._id != cardID;
        });
        setClothingItems(filteredCards);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Check token once application starts
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  function handleRegister({ name, avatar, email, password }) {
    return register({
      name,
      avatar,
      email,
      password,
    })
      .then(() => {
        return authorize({
          email,
          password,
        });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res.data);
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  // Request user's geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          // If user denies permission or geolocation fails, use fallback coordinates
          console.warn("Geolocation error:", error.message);
          setCoordinates(FALLBACK_COORDINATES);
        },
      );
    } else {
      // Geolocation not supported, use fallback coordinates
      console.warn("Geolocation is not supported by this browser.");
      setCoordinates(FALLBACK_COORDINATES);
    }
  }, []);

  // Fetch weather and items once coordinates are available
  useEffect(() => {
    if (!coordinates) return;

    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, [coordinates]);

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleLogout,
          handleLoginClick,
          handleRegisterClick,
        }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isMobileMenuOpened={isMobileMenuOpened}
              handleMobileMenuClick={handleMobileMenuClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    isMobileMenuOpened={isMobileMenuOpened}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleEditProfileClick={handleEditProfileClick}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {/* <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
        ></ModalWithForm> */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            onAddItem={handleAddItem}
            deleteItemHandler={deleteItemHandler}
            handleDeleteModal={handleDeleteModal}
          />
          <DeleteModal
            activeModal={activeModal}
            isOpen={activeModal === "delete-garment"}
            closeActiveModal={closeActiveModal}
            deleteItemHandler={deleteItemHandler}
            card={selectedCard}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
