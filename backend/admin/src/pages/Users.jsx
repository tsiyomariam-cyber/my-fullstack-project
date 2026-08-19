import { useEffect, useState } from "react";

const IconEmpty = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="users-page">
      <div className="table-wrapper">

        <div className="table-header">
          <h3>Registered Users</h3>
          <span className="table-count">{users.length} total</span>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><IconEmpty /></div>
            <p>No users found</p>
            <span>Registered users will appear here</span>
          </div>
        ) : (
          <div className="table-overflow">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><span className="id-cell">#{u.id}</span></td>
                    <td><span className="cell-primary">{u.name}</span></td>
                    <td style={{ color: "var(--gray-500)" }}>{u.email}</td>
                    <td style={{ color: "var(--gray-500)" }}>{u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Users;
