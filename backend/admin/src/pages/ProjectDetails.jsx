import { useState } from "react";

function ProjectDetails({ project, onBack, onUpdate }) {
  const [newProgress, setNewProgress] = useState(project.progress);
  const [newPayment, setNewPayment]   = useState("");
  const [newStatus, setNewStatus]     = useState(project.status);
  const [progressError, setProgressError] = useState("");
  const [paymentError, setPaymentError]   = useState("");

  /* ── helpers ──────────────────────────────────────────── */
  const paidPct = project.totalAmount > 0
    ? Math.round((project.paidAmount / project.totalAmount) * 100)
    : 0;

  const statusColor = {
    "Not Started": "#94a3b8",
    "In Progress":  "#f59e0b",
    "Completed":    "#22c55e",
    "On Hold":      "#ef4444",
  };

  /* ── update progress ──────────────────────────────────── */
  const handleProgressUpdate = () => {
    const val = Number(newProgress);
    if (isNaN(val) || val < 0 || val > 100) {
      setProgressError("Enter a value between 0 and 100.");
      return;
    }
    setProgressError("");

    const autoStatus =
      val === 0   ? "Not Started" :
      val === 100 ? "Completed"   :
      "In Progress";

    onUpdate({
      ...project,
      progress: val,
      status: autoStatus,
    });
  };

  /* ── add payment ──────────────────────────────────────── */
  const handlePaymentAdd = () => {
    const val = Number(newPayment);
    if (!newPayment || isNaN(val) || val <= 0) {
      setPaymentError("Enter a valid payment amount.");
      return;
    }
    const newPaid      = project.paidAmount + val;
    const newRemaining = project.totalAmount - newPaid;
    if (newPaid > project.totalAmount) {
      setPaymentError("Payment exceeds remaining balance.");
      return;
    }
    setPaymentError("");
    setNewPayment("");

    onUpdate({
      ...project,
      paidAmount:      newPaid,
      remainingAmount: newRemaining,
    });
  };

  /* ── update status manually ───────────────────────────── */
  const handleStatusUpdate = () => {
    onUpdate({ ...project, status: newStatus });
  };

  return (
    <div className="pd-page">
      <div className="pd-container">

        {/* ── Header ── */}
        <div className="pd-header">
          <button className="pd-back-btn" onClick={onBack}>
            ← Back to Projects
          </button>
          <div className="pd-title-row">
            <div>
              <h1>{project.projectName}</h1>
              <p>Client: <strong>{project.clientName}</strong> &nbsp;·&nbsp; #{project.id}</p>
            </div>
            <span
              className="pd-status-badge"
              style={{ background: statusColor[project.status] || "#94a3b8" }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* ── Info cards row ── */}
        <div className="pd-info-row">
          <div className="pd-info-card">
            <span>Total Amount</span>
            <strong>{project.totalAmount.toLocaleString()} ETB</strong>
          </div>
          <div className="pd-info-card">
            <span>Paid</span>
            <strong className="pd-green">{project.paidAmount.toLocaleString()} ETB</strong>
          </div>
          <div className="pd-info-card">
            <span>Remaining</span>
            <strong className="pd-red">
              {(project.totalAmount - project.paidAmount).toLocaleString()} ETB
            </strong>
          </div>
          <div className="pd-info-card">
            <span>Start Date</span>
            <strong>{project.startDate || "—"}</strong>
          </div>
          <div className="pd-info-card">
            <span>Deadline</span>
            <strong>{project.deadline || "—"}</strong>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="pd-section">
          <h2>Project Progress</h2>
          <div className="pd-progress-display">
            <div className="pd-progress-track">
              <div
                className="pd-progress-fill"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="pd-progress-pct">{project.progress}%</span>
          </div>

          <div className="pd-update-row">
            <label>Update Progress (%)</label>
            <div className="pd-input-group">
              <input
                type="number"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(e.target.value)}
                placeholder="0 – 100"
              />
              <button className="pd-btn-primary" onClick={handleProgressUpdate}>
                Save Progress
              </button>
            </div>
            {progressError && <p className="pd-error">{progressError}</p>}
          </div>
        </div>

        {/* ── Payment bar ── */}
        <div className="pd-section">
          <h2>Payment Status</h2>
          <div className="pd-progress-display">
            <div className="pd-progress-track">
              <div
                className="pd-progress-fill pd-pay-fill"
                style={{ width: `${paidPct}%` }}
              />
            </div>
            <span className="pd-progress-pct">{paidPct}% paid</span>
          </div>

          <div className="pd-update-row">
            <label>Add New Payment (ETB)</label>
            <div className="pd-input-group">
              <input
                type="number"
                min="0"
                value={newPayment}
                onChange={(e) => setNewPayment(e.target.value)}
                placeholder="Amount in ETB"
              />
              <button className="pd-btn-primary" onClick={handlePaymentAdd}>
                Add Payment
              </button>
            </div>
            {paymentError && <p className="pd-error">{paymentError}</p>}
          </div>
        </div>

        {/* ── Status ── */}
        <div className="pd-section">
          <h2>Project Status</h2>
          <div className="pd-update-row">
            <label>Change Status</label>
            <div className="pd-input-group">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
              <button className="pd-btn-primary" onClick={handleStatusUpdate}>
                Update Status
              </button>
            </div>
          </div>
        </div>

        {/* ── Client & description ── */}
        <div className="pd-section">
          <h2>Client Information</h2>
          <div className="pd-detail-grid">
            <div className="pd-detail-item">
              <span>Name</span>
              <strong>{project.clientName}</strong>
            </div>
            <div className="pd-detail-item">
              <span>Email</span>
              <strong>{project.clientEmail}</strong>
            </div>
            <div className="pd-detail-item">
              <span>Phone</span>
              <strong>{project.clientPhone || "—"}</strong>
            </div>
            <div className="pd-detail-item">
              <span>Request ID</span>
              <strong>#{project.requestId}</strong>
            </div>
          </div>
          {project.description && (
            <div className="pd-description">
              <span>Description</span>
              <p>{project.description}</p>
            </div>
          )}
          {project.requestText && (
            <div className="pd-description">
              <span>Original Request</span>
              <p>{project.requestText}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProjectDetails;
