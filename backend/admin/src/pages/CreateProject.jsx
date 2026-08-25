import React, { useState } from "react";

function CreateProject({ request, onCancel, onProjectCreated }) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [initialPayment, setInitialPayment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("Please enter the project name.");
      return;
    }
    if (!startDate) {
      alert("Please select the start date.");
      return;
    }
    if (!deadline) {
      alert("Please select the deadline.");
      return;
    }
    if (!totalAmount || Number(totalAmount) <= 0) {
      alert("Please enter a valid total amount.");
      return;
    }
    if (Number(initialPayment) < 0) {
      alert("Initial payment cannot be negative.");
      return;
    }
    if (Number(initialPayment) > Number(totalAmount)) {
      alert("Initial payment cannot be greater than the total amount.");
      return;
    }

    const newProject = {
      id: Date.now(),
      requestId: request.id,
      clientName: request.name,
      clientEmail: request.email,
      clientPhone: request.phone,
      requestText: request.request_text,
      projectName: projectName.trim(),
      description: description.trim(),
      startDate,
      deadline,
      totalAmount: Number(totalAmount),
      paidAmount: Number(initialPayment) || 0,
      remainingAmount: Number(totalAmount) - (Number(initialPayment) || 0),
      progress: 0,
      status: "Not Started",
      createdAt: new Date().toISOString(),
    };

    if (onProjectCreated) {
      onProjectCreated(newProject);
    }

    alert("Project created successfully!");

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="create-project-page">
      <div className="create-project-container">

        {/* Header */}
        <div className="create-project-header">
          <div>
            <h1>Create Project</h1>
            <p>Create a new project from an approved request</p>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={onCancel}
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Client Information */}
          <div className="form-card">
            <div className="form-card-header">
              <h2>Client Information</h2>
              <p>
                This information comes from the approved request.
              </p>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={request?.name || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={request?.email || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={request?.phone || ""}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Request ID</label>
                <input
                  type="text"
                  value={`#${request?.id || ""}`}
                  readOnly
                />
              </div>

            </div>

            <div className="request-message">
              <label>Original Request</label>
              <div className="request-box">
                {request?.request_text || "No request description available."}
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="form-card">
            <div className="form-card-header">
              <h2>Project Information</h2>
              <p>Enter the details of the new project.</p>
            </div>

            <div className="form-group">
              <label>
                Project Name <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Example: Client Management System"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Project Description</label>

              <textarea
                rows="4"
                placeholder="Describe the project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Start Date <span>*</span>
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Deadline <span>*</span>
                </label>

                <input
                  type="date"
                  value={deadline}
                  min={startDate}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* Payment Information */}
          <div className="form-card">
            <div className="form-card-header">
              <h2>Payment Information</h2>
              <p>Enter the project price and initial payment.</p>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Total Amount <span>*</span>
                </label>

                <div className="input-with-label">
                  <input
                    type="number"
                    min="0"
                    placeholder="50000"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                  />

                  <span>ETB</span>
                </div>
              </div>

              <div className="form-group">
                <label>Initial Payment</label>

                <div className="input-with-label">
                  <input
                    type="number"
                    min="0"
                    placeholder="10000"
                    value={initialPayment}
                    onChange={(e) =>
                      setInitialPayment(e.target.value)
                    }
                  />

                  <span>ETB</span>
                </div>
              </div>

            </div>

            {/* Payment Preview */}
            <div className="payment-preview">

              <div>
                <span>Total Amount</span>
                <strong>
                  {Number(totalAmount || 0).toLocaleString()} ETB
                </strong>
              </div>

              <div>
                <span>Initial Payment</span>
                <strong>
                  {Number(initialPayment || 0).toLocaleString()} ETB
                </strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>
                  {Math.max(
                    Number(totalAmount || 0) -
                      Number(initialPayment || 0),
                    0
                  ).toLocaleString()}{" "}
                  ETB
                </strong>
              </div>

            </div>
          </div>

          {/* Project Initial Status */}
          <div className="form-card">

            <div className="form-card-header">
              <h2>Project Status</h2>
              <p>
                New projects start at 0% progress.
              </p>
            </div>

            <div className="initial-status">

              <div className="status-item">
                <span>Progress</span>
                <strong>0%</strong>
              </div>

              <div className="status-item">
                <span>Status</span>
                <strong className="not-started">
                  ● Not Started
                </strong>
              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-project-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-project-button"
            >
              ✓ Create Project
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateProject;