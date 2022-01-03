import React from "react";

export default function ContributionsDashboard({ title, contributions }) {
  return (
    <div className="margin-bottom">
      <p className="dashboard-title">{title}</p>
      <div>{contributions}</div>
      <hr className="m-6" />
    </div>
  );
}
