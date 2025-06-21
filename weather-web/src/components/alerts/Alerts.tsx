import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlerts, deleteAlert } from "../../store/reducers/alertReducer";
import type { AppDispatch } from "../../store";
import type { RootState } from "../../store";
import styled from "styled-components";

import type { Alert } from "../../store/reducers/alertReducer";
import ActionButton from "../../sharedComponents/ActionButton";
import Spinner from "../../sharedComponents/Spinner";
import PageTitle from "../../sharedComponents/PageTitle";
import {
  OPERATOR_LABELS,
  PAGE_TITLES,
  STATUS_LABELS,
  STATUS_OPTIONS,
} from "../../utils/consts";
import CreateAlertForm from "./CreateAlertForm";
import DropDown from "../../sharedComponents/DropDown";
import type { StatusOption } from "../../types/types";
import { PARAMETERS, OPERATORS } from "../../utils/consts";

const Alerts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "not_active"
  >("all");

  const alertsState = useSelector((state: RootState) => state.alert);
  const {
    data: alerts = [],
    isLoading = false,
    error = null,
    isDeleting = false, // <-- add this line
  } = alertsState;

  // Handler for opening the create alert form
  const handleCreateAlert = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    dispatch(fetchAlerts());
  }, []);

  const handleDeleteAlert = async (id: string) => {
    try {
      await dispatch(deleteAlert(id)).unwrap();
    } catch (err) {
      alert("Failed to delete alert");
    }
  };

  const refreshTable = async () => {
    try {
      await dispatch(fetchAlerts());
    } catch (err) {
      alert("Failed to refresh alerts");
    }
  };

  const columns: TableColumn<Alert>[] = [
    { name: "Location", selector: (row) => row.location.name, sortable: true },
    { name: "Description", selector: (row) => row.description },
    { name: "Parameter", selector: (row) => row.parameter, sortable: true },
    {
      name: "Operator",
      selector: (row) =>
        OPERATOR_LABELS[row.threshold.operator] || row.threshold.operator,
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => row.threshold.value,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(), // format as local date/time
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.triggered ? STATUS_LABELS.active : STATUS_LABELS.not_active,
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color: row.triggered ? "#16a34a" : "#e11d48", // green for Active, red for Not Active
            fontWeight: "bold",
          }}
        >
          {row.triggered ? STATUS_LABELS.active : STATUS_LABELS.not_active}
        </span>
      ),
    },
    {
      cell: (row: any) => (
        <button onClick={() => handleDeleteAlert(row.id)}>Delete</button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#fff",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
        color: "#23272f",
        fontWeight: "bold",
        fontSize: "1.1rem",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
        color: "#23272f",
      },
    },
    cells: {
      style: {
        backgroundColor: "#fff", // ensure each cell is white
        color: "#23272f",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#fff", // if you use pagination
      },
    },
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "active") return alert.triggered;
    if (statusFilter === "not_active") return !alert.triggered;
    return true;
  });

  // You can extract the handler like this:
  const handleStatusFilterChange = (opt: StatusOption | null) => {
    if (opt) setStatusFilter(opt.value);
  };

  return (
    <Container>
      <PageTitle>{PAGE_TITLES.alerts}</PageTitle>

      <ButtonWrapper>
        <RightButtons>
          <StyledActionButton onClick={refreshTable} label="Refresh Table" />
        </RightButtons>

        <LeftButtons>
          <StyledActionButton
            onClick={handleCreateAlert}
            label="Create Alert"
          />
        </LeftButtons>
      </ButtonWrapper>

      <DropDown
        data={STATUS_OPTIONS}
        value={STATUS_OPTIONS.find((opt) => opt.value === statusFilter) || null}
        onChange={handleStatusFilterChange}
      />

      {isLoading || isDeleting ? (
        <Spinner />
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredAlerts}
          noHeader
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
        />
      )}
      {showCreateModal && <CreateAlertForm onClose={handleCloseModal} />}
    </Container>
  );
};

export default Alerts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 2vw;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 12px;
`;
const RightButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledActionButton = styled(ActionButton)`
  font-size: 1.15rem;
  padding: 12px 32px;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
  }
`;
