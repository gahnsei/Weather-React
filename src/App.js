import useWeather from "./useWeather";
import Header from "./Header";
import Weather from "./Weather";

function App() {
  const {
    input,
    inputChange,
    searchCity,
    location,
    background,
    error,
    loading
  } = useWeather();

  return (
    <>
      <img
        className="city-background"
        src={background}
        alt={location.formattedAddress}
      />
      <div className="App">
        <Header
          input={input}
          inputChange={inputChange}
          searchCity={searchCity}
          location={location}
          error={error}
        />

        {location.formattedAddress ? (
          <Weather location={location} loading={loading} />
        ) : (
          <div className="welcome-message slide-up">
            <i className="fa-solid fa-cloud-sun"></i>
            <span>
              React
              <br />
              Weather
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
