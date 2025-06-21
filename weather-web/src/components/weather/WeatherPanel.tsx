import React from "react";
import styled from "styled-components";
import { WEATHER_LABELS } from "../../utils/consts";
import Field from "../../sharedComponents/Field"; // Adjust the import path if needed

type WeatherPanelProps = {
  location: string;
  temperature: number;
  humidity?: number | null;
  precipitationProbability?: number | null;
  uvIndex?: number | null;
  weatherCode?: number | null;
  windSpeed?: number | null;
};

const WeatherPanel: React.FC<WeatherPanelProps> = (props) => {
  const { location, ...detailsObj } = props;

  return (
    <Panel>
      <h3>{location}</h3>
      {Object.entries(detailsObj)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => (
          <Field
            key={key}
            label={WEATHER_LABELS[key] || key}
            value={key === "temperature" ? `${value}°C` : String(value)}
          />
        ))}
    </Panel>
  );
};

export default WeatherPanel;

const Panel = styled.div`
  background: #f5f7fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  margin-top: 12px;
  width: 100%; // Make panel take full parent width
  box-sizing: border-box;
`;
