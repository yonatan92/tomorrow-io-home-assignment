import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WeatherPanel from "../weather/WeatherPanel";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/reducers/weatherReducer";
import { useTypedSelector } from "../../store";
import { useCitiesDropdown } from "../../hooks/useCitiesDropdown";
import DropDown from "../../sharedComponents/DropDown";
import { City } from "../../types/types";
import type { AppDispatch } from "../../store";
import Spinner from "../../sharedComponents/Spinner";
import PageTitle from "../../sharedComponents/PageTitle";
import { PAGE_TITLES } from "../../utils/consts";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCityWeather, isLoading: isLoadingWeatherData } =
    useTypedSelector((state) => state.weather);
  const { cities, isLoading, error } = useCitiesDropdown();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCityChange = (option: City | null) => {
    setSelectedCity(option);
    if (option) {
      dispatch(fetchWeather(option));
    }
  };

  const locationString = selectedCity
    ? `${selectedCity.city}, ${selectedCity.country}`
    : selectedCityWeather?.location || "";

  return (
    <Container className="home-container">
      <PageTitle>{PAGE_TITLES.home}</PageTitle>
      <PanelWrapper>
        <Wrapper>
          <DropDown
            data={cities}
            value={selectedCity}
            onChange={handleCityChange}
            isLoading={isLoading}
            error={error}
          />

          {isLoadingWeatherData ? (
            <Spinner />
          ) : (
            selectedCity && (
              <WeatherCard>
                <WeatherPanel
                  location={locationString}
                  temperature={selectedCityWeather?.temperature}
                  humidity={selectedCityWeather?.humidity}
                  precipitationProbability={
                    selectedCityWeather?.precipitationProbability
                  }
                  uvIndex={selectedCityWeather?.uvIndex}
                  windSpeed={selectedCityWeather?.windSpeed}
                />
              </WeatherCard>
            )
          )}
        </Wrapper>
      </PanelWrapper>
    </Container>
  );
};

export default Home;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 2vw;
`;

const PanelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px; // increased max-width
  margin: 0 auto;
  gap: 2vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2vw;
`;

const WeatherCard = styled.div`
  background: rgb(99, 110, 127);
  border-radius: 18px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
