import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useTypedSelector } from "../../store";
import { fetchCities } from "../../store/reducers/cityReducer";
import { createAlert } from "../../store/reducers/alertReducer";
import { PARAMETERS, OPERATORS, CREATE_ALERT_LABELS } from "../../utils/consts";

type CreateAlertFormProps = {
  onClose: () => void;
};

const CreateAlertForm: React.FC<CreateAlertFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [parameter, setParameter] = useState(PARAMETERS[0].value);
  const [city, setCity] = useState<string>("");
  const [selectedCityObj, setSelectedCityObj] = useState<any>(null);
  const [operator, setOperator] = useState(OPERATORS[0].value);
  const [threshold, setThreshold] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const {
    data: cities,
    isLoading,
    error,
  } = useTypedSelector((state) => ({
    data: state.cities.data,
    isLoading: state.alert.isLoading,
    error: state.alert.error,
  }));

  useEffect(() => {
    const found = cities.find((c: any) => c.city === city);
    setSelectedCityObj(found || null);
  }, [city, cities]);

  const validatePhone = (value: string) => {
    if (value && !/^\+?\d{7,15}$/.test(value)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    validatePhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    if (!selectedCityObj) {
      setFormError("Please select a valid city.");
      return;
    }

    if (phoneNumber && phoneError) {
      setFormError("Please enter a valid phone number or leave it empty.");
      return;
    }

    const userId = "yourUserId";
    const alertData = {
      location: {
        name: `${selectedCityObj.city}`,
        lat: selectedCityObj.lat,
        lon: selectedCityObj.lng,
      },
      parameter,
      threshold: {
        operator,
        value: Number(threshold),
      },
      name: description,
      description,
      userId,
      phoneNumber: phoneNumber || undefined,
    };

    try {
      await dispatch(createAlert(alertData)).unwrap();
      setSuccess(true);
    } catch (err: any) {
      setFormError(err.message || "Failed to create alert");
    }
  };

  const cityOptions = useMemo(
    () => [
      { value: "", label: CREATE_ALERT_LABELS.selectCity },
      ...cities.map((c: any) => ({
        value: c.city,
        label: `${c.city}, ${c.country}`,
      })),
    ],
    [cities]
  );

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>{CREATE_ALERT_LABELS.title}</Title>

        {isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : success ? (
          <SuccessMessage>
            {CREATE_ALERT_LABELS.success}
            <ButtonRow>
              <button type="button" onClick={onClose}>
                {CREATE_ALERT_LABELS.close}
              </button>
            </ButtonRow>
          </SuccessMessage>
        ) : formError ? (
          <ErrorMessage>
            {formError}
            <ButtonRow>
              <button type="button" onClick={onClose}>
                {CREATE_ALERT_LABELS.close}
              </button>
            </ButtonRow>
          </ErrorMessage>
        ) : (
          <FormWrapper onSubmit={handleSubmit}>
            <StyledLabel>{CREATE_ALERT_LABELS.description}</StyledLabel>
            <StyledInput
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <StyledLabel>{CREATE_ALERT_LABELS.city}</StyledLabel>
            <StyledSelect
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              {cityOptions.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </StyledSelect>

            <StyledLabel>{CREATE_ALERT_LABELS.parameter}</StyledLabel>
            <StyledSelect
              name="parameter"
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
              required
            >
              {PARAMETERS.map((param) => (
                <option key={param.value} value={param.value}>
                  {param.label}
                </option>
              ))}
            </StyledSelect>

            <StyledLabel>{CREATE_ALERT_LABELS.operator}</StyledLabel>
            <StyledSelect
              name="operator"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              required
            >
              {OPERATORS.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </StyledSelect>

            <StyledLabel>{CREATE_ALERT_LABELS.threshold}</StyledLabel>
            <StyledInput
              name="threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              type="number"
              required
            />

            <StyledLabel htmlFor="phoneNumber">
              Phone number (for SMS update)
            </StyledLabel>
            <StyledInput
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+1234567890"
            />
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

            <ButtonRow>
              <StyledButton type="submit" disabled={isLoading}>
                {CREATE_ALERT_LABELS.create}
              </StyledButton>
              <StyledButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                {CREATE_ALERT_LABELS.cancel}
              </StyledButton>
            </ButtonRow>

            {error && (
              <ErrorMessage>
                {CREATE_ALERT_LABELS.errorPrefix} {error}
              </ErrorMessage>
            )}
          </FormWrapper>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateAlertForm;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 420px; /* add this */
  width: 100%; /* add this */
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 12px;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
  margin-top: 12px;
`;

const SpinnerWrapper = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 4px solid #2563eb;
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 32px;
  text-align: center;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  font-weight: 500;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%; /* ensure full width */
  box-sizing: border-box; /* add this for safety */
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%; /* ensure full width */
  box-sizing: border-box; /* add this for safety */
`;

const StyledButton = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #1d4ed8;
  }
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;
