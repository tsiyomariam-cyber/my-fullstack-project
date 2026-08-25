import React from "react";

function Projects({ projects = [], onViewProject }) {

  return (
    <div className="projects-page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Track and manage your projects</p>
        </div>
        <div className="project-count">
          {projects.length} total
        </div>
      </div>

      <div className="projects-card">
        <div className="projects-card-header">
          <h2>All Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PROJECT</th>
                  <th>CLIENT</th>
                  <th>PROGRESS</th>
                  <th>TOTAL AMOUNT</th>
                  <th>PAID</th>
                  <th>REMAINING</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => {
                  const remaining =
                    project.totalAmount - project.paidAmount;

                  return (
                    <tr key={project.id}>
                      <td>#{project.id}</td>

                      <td>
                        <strong>{project.projectName}</strong>
                      </td>

                      <td>{project.clientName}</td>

                      <td>
                        <div className="progress-wrapper">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span>{project.progress}%</span>
                        </div>
                      </td>

                      <td>{project.totalAmount.toLocaleString()} ETB</td>

                      <td>{project.paidAmount.toLocaleString()} ETB</td>

                      <td>{remaining.toLocaleString()} ETB</td>

                      <td>
                        <span className="project-status">
                          ● {project.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-project-btn"
                          onClick={() => onViewProject(project)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Projects;