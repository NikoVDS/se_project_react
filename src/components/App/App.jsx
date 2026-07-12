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
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { addItem, getItems, removeItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]); // Here is where the back-end data base is returning the ID for each card by using the ID parameter rather than the newCardData.
        closeActiveModal();
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
    console.log(cardID);
    removeItem(cardID)
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

    // removeItem().then((data) => {
    //   const filteredArr = data.filter((item) => {
    //     return item._id != data;
    //   });

    //   setClothingItems(filteredArr);
    // });
  }, [coordinates]);

  return (
    <div className="page">
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
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
